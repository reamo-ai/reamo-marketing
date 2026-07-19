import LegalPage, { LegalSection, LegalSubSection, LegalList, LegalP } from '@/components/LegalPage';

export const metadata = {
  title: 'Information Security Policy | Reamo',
  alternates: { canonical: '/information-security-policy' },
};

export default function InformationSecurityPolicy() {
  return (
    <LegalPage title="Information Security Policy" effectiveDate="July 15, 2026">

      <LegalP>
        This Information Security Policy describes the administrative, technical, and physical
        safeguards Reamo maintains to protect the information entrusted to us. Version 1.0.
      </LegalP>

      <LegalSection heading="1. Purpose">
        <LegalP>
          Reamo, LLC (&ldquo;Reamo,&rdquo; &ldquo;we,&rdquo; &ldquo;us&rdquo;) provides an AI-powered middle-office platform
          for real estate professionals. Our platform processes sensitive information, including
          client call audio, transcripts, contact records, and transaction details. This Information
          Security Policy describes the administrative, technical, and physical safeguards Reamo
          maintains to protect the confidentiality, integrity, and availability of that information.
        </LegalP>
        <LegalP>
          This policy reflects our commitment to handling customer and client data responsibly and
          forms the basis of the security practices referenced in our{' '}
          <a href="/terms-of-service">Terms of Service</a> and{' '}
          <a href="/privacy-policy">Privacy Policy</a>.
        </LegalP>
      </LegalSection>

      <LegalSection heading="2. Scope">
        <LegalP>
          This policy applies to all Reamo information systems, production infrastructure, source
          code, and data processed by the Reamo platform, and to all personnel, contractors, and
          service providers who access Reamo systems or data. It covers data in all states — in
          transit, in use, and at rest.
        </LegalP>
      </LegalSection>

      <LegalSection heading="3. Security Governance">
        <LegalP>
          Security is owned at the leadership level of Reamo. Reamo maintains a designated security
          point of contact responsible for the implementation, maintenance, and periodic review of
          this policy. Security responsibilities include risk assessment, control implementation,
          vendor oversight, incident response, and enforcement of the standards described below. This
          policy is reviewed at least annually and updated when material changes to our systems,
          services, or regulatory obligations occur.
        </LegalP>
      </LegalSection>

      <LegalSection heading="4. Data Classification">
        <LegalP>Reamo classifies data to ensure appropriate handling:</LegalP>
        <LegalList items={[
          'Sensitive / Confidential — client call audio and transcripts, personally identifiable information (PII), contact and transaction records, and authentication credentials. This data receives the highest level of protection.',
          'Internal — operational, configuration, and business data not intended for public disclosure.',
          'Public — information intentionally made available to the public, such as marketing content.',
        ]} />
        <LegalP>
          Handling, access, and retention controls are applied according to classification, with the
          strictest controls applied to Sensitive/Confidential data.
        </LegalP>
      </LegalSection>

      <LegalSection heading="5. Access Control">
        <LegalP>
          Reamo enforces the principle of least privilege. Access to production systems and customer
          data is restricted to authorized personnel who require it to perform their duties. Controls
          include:
        </LegalP>
        <LegalList items={[
          'Role-based access control (RBAC) scoped to job function.',
          'Multi-factor authentication (MFA) required for administrative and production system access.',
          'Unique, individually attributable accounts — no shared credentials.',
          'Prompt revocation of access upon role change or separation.',
          'Periodic review of access rights.',
        ]} />
        <LegalP>
          Customers control their own account access and are responsible for safeguarding their
          credentials and managing user permissions within their organization.
        </LegalP>
      </LegalSection>

      <LegalSection heading="6. Encryption">
        <LegalP>Reamo encrypts Sensitive/Confidential data both in transit and at rest:</LegalP>
        <LegalList items={[
          'In transit: All data transmitted between clients, Reamo services, and integrated third parties is encrypted using TLS 1.2 or higher.',
          'At rest: Stored data, including call recordings, transcripts, and database contents, is encrypted using industry-standard algorithms (e.g., AES-256).',
        ]} />
        <LegalP>
          Encryption keys are managed through the key-management services of our infrastructure
          providers and are restricted to authorized systems and personnel.
        </LegalP>
      </LegalSection>

      <LegalSection heading="7. Infrastructure and Network Security">
        <LegalP>
          Reamo operates on enterprise-grade cloud infrastructure. Production environments are
          logically separated from development and testing environments. Network-level controls,
          firewalls, and security groups restrict traffic to only what is necessary. Administrative
          access to infrastructure requires authentication, is limited to authorized personnel, and
          is logged.
        </LegalP>
      </LegalSection>

      <LegalSection heading="8. Application Security">
        <LegalP>Security is integrated into Reamo&apos;s software development lifecycle:</LegalP>
        <LegalList items={[
          'Code changes are reviewed before deployment to production.',
          'Dependencies are monitored and updated to address known vulnerabilities.',
          'Secrets and credentials are stored in secured secret-management systems, never in source code.',
          'Production and non-production environments are segregated, and non-production environments do not use live customer data except where necessary and appropriately protected.',
        ]} />
      </LegalSection>

      <LegalSection heading="9. Third-Party and Sub-Processor Management">
        <LegalP>
          Reamo relies on a limited set of trusted service providers to deliver its platform. We
          evaluate the security posture of providers that process customer data and require them to
          maintain safeguards consistent with this policy. Reamo&apos;s sub-processors include providers
          of cloud hosting and infrastructure, voice transcription, telephony and messaging, email and
          calendar connectivity, payment processing, and data storage. A current list of sub-processors
          is available upon request.
        </LegalP>
        <LegalP>
          Reamo does not sell, rent, or share customer or client data with third parties for their own
          marketing or independent use.
        </LegalP>
      </LegalSection>

      <LegalSection heading="10. Data Retention and Disposal">
        <LegalP>
          Reamo retains customer and client data only as long as necessary to provide the service or
          as required by law. Specific retention periods — including for call recordings, transcripts,
          AI-generated summaries, and contact records — are described in our{' '}
          <a href="/privacy-policy">Privacy Policy</a>. Customers may export or request deletion of
          their data at any time. Upon account termination or a valid deletion request, Reamo deletes
          or de-identifies the associated data within the periods described in our Privacy Policy,
          subject to legal retention obligations. Media and storage are disposed of using secure
          methods provided by our infrastructure providers.
        </LegalP>
      </LegalSection>

      <LegalSection heading="11. Customer Data Ownership and Rights">
        <LegalP>
          Customers own their data. Reamo processes customer and client data solely to provide and
          improve the service on the customer&apos;s behalf and in accordance with our Privacy Policy.
          Customers may access, export, or delete their data. Reamo supports applicable data-subject
          rights, including those under the California Consumer Privacy Act (CCPA) and, where
          applicable, the EU/UK General Data Protection Regulation (GDPR).
        </LegalP>
      </LegalSection>

      <LegalSection heading="12. Logging and Monitoring">
        <LegalP>
          Reamo maintains logging and monitoring of production systems to detect and respond to
          anomalous or unauthorized activity. Security-relevant events are recorded, and logs are
          protected against unauthorized access and tampering. Reamo reviews monitoring signals to
          support timely detection of potential security incidents.
        </LegalP>
      </LegalSection>

      <LegalSection heading="13. Vulnerability and Patch Management">
        <LegalP>
          Reamo monitors its systems and dependencies for known vulnerabilities and applies security
          updates in a timely, risk-prioritized manner. Critical vulnerabilities are remediated on an
          expedited basis. Reamo periodically assesses its environment for security weaknesses and
          addresses identified issues according to severity.
        </LegalP>
      </LegalSection>

      <LegalSection heading="14. Incident Response and Breach Notification">
        <LegalP>
          Reamo maintains an incident response process to identify, contain, investigate, and
          remediate security incidents. In the event of a confirmed data breach affecting customer or
          client data, Reamo will notify affected customers without undue delay and consistent with
          applicable legal requirements — and, consistent with our Privacy Policy, in no event more
          than 72 hours after confirmation where practicable — and will provide information about the
          nature of the incident and the steps taken in response.
        </LegalP>
        <LegalP>
          Security concerns or suspected vulnerabilities can be reported to{' '}
          <a href="mailto:support@reamo.ai">support@reamo.ai</a>.
        </LegalP>
      </LegalSection>

      <LegalSection heading="15. Business Continuity and Backup">
        <LegalP>
          Reamo maintains regular backups of critical data and leverages the resiliency and redundancy
          of its cloud infrastructure providers to support availability. Backup and recovery practices
          are designed to enable restoration of service and data following a disruption.
        </LegalP>
      </LegalSection>

      <LegalSection heading="16. Personnel Security">
        <LegalP>
          Personnel and contractors with access to Reamo systems are bound by confidentiality
          obligations and are expected to comply with this policy and Reamo&apos;s acceptable-use
          standards. Reamo provides security awareness guidance to those with access to sensitive
          systems and data, and access is granted based on role and business need.
        </LegalP>
      </LegalSection>

      <LegalSection heading="17. Physical Security">
        <LegalP>
          Reamo&apos;s production systems are hosted in the facilities of established cloud
          infrastructure providers that maintain robust physical security controls, including access
          restrictions, environmental protections, and 24/7 monitoring. Reamo does not operate its own
          data centers.
        </LegalP>
      </LegalSection>

      <LegalSection heading="18. Compliance">
        <LegalP>
          Reamo&apos;s security program is designed to align with widely recognized security and privacy
          standards and applicable laws, including the CCPA and, where applicable, the GDPR. Reamo does
          not currently hold a formal security certification and does not claim one. As the company
          matures, Reamo expects to pursue formal attestations such as SOC 2.
        </LegalP>
      </LegalSection>

      <LegalSection heading="19. Policy Review">
        <LegalP>
          This policy is reviewed at least annually and whenever significant changes to Reamo&apos;s
          systems, services, or regulatory environment warrant. Updates are published on this page with
          a revised effective date and version.
        </LegalP>
      </LegalSection>

      <LegalSection heading="Contact">
        <LegalP>
          Questions about this policy or Reamo&apos;s security practices can be directed to{' '}
          <a href="mailto:support@reamo.ai">support@reamo.ai</a>.
        </LegalP>
      </LegalSection>

      <div className="border-t border-[var(--color-border)] pt-6 text-xs text-primary">
        © 2026 Reamo, LLC. All rights reserved. Information Security Policy. Version 1.0. Effective
        July 15, 2026.
      </div>

    </LegalPage>
  );
}
