import LegalPage, { LegalSection, LegalSubSection, LegalList, LegalP } from '@/components/LegalPage';

export const metadata = {
  title: 'Privacy Policy | Reamo',
};

export default function PrivacyPolicy() {
  return (
    <LegalPage title="Privacy Policy" effectiveDate="July 7, 2026">

      <LegalP>
        This Privacy Policy explains how Reamo, Inc. collects, uses, and shares information about
        you when you use our platform and services.
      </LegalP>
      <LegalP>By using Reamo, you agree to the practices described here.</LegalP>

      <LegalSection heading="1. Overview">
        <LegalP>
          Reamo, Inc. (&ldquo;Reamo,&rdquo; &ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;) operates a vertical SaaS platform for
          licensed real estate professionals. This Privacy Policy applies to information we collect
          through our platform, website (reamo.ai), APIs, and related services (collectively, the
          &ldquo;Service&rdquo;).
        </LegalP>
        <LegalP>
          Reamo operates in two distinct capacities depending on the context:
        </LegalP>
        <LegalList items={[
          'As a data controller — when we collect and process information about you as a subscriber, including account data, billing data, and usage data.',
          'As a data processor — when we process personal data you submit about your own clients and prospects ("End User Data") on your behalf. In that capacity, you are the data controller and you direct how that data is used.',
        ]} />
        <LegalP>
          This Policy primarily addresses our role as a data controller. Our processing of End User
          Data on your behalf is governed by our Terms of Service and any applicable Data Processing
          Addendum.
        </LegalP>
      </LegalSection>

      <LegalSection heading="2. Information We Collect">
        <LegalSubSection heading="2.1 Information You Provide Directly">
          <LegalList items={[
            'Account information: name, email address, phone number, job title, brokerage or team name, and password when you register.',
            'Billing and payment information: payment card details, billing address, and transaction history. Full payment card numbers are processed by our third-party payment processor and are not stored on Reamo\'s servers.',
            'Profile and preferences: settings, notification preferences, workflow configurations, and any other information you add to your Account.',
            'Communications: messages you send to our support team, feedback submissions, and responses to surveys or research requests.',
            'End User Data: contact names, phone numbers, email addresses, property details, notes, and other data you import or enter about your clients and prospects.',
          ]} />
        </LegalSubSection>
        <LegalSubSection heading="2.2 Information Collected Automatically">
          <LegalList items={[
            'Usage data: features accessed, pages viewed, actions taken within the platform, workflow configurations activated, frequency and duration of use, and interaction patterns.',
            'Device and browser information: IP address, browser type and version, operating system, device identifiers, screen resolution, and language settings.',
            'Log data: server logs including access times, referring URLs, error logs, and API request metadata.',
            'Performance data: response times, crash reports, and diagnostic data used to maintain and improve the Service.',
          ]} />
          <LegalP>
            <strong>Visitor identification and enrichment.</strong> When you visit or log in to our
            website, cookies and similar technologies may be used by our online data partners or
            vendors to associate that activity with other personal information they or others have
            about you — including by association with your email, IP address, or professional
            profiles (such as LinkedIn). This may allow us to identify the individual or company
            associated with a website visit, even if you have not submitted a form or created an
            account. We (or service providers on our behalf) may then use this information to send
            communications and marketing, prioritize sales outreach, or enrich CRM records. You may
            opt out of this identification and associated advertising at any time by visiting{' '}
            <a href="https://app.retention.com/optout" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">https://app.retention.com/optout</a>.
            This identification occurs primarily for US-based visitors at the individual level; for
            visitors outside the United States, only company-level (not individual) identification is
            performed, consistent with applicable data protection law.
          </LegalP>
        </LegalSubSection>
        <LegalSubSection heading="2.3 Information from VoIP and Calendar Integrations">
          <LegalList items={[
            'Call data: call metadata (duration, timestamp, caller ID, direction), call recordings, and AI-generated transcripts and summaries, received via webhook or API from your connected VoIP provider.',
            'Calendar data: event titles, attendees, times, and meeting notes from connected calendar integrations, used to power scheduling and follow-up features.',
          ]} />
        </LegalSubSection>
        <LegalSubSection heading="2.4 Information from Third Parties">
          <LegalList items={[
            'Payment processors: transaction confirmation, billing status, and fraud signals.',
            'Analytics and advertising partners: aggregated or pseudonymous data about how users reach our website or interact with our marketing.',
            'Visitor identification partners: name, job title, company, LinkedIn profile URL, and firmographic data (company size, industry, revenue) associated with an identified website visitor, sourced from third-party identity resolution providers.',
          ]} />
        </LegalSubSection>
      </LegalSection>

      <LegalSection heading="3. How We Use Your Information">
        <LegalP>We use the information we collect for the following purposes:</LegalP>
        <LegalList items={[
          'Providing the Service — Processing call data, executing workflow automations, and syncing calendar data.',
          'AI Data Processing and Transparency — To provide our core services, Reamo utilizes a self-hosted AI model. Unlike applications that rely on external third-party AI APIs for real-time processing, Reamo\'s AI infrastructure is hosted and managed directly within our secure environment. This allows us to process and summarize your data without sharing the raw content of your communications or personal data with third-party AI providers for model inference.',
          'Account management — Creating and maintaining your Account, authenticating logins, managing subscriptions and billing.',
          'Communications — Sending transactional emails and SMS, responding to support requests, delivering product updates and notifications.',
          'Sales and marketing — Identifying and prioritizing outreach to website visitors who match our target customer profile, including via third-party visitor identification tools, and delivering relevant marketing communications.',
          'Product improvement — Analyzing usage patterns, identifying bugs, and improving AI model accuracy using aggregated and de-identified data.',
          'Legal and compliance — Complying with applicable law, responding to lawful requests, enforcing our Terms of Service.',
        ]} />
      </LegalSection>

      <LegalSection heading="4. How We Share Your Information">
        <LegalSubSection heading="4.1 Service Providers and Processors">
          <LegalP>
            We share information with third-party vendors who help us operate the Service, under
            confidentiality obligations and data processing agreements. While we use a self-hosted AI
            model for data processing and inference to ensure user transparency and data isolation,
            we may use infrastructure and marketing providers for the following:
          </LegalP>
          <LegalList items={[
            'Cloud infrastructure and hosting providers (e.g., to host our internal AI models)',
            'Vector database and search infrastructure providers',
            'Payment processing providers',
            'Email and SMS delivery providers',
            'Calendar integration providers',
            'Analytics and product intelligence platforms',
            'Website visitor identification and enrichment providers, used to recognize and enrich profiles of visitors to reamo.ai for sales and marketing purposes',
          ]} />
        </LegalSubSection>
        <LegalSubSection heading="4.2 Website Visitor Identification">
          <LegalP>
            We use a third-party visitor identification service to help us recognize visitors to
            reamo.ai who have not otherwise identified themselves, and to enrich those visits with
            professional information such as name, job title, employer, and LinkedIn profile. This
            service uses cookies, device identifiers, and IP address matching against its own identity
            network to perform this identification. Person-level identification through this service is
            limited to US-based visitors; visitors outside the United States are identified, if at all,
            only at the company level. You may opt out of this identification at{' '}
            <a href="https://app.retention.com/optout" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">https://app.retention.com/optout</a>.
            California residents may additionally exercise CCPA/CPRA opt-out rights as described in
            Section 9.
          </LegalP>
        </LegalSubSection>
        <LegalSubSection heading="4.3 SMS Communications">
          <LegalP>
            Mobile opt-in data and phone numbers collected for SMS communications will never be
            shared, sold, or transferred to third parties or affiliates for marketing or promotional
            purposes. SMS consent is collected separately and is not required to use the Reamo
            platform.
          </LegalP>
        </LegalSubSection>
        <LegalSubSection heading="4.4 Business Transfers">
          <LegalP>
            If Reamo undergoes a merger or acquisition, your information may be transferred as part
            of that transaction. We will provide notice of any such transfer.
          </LegalP>
        </LegalSubSection>
        <LegalSubSection heading="4.5 Legal Requirements">
          <LegalP>
            We may disclose your information if required to do so by law or court order.
          </LegalP>
        </LegalSubSection>
        <LegalSubSection heading="4.6 What We Do Not Do">
          <LegalP>
            We do not sell your personal information for money. We do not allow third-party AI
            providers to train their models on your identifiable data, as all AI inference is
            performed via our self-hosted infrastructure. Our use of website visitor identification
            technology as described in Section 4.2 may constitute &ldquo;sharing&rdquo; under certain state
            privacy laws (e.g., for cross-context behavioral advertising purposes); you can opt out
            as described in Sections 4.2 and 9.
          </LegalP>
        </LegalSubSection>
      </LegalSection>

      <LegalSection heading="5. Cookies and Tracking Technologies">
        <LegalP>
          Reamo uses cookies and similar technologies, including those operated by our website
          visitor identification partner, to operate the Service, understand usage, and recognize
          and enrich visits to our website. You can control cookies through your browser settings or
          our cookie consent tool, though disabling them may affect Service functionality and will
          prevent visitor identification from occurring.
        </LegalP>
      </LegalSection>

      <LegalSection heading="6. Data Retention and Deletion">
        <LegalSubSection heading="Data We Retain">
          <LegalP>
            Reamo retains call recordings, transcripts, AI-generated summaries, and contact
            information for as long as your account is active, subject to the retention and deletion
            rules below.
          </LegalP>
        </LegalSubSection>
        <LegalSubSection heading="Automatic Vault Purge">
          <LegalP>
            Calls automatically identified by Reamo as personal or non-business in nature are moved to
            a private vault, hidden from your main activity feed. Vaulted calls are permanently
            deleted after 7 days. This process is automatic and requires no action from you.
          </LegalP>
        </LegalSubSection>
        <LegalSubSection heading="Deleting Individual Calls">
          <LegalP>
            You may permanently delete individual calls at any time from your account. If a call is
            linked to an active transaction in a connected transaction management platform, that call
            will remain available until the transaction closes, or until 365 days have passed,
            whichever comes first — after which it may be deleted regardless of transaction status.
          </LegalP>
        </LegalSubSection>
        <LegalSubSection heading="Deleting Your Account">
          <LegalP>
            You may request deletion of your Reamo account at any time from Settings.
          </LegalP>
          <LegalP>
            Upon request, your account enters a 14-day grace period, during which your account is
            deactivated but your data is retained. If you log in and reverse the request during this
            window, your account and data will be restored.
          </LegalP>
          <LegalP>
            After 14 days, Reamo will permanently delete your account and all associated data —
            including calls, transcripts, summaries, contact records, and calendar event history —
            regardless of whether any linked transactions are still open. The transaction-lock
            described above does not apply to full account deletion.
          </LegalP>
          <LegalP>
            Any active subscription will be cancelled immediately upon your deletion request. You will
            not be billed for any period following your request, and no prorated refund will be issued
            for the remainder of a paid term.
          </LegalP>
        </LegalSubSection>
        <LegalSubSection heading="Data in Third-Party Systems">
          <LegalP>
            Reamo connects to third-party services you authorize, including but not limited to your
            calendar provider, transaction management platform(s), and phone/VoIP carrier. Reamo
            processes data from these services to provide its features but does not control or store
            the primary copy of this data. Deleting your Reamo account removes Reamo&apos;s copies of
            your data (including AI-generated summaries and extracted information) but does not delete
            or modify data held in these third-party systems. To remove your data from those services,
            please contact the relevant provider directly.
          </LegalP>
        </LegalSubSection>
      </LegalSection>

      <LegalSection heading="7. Data Security">
        <LegalP>
          We implement industry-standard security measures, including encryption of data in transit
          (TLS) and at rest. In the event of a data breach, we will notify you within 72 hours of
          confirmation, where practicable.
        </LegalP>
      </LegalSection>

      <LegalSection heading="8. Your Rights and Choices">
        <LegalP>
          Depending on your location, you may have the right to access, correct, delete, or port your
          personal information. To exercise these rights, contact{' '}
          <a href="mailto:legal@reamo.ai" className="text-accent hover:underline">legal@reamo.ai</a>.
        </LegalP>
      </LegalSection>

      <LegalSection heading="9. California Privacy Rights (CCPA / CPRA)">
        <LegalP>
          California residents have specific rights regarding their personal information, including
          the right to know what is collected, the right to delete, and the right to opt out of the
          &ldquo;sale&rdquo; or &ldquo;sharing&rdquo; of information for cross-context behavioral advertising.
        </LegalP>
        <LegalP>
          Our use of website visitor identification technology (Section 4.2) may involve the
          &ldquo;sharing&rdquo; of your information with a third-party identity resolution provider for
          purposes that could be considered cross-context behavioral advertising under the CCPA/CPRA.
          You may opt out of this sharing at:{' '}
          <a href="https://app.retention.com/ccpa_details/" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">https://app.retention.com/ccpa_details/</a>
        </LegalP>
        <LegalP>
          You may also submit a general opt-out or rights request to{' '}
          <a href="mailto:legal@reamo.ai" className="text-accent hover:underline">legal@reamo.ai</a>.
        </LegalP>
      </LegalSection>

      <LegalSection heading="10. Children's Privacy">
        <LegalP>
          The Service is intended for adults aged 18 and older. We do not knowingly collect
          information from individuals under 18.
        </LegalP>
      </LegalSection>

      <LegalSection heading="11. International Users">
        <LegalP>
          Reamo is operated from the United States. By using the Service, you consent to the transfer
          and processing of your information in the U.S. Person-level website visitor identification
          (Section 4.2) is performed only for US-based visitors; visitors located outside the United
          States are, at most, identified at the company level, consistent with GDPR and other
          applicable international data protection standards.
        </LegalP>
      </LegalSection>

      <LegalSection heading="12. Changes to This Policy">
        <LegalP>
          We may update this Policy from time to time. For material changes, we will provide 30
          days&apos; advance notice.
        </LegalP>
      </LegalSection>

      <LegalSection heading="13. Contact Us">
        <LegalList items={[
          'Privacy / Legal: legal@reamo.ai',
          'Support: support@reamo.ai',
        ]} />
      </LegalSection>

      <div className="border-t border-[var(--color-border)] pt-6 text-xs text-primary">
        © 2026 Reamo LLC. All rights reserved. Privacy Policy. Updated July 7, 2026.
      </div>

    </LegalPage>
  );
}
