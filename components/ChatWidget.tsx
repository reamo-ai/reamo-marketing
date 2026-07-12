'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

/**
 * Reamo website assistant — a floating RAG chatbot widget.
 *
 * Talks to the same-origin `/api/chatbot` proxy (which streams from the Railway backend). Answers
 * come strictly from Reamo's curated knowledge base. When the bot can't answer (or the backend is
 * unreachable), it hands off confidently — "That's a question for a human" — and opens an inline
 * contact form that posts to `/api/contact`, so the visitor never hits a dead end or a bare mailto.
 *
 * Collapsed by default; opens into a panel on desktop / a bottom sheet on mobile. Streams tokens
 * progressively, is keyboard-accessible with a focus trap, respects reduced-motion, and is themed to
 * the site's blue brand palette.
 */

type Role = 'user' | 'assistant';
interface Message {
  id: string;
  role: Role;
  content: string;
  streaming?: boolean;
}

type HandoffStatus = 'closed' | 'form' | 'submitting' | 'done' | 'error';

const SUGGESTED_QUESTIONS = [
  'What does Reamo do?',
  'Which CRMs does Reamo integrate with?',
  'What phone systems do you support?',
  'How do I get access?',
];

const HANDOFF_ERROR_MESSAGE = 'Let me get you in touch with someone who can help.';
// Escalating copy when the contact form itself fails to send.
const HANDOFF_SEND_ERROR_1 =
  "This is embarrassing. That didn't send. Mind trying once more, or email sales@reamo.ai?";
const HANDOFF_SEND_ERROR_2 =
  "I'm really sorry about this. Please send your inquiry to sales@reamo.ai. Thank you.";

