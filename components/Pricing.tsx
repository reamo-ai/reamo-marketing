'use client';

import { useState } from 'react';

const prices = {
  monthly: { agent: '$79', team: '$69', brokerage: '$59' },
  annual:  { agent: '$63', team: '$55', brokerage: '$47' },
};

const ctaBases = {
  agent:     'https://app.reamo.ai/signup',
  team:      'https://app.reamo.ai/signup/team',
  brokerage: 'https://app.reamo.ai/signup/team',
};

function GreenCheck() {
  return (
    <span className="feature-check">
      <svg viewBox="0 0 10 10">
        <path d="M2 5l2.5 2.5L8 3" stroke="#00d4a0" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      </svg>
    </span>
  );
}

function PurpleCheck() {
  return (
    <span className="feature-check purple-check">
      <svg viewBox="0 0 10 10">
        <path d="M2 5l2.5 2.5L8 3" stroke="#a78bfa" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      </svg>
    </span>
  );
}

function PricingTable() {
  const [isAnnual, setIsAnnual] = useState(false);

  const mode = isAnnual ? 'annual' : 'monthly';

  function ctaHref(base: string) {
    return isAnnual ? `${base}?interval=annual` : base;
  }

  function toggleBilling() {
    setIsAnnual((prev) => !prev);
  }

  return (
    <div className={`pricing-wrapper ${isAnnual ? 'billing-annual' : 'billing-monthly'}`}>

        <div className="toggle-row">
          <span
            id="label-monthly"
            className={`toggle-label${!isAnnual ? ' active' : ''}`}
            onClick={() => { if (isAnnual) toggleBilling(); }}
          >
            Monthly
          </span>
          <div
            id="toggle-track"
            className={`toggle-track${isAnnual ? ' annual' : ''}`}
            onClick={toggleBilling}
          >
            <div className="toggle-thumb" />
          </div>
          <span
            id="label-annual"
            className={`toggle-label${isAnnual ? ' active' : ''}`}
            onClick={() => { if (!isAnnual) toggleBilling(); }}
          >
            Annual
          </span>
          <span className="save-tag" id="save-tag">Save 20% with Annual</span>
        </div>

        <div className="pricing-grid">

          {/* Agent */}
          <div className="plan-card">
            <div className="plan-card-head">
              <span className="plan-badge badge-placeholder">·</span>
              <p className="plan-name">Agent</p>
              <p className="plan-target">Individual agents</p>
              <div className="plan-price-block">
                <span className="price-amount">{prices[mode].agent}</span>
                <span className="price-unit">/mo</span>
              </div>
              <p className="price-billing">{isAnnual ? 'billed annually' : '\u00a0'}</p>
              <p className="price-annual-note">{isAnnual ? 'Save 20%' : '\u00a0'}</p>
            </div>
            <hr className="plan-divider" />
            <ul className="feature-list">
              <li className="feature-item"><GreenCheck />Call Notes</li>
              <li className="feature-item"><GreenCheck />Real-time CRM sheets</li>
              <li className="feature-item"><GreenCheck />Life events flagged</li>
              <li className="feature-item"><GreenCheck />Follow-ups logged</li>
              <li className="feature-item"><GreenCheck />Dotloop integration</li>
              <li className="feature-item"><GreenCheck />Google calendar management</li>
              <li className="feature-item"><GreenCheck />SMS AI agent <span className="cap-tag">100 msg/mo</span></li>
              <li className="feature-item"><GreenCheck />30-day data portability</li>
            </ul>
            <a href={ctaHref(ctaBases.agent)} className="plan-cta cta-secondary">Get started</a>
          </div>

          {/* Team */}
          <div className="plan-card">
            <div className="plan-card-head">
              <span className="plan-badge badge-placeholder">·</span>
              <p className="plan-name">Team</p>
              <p className="plan-target">Up to 25 agents</p>
              <div className="plan-price-block">
                <span className="price-amount">{prices[mode].team}</span>
                <span className="price-unit">/seat/mo</span>
              </div>
              <p className="price-billing">{isAnnual ? 'billed annually' : '\u00a0'}</p>
              <p className="price-annual-note">{isAnnual ? 'Save 20%' : '\u00a0'}</p>
            </div>
            <hr className="plan-divider" />
            <ul className="feature-list">
              <li className="feature-item"><GreenCheck />Everything in Agent</li>
              <li className="feature-item"><GreenCheck />SMS AI agent <span className="cap-tag">200 msg/mo</span></li>
              <li className="feature-item"><GreenCheck />Team leader dashboard</li>
              <li className="feature-item"><GreenCheck />Seat management</li>
              <li className="feature-item"><GreenCheck />Single invoice</li>
              <li className="feature-item"><GreenCheck />Email support</li>
            </ul>
            <a href={ctaHref(ctaBases.team)} className="plan-cta cta-secondary">Get started</a>
          </div>

          {/* Brokerage */}
          <div className="plan-card">
            <div className="plan-card-head">
              <span className="plan-badge badge-placeholder">·</span>
              <p className="plan-name">Brokerage</p>
              <p className="plan-target">26–500 agents</p>
              <div className="plan-price-block">
                <span className="price-amount">{prices[mode].brokerage}</span>
                <span className="price-unit">/seat/mo</span>
              </div>
              <p className="price-billing">{isAnnual ? 'billed annually' : '\u00a0'}</p>
              <p className="price-annual-note">{isAnnual ? 'Save 20%' : '\u00a0'}</p>
            </div>
            <hr className="plan-divider" />
            <ul className="feature-list">
              <li className="feature-item"><GreenCheck />Everything in Team</li>
              <li className="feature-item"><GreenCheck />SMS AI agent <span className="cap-tag">300 msg/mo</span></li>
              <li className="feature-item"><GreenCheck />Brokerage analytics</li>
              <li className="feature-item"><GreenCheck />Adoption reporting</li>
              <li className="feature-item"><GreenCheck />Dedicated onboarding</li>
              <li className="feature-item"><GreenCheck />Priority support</li>
            </ul>
            <a href={ctaHref(ctaBases.brokerage)} className="plan-cta cta-secondary">Get started</a>
          </div>

          {/* Enterprise */}
          <div className="plan-card enterprise">
            <div className="plan-card-head">
              <span className="plan-badge badge-placeholder" aria-hidden="true">·</span>
              <p className="plan-name">Enterprise</p>
              <p className="plan-target">500+ agents</p>
              <div className="plan-price-block">
                <span className="price-contact">Let&apos;s talk.</span>
              </div>
              <p className="price-billing">Custom annual contract</p>
              <p className="price-annual-note">Upfront · Named account contact</p>
            </div>
            <hr className="plan-divider" />
            <ul className="feature-list">
              <li className="feature-item"><PurpleCheck />Everything in Brokerage</li>
              <li className="feature-item"><PurpleCheck />Unlimited SMS (fair use)</li>
              <li className="feature-item"><PurpleCheck />Custom SLA</li>
              <li className="feature-item"><PurpleCheck />Quarterly business review</li>
              <li className="feature-item"><PurpleCheck />Agent data portability</li>
              <li className="feature-item"><PurpleCheck />Dedicated success manager</li>
              <li className="feature-item"><PurpleCheck />White-glove onboarding</li>
            </ul>
            <a href="mailto:sales@reamo.ai" className="plan-cta cta-enterprise">Contact sales</a>
          </div>

        </div>

        <div className="pricing-footer">
          All plans include a 30-day grace period for data portability. SMS overages billed at $0.08/message.<br />
          Questions? <a href="mailto:sales@reamo.ai">sales@reamo.ai</a>
        </div>

    </div>
  );
}

export default function Pricing() {
  return (
    <section id="pricing" className="relative z-10 overflow-hidden bg-[var(--color-background)] px-6 pt-16 pb-14 sm:px-8 sm:pt-20 lg:px-12 lg:pt-24 lg:pb-20">
      <div
        aria-hidden
        className="hero-glow pointer-events-none absolute inset-0 -z-10"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 z-0 h-px"
        style={{
          background:
            'linear-gradient(to right, transparent, rgba(0,212,160,0.15), transparent)',
        }}
      />

      <p className="mb-10 text-center text-3xl font-bold leading-tight tracking-tight text-primary sm:text-4xl lg:text-5xl">
        Pricing
      </p>

      <PricingTable />
    </section>
  );
}
