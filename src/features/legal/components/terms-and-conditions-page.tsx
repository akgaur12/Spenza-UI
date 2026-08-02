import { SITE_LINKS } from '@/config'
import { LegalPageLayout } from '@/features/legal/components/legal-page-layout'

export function TermsAndConditionsPage() {
  return (
    <LegalPageLayout title="Terms and Conditions" lastUpdated="August 2, 2026">
      <section>
        <h2>1. Acceptance of Terms</h2>
        <p>
          By accessing or using Spenza, you agree to be bound by these Terms and Conditions. If you do not agree to
          these terms, please do not use the service.
        </p>
      </section>

      <section>
        <h2>2. Account Eligibility & Registration</h2>
        <p>
          You must be at least 16 years old to use Spenza. When creating an account, you agree to provide accurate
          and complete information and to keep your credentials confidential. You are responsible for all activity
          that occurs under your account.
        </p>
      </section>

      <section>
        <h2>3. Use of Service</h2>
        <p>
          Spenza is a personal expense tracking tool intended for individual use. You agree to use the service only
          for lawful purposes and in a manner that does not infringe the rights of others. You are responsible for
          maintaining the confidentiality of your account credentials.
        </p>
      </section>

      <section>
        <h2>4. Prohibited Conduct</h2>
        <p>
          You agree not to misuse Spenza — including attempting to gain unauthorised access to other accounts or our
          systems, reverse-engineering or scraping the app, or using it to store or transmit unlawful content. We
          may suspend or terminate access for any violation of these restrictions.
        </p>
      </section>

      <section>
        <h2>5. User Data</h2>
        <p>
          The expense data you enter into Spenza is yours. We do not sell or share your personal financial data
          with third parties. You can delete your account and associated data at any time. We take reasonable steps
          to protect your data, but we cannot guarantee absolute security.
        </p>
      </section>

      <section>
        <h2>6. Termination</h2>
        <p>
          You may stop using Spenza and delete your account at any time. We may suspend or terminate your account if
          you violate these Terms or misuse the service. Upon termination, your right to use Spenza ends
          immediately, though you may still request deletion of your data as described in our Privacy Policy.
        </p>
      </section>

      <section>
        <h2>7. Limitations of Liability</h2>
        <p>
          Spenza is provided "as is" without warranties of any kind. We are not liable for any inaccuracies in
          expense tracking, data loss, or any financial decisions you make based on information displayed in the
          app. Your use of the service is at your own risk.
        </p>
      </section>

      <section>
        <h2>8. Governing Law</h2>
        <p>
          These Terms are governed by the laws of India, without regard to conflict of law principles. Any disputes
          arising from these Terms or your use of Spenza will be subject to the exclusive jurisdiction of the courts
          located in India.
        </p>
      </section>

      <section>
        <h2>9. Changes to Terms</h2>
        <p>
          We may update these Terms and Conditions from time to time. Continued use of Spenza after changes are
          posted constitutes your acceptance of the revised terms. We encourage you to review this page
          periodically.
        </p>
      </section>

      <section>
        <h2>10. Contact Us</h2>
        <p>
          If you have any questions about these Terms and Conditions, please reach out to us at{' '}
          <a href={`mailto:${SITE_LINKS.legalEmail}`}>{SITE_LINKS.legalEmail}</a>. We will respond as soon as
          possible.
        </p>
      </section>
    </LegalPageLayout>
  )
}
