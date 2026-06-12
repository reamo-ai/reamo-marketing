import LegalPage, { LegalSection, LegalSubSection, LegalList, LegalP } from '@/components/LegalPage';

export const metadata = {
  title: 'Terms of Service | Reamo',
};

export default function TermsOfService() {
  return (
    <LegalPage title="Terms of Service" effectiveDate="May 9, 2026">

      <LegalP>
        Please read these Terms carefully before using Reamo. By accessing or using Reamo, you agree
        to be bound by these Terms. If you do not agree, do not use the Service.
      </LegalP>

      <LegalSection heading="1. Acceptance of Terms">
        <LegalP>
          These Terms of Service (&ldquo;Terms&rdquo;) constitute a legally binding agreement between you
          (&ldquo;User,&rdquo; &ldquo;you,&rdquo; or &ldquo;your&rdquo;) and Reamo, Inc. (&ldquo;Reamo,&rdquo; &ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;), a
          Delaware corporation, governing your access to and use of the Reamo platform, software,
          APIs, and all associated services (collectively, the &ldquo;Service&rdquo;).
        </LegalP>
        <LegalP>
          By (a) clicking &ldquo;I agree&rdquo; or a similar button, (b) creating an account, (c) accessing or
          using the Service, or (d) paying for a subscription, you acknowledge that you have read,
          understood, and agree to be bound by these Terms and our Privacy Policy, which is
          incorporated herein by reference.
        </LegalP>
        <LegalP>
          If you are using the Service on behalf of an organization, team, or legal entity, you
          represent that you have authority to bind that entity to these Terms, and &ldquo;you&rdquo; refers to
          both you individually and that entity.
        </LegalP>
      </LegalSection>

      <LegalSection heading="2. Definitions">
        <LegalP>As used in these Terms:</LegalP>
        <LegalList items={[
          '"Account" means your registered account on the Reamo platform.',
          '"Authorized Users" means individuals you invite to access the Service under your Account.',
          '"Client Data" means data you upload, import, or generate within the Service, including contact information for your real estate clients and prospects.',
          '"Content" means all text, data, audio, call recordings, transcripts, notes, templates, workflows, and other materials processed by the Service.',
          '"End Users" means your clients, prospects, and other individuals whose data you submit to or process through the Service.',
          '"Founder Cohort Pricing" means the discounted annual pricing made available to the first qualifying customers under Reamo\'s founder cohort program.',
          '"Subscription Plan" means the Solo Starter, Solo Pro, Solo Elite, or Teams tier you have selected.',
          '"VoIP Integration" means the connection between Reamo and a supported third-party VoIP telephony provider.',
          '"Workflow Automation" means automated post-call sequences, follow-up messages, and related AI-generated actions executed by the Service.',
        ]} />
      </LegalSection>

      <LegalSection heading="3. Description of Services">
        <LegalP>
          Reamo provides a vertical software-as-a-service platform designed for licensed residential
          real estate agents and teams. Core features include, but are not limited to:
        </LegalP>
        <LegalList items={[
          'Post-call automation triggered by VoIP integration events',
          'AI-generated call summaries, transcripts, and follow-up drafts',
          'Automated SMS, email, and follow-up workflow execution',
          'Contact and lead management for real estate clients and prospects',
          'Integration with supported VoIP providers (currently: Dialpad, JustCall, OpenPhone, Kixie, RingCentral, and Aircall, subject to change)',
          'Template libraries, workflow builders, and scheduling tools',
        ]} />
        <LegalP>
          Reamo reserves the right to modify, add, or discontinue features at any time, with
          reasonable notice where modifications materially affect existing functionality.
        </LegalP>
      </LegalSection>

      <LegalSection heading="4. Eligibility and Account Registration">
        <LegalSubSection heading="4.1 Eligibility">
          <LegalP>
            The Service is intended for use by licensed real estate professionals, real estate teams,
            and brokerages operating in the United States. You must be at least 18 years of age and
            have the legal authority to enter into binding contracts. The Service is not intended for
            consumer use by homebuyers, sellers, or tenants acting in a personal capacity.
          </LegalP>
        </LegalSubSection>
        <LegalSubSection heading="4.2 Account Security">
          <LegalP>
            You are responsible for maintaining the confidentiality of your Account credentials and
            for all activity that occurs under your Account. You must promptly notify Reamo at{' '}
            <a href="mailto:legal@reamo.ai" className="text-accent hover:underline">legal@reamo.ai</a>{' '}
            if you suspect unauthorized access. Reamo is not liable for losses resulting from
            unauthorized use of your credentials.
          </LegalP>
        </LegalSubSection>
        <LegalSubSection heading="4.3 Accurate Information">
          <LegalP>
            You agree to provide accurate, current, and complete information during registration and
            to keep that information updated. Reamo may suspend or terminate Accounts with materially
            inaccurate information.
          </LegalP>
        </LegalSubSection>
        <LegalSubSection heading="4.4 Teams and Authorized Users">
          <LegalP>
            If your Subscription Plan includes multiple seats, you are responsible for all Authorized
            Users added to your Account and for ensuring they comply with these Terms. You may not
            exceed the seat count included in your Subscription Plan.
          </LegalP>
        </LegalSubSection>
      </LegalSection>

      <LegalSection heading="5. Subscriptions, Fees, and Payment">
        <LegalSubSection heading="5.1 Subscription Tiers">
          <LegalP>
            Reamo offers the following subscription tiers at current pricing (subject to change per
            Section 19):
          </LegalP>
          <LegalList items={[
            'Solo Starter — $247/month or annual equivalent',
            'Solo Pro — $347/month or annual equivalent',
            'Solo Elite — $497/month or annual equivalent',
            'Teams — custom pricing per seat configuration',
          ]} />
          <LegalP>
            Annual subscriptions are billed in advance and receive a discount over equivalent monthly
            billing. Founder Cohort pricing, where applicable, is locked at the agreed discount for
            the duration of continuous active annual subscription and is non-transferable.
          </LegalP>
        </LegalSubSection>
        <LegalSubSection heading="5.2 Billing and Auto-Renewal">
          <LegalP>
            Subscriptions automatically renew at the end of each billing period unless cancelled
            before the renewal date. You authorize Reamo to charge your payment method on file for
            all recurring fees. Reamo uses third-party payment processors and does not store full
            payment card information.
          </LegalP>
        </LegalSubSection>
        <LegalSubSection heading="5.3 Refunds">
          <LegalP>
            Monthly subscriptions are non-refundable for the current billing period. Annual
            subscriptions cancelled within 14 days of the initial purchase date are eligible for a
            pro-rated refund for unused full months. No refunds are issued for partial months, unused
            features, or cancellations after 14 days of an annual term.
          </LegalP>
        </LegalSubSection>
        <LegalSubSection heading="5.4 Taxes">
          <LegalP>
            All fees are exclusive of applicable taxes. You are responsible for all sales, use, VAT,
            or similar taxes applicable to your subscription, except for taxes based on Reamo&apos;s net
            income.
          </LegalP>
        </LegalSubSection>
        <LegalSubSection heading="5.5 Price Changes">
          <LegalP>
            Reamo may adjust subscription pricing with 30 days&apos; advance written notice. Price changes
            take effect at your next renewal date. Founder Cohort pricing is exempt from general
            price increases for the period specified in your cohort agreement, provided your annual
            subscription remains continuously active.
          </LegalP>
        </LegalSubSection>
        <LegalSubSection heading="5.6 Failed Payments">
          <LegalP>
            If a payment fails, Reamo will attempt to notify you and may retry the charge. After 7
            days of non-payment, Reamo may suspend access to the Service. After 30 days of
            non-payment, Reamo may terminate your Account and begin data deletion per the Privacy
            Policy.
          </LegalP>
        </LegalSubSection>
      </LegalSection>

      <LegalSection heading="6. SMS and Telephone Communications">
        <LegalP>
          <strong className="text-primary">IMPORTANT:</strong> This section governs both (a) SMS
          messages Reamo sends to you as a subscriber, and (b) SMS messages you send to your End
          Users through Reamo&apos;s workflow automation features. Read both parts carefully — they carry
          different legal obligations.
        </LegalP>
        <LegalSubSection heading="6.1 SMS Communications from Reamo to You">
          <LegalP>
            By providing your mobile phone number and creating an Account, you expressly consent to
            receive transactional and service-related SMS messages from Reamo, including but not
            limited to: account notifications, billing alerts, security verification codes, and
            feature updates. Message frequency varies. Message and data rates may apply.
          </LegalP>
          <LegalP>
            To opt out of non-essential SMS from Reamo, reply STOP to any message or update your
            notification preferences in your Account settings. You may not opt out of critical
            transactional messages (e.g., account security alerts) while your Account remains active.
            For help, reply HELP to any Reamo SMS or contact{' '}
            <a href="mailto:support@reamo.ai" className="text-accent hover:underline">support@reamo.ai</a>.
          </LegalP>
          <LegalP>
            Reamo&apos;s SMS communications are transmitted through third-party messaging providers. Reamo
            is not liable for delays or failures in SMS delivery caused by carrier routing, network
            conditions, or provider outages.
          </LegalP>
        </LegalSubSection>
        <LegalSubSection heading="6.2 SMS Messaging to Your End Users (Workflow Automation)">
          <LegalP>
            Reamo&apos;s platform enables you to send SMS messages to your real estate clients and
            prospects as part of automated post-call workflows and follow-up sequences. When you use
            this feature, you are the message originator and are solely responsible for compliance
            with all applicable federal, state, and local laws governing commercial electronic
            messaging, including without limitation:
          </LegalP>
          <LegalList items={[
            'The Telephone Consumer Protection Act (TCPA), 47 U.S.C. § 227, and FCC regulations implementing the TCPA',
            'The CAN-SPAM Act (where applicable to SMS)',
            'State telemarketing and do-not-call laws, including California\'s Invasion of Privacy Act (CIPA)',
            'CTIA Messaging Principles and Best Practices',
            'Applicable carrier codes of conduct and acceptable use policies',
          ]} />
        </LegalSubSection>
        <LegalSubSection heading="6.3 Your Consent Obligations">
          <LegalP>
            You represent and warrant that before sending any SMS message to an End User through
            Reamo, you have obtained all legally required prior express written consent from that End
            User to receive automated text messages from you or your business, in the manner required
            by applicable law for the type of message being sent (transactional, informational, or
            marketing).
          </LegalP>
          <LegalP>
            You are solely responsible for maintaining records of consent, honoring opt-out requests
            promptly (within the timeframe required by law, and in no event more than 10 business
            days), and ensuring your message content complies with applicable disclosure requirements.
          </LegalP>
          <LegalP>
            Reamo may provide consent-management tools or templates as a convenience only. Such tools
            do not constitute legal advice and do not relieve you of your compliance obligations.
            Reamo recommends you consult qualified legal counsel regarding your TCPA and state-law
            compliance posture.
          </LegalP>
        </LegalSubSection>
        <LegalSubSection heading="6.4 Prohibited SMS Conduct">
          <LegalP>You may not use Reamo to send SMS messages that:</LegalP>
          <LegalList items={[
            'Are sent to End Users who have opted out or revoked consent',
            'Violate TCPA, FCC rules, or applicable state law',
            'Contain spam, phishing, or fraudulent content',
            'Contain sexually explicit, harassing, threatening, or illegal content',
            'Impersonate any person or entity in a misleading way',
            'Are sent to numbers on federal or applicable state Do Not Call registries without required legal exemptions',
            'Violate carrier acceptable use policies or CTIA guidelines',
          ]} />
        </LegalSubSection>
        <LegalSubSection heading="6.5 10DLC Registration and Campaign Compliance">
          <LegalP>
            Sending automated or high-volume SMS messages through Reamo may require 10-Digit Long
            Code (10DLC) registration with The Campaign Registry (TCR) and applicable carriers. You
            are responsible for ensuring your messaging campaigns are properly registered and
            compliant with 10DLC requirements, including brand registration, campaign use case
            registration, and ongoing campaign compliance.
          </LegalP>
          <LegalP>
            Reamo may facilitate 10DLC registration as a feature of certain Subscription Plans, but
            ultimate compliance responsibility rests with you. Unregistered or non-compliant
            messaging may be filtered or blocked by carriers. Reamo is not responsible for carrier
            filtering of messages that are non-compliant or unregistered.
          </LegalP>
        </LegalSubSection>
        <LegalSubSection heading="6.6 Short Code and Toll-Free Number Usage">
          <LegalP>
            Where Reamo provides access to shared or dedicated short codes or toll-free numbers for
            messaging, your use of such numbers is subject to applicable carrier guidelines and
            program requirements. Misuse of shared resources that results in carrier blocks or
            complaints may result in suspension of your SMS access.
          </LegalP>
        </LegalSubSection>
        <LegalSubSection heading="6.7 Indemnification for SMS Violations">
          <LegalP>
            You agree to indemnify, defend, and hold harmless Reamo and its affiliates from and
            against any claims, damages, fines, penalties, and expenses (including reasonable
            attorneys&apos; fees) arising from your use of SMS messaging features, including any TCPA or
            state-law violations, carrier complaints, or regulatory actions related to your messaging
            campaigns. See Section 15 for the full indemnification provision.
          </LegalP>
        </LegalSubSection>
        <LegalSubSection heading="6.8 Reamo's Right to Suspend SMS Access">
          <LegalP>
            Reamo reserves the right to suspend or terminate your access to SMS workflow features
            immediately and without prior notice if Reamo has reason to believe you are violating
            applicable law, carrier policies, or these Terms in connection with your messaging use.
            Such suspension does not affect your other obligations under these Terms or relieve you
            of liability for prior violations.
          </LegalP>
        </LegalSubSection>
        <LegalSubSection heading="6.9 Reamo SMS Program — Messaging Disclosure">
          <LegalList items={[
            'Program Name: Reamo SMS Program',
            'Program Description: Reamo sends automated SMS messages to registered users who have opted in during account registration. Messages include pipeline summaries, action item reminders, call follow-ups, and account notifications. No marketing or promotional messages are sent. Messages are sent only in response to user-initiated inquiries. You will not receive unsolicited messages.',
            'Message Frequency: Messages are sent only in response to user-initiated inquiries. You will not receive unsolicited messages. Reply frequency depends entirely on how often you initiate contact.',
            'Message and Data Rates: Message and data rates may apply. Contact your wireless carrier for details.',
            'Opt-Out: Reply STOP at any time to unsubscribe. You will receive one confirmation message and no further messages will be sent.',
            'Help: Reply HELP for assistance. You may also contact us at support@reamo.ai.',
            'Support: support@reamo.ai | reamo.ai',
            'Eligible Carriers: Supported on all major U.S. carriers. Carrier support may vary.',
            'Privacy Policy: reamo.ai/privacy-policy',
            'Terms of Service: reamo.ai/terms-of-service',
          ]} />
        </LegalSubSection>
      </LegalSection>

      <LegalSection heading="7. VoIP and Telephony Integrations">
        <LegalSubSection heading="7.1 Third-Party VoIP Providers">
          <LegalP>
            Reamo integrates with third-party VoIP providers to trigger post-call automation. Your
            use of VoIP integrations is also subject to the terms and policies of your VoIP provider.
            Reamo is not a party to your agreement with your VoIP provider and is not responsible for
            the performance, availability, or data practices of third-party VoIP platforms.
          </LegalP>
        </LegalSubSection>
        <LegalSubSection heading="7.2 Call Recording Consent">
          <LegalP>
            Many states require one-party or all-party consent before recording telephone calls. You
            are solely responsible for ensuring that any call recordings processed through Reamo
            comply with applicable federal and state wiretapping, eavesdropping, and privacy laws,
            including without limitation California&apos;s CIPA (Cal. Penal Code § 632), Illinois
            Eavesdropping Act, and equivalent statutes in all-party consent states. Reamo processes
            call recordings you authorize; Reamo does not initiate recordings independently.
          </LegalP>
        </LegalSubSection>
        <LegalSubSection heading="7.3 Data from VoIP Integrations">
          <LegalP>
            By connecting a VoIP integration, you authorize Reamo to receive and process call data,
            metadata, and recordings made available through that integration&apos;s API or webhook. You
            represent that you have the right to share this data with Reamo and that doing so does
            not violate any applicable law or third-party agreement.
          </LegalP>
        </LegalSubSection>
        <LegalSubSection heading="7.4 Integration Availability">
          <LegalP>
            Reamo does not guarantee the continuous availability of any specific VoIP integration.
            Third-party API changes, provider policy updates, or technical incompatibilities may
            result in temporary or permanent discontinuation of specific integrations. Reamo will
            provide reasonable notice of material integration changes where possible.
          </LegalP>
        </LegalSubSection>
      </LegalSection>

      <LegalSection heading="8. Data, Privacy, and Security">
        <LegalSubSection heading="8.1 Privacy Policy">
          <LegalP>
            Reamo&apos;s collection and use of personal information is governed by our Privacy Policy,
            available at reamo.ai/privacy, which is incorporated into these Terms by reference.
          </LegalP>
        </LegalSubSection>
        <LegalSubSection heading="8.2 Your Ownership of Client Data">
          <LegalP>
            You retain all ownership rights in your Client Data. You grant Reamo a limited,
            non-exclusive, worldwide license to process, store, and use your Client Data solely to
            provide and improve the Service during your subscription term.
          </LegalP>
        </LegalSubSection>
        <LegalSubSection heading="8.3 Reamo's Use of Data">
          <LegalP>
            Reamo will not sell your Client Data to third parties. Reamo may use aggregated,
            de-identified data derived from platform usage to improve the Service, develop new
            features, and conduct internal analytics, provided such data cannot reasonably be used to
            identify you or your End Users.
          </LegalP>
        </LegalSubSection>
        <LegalSubSection heading="8.4 Data Processor Obligations">
          <LegalP>
            Where Reamo processes personal data on your behalf as a data processor, Reamo will
            implement and maintain reasonable technical and organizational security measures
            appropriate to the risk. A Data Processing Addendum (DPA) is available upon request for
            customers who require one for GDPR, CCPA, or other regulatory compliance purposes.
          </LegalP>
        </LegalSubSection>
        <LegalSubSection heading="8.5 Data Retention and Deletion">
          <LegalP>
            Upon termination of your Account, Reamo will retain your Client Data for up to 30 days
            to facilitate export or re-activation, after which Reamo will delete or anonymize such
            data in accordance with our data retention policy. You may request earlier deletion by
            contacting{' '}
            <a href="mailto:legal@reamo.ai" className="text-accent hover:underline">legal@reamo.ai</a>.
            Call recordings are subject to the same retention schedule unless deleted earlier from
            within the platform.
          </LegalP>
        </LegalSubSection>
        <LegalSubSection heading="8.6 Security">
          <LegalP>
            Reamo implements industry-standard security measures including encryption in transit
            (TLS) and at rest, access controls, and regular security review. However, no system is
            completely secure. You are responsible for the security of credentials used to access
            your Account and for any data you export from the Service.
          </LegalP>
        </LegalSubSection>
        <LegalSubSection heading="8.7 Data Breach Notification">
          <LegalP>
            In the event of a confirmed data breach affecting your Client Data, Reamo will notify you
            within the timeframe required by applicable law, and in no event more than 72 hours after
            Reamo becomes aware of the breach, to the extent practicable.
          </LegalP>
        </LegalSubSection>
        <LegalSubSection heading="8.8 CCPA">
          <LegalP>
            If you are a business subject to the California Consumer Privacy Act (CCPA) and use Reamo
            to process personal information of California residents, you acknowledge that Reamo is
            acting as your &ldquo;service provider&rdquo; as defined under the CCPA and will process such
            information only as directed by you and as permitted under these Terms.
          </LegalP>
        </LegalSubSection>
        <LegalSubSection heading="8.9 Data Portability">
          <LegalP>
            You may request an export of your Client Data at any time through your Account settings
            or by contacting{' '}
            <a href="mailto:legal@reamo.ai" className="text-accent hover:underline">legal@reamo.ai</a>.
            Reamo will provide a machine-readable export within 10 business days of a valid request.
          </LegalP>
        </LegalSubSection>
      </LegalSection>

      <LegalSection heading="9. Intellectual Property">
        <LegalSubSection heading="9.1 Reamo's IP">
          <LegalP>
            Reamo and its licensors own all right, title, and interest in and to the Service,
            including all software, algorithms, AI models, interfaces, documentation, trademarks, and
            trade secrets. These Terms do not transfer any ownership interest to you. You receive
            only the limited right to access and use the Service as described herein.
          </LegalP>
        </LegalSubSection>
        <LegalSubSection heading="9.2 Your IP and Client Data">
          <LegalP>
            You retain ownership of all content and data you create or provide. You grant Reamo the
            license described in Section 8.2 to operate the Service. This license terminates upon
            deletion of your Client Data in accordance with Section 8.5.
          </LegalP>
        </LegalSubSection>
        <LegalSubSection heading="9.3 Feedback">
          <LegalP>
            If you provide Reamo with feedback, suggestions, or ideas about the Service, you grant
            Reamo a perpetual, irrevocable, royalty-free, worldwide license to use such feedback for
            any purpose without any obligation or compensation to you.
          </LegalP>
        </LegalSubSection>
        <LegalSubSection heading="9.4 AI-Generated Output">
          <LegalP>
            AI-generated content produced by the Service (including call summaries, follow-up drafts,
            and workflow suggestions) is provided to you for your use. Reamo makes no representation
            that AI-generated output is free from third-party IP claims. You are responsible for
            reviewing AI-generated content before sending or publishing it.
          </LegalP>
        </LegalSubSection>
        <LegalSubSection heading="9.5 Copyright Infringement (DMCA)">
          <LegalP>
            Reamo respects intellectual property rights. If you believe material on the Service
            infringes your copyright, please send a notice compliant with 17 U.S.C. § 512 to{' '}
            <a href="mailto:legal@reamo.ai" className="text-accent hover:underline">legal@reamo.ai</a>.
          </LegalP>
        </LegalSubSection>
      </LegalSection>

      <LegalSection heading="10. Acceptable Use Policy">
        <LegalP>You agree not to use the Service to:</LegalP>
        <LegalList items={[
          'Violate any applicable law, regulation, or third-party rights',
          'Send spam, unsolicited marketing, or deceptive communications',
          'Harass, threaten, defame, or defraud any person',
          'Scrape, copy, or reverse-engineer any part of the Service',
          'Introduce malware, viruses, or malicious code',
          'Circumvent access controls, rate limits, or security measures',
          'Use the Service for any purpose unrelated to legitimate real estate business activities',
          'Sublicense, resell, or commercialize access to the Service without Reamo\'s prior written consent',
          'Create competing products or services using Reamo\'s proprietary methods, algorithms, or confidential information',
          'Process data of minors or sensitive personal data categories without appropriate legal basis and safeguards',
          'Engage in discriminatory practices in housing or real estate that violate the Fair Housing Act or applicable state law',
        ]} />
        <LegalP>
          Reamo reserves the right to investigate suspected violations and take appropriate action,
          including suspension, termination, and reporting to law enforcement or regulatory
          authorities.
        </LegalP>
      </LegalSection>

      <LegalSection heading="11. AI Features and Automated Processing">
        <LegalSubSection heading="11.1 Nature of AI Output">
          <LegalP>
            Reamo&apos;s AI features use large language models and automated processing to generate
            summaries, drafts, suggestions, and workflows. AI-generated output may contain errors,
            omissions, or inaccuracies. AI output is not legal, financial, real estate, or
            professional advice. You are solely responsible for reviewing and approving all
            AI-generated content before it is used, sent, or acted upon.
          </LegalP>
        </LegalSubSection>
        <LegalSubSection heading="11.2 No Guarantee of Accuracy">
          <LegalP>
            Reamo does not warrant that AI-generated transcripts, summaries, or follow-up content are
            accurate, complete, or appropriate for any particular purpose. You must not rely on AI
            output for material business decisions without independent verification.
          </LegalP>
        </LegalSubSection>
        <LegalSubSection heading="11.3 Human Review Responsibility">
          <LegalP>
            For any automated workflow that sends messages to End Users, you bear sole responsibility
            for ensuring message content is accurate, compliant, and appropriate. Enabling automated
            sending without review does not relieve you of this responsibility.
          </LegalP>
        </LegalSubSection>
        <LegalSubSection heading="11.4 Real Estate Regulatory Compliance">
          <LegalP>
            Certain AI-generated content or automated communications may be subject to real estate
            industry regulations, including those administered by state real estate commissions, the
            National Association of Realtors, and the Consumer Financial Protection Bureau.
            Compliance with applicable real estate advertising, disclosure, and fair housing
            regulations is your sole responsibility.
          </LegalP>
        </LegalSubSection>
        <LegalSubSection heading="11.5 Third-Party AI Models">
          <LegalP>
            Reamo&apos;s AI features may be powered in whole or in part by third-party AI model providers.
            Your Client Data may be processed by such providers subject to Reamo&apos;s data processing
            agreements with them. Reamo will not share your Client Data with third-party AI providers
            in a manner that permits those providers to train their models on your identifiable data
            without your consent.
          </LegalP>
        </LegalSubSection>
      </LegalSection>

      <LegalSection heading="12. Third-Party Services and Integrations">
        <LegalP>
          The Service integrates with or links to third-party services, including VoIP providers, CRM
          platforms, payment processors, AI model providers, and messaging carriers. Reamo does not
          control these services and is not responsible for their terms, privacy practices,
          availability, or performance.
        </LegalP>
        <LegalP>
          Your use of third-party services in connection with Reamo is governed by the applicable
          third-party terms. You are responsible for maintaining your own agreements and compliance
          obligations with all third-party services you connect to Reamo. Reamo may change, suspend,
          or discontinue integrations with any third-party service at any time without liability.
        </LegalP>
      </LegalSection>

      <LegalSection heading="13. Disclaimers and Warranties">
        <LegalP>
          THE SERVICE IS PROVIDED &ldquo;AS IS&rdquo; AND &ldquo;AS AVAILABLE&rdquo; WITHOUT WARRANTIES OF ANY KIND,
          EITHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO IMPLIED WARRANTIES OF
          MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, NON-INFRINGEMENT, AND UNINTERRUPTED OR
          ERROR-FREE OPERATION.
        </LegalP>
        <LegalP>
          Reamo does not warrant that (a) the Service will meet your specific requirements, (b) the
          Service will be available at all times or free of errors or defects, (c) AI-generated
          content will be accurate or suitable for your purposes, or (d) any defects will be
          corrected within a specific timeframe.
        </LegalP>
        <LegalP>
          No advice or information obtained from Reamo or through the Service creates any warranty
          not expressly stated in these Terms.
        </LegalP>
      </LegalSection>

      <LegalSection heading="14. Limitation of Liability">
        <LegalP>
          TO THE FULLEST EXTENT PERMITTED BY APPLICABLE LAW, IN NO EVENT SHALL REAMO, ITS OFFICERS,
          DIRECTORS, EMPLOYEES, AGENTS, OR LICENSORS BE LIABLE FOR ANY INDIRECT, INCIDENTAL,
          SPECIAL, CONSEQUENTIAL, EXEMPLARY, OR PUNITIVE DAMAGES, INCLUDING BUT NOT LIMITED TO LOSS
          OF PROFITS, LOSS OF DATA, BUSINESS INTERRUPTION, LOSS OF GOODWILL, OR COST OF SUBSTITUTE
          SERVICES, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGES.
        </LegalP>
        <LegalP>
          REAMO&apos;S TOTAL AGGREGATE LIABILITY TO YOU FOR ALL CLAIMS ARISING UNDER THESE TERMS OR
          RELATED TO THE SERVICE SHALL NOT EXCEED THE GREATER OF (A) THE TOTAL FEES PAID BY YOU TO
          REAMO IN THE TWELVE (12) MONTHS IMMEDIATELY PRECEDING THE EVENT GIVING RISE TO THE CLAIM,
          OR (B) ONE HUNDRED DOLLARS ($100).
        </LegalP>
        <LegalP>
          The limitations in this Section apply regardless of the theory of liability (contract, tort,
          strict liability, or otherwise) and survive any failure of essential purpose. Some
          jurisdictions do not allow certain limitations; in such jurisdictions, liability is limited
          to the maximum extent permitted by law.
        </LegalP>
      </LegalSection>

      <LegalSection heading="15. Indemnification">
        <LegalP>
          You agree to indemnify, defend (with counsel reasonably acceptable to Reamo), and hold
          harmless Reamo and its affiliates, officers, directors, employees, and agents from and
          against any and all claims, liabilities, damages, losses, penalties, fines, and expenses
          (including reasonable attorneys&apos; fees) arising out of or relating to:
        </LegalP>
        <LegalList items={[
          'Your use of the Service in violation of these Terms',
          'Your violation of any applicable law or regulation, including TCPA, CIPA, or state telemarketing and do-not-call laws',
          'Your SMS, email, or telephone communications to End Users',
          'Your Client Data or any data you submit to the Service',
          'Your infringement of any third-party intellectual property or privacy rights',
          'Any dispute between you and an End User or third party arising from your use of the Service',
          'Your violation of the Fair Housing Act or applicable state fair housing laws',
        ]} />
        <LegalP>
          Reamo reserves the right, at its own expense, to assume exclusive defense of any matter
          subject to indemnification by you, in which case you agree to cooperate fully with
          Reamo&apos;s defense.
        </LegalP>
      </LegalSection>

      <LegalSection heading="16. Suspension and Termination">
        <LegalSubSection heading="16.1 Cancellation by You">
          <LegalP>
            You may cancel your subscription at any time through your Account settings or by
            contacting{' '}
            <a href="mailto:legal@reamo.ai" className="text-accent hover:underline">legal@reamo.ai</a>.
            Cancellation takes effect at the end of your current billing period. You retain access
            through the end of your paid period. No pro-rated refunds are issued upon cancellation
            unless required by Section 5.3.
          </LegalP>
        </LegalSubSection>
        <LegalSubSection heading="16.2 Suspension or Termination by Reamo">
          <LegalP>
            Reamo may suspend or terminate your Account immediately and without prior notice if: (a)
            you materially breach these Terms and fail to cure such breach within 7 days of written
            notice (or immediately for SMS/telemarketing violations, payment fraud, or security
            incidents); (b) continued access poses a security or legal risk to Reamo or other users;
            (c) required by applicable law, court order, or carrier policy; or (d) your account has
            been inactive for 12 consecutive months following subscription expiration.
          </LegalP>
        </LegalSubSection>
        <LegalSubSection heading="16.3 Effect of Termination">
          <LegalP>
            Upon termination, your right to access the Service ceases immediately. Sections that by
            their nature should survive termination will survive, including Sections 8.5, 9, 13, 14,
            15, and 17.
          </LegalP>
        </LegalSubSection>
      </LegalSection>

      <LegalSection heading="17. Dispute Resolution and Arbitration">
        <LegalSubSection heading="17.1 Informal Resolution">
          <LegalP>
            Before initiating formal proceedings, the parties agree to attempt good-faith negotiation
            to resolve any dispute for at least 30 days following written notice of the dispute to{' '}
            <a href="mailto:legal@reamo.ai" className="text-accent hover:underline">legal@reamo.ai</a>.
          </LegalP>
        </LegalSubSection>
        <LegalSubSection heading="17.2 Binding Arbitration">
          <LegalP>
            If the parties cannot resolve the dispute informally, all disputes arising out of or
            relating to these Terms or the Service shall be resolved by binding individual arbitration
            administered by the American Arbitration Association (AAA) under its Commercial
            Arbitration Rules, with one arbitrator. The seat of arbitration shall be Wilmington,
            Delaware. The arbitrator&apos;s decision shall be final and binding. Judgment on the award may
            be entered in any court of competent jurisdiction.
          </LegalP>
        </LegalSubSection>
        <LegalSubSection heading="17.3 Class Action Waiver">
          <LegalP>
            YOU AND REAMO AGREE THAT EACH MAY BRING CLAIMS AGAINST THE OTHER ONLY IN YOUR OR ITS
            INDIVIDUAL CAPACITY AND NOT AS A PLAINTIFF OR CLASS MEMBER IN ANY CLASS, CONSOLIDATED,
            OR REPRESENTATIVE PROCEEDING. THE ARBITRATOR MAY NOT CONSOLIDATE MORE THAN ONE
            PERSON&apos;S CLAIMS AND MAY NOT PRESIDE OVER ANY FORM OF CLASS OR REPRESENTATIVE PROCEEDING.
          </LegalP>
        </LegalSubSection>
        <LegalSubSection heading="17.4 Exceptions to Arbitration">
          <LegalP>
            Either party may seek emergency injunctive or other equitable relief in a court of
            competent jurisdiction to prevent irreparable harm pending arbitration, without waiving
            the right to arbitrate the underlying dispute. Claims arising from intellectual property
            infringement or misappropriation of trade secrets are not subject to mandatory
            arbitration.
          </LegalP>
        </LegalSubSection>
        <LegalSubSection heading="17.5 Opt-Out">
          <LegalP>
            You may opt out of the arbitration provision by sending written notice to{' '}
            <a href="mailto:legal@reamo.ai" className="text-accent hover:underline">legal@reamo.ai</a>{' '}
            within 30 days of first accepting these Terms. Your notice must include your name,
            Account email, and a statement that you opt out of arbitration. Your opt-out does not
            affect any prior agreement to arbitrate.
          </LegalP>
        </LegalSubSection>
        <LegalSubSection heading="17.6 Arbitration Fees">
          <LegalP>
            AAA filing fees will be allocated in accordance with AAA Commercial Rules. For claims
            below $10,000, Reamo will pay all AAA filing and arbitration fees unless the arbitrator
            determines the claim was frivolous.
          </LegalP>
        </LegalSubSection>
      </LegalSection>

      <LegalSection heading="18. Governing Law and Jurisdiction">
        <LegalP>
          These Terms are governed by the laws of the State of Delaware, without regard to its
          conflict-of-law principles. For disputes not subject to arbitration under Section 17, the
          parties consent to exclusive jurisdiction and venue in the state and federal courts located
          in Wilmington, Delaware.
        </LegalP>
        <LegalP>
          The United Nations Convention on Contracts for the International Sale of Goods does not
          apply to these Terms.
        </LegalP>
      </LegalSection>

      <LegalSection heading="19. Changes to These Terms">
        <LegalP>
          Reamo may update these Terms at any time. For material changes, Reamo will provide at least
          30 days&apos; advance notice via email to your registered address or in-app notification before
          the changes take effect. For non-material changes (e.g., clarifications, corrections, new
          feature descriptions), Reamo may update these Terms without advance notice by posting the
          revised version and updating the effective date.
        </LegalP>
        <LegalP>
          Your continued use of the Service after the effective date of updated Terms constitutes
          your acceptance of the changes. If you do not agree to updated Terms, you must cancel your
          subscription before the effective date.
        </LegalP>
      </LegalSection>

      <LegalSection heading="20. Miscellaneous">
        <LegalSubSection heading="20.1 Entire Agreement">
          <LegalP>
            These Terms, together with the Privacy Policy and any order forms or written agreements
            separately executed between the parties, constitute the entire agreement between you and
            Reamo with respect to the Service and supersede all prior agreements, representations,
            and understandings.
          </LegalP>
        </LegalSubSection>
        <LegalSubSection heading="20.2 Severability">
          <LegalP>
            If any provision of these Terms is found invalid or unenforceable, that provision will be
            modified to the minimum extent necessary to make it enforceable, and the remaining
            provisions will continue in full force and effect.
          </LegalP>
        </LegalSubSection>
        <LegalSubSection heading="20.3 Waiver">
          <LegalP>
            Reamo&apos;s failure to enforce any right or provision of these Terms in any instance is not a
            waiver of that right or provision in the future.
          </LegalP>
        </LegalSubSection>
        <LegalSubSection heading="20.4 Assignment">
          <LegalP>
            You may not assign or transfer any rights or obligations under these Terms without
            Reamo&apos;s prior written consent. Reamo may assign these Terms in connection with a merger,
            acquisition, corporate reorganization, or sale of all or substantially all of its assets
            without your consent, provided the assignee assumes all obligations under these Terms.
          </LegalP>
        </LegalSubSection>
        <LegalSubSection heading="20.5 Force Majeure">
          <LegalP>
            Neither party is liable for delays or failures in performance resulting from causes beyond
            their reasonable control, including acts of God, natural disasters, cyberattacks,
            government actions, strikes, carrier network failures, or third-party platform outages,
            provided the affected party provides prompt notice and uses reasonable efforts to resume
            performance.
          </LegalP>
        </LegalSubSection>
        <LegalSubSection heading="20.6 Notices">
          <LegalP>
            Reamo may provide notices to you via email to your registered address, in-app
            notification, or by posting to the Reamo website. Notices to Reamo must be sent to{' '}
            <a href="mailto:legal@reamo.ai" className="text-accent hover:underline">legal@reamo.ai</a>.
            Legal service of process must be directed to Reamo&apos;s registered agent in Delaware.
          </LegalP>
        </LegalSubSection>
        <LegalSubSection heading="20.7 No Third-Party Beneficiaries">
          <LegalP>
            These Terms are for the benefit of the contracting parties only and do not create any
            rights, obligations, or remedies in third parties.
          </LegalP>
        </LegalSubSection>
        <LegalSubSection heading="20.8 Relationship of the Parties">
          <LegalP>
            The parties are independent contractors. Nothing in these Terms creates a partnership,
            joint venture, employment, franchise, or agency relationship between you and Reamo.
          </LegalP>
        </LegalSubSection>
        <LegalSubSection heading="20.9 Export Compliance">
          <LegalP>
            You agree to comply with all applicable U.S. and international export control laws and
            regulations in connection with your use of the Service.
          </LegalP>
        </LegalSubSection>
        <LegalSubSection heading="20.10 Language">
          <LegalP>
            These Terms are written in English. To the extent any translated version conflicts with
            the English version, the English version controls.
          </LegalP>
        </LegalSubSection>
      </LegalSection>

      <LegalSection heading="Contact Information">
        <LegalP>For questions about these Terms, data requests, or legal notices:</LegalP>
        <LegalList items={[
          'Legal / Notices: legal@reamo.ai',
          'Support: support@reamo.ai',
          'Website: reamo.ai',
        ]} />
      </LegalSection>

      <div className="border-t border-[var(--color-border)] pt-6 text-xs text-primary">
        © 2026 Reamo, LLC. All rights reserved. Terms of Service. Effective May 9, 2026.
      </div>

    </LegalPage>
  );
}
