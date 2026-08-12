import React from 'react';
import Link from 'next/link';
import { FacebookLogo } from '@phosphor-icons/react/ssr';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-container">
        <div className="footer-brand">
          <Link href="/">
            <img
              src="/logo-dark.png"
              alt="10 Minute School Study Abroad"
              className="footer-logo"
            />
          </Link>
          <p className="footer-desc">
            Your trusted partner in navigating the path to higher education overseas.
          </p>
          <a
            href="https://www.facebook.com/10ms.ielts/"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-social-link"
            aria-label="10 Minute School Study Abroad on Facebook"
          >
            <FacebookLogo size={22} weight="fill" />
          </a>
        </div>
        
        <div className="footer-links-grid">
          <div className="footer-col">
            <h3>Support</h3>
            <Link href="/privacy">Privacy Policy</Link>
            <Link href="/terms">Terms of Service</Link>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} 10 Minute School. All rights reserved.</p>
      </div>
    </footer>
  );
}
