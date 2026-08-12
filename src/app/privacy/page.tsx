import React from 'react';
import '../legal.css';

export const metadata = {
  title: 'Privacy Policy | 10 Minute School Study Abroad',
  description: 'How 10 Minute School Study Abroad collects, uses, and protects your personal information.',
};

export default function PrivacyPage() {
  return (
    <div className="legal-page">
      <div className="container">
        <div className="legal-content">
          <h1>Privacy Policy</h1>
          <p className="legal-updated">Last updated: August 2026</p>

          <section>
            <h2>1. Information We Collect</h2>
            <p>
              When you use our destination quiz, book a counseling session, or contact us, we may collect
              information such as your name, phone number, email address, academic background, and study
              preferences. We only collect what's needed to give you relevant guidance.
            </p>
          </section>

          <section>
            <h2>2. How We Use Your Information</h2>
            <ul>
              <li>To match you with suitable countries, universities, and programs</li>
              <li>To connect you with our counseling team for follow-up support</li>
              <li>To send you updates about your application or program you've shown interest in</li>
              <li>To improve our destination-matching quiz and website experience</li>
            </ul>
          </section>

          <section>
            <h2>3. How We Protect Your Information</h2>
            <p>
              We take reasonable technical and organizational measures to protect your personal data from
              unauthorized access, alteration, or disclosure. Access to your information is limited to team
              members who need it to assist you.
            </p>
          </section>

          <section>
            <h2>4. Sharing Your Information</h2>
            <p>
              We do not sell your personal information. We may share your details with partner universities
              or scholarship bodies only with your consent, when relevant to an application you're pursuing.
            </p>
          </section>

          <section>
            <h2>5. Cookies</h2>
            <p>
              We use cookies and local storage to remember preferences such as your selected language, and
              to understand how visitors use our site so we can improve it.
            </p>
          </section>

          <section>
            <h2>6. Your Rights</h2>
            <p>
              You can request access to, correction of, or deletion of your personal data at any time by
              contacting us at <a href="mailto:support@10minuteschool.com">support@10minuteschool.com</a>.
            </p>
          </section>

          <section>
            <h2>7. Contact Us</h2>
            <p>
              If you have questions about this Privacy Policy, email us at{' '}
              <a href="mailto:support@10minuteschool.com">support@10minuteschool.com</a>.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
