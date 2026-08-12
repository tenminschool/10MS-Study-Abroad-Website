import React from 'react';
import '../legal.css';

export const metadata = {
  title: 'Terms of Service | 10 Minute School Study Abroad',
  description: 'The terms and conditions for using 10 Minute School Study Abroad services.',
};

export default function TermsPage() {
  return (
    <div className="legal-page">
      <div className="container">
        <div className="legal-content">
          <h1>Terms of Service</h1>
          <p className="legal-updated">Last updated: August 2026</p>

          <section>
            <h2>1. Acceptance of Terms</h2>
            <p>
              By using the 10 Minute School Study Abroad website, quiz, or counseling services, you agree
              to these Terms of Service. If you do not agree, please do not use our services.
            </p>
          </section>

          <section>
            <h2>2. Our Services</h2>
            <p>
              We provide study-abroad guidance, including a country-matching quiz, destination and university
              information, and free counseling sessions. Our recommendations are informational and meant to
              support — not replace — your own research and the official requirements of universities,
              embassies, and immigration authorities.
            </p>
          </section>

          <section>
            <h2>3. No Guarantee of Admission or Visa</h2>
            <p>
              We do not guarantee admission to any university, scholarship award, or visa approval. Final
              decisions rest with the relevant university and government authorities.
            </p>
          </section>

          <section>
            <h2>4. User Responsibilities</h2>
            <ul>
              <li>Provide accurate information when using the quiz or booking a counseling session</li>
              <li>Use the website only for lawful, personal, non-commercial purposes</li>
              <li>Do not attempt to copy, scrape, or misuse the content on this site</li>
            </ul>
          </section>

          <section>
            <h2>5. Intellectual Property</h2>
            <p>
              All content on this website, including text, graphics, and logos, is the property of 10 Minute
              School and may not be reproduced without permission.
            </p>
          </section>

          <section>
            <h2>6. Changes to These Terms</h2>
            <p>
              We may update these Terms of Service from time to time. Continued use of the website after
              changes are posted means you accept the updated terms.
            </p>
          </section>

          <section>
            <h2>7. Contact Us</h2>
            <p>
              Questions about these terms? Email us at{' '}
              <a href="mailto:support@10minuteschool.com">support@10minuteschool.com</a>.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
