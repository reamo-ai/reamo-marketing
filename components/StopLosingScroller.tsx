"use client";

import { useEffect, useMemo, useRef } from "react";

const phrases = [
  "money to faster agents.",
  "trust to missed follow-ups.",
  "clients to forgotten milestones.",
  "weekends to admin.",
  "listings to unsigned contracts.",
  "time to paperwork.",
  "deals to missed notes.",
];

const N = phrases.length;
const ITEM_H_EM = 2.2;
const ROLL_MS = 500;
const PAUSE_MS = 1700;
const TEAL = "#5DCAA5";
const OPACITIES = [1, 0.2, 0.1, 0.08];
const COPIES = 3;
const BG = "var(--color-background)";

export default function StopLosingScroller() {
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const headlineWrapRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const drumRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);

  const extended = useMemo(() => {
    const list: string[] = [];
    for (let r = 0; r < COPIES; r++) list.push(...phrases);
    return list;
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    const drum = drumRef.current;
    const label = labelRef.current;
    if (!track || !drum || !label) return;

    let cur = N;
    let currentOffset = 0;
    let lineHeight = 0;
    let busy = false;
    let autoInterval: ReturnType<typeof setInterval> | null = null;

    const itemH = () => parseFloat(getComputedStyle(drum).fontSize) * ITEM_H_EM;

    const getMaxWidth = () => {
      const style = getComputedStyle(drum);
      const probe = document.createElement("span");
      probe.style.position = "absolute";
      probe.style.visibility = "hidden";
      probe.style.whiteSpace = "nowrap";
      probe.style.fontFamily = style.fontFamily;
      probe.style.fontSize = style.fontSize;
      probe.style.fontWeight = "600";
      probe.style.letterSpacing = style.letterSpacing;
      document.body.appendChild(probe);

      let max = 0;
      for (const phrase of phrases) {
        probe.textContent = phrase;
        max = Math.max(max, probe.getBoundingClientRect().width);
      }

      document.body.removeChild(probe);
      return Math.ceil(max) + 20;
    };

    const offsetForIndex = (c: number) => {
      const h = itemH();
      const labelRect = label.getBoundingClientRect();
      const drumRect = drum.getBoundingClientRect();
      const labelCenterY = labelRect.top + labelRect.height / 2;
      return labelCenterY - drumRect.top - c * h - h / 2;
    };

    const syncOffsetToIndex = () => {
      lineHeight = itemH();
      currentOffset = offsetForIndex(cur);
      setTransform(currentOffset, false);
    };

    const recenter = () => {
      const cycleH = N * itemH();
      if (cur < N) {
        cur += N;
        currentOffset -= cycleH;
        track.style.transition = "none";
        track.style.transform = `translateY(${currentOffset}px)`;
      }
      if (cur >= N * 2) {
        cur -= N;
        currentOffset += cycleH;
        track.style.transition = "none";
        track.style.transform = `translateY(${currentOffset}px)`;
      }
    };

    const setTransform = (offset: number, animate: boolean, ms?: number) => {
      currentOffset = offset;
      track.style.transition = animate
        ? `transform ${ms ?? ROLL_MS}ms cubic-bezier(0.4,0,0.2,1)`
        : "none";
      track.style.transform = `translateY(${offset}px)`;
    };

    const colorAll = (c: number) => {
      const items = track.querySelectorAll<HTMLElement>("[data-idx]");
      items.forEach((el) => {
        const idx = parseInt(el.getAttribute("data-idx") ?? "0", 10);
        let dist = ((idx - c) % N + N * 2) % N;
        if (dist > N / 2) dist -= N;
        const abs = Math.abs(dist);
        if (abs === 0) {
          el.style.color = TEAL;
          el.style.opacity = "1";
        } else if (abs <= 2) {
          el.style.color = "#ffffff";
          el.style.opacity = String(OPACITIES[abs]);
        } else {
          el.style.color = "#ffffff";
          el.style.opacity = "0";
        }
      });
    };

    const startAuto = () => {
      if (autoInterval) return;
      autoInterval = window.setInterval(() => {
        if (busy) return;
        busy = true;
        const next = cur + 1;
        setTransform(currentOffset - lineHeight, true, ROLL_MS);
        colorAll(next);
        window.setTimeout(() => {
          cur = next;
          recenter();
          syncOffsetToIndex();
          busy = false;
        }, ROLL_MS + 20);
      }, PAUSE_MS);
    };

    const stopAuto = () => {
      if (autoInterval) {
        clearInterval(autoInterval);
        autoInterval = null;
      }
    };

    const init = () => {
      drum.style.width = `${getMaxWidth()}px`;
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          lineHeight = itemH();
          currentOffset = offsetForIndex(cur);
          setTransform(currentOffset, false);
          colorAll(cur);
          startAuto();
        });
      });
    };

    const onResize = () => {
      drum.style.width = `${getMaxWidth()}px`;
      syncOffsetToIndex();
      colorAll(cur);
    };

    window.addEventListener("resize", onResize);

    document.fonts.ready.then(init);

    return () => {
      stopAuto();
      window.removeEventListener("resize", onResize);
    };
  }, []);

  useEffect(() => {
    const wrap = headlineWrapRef.current;
    const h2 = headlineRef.current;
    if (!wrap || !h2) return;

    const fitHeadline = () => {
      h2.style.fontSize = "";
      let size = parseFloat(getComputedStyle(h2).fontSize);
      const minSize = 18;

      while (h2.scrollWidth > wrap.clientWidth && size > minSize) {
        size -= 0.5;
        h2.style.fontSize = `${size}px`;
      }
    };

    const run = () => requestAnimationFrame(fitHeadline);

    document.fonts.ready.then(run);
    window.addEventListener("resize", run);

    return () => window.removeEventListener("resize", run);
  }, []);

  return (
    <section
      aria-label="Stop losing"
      className="select-none bg-[var(--color-background)]"
      style={{ fontFamily: "var(--font-montserrat), Montserrat, sans-serif" }}
    >
      <div className="flex w-full flex-col px-[var(--page-gutter)] pb-8 pt-4">
        <div ref={headlineWrapRef} className="mx-auto w-full max-w-7xl pb-6 pt-10 sm:pb-8 sm:pt-14 lg:pt-16">
          <h2
            ref={headlineRef}
            className="w-full whitespace-nowrap text-center text-[clamp(2rem,12vw,7rem)] font-bold leading-none tracking-tight text-primary"
          >
            Do less<span className="text-accent">.</span> Get more<span className="text-accent">.</span>
          </h2>
        </div>

        <div
          className="mx-auto flex w-full max-w-7xl flex-row items-center justify-center font-semibold"
          style={{
            fontSize: "clamp(21px, 3vw, 30px)",
            gap: "0.3em",
          }}
        >
          <div
            ref={labelRef}
            className="flex shrink-0 items-center font-semibold text-primary"
            style={{
              whiteSpace: "nowrap",
              height: `${ITEM_H_EM}em`,
            }}
          >
            Stop losing
          </div>

          <div
            ref={drumRef}
            className="relative shrink-0 overflow-hidden"
            style={{ height: `calc(5 * ${ITEM_H_EM}em)` }}
          >
            <div ref={trackRef} className="absolute left-0 top-0 min-w-full">
              {extended.map((text, i) => (
                <div
                  key={i}
                  data-idx={i}
                  className="flex items-center"
                  style={{
                    height: `${ITEM_H_EM}em`,
                    whiteSpace: "nowrap",
                    width: "max-content",
                    minWidth: "100%",
                    transition: `color ${ROLL_MS}ms ease, opacity ${ROLL_MS}ms ease`,
                  }}
                >
                  {text}
                </div>
              ))}
            </div>

            <div
              aria-hidden
              className="pointer-events-none absolute inset-x-0 top-0 z-[2]"
              style={{
                height: "3em",
                background: `linear-gradient(to bottom, ${BG} 0%, transparent 100%)`,
              }}
            />
            <div
              aria-hidden
              className="pointer-events-none absolute inset-x-0 bottom-0 z-[2]"
              style={{
                height: "3em",
                background: `linear-gradient(to top, ${BG} 0%, transparent 100%)`,
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
