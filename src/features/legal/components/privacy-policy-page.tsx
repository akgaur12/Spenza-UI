import { SITE_LINKS } from '@/config'
import { LegalPageLayout } from '@/features/legal/components/legal-page-layout'

export function PrivacyPolicyPage() {
  return (
    <LegalPageLayout title="Privacy Policy" lastUpdated="August 2, 2026">
      <section>
        <h2>1. Data We Collect</h2>
        <p>
          When you create an account, we collect your full name, username, and email address. When you use Spenza,
          we collect the expense data you enter — including amounts, categories, dates, and descriptions. We do not
          collect payment information or any financial account credentials.
        </p>
      </section>

      <section>
        <h2>2. How We Use Your Data</h2>
        <p>
          Your data is used solely to provide the Spenza service — displaying your expenses, generating summaries
          and analytics, and letting you manage your records. We do not use your data for advertising, profiling, or
          any purpose beyond operating the app.
        </p>
      </section>

      <section>
        <h2>3. Data Storage</h2>
        <p>
          Your data is stored securely on our servers. We use standard security practices, including encrypted
          sessions and hashed passwords, to protect it from unauthorised access. You can delete your account at any
          time, which will permanently remove all your data from our systems.
        </p>
      </section>

      <section>
        <h2>4. Your Rights</h2>
        <p>
          You can access, update, or export your expense data at any time from within Spenza, including as a CSV or
          XLSX file. If you no longer want to use Spenza, you can permanently delete your account and all associated
          data from your account settings — no need to contact us first.
        </p>
      </section>

      <section>
        <h2>5. Third-Party Services</h2>
        <p>
          Spenza does not sell or share your personal data with third parties. We may use third-party
          infrastructure providers (such as hosting and email delivery services) to operate the app, but these
          providers are contractually bound to keep your data confidential and not use it for their own purposes.
        </p>
      </section>

      <section>
        <h2>6. Children's Privacy</h2>
        <p>
          Spenza is not directed at children and is not intended for use by anyone under the age of 16. We do not
          knowingly collect personal data from children. If you believe a child has provided us with personal data,
          please contact us and we will remove it.
        </p>
      </section>

      <section>
        <h2>7. Changes to This Policy</h2>
        <p>
          We may update this Privacy Policy from time to time to reflect changes to Spenza or applicable law. If we
          make material changes, we will update the "Last updated" date above and, where appropriate, notify you
          directly.
        </p>
      </section>

      <section>
        <h2>8. Contact Us</h2>
        <p>
          If you have any questions about this Privacy Policy or how your data is handled, please reach out to us
          at <a href={`mailto:${SITE_LINKS.privacyEmail}`}>{SITE_LINKS.privacyEmail}</a>. We will respond as soon as
          possible.
        </p>
      </section>
    </LegalPageLayout>
  )
}