function newId(): string {
  return typeof crypto !== 'undefined' && crypto.randomUUID
    ? crypto.randomUUID()
    : `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [streaming, setStreaming] = useState(false);

  const [handoff, setHandoff] = useState<HandoffStatus>('closed');
  const [handoffPrefill, setHandoffPrefill] = useState('');
  const [handoffError, setHandoffError] = useState('');

  const [teaserVisible, setTeaserVisible] = useState(false);

  const sessionIdRef = useRef<string>('');
  const launcherRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const abortRef = useRef<AbortController | null>(null);
  const handoffFailuresRef = useRef(0);
  const teaserDismissedRef = useRef(false);

  // Stable session id (survives refresh within the tab), used for backend per-session rate limiting.
  useEffect(() => {
    try {
      const existing = sessionStorage.getItem('reamo_chat_session');
      sessionIdRef.current = existing ?? newId();
      if (!existing) sessionStorage.setItem('reamo_chat_session', sessionIdRef.current);
    } catch {
      sessionIdRef.current = newId();
    }
  }, []);

  // Auto-scroll to the newest content as it streams.
  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages, open, handoff]);

  // Focus the input when opening; return focus to the launcher when closing.
  useEffect(() => {
    if (open) {
      const t = setTimeout(() => inputRef.current?.focus(), 120);
      return () => clearTimeout(t);
    }
    launcherRef.current?.focus();
  }, [open]);

  const closePanel = useCallback(() => {
    abortRef.current?.abort();
    setStreaming(false);
    setOpen(false);
  }, []);

  // Esc to close.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closePanel();
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open, closePanel]);

  // Teaser popup: a small "Have questions?" nudge that appears 7s after load,
  // at most once per session. Clicking it opens the chat; the X dismisses it.
  const dismissTeaser = useCallback(() => {
    teaserDismissedRef.current = true;
    try {
      sessionStorage.setItem('reamo_chat_teaser_dismissed', '1');
    } catch {
      /* ignore */
    }
    setTeaserVisible(false);
  }, []);

  useEffect(() => {
    try {
      if (sessionStorage.getItem('reamo_chat_teaser_dismissed')) teaserDismissedRef.current = true;
    } catch {
      /* ignore */
    }
    if (teaserDismissedRef.current) return;
    const t = setTimeout(() => {
      if (!teaserDismissedRef.current) setTeaserVisible(true);
    }, 7000);
    return () => clearTimeout(t);
  }, []);

  // Opening the chat (by any means) retires the teaser for the rest of the session.
  useEffect(() => {
    if (open) dismissTeaser();
  }, [open, dismissTeaser]);

  // Minimal focus trap within the open panel.
  const onPanelKeyDown = useCallback((e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key !== 'Tab' || !panelRef.current) return;
    const focusable = panelRef.current.querySelectorAll<HTMLElement>(
      'button, [href], textarea, input, [tabindex]:not([tabindex="-1"])',
    );
    const list = Array.from(focusable).filter((el) => !el.hasAttribute('disabled'));
    if (list.length === 0) return;
    const first = list[0];
    const last = list[list.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  }, []);

  const appendDelta = useCallback((id: string, text: string) => {
    setMessages((prev) => prev.map((m) => (m.id === id ? { ...m, content: m.content + text } : m)));
  }, []);

  const setMessageContent = useCallback((id: string, content: string) => {
    setMessages((prev) => prev.map((m) => (m.id === id ? { ...m, content, streaming: false } : m)));
  }, []);

  const openHandoff = useCallback((question: string) => {
    setHandoffPrefill(question);
    setHandoffError('');
    handoffFailuresRef.current = 0;
    setHandoff('form');
  }, []);

  const sendMessage = useCallback(
    async (rawText: string) => {
      const text = rawText.trim();
      if (!text || streaming) return;

      // A new question dismisses any open hand-off form; it reopens only if this one also fails.
      setHandoff('closed');

      const assistantId = newId();
      setMessages((prev) => [
        ...prev,
        { id: newId(), role: 'user', content: text },
        { id: assistantId, role: 'assistant', content: '', streaming: true },
      ]);
      setInput('');
      setStreaming(true);

      const controller = new AbortController();
      abortRef.current = controller;

      try {
        const res = await fetch('/api/chatbot', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ message: text, sessionId: sessionIdRef.current }),
          signal: controller.signal,
        });

        if (res.status === 429) {
          setMessageContent(
            assistantId,
            "You're sending messages a little fast — give me a moment and try again.",
          );
          setStreaming(false);
          return;
        }
        if (!res.ok || !res.body) {
          // Not the bot's knowledge failing — but still route to a human, confidently, via the form.
          setMessageContent(assistantId, HANDOFF_ERROR_MESSAGE);
          setStreaming(false);
          openHandoff(text);
          return;
        }

        const reader = res.body.getReader();
        const decoder = new TextDecoder();
        let buffer = '';
        let fallbackUsed = false;
        let errored = false;

        // Parse the SSE stream (events separated by a blank line; payload on a `data:` line).
        // eslint-disable-next-line no-constant-condition
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          buffer += decoder.decode(value, { stream: true });
          let sep: number;
          while ((sep = buffer.indexOf('\n\n')) !== -1) {
            const chunk = buffer.slice(0, sep);
            buffer = buffer.slice(sep + 2);
            const line = chunk.split('\n').find((l) => l.startsWith('data:'));
            if (!line) continue;
            try {
              const evt = JSON.parse(line.slice(5).trim()) as {
                type: string;
                text?: string;
                fallbackUsed?: boolean;
              };
              if (evt.type === 'delta' && evt.text) appendDelta(assistantId, evt.text);
              else if (evt.type === 'done') fallbackUsed = Boolean(evt.fallbackUsed);
              else if (evt.type === 'error') {
                errored = true;
                setMessageContent(assistantId, HANDOFF_ERROR_MESSAGE);
              }
            } catch {
              /* ignore malformed event */
            }
          }
        }

        setMessages((prev) => prev.map((m) => (m.id === assistantId ? { ...m, streaming: false } : m)));
        // Bot couldn't answer (or errored mid-stream): open the human hand-off form.
        if (fallbackUsed || errored) openHandoff(text);
      } catch (err) {
        if ((err as Error)?.name !== 'AbortError') {
          setMessageContent(assistantId, HANDOFF_ERROR_MESSAGE);
          openHandoff(text);
        }
      } finally {
        setStreaming(false);
        abortRef.current = null;
      }
    },
    [streaming, appendDelta, setMessageContent, openHandoff],
  );

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    void sendMessage(input);
  };

  const onInputKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      void sendMessage(input);
    }
  };

  const submitHandoff = useCallback(async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const name = String(form.get('name') ?? '').trim();
    const email = String(form.get('email') ?? '').trim();
    const message = String(form.get('message') ?? '').trim();
    const website = String(form.get('website') ?? ''); // honeypot

    if (!name || !email || !message) {
      setHandoffError('Please add your name, email, and a short message.');
      setHandoff('error');
      return;
    }

    // First send failure → "This is embarrassing…"; second and beyond → "I'm really sorry…".
    const markSendFailure = () => {
      handoffFailuresRef.current += 1;
      setHandoffError(
        handoffFailuresRef.current >= 2 ? HANDOFF_SEND_ERROR_2 : HANDOFF_SEND_ERROR_1,
      );
      setHandoff('error');
    };

    const parts = name.split(/\s+/);
    const firstName = parts[0] || 'Website';
    const lastName = parts.slice(1).join(' ') || 'Visitor';

    setHandoffError('');
    setHandoff('submitting');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          subject: 'Website chat — question for a human',
          message,
          website,
        }),
      });
      const data = (await res.json().catch(() => ({ ok: false }))) as {
        ok: boolean;
        message?: string;
      };
      if (res.ok && data.ok) {
        handoffFailuresRef.current = 0;
        setHandoff('done');
      } else {
        markSendFailure();
      }
    } catch {
      markSendFailure();
    }
  }, []);

  const showEmptyState = messages.length === 0 && handoff === 'closed';
  const submitting = handoff === 'submitting';

  return (
    <div className="rc-root">
      <style>{WIDGET_CSS}</style>

      {/* Launcher */}
      <button
        ref={launcherRef}
        type="button"
        className="rc-launcher"
        aria-label={open ? 'Close Reamo assistant' : 'Open Reamo assistant'}
        aria-expanded={open}
        aria-controls="reamo-chat-panel"
        onClick={() => (open ? closePanel() : setOpen(true))}
      >
        {open ? <CloseIcon /> : <ChatIcon />}
      </button>

      {/* Teaser popup — appears 7s after load, until opened or dismissed */}
      {teaserVisible && !open && (
        <div className="rc-teaser" role="region" aria-label="Message from Reamo">
          <button
            type="button"
            className="rc-teaser-close"
            aria-label="Dismiss message"
            onClick={dismissTeaser}
          >
            <CloseIcon />
          </button>
          <button
            type="button"
            className="rc-teaser-body"
            onClick={() => {
              dismissTeaser();
              setOpen(true);
            }}
          >
            <span className="rc-teaser-name">
              <span className="rc-teaser-dot" aria-hidden="true" />
              Reamo
            </span>
            <span className="rc-teaser-text">Have questions? Let me know!</span>
          </button>
        </div>
      )}

      {/* Panel */}
      {open && (
        <div
          ref={panelRef}
          id="reamo-chat-panel"
          className="rc-panel"
          role="dialog"
          aria-modal="true"
          aria-label="Reamo assistant"
          onKeyDown={onPanelKeyDown}
        >
          <header className="rc-header">
            <div className="rc-header-title">
              <span className="rc-status-dot" aria-hidden="true" />
              <div>
                <p className="rc-title">Reamo</p>
              </div>
            </div>
            <button
              type="button"
              className="rc-icon-btn"
              aria-label="Close assistant"
              onClick={closePanel}
            >
              <CloseIcon />
            </button>
          </header>

          <div className="rc-messages" ref={scrollRef} aria-live="polite" aria-atomic="false">
            {showEmptyState ? (
              <div className="rc-empty">
                <p className="rc-empty-lead">Hi! I'm Reamo's assistant. Ask me anything about Reamo.</p>
                <div className="rc-suggestions">
                  {SUGGESTED_QUESTIONS.map((q) => (
                    <button
                      key={q}
                      type="button"
                      className="rc-suggestion"
                      onClick={() => void sendMessage(q)}
                    >
                      {q}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              messages.map((m) => (
                <div key={m.id} className={`rc-row rc-row-${m.role}`}>
                  <div className={`rc-bubble rc-bubble-${m.role}`}>
                    {m.content ? (
                      <span className="rc-bubble-text">{m.content}</span>
                    ) : m.streaming ? (
                      <span className="rc-typing" aria-label="Assistant is typing">
                        <span />
                        <span />
                        <span />
                      </span>
                    ) : null}
                  </div>
                </div>
              ))
            )}

            {/* Human hand-off form — shown when the bot can't answer or the backend is unreachable. */}
            {handoff !== 'closed' && (
              <div className="rc-handoff">
                {handoff === 'done' ? (
                  <div className="rc-handoff-done">
                    <p className="rc-handoff-heading">Thanks — you're all set.</p>
                    <p className="rc-handoff-sub">Someone from the Reamo team will reach out soon.</p>
                  </div>
                ) : (
                  <form className="rc-handoff-form" onSubmit={submitHandoff}>
                    <p className="rc-handoff-heading">Connect with the team</p>
                    <p className="rc-handoff-sub">Leave your details and a real person will follow up.</p>
                    <input
                      className="rc-field"
                      name="name"
                      placeholder="Your name"
                      autoComplete="name"
                      aria-label="Your name"
                      disabled={submitting}
                      required
                    />
                    <input
                      className="rc-field"
                      name="email"
                      type="email"
                      placeholder="Email address"
                      autoComplete="email"
                      aria-label="Email address"
                      disabled={submitting}
                      required
                    />
                    <textarea
                      className="rc-field rc-field-area"
                      name="message"
                      rows={2}
                      placeholder="What can we help with?"
                      aria-label="Your message"
                      defaultValue={handoffPrefill}
                      key={handoffPrefill}
                      disabled={submitting}
                      required
                    />
                    {/* Honeypot — hidden from humans, catches bots. */}
                    <input
                      className="rc-honeypot"
                      name="website"
                      tabIndex={-1}
                      autoComplete="off"
                      aria-hidden="true"
                    />
                    {handoff === 'error' && handoffError && (
                      <p className="rc-handoff-err">{handoffError}</p>
                    )}
                    <button type="submit" className="rc-handoff-submit" disabled={submitting}>
                      {submitting ? 'Sending…' : 'Send to the team'}
                    </button>
                  </form>
                )}
              </div>
            )}
          </div>

          <form className="rc-input-row" onSubmit={onSubmit}>
            <textarea
              ref={inputRef}
              className="rc-input"
              rows={1}
              placeholder="Ask about Reamo…"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={onInputKeyDown}
              aria-label="Type your question"
              maxLength={1000}
            />
            <button
              type="submit"
              className="rc-send"
              disabled={!input.trim() || streaming}
              aria-label="Send message"
            >
              <SendIcon />
            </button>
          </form>
          <p className="rc-disclaimer">
            Automated assistant — answers from Reamo's knowledge base. Verify important details.
          </p>
        </div>
      )}
    </div>
  );
}

function ChatIcon() {
  // Smooth speech bubble, artwork centered within the 24×24 box so it sits dead-center in the circle.
  return (
    <svg viewBox="0 0 24 24" width="24" height="24" fill="none" aria-hidden="true" focusable="false">
      <path
        fill="currentColor"
        d="M12 4C6.9 4 3 7.38 3 11.5c0 2.08 1.03 3.96 2.75 5.3.2.16.3.4.26.66-.11.72-.38 1.5-.85 2.22-.28.42.06.98.55.88 1.4-.28 2.55-.82 3.46-1.5.16-.12.37-.16.56-.1.73.2 1.51.29 2.32.29 5.1 0 9-3.38 9-7.5S17.1 4 12 4Z"
      />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg viewBox="0 0 24 24" width="22" height="22" fill="none" aria-hidden="true">
      <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function SendIcon() {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" aria-hidden="true">
      <path d="M4 12l16-8-6 16-2.5-6L4 12Z" fill="currentColor" />
    </svg>
  );
}

const WIDGET_CSS = `
.rc-root { position: fixed; z-index: 2147483000; }
.rc-launcher {
  position: fixed; right: 20px; bottom: 20px;
  width: 58px; height: 58px; border-radius: 999px; border: none;
  background: var(--brand-blue, #1b3a6b); color: #fff; cursor: pointer;
  display: flex; align-items: center; justify-content: center;
  box-shadow: 0 10px 30px rgba(27,58,107,0.38), 0 2px 8px rgba(7,16,32,0.14);
  transition: transform .2s ease, box-shadow .2s ease, background .2s ease;
}
.rc-launcher:hover { transform: translateY(-2px) scale(1.03); background: #142a4f; }
.rc-launcher:focus-visible { outline: 3px solid rgba(99,147,180,0.6); outline-offset: 2px; }

.rc-teaser {
  position: fixed; right: 20px; bottom: 90px; z-index: 2147483000;
  width: max-content; max-width: calc(100vw - 32px);
  background: #fff; border: 1px solid rgba(7,16,32,0.10);
  border-radius: 16px;
  box-shadow: 0 14px 38px rgba(7,16,32,0.22), 0 3px 10px rgba(7,16,32,0.10);
  animation: rc-teaser-in .3s cubic-bezier(0.22, 1, 0.36, 1);
  font-family: var(--font-inter, system-ui, sans-serif);
}
@keyframes rc-teaser-in { from { opacity: 0; transform: translateY(10px) scale(0.96); } to { opacity: 1; transform: none; } }
.rc-teaser-body {
  display: flex; flex-direction: column; align-items: flex-start; gap: 3px; width: 100%;
  padding: 12px 15px 13px 15px; text-align: left;
  border: none; background: transparent; cursor: pointer; border-radius: 16px;
}
.rc-teaser-body:hover { background: rgba(27,58,107,0.04); }
.rc-teaser-body:focus-visible { outline: 2px solid rgba(99,147,180,0.7); outline-offset: -2px; }
.rc-teaser-name { display: flex; align-items: center; gap: 6px; font-size: 12px; font-weight: 600; color: var(--brand-blue, #1b3a6b); }
.rc-teaser-dot { flex: 0 0 auto; width: 8px; height: 8px; border-radius: 999px; background: var(--brand-blue-light, #6393b4); box-shadow: 0 0 0 3px rgba(99,147,180,0.20); }
.rc-teaser-text { font-size: 14px; font-weight: 500; line-height: 1.35; color: var(--color-text-primary, #1d1d1f); white-space: nowrap; }
.rc-teaser-close {
  position: absolute; top: 7px; right: 7px;
  display: flex; padding: 3px; border: none; background: transparent; cursor: pointer;
  color: var(--color-text-secondary, #8a8a94); border-radius: 7px;
}
.rc-teaser-close:hover { background: rgba(7,16,32,0.06); color: #1d1d1f; }
.rc-teaser-close svg { width: 14px; height: 14px; }
.rc-teaser-close:focus-visible { outline: 2px solid rgba(99,147,180,0.7); outline-offset: 1px; }

.rc-panel {
  position: fixed; right: 20px; bottom: 88px;
  width: 384px; max-width: calc(100vw - 32px);
  height: min(620px, calc(100vh - 120px));
  display: flex; flex-direction: column;
  background: #fff; border: 1px solid rgba(7,16,32,0.10);
  border-radius: 18px; overflow: hidden;
  box-shadow: 0 24px 60px rgba(7,16,32,0.24), 0 4px 14px rgba(7,16,32,0.10);
  transform-origin: bottom right;
  animation: rc-in .24s cubic-bezier(0.22, 1, 0.36, 1);
  font-family: var(--font-inter, system-ui, sans-serif);
}
@keyframes rc-in { from { opacity: 0; transform: translateY(12px) scale(0.98); } to { opacity: 1; transform: none; } }

.rc-header {
  display: flex; align-items: center; justify-content: space-between;
  padding: 14px 16px; border-bottom: 1px solid rgba(7,16,32,0.08);
  background: linear-gradient(180deg, #fff, #f7f9fc);
}
.rc-header-title { display: flex; align-items: center; gap: 10px; }
.rc-status-dot { width: 9px; height: 9px; border-radius: 999px; background: var(--brand-blue-light, #6393b4); box-shadow: 0 0 0 3px rgba(99,147,180,0.22); }
.rc-title { font-size: 15px; font-weight: 600; color: var(--color-text-primary, #1d1d1f); margin: 0; line-height: 1.2; }
.rc-subtitle { font-size: 12px; color: var(--color-text-secondary, #5b5b66); margin: 2px 0 0; }
.rc-icon-btn { border: none; background: transparent; color: var(--color-text-secondary, #5b5b66); cursor: pointer; padding: 6px; border-radius: 8px; display: flex; }
.rc-icon-btn:hover { background: rgba(7,16,32,0.05); color: #1d1d1f; }

.rc-messages { flex: 1; overflow-y: auto; padding: 16px; display: flex; flex-direction: column; gap: 10px; background: #f6f8fb; }

.rc-empty { padding: 8px 4px; }
.rc-empty-lead { font-size: 14px; color: var(--color-text-primary, #1d1d1f); margin: 0 0 14px; line-height: 1.5; }
.rc-suggestions { display: flex; flex-direction: column; gap: 8px; }
.rc-suggestion {
  text-align: left; border: 1px solid rgba(27,58,107,0.28); background: rgba(27,58,107,0.05);
  color: var(--brand-blue, #1b3a6b); font-size: 13px; padding: 10px 12px; border-radius: 12px; cursor: pointer;
  transition: background .15s ease, border-color .15s ease;
}
.rc-suggestion:hover { background: rgba(27,58,107,0.10); border-color: rgba(27,58,107,0.5); }
.rc-suggestion:focus-visible { outline: 2px solid rgba(99,147,180,0.7); outline-offset: 1px; }

.rc-row { display: flex; }
.rc-row-user { justify-content: flex-end; }
.rc-row-assistant { justify-content: flex-start; }
.rc-bubble { max-width: 84%; padding: 10px 13px; border-radius: 14px; font-size: 14px; line-height: 1.5; white-space: pre-wrap; word-wrap: break-word; }
.rc-bubble-user { background: var(--brand-blue, #1b3a6b); color: #fff; border-bottom-right-radius: 4px; }
.rc-bubble-assistant { background: #fff; color: var(--color-text-primary, #1d1d1f); border: 1px solid rgba(7,16,32,0.07); border-bottom-left-radius: 4px; }
.rc-bubble-text { display: block; }

.rc-typing { display: inline-flex; gap: 4px; align-items: center; padding: 2px 0; }
.rc-typing span { width: 7px; height: 7px; border-radius: 999px; background: #a9b6c6; display: inline-block; animation: rc-bounce 1.2s infinite ease-in-out; }
.rc-typing span:nth-child(2) { animation-delay: .15s; }
.rc-typing span:nth-child(3) { animation-delay: .3s; }
@keyframes rc-bounce { 0%, 60%, 100% { transform: translateY(0); opacity: .5; } 30% { transform: translateY(-4px); opacity: 1; } }

.rc-handoff { background: #fff; border: 1px solid rgba(27,58,107,0.18); border-radius: 14px; padding: 14px; }
.rc-handoff-heading { font-size: 14px; font-weight: 600; color: var(--brand-blue, #1b3a6b); margin: 0 0 3px; }
.rc-handoff-sub { font-size: 12.5px; color: var(--color-text-secondary, #5b5b66); margin: 0 0 12px; line-height: 1.45; }
.rc-handoff-form { display: flex; flex-direction: column; gap: 8px; }
.rc-field {
  width: 100%; border: 1px solid rgba(7,16,32,0.14); border-radius: 10px; padding: 9px 11px;
  font-size: 13px; font-family: inherit; color: var(--color-text-primary, #1d1d1f); outline: none;
  background: #f6f8fb; transition: border-color .15s ease, background .15s ease;
}
.rc-field:focus { border-color: var(--brand-blue, #1b3a6b); background: #fff; }
.rc-field-area { resize: none; }
.rc-honeypot { position: absolute; left: -9999px; width: 1px; height: 1px; opacity: 0; }
.rc-handoff-err { font-size: 12px; color: #8a2d2d; margin: 0; }
.rc-handoff-submit {
  margin-top: 2px; border: none; border-radius: 10px; padding: 10px 12px; cursor: pointer;
  background: var(--brand-blue, #1b3a6b); color: #fff; font-size: 13px; font-weight: 600;
  transition: background .15s ease, opacity .15s ease;
}
.rc-handoff-submit:hover:not(:disabled) { background: #142a4f; }
.rc-handoff-submit:disabled { opacity: 0.55; cursor: default; }
.rc-handoff-submit:focus-visible { outline: 2px solid rgba(99,147,180,0.7); outline-offset: 2px; }
.rc-handoff-done { text-align: center; padding: 6px 4px; }

.rc-input-row { display: flex; align-items: flex-end; gap: 8px; padding: 12px; border-top: 1px solid rgba(7,16,32,0.07); background: #fff; }
.rc-input {
  flex: 1; resize: none; max-height: 120px; border: 1px solid rgba(7,16,32,0.13); border-radius: 12px;
  padding: 10px 12px; font-size: 14px; font-family: inherit; color: var(--color-text-primary, #1d1d1f);
  outline: none; transition: border-color .15s ease, background .15s ease; background: #f6f8fb;
}
.rc-input:focus { border-color: var(--brand-blue, #1b3a6b); background: #fff; }
.rc-send {
  flex: 0 0 auto; width: 40px; height: 40px; border-radius: 12px; border: none; cursor: pointer;
  background: var(--brand-blue, #1b3a6b); color: #fff; display: flex; align-items: center; justify-content: center;
  transition: opacity .15s ease, transform .15s ease, background .15s ease;
}
.rc-send:hover:not(:disabled) { transform: translateY(-1px); background: #142a4f; }
.rc-send:disabled { opacity: 0.4; cursor: not-allowed; }
.rc-send:focus-visible { outline: 2px solid rgba(99,147,180,0.7); outline-offset: 2px; }

.rc-disclaimer { font-size: 11px; color: var(--color-text-secondary, #8a8a94); text-align: center; margin: 0; padding: 0 12px 10px; background: #fff; line-height: 1.4; }

@media (max-width: 520px) {
  .rc-panel {
    right: 0; left: 0; bottom: 0; width: 100%; max-width: 100%;
    height: 88vh; border-radius: 18px 18px 0 0;
    animation: rc-sheet .26s cubic-bezier(0.22, 1, 0.36, 1);
  }
  @keyframes rc-sheet { from { transform: translateY(100%); } to { transform: none; } }
  .rc-launcher { right: 16px; bottom: 16px; }
  .rc-teaser { right: 16px; bottom: 84px; }
}

@media (prefers-reduced-motion: reduce) {
  .rc-panel, .rc-launcher, .rc-send, .rc-suggestion, .rc-handoff-submit, .rc-teaser { animation: none !important; transition: none !important; }
  .rc-typing span { animation: none; opacity: .7; }
}
`;
