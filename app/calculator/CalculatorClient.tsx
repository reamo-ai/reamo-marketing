"use client";

import { useState } from "react";

const formatCurrency = (n: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(n);

const formatHours = (n: number) =>
  n % 1 === 0 ? n.toString() : n.toFixed(1);

function AnimatedNumber({ value, prefix = "", suffix = "" }: {
  value: number; prefix?: string; suffix?: string;
}) {
  if (prefix === "$") {
    return <span>{new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(value)}</span>;
  }
  const n = Math.round(value * 10) / 10;
  return <span>{n % 1 === 0 ? n.toString() : n.toFixed(1)}{suffix}</span>;
}

function Slider({ label, value, min, max, step, unit, onChange, hint }: {
  label: string; value: number; min: number; max: number; step: number;
  unit: string; onChange: (v: number) => void; hint?: string;
}) {
  return (
    <div style={{ marginBottom: "2rem" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "0.5rem" }}>
        <label style={{ fontFamily: "var(--font-dm-sans), sans-serif", fontSize: "0.85rem", color: "#9999aa", letterSpacing: "0.04em", textTransform: "uppercase" }}>
          {label}
        </label>
        <span style={{ fontFamily: "var(--font-montserrat), sans-serif", fontSize: "1.1rem", color: "#00d4a0", fontWeight: 700 }}>
          {value}{unit}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        style={{
          width: "100%",
          accentColor: "#00d4a0",
          cursor: "pointer",
          display: "block",
        }}
      />
      {hint && <p style={{ marginTop: "0.4rem", fontSize: "0.75rem", color: "#555566", fontFamily: "var(--font-dm-sans), sans-serif" }}>{hint}</p>}
    </div>
  );
}

export default function CalculatorClient() {
  const [callsPerWeek, setCallsPerWeek] = useState(15);
  const [followUpMins, setFollowUpMins] = useState(25);
  const [avgCommission, setAvgCommission] = useState(8500);
  const [closingsPerMonth, setClosingsPerMonth] = useState(3);
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const monthlyAdminHours = (callsPerWeek * 4.33 * followUpMins) / 60;
  const hourlyRate = (avgCommission * closingsPerMonth) / 160;
  const monthlyOpportunityCost = monthlyAdminHours * hourlyRate;
  const annualOpportunityCost = monthlyOpportunityCost * 12;
  const reamoCost = 78;
  const annualROI = annualOpportunityCost - reamoCost * 12;
  const roiMultiple = annualOpportunityCost / (reamoCost * 12);

  const handleSubmit = async () => {
    if (!email.includes("@")) { setError("Please enter a valid email address."); return; }
    setError(""); setLoading(true);
    try {
      const res = await fetch("/api/calculator-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          monthlyAdminHours: Math.round(monthlyAdminHours * 10) / 10,
          monthlyOpportunityCost: Math.round(monthlyOpportunityCost),
          annualOpportunityCost: Math.round(annualOpportunityCost),
          annualROI: Math.round(annualROI),
          roiMultiple: Math.round(roiMultiple),
          inputs: { callsPerWeek, followUpMins, avgCommission, closingsPerMonth },
        }),
      });
      if (!res.ok) throw new Error("Server error");
      setSubmitted(true);
    } catch { setError("Something went wrong. Please try again."); }
    finally { setLoading(false); }
  };

  return (
    <div style={{ minHeight: "100vh", background: "#0a0a0f", fontFamily: "var(--font-dm-sans), sans-serif", color: "#ffffff", padding: "0", position: "relative", overflow: "hidden" }}>
      <style>{`
        .cta-btn { transition:all 0.2s ease; }
        .cta-btn:hover { background:#00edb3 !important; transform:translateY(-1px); box-shadow:0 8px 32px rgba(0,212,160,0.35) !important; }
        .result-card { transition:transform 0.2s ease; }
        .result-card:hover { transform:translateY(-2px); }
        @keyframes fadeUp { from { opacity:0; transform:translateY(24px); } to { opacity:1; transform:translateY(0); } }
        .fade-up { animation:fadeUp 0.6s ease forwards; }
        .fade-up-1 { animation-delay:0.05s; opacity:0; }
        .fade-up-2 { animation-delay:0.15s; opacity:0; }
        .fade-up-3 { animation-delay:0.25s; opacity:0; }
        .fade-up-4 { animation-delay:0.35s; opacity:0; }
        @keyframes glowPulse { 0%,100% { opacity:0.4; } 50% { opacity:0.7; } }
      `}</style>

      <div style={{ position: "fixed", top: "-200px", right: "-200px", width: "600px", height: "600px", background: "radial-gradient(circle, rgba(0,212,160,0.07) 0%, transparent 70%)", pointerEvents: "none", animation: "glowPulse 6s ease-in-out infinite" }} />
      <div style={{ position: "fixed", bottom: "-300px", left: "-200px", width: "700px", height: "700px", background: "radial-gradient(circle, rgba(0,120,200,0.04) 0%, transparent 70%)", pointerEvents: "none" }} />

      <div className="px-page" style={{ maxWidth: "960px", margin: "0 auto", paddingTop: "3rem", paddingBottom: "5rem" }}>

        <div className="fade-up fade-up-1" style={{ textAlign: "center", marginBottom: "3.5rem" }}>
          <div style={{ marginBottom: "1rem" }}>
            <span style={{ fontFamily: "var(--font-montserrat), sans-serif", fontSize: "0.75rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#00d4a0", background: "rgba(0,212,160,0.08)", border: "1px solid rgba(0,212,160,0.2)", padding: "0.35rem 0.9rem", borderRadius: "100px" }}>Free Tool by Reamo</span>
          </div>
          <h1 style={{ fontFamily: "var(--font-montserrat), sans-serif", fontSize: "clamp(23px, 6vw, 74px)", fontWeight: 800, lineHeight: 1.1, margin: "0.75rem 0", letterSpacing: "-0.02em" }}>
            What&apos;s Your Admin Time<br /><span style={{ color: "#00d4a0" }}>Really Costing You?</span>
          </h1>
          <p style={{ color: "#9999aa", fontSize: "1.05rem", maxWidth: "480px", margin: "1rem auto 0", lineHeight: 1.55 }}>
            Real estate agents lose tens of thousands each year to post-call admin. See your number in 30 seconds.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem", alignItems: "start" }}>

          <div className="fade-up fade-up-2" style={{ background: "#14141e", border: "1px solid #1e1e2e", borderRadius: "16px", padding: "2rem" }}>
            <h2 style={{ fontFamily: "var(--font-montserrat), sans-serif", fontSize: "1rem", fontWeight: 700, marginBottom: "2rem", color: "#ffffff", letterSpacing: "0.02em" }}>Your Numbers</h2>
            <Slider label="Calls per week" value={callsPerWeek} min={2} max={60} step={1} unit=" calls" onChange={setCallsPerWeek} hint="Prospecting, follow-up, client check-ins" />
            <Slider label="Admin time per call" value={followUpMins} min={5} max={90} step={5} unit=" min" onChange={setFollowUpMins} hint="Notes, CRM updates, emails, loop tasks" />
            <Slider label="Avg. commission per closing" value={avgCommission} min={2000} max={30000} step={500} unit="" onChange={setAvgCommission} hint={`${formatCurrency(avgCommission)} per transaction`} />
            <Slider label="Closings per month" value={closingsPerMonth} min={1} max={15} step={1} unit=" closings" onChange={setClosingsPerMonth} hint="Your current monthly average" />
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <div className="fade-up fade-up-3 result-card" style={{ background: "#14141e", border: "1px solid #1e1e2e", borderRadius: "16px", padding: "1.5rem" }}>
              <p style={{ fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.12em", color: "#9999aa", marginBottom: "0.4rem" }}>Monthly admin hours</p>
              <div style={{ fontFamily: "var(--font-montserrat), sans-serif", fontSize: "2.4rem", fontWeight: 800, color: "#ffffff", lineHeight: 1 }}>
                <AnimatedNumber value={monthlyAdminHours} suffix=" hrs" />
              </div>
              <p style={{ fontSize: "0.8rem", color: "#555566", marginTop: "0.25rem" }}>That&apos;s <span style={{ color: "#9999aa" }}>{formatHours(Math.round((monthlyAdminHours / 4.33) * 10) / 10)} hrs/week</span> not spent closing</p>
            </div>

            <div className="fade-up fade-up-3 result-card" style={{ background: "linear-gradient(135deg, #0d1f1a 0%, #14141e 100%)", border: "1px solid rgba(0,212,160,0.25)", borderRadius: "16px", padding: "1.5rem", position: "relative", overflow: "hidden" }}>
              <div style={{ position: "absolute", top: "-40px", right: "-40px", width: "120px", height: "120px", background: "radial-gradient(circle, rgba(0,212,160,0.12) 0%, transparent 70%)" }} />
              <p style={{ fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.12em", color: "#00a07a", marginBottom: "0.4rem" }}>Monthly opportunity cost</p>
              <div style={{ fontFamily: "var(--font-montserrat), sans-serif", fontSize: "2.6rem", fontWeight: 800, color: "#00d4a0", lineHeight: 1 }}>
                <AnimatedNumber value={monthlyOpportunityCost} prefix="$" />
              </div>
              <p style={{ fontSize: "0.8rem", color: "#557a6a", marginTop: "0.25rem" }}>At your effective rate of {formatCurrency(hourlyRate)}/hr</p>
            </div>

            <div className="fade-up fade-up-4 result-card" style={{ background: "#14141e", border: "1px solid #1e1e2e", borderRadius: "16px", padding: "1.5rem" }}>
              <p style={{ fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.12em", color: "#9999aa", marginBottom: "0.4rem" }}>Annual opportunity lost</p>
              <div style={{ fontFamily: "var(--font-montserrat), sans-serif", fontSize: "2rem", fontWeight: 800, color: "#ffffff", lineHeight: 1 }}>
                <AnimatedNumber value={annualOpportunityCost} prefix="$" />
              </div>
            </div>

            <div className="fade-up fade-up-4" style={{ background: "#0a0a0f", border: "1px solid #1e1e2e", borderRadius: "12px", padding: "1rem 1.25rem", display: "flex", justifyContent: "space-between", alignItems: "center", gap: "1rem" }}>
              <div>
                <p style={{ fontSize: "0.7rem", textTransform: "uppercase", letterSpacing: "0.1em", color: "#555566" }}>Reamo costs</p>
                <p style={{ fontFamily: "var(--font-montserrat), sans-serif", fontSize: "1.1rem", color: "#9999aa", fontWeight: 700 }}>{formatCurrency(reamoCost)}/mo</p>
              </div>
              <div style={{ width: "1px", height: "36px", background: "#1e1e2e" }} />
              <div>
                <p style={{ fontSize: "0.7rem", textTransform: "uppercase", letterSpacing: "0.1em", color: "#555566" }}>Your ROI</p>
                <p style={{ fontFamily: "var(--font-montserrat), sans-serif", fontSize: "1.1rem", color: "#00d4a0", fontWeight: 700 }}>{roiMultiple.toFixed(0)}x return</p>
              </div>
              <div style={{ width: "1px", height: "36px", background: "#1e1e2e" }} />
              <div>
                <p style={{ fontSize: "0.7rem", textTransform: "uppercase", letterSpacing: "0.1em", color: "#555566" }}>Net annual gain</p>
                <p style={{ fontFamily: "var(--font-montserrat), sans-serif", fontSize: "1.1rem", color: "#ffffff", fontWeight: 700 }}>{formatCurrency(annualROI)}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="fade-up fade-up-4" style={{ maxWidth: "560px", margin: "2.5rem auto 0" }}>
          {!submitted ? (
            <div style={{ background: "#14141e", border: "1px solid #1e1e2e", borderRadius: "16px", padding: "2rem", textAlign: "center" }}>
              <p style={{ fontFamily: "var(--font-montserrat), sans-serif", fontWeight: 700, fontSize: "1.1rem", marginBottom: "0.4rem" }}>Get your full breakdown + Reamo demo</p>
              <p style={{ color: "#9999aa", fontSize: "0.85rem", marginBottom: "1.5rem" }}>
                We&apos;ll send your personalized report and show you exactly how Reamo automates the {formatHours(Math.round(monthlyAdminHours * 10) / 10)} hours.
              </p>
              <div style={{ display: "flex", gap: "0.75rem" }}>
                <input type="email" placeholder="your@email.com" value={email} onChange={(e) => setEmail(e.target.value)} onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
                  style={{ flex: 1, background: "#0a0a0f", border: "1px solid #2a2a3a", borderRadius: "8px", padding: "0.75rem 1rem", color: "#ffffff", fontSize: "0.9rem", fontFamily: "var(--font-dm-sans), sans-serif", outline: "none" }} />
                <button className="cta-btn" onClick={handleSubmit} disabled={loading}
                  style={{ background: "#00d4a0", color: "#0a0a0f", border: "none", borderRadius: "8px", padding: "0.75rem 1.5rem", fontFamily: "var(--font-montserrat), sans-serif", fontWeight: 700, fontSize: "0.9rem", cursor: loading ? "not-allowed" : "pointer", whiteSpace: "nowrap", opacity: loading ? 0.7 : 1, boxShadow: "0 4px 20px rgba(0,212,160,0.2)" }}>
                  {loading ? "Sending..." : "Send My Report →"}
                </button>
              </div>
              {error && <p style={{ marginTop: "0.75rem", fontSize: "0.8rem", color: "#ff6b6b" }}>{error}</p>}
            </div>
          ) : (
            <div style={{ background: "linear-gradient(135deg, #0d1f1a 0%, #14141e 100%)", border: "1px solid rgba(0,212,160,0.3)", borderRadius: "16px", padding: "2rem", textAlign: "center" }}>
              <div style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>✓</div>
              <p style={{ fontFamily: "var(--font-montserrat), sans-serif", fontWeight: 700, fontSize: "1.1rem", color: "#00d4a0", marginBottom: "0.4rem" }}>You&apos;re on the list.</p>
              <p style={{ color: "#9999aa", fontSize: "0.875rem" }}>Check your inbox — your full report is on the way, along with a personal note from Josh.</p>
            </div>
          )}
        </div>

        <p style={{ textAlign: "center", marginTop: "2.5rem", fontSize: "0.75rem", color: "#333344" }}>
          Built by <span style={{ color: "#00d4a0" }}>Reamo</span> · reamo.ai · Opportunity cost calculated at your effective hourly rate based on monthly production
        </p>
      </div>
    </div>
  );
}
