"use client";

import React, { useEffect, useLayoutEffect, useState } from 'react';
import Link from 'next/link';
import { Globe } from '@phosphor-icons/react';
import './Navbar.css';

export default function Navbar() {
  // Starts at the same default the server rendered ('en' — the server has
  // no localStorage), then corrects from the data-lang attribute (set
  // before first paint by layout.tsx's no-flash script, same source the
  // matcher AppProvider reads) in a layout effect, once hydration is done.
  // Reading that attribute during the initial render instead would make
  // the client's first hydration pass disagree with the server-rendered
  // HTML and throw a hydration mismatch.
  const [lang, setLang] = useState('en');

  useLayoutEffect(() => {
    const attr = document.documentElement.getAttribute('data-lang');
    if (attr && attr !== lang) setLang(attr);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Re-sync when language is toggled from elsewhere (e.g. the matcher's own
  // toggle inside the homepage hero) — Navbar's toggle isn't the only writer.
  useEffect(() => {
    const handleLangChange = () => {
      const updated = localStorage.getItem('lang');
      if (updated) setLang(updated);
    };
    window.addEventListener('langChange', handleLangChange);
    return () => window.removeEventListener('langChange', handleLangChange);
  }, []);

  const toggleLang = () => {
    const nextLang = lang === 'en' ? 'bn' : 'en';
    setLang(nextLang);
    localStorage.setItem('lang', nextLang);
    window.dispatchEvent(new Event('langChange'));
  };

  return (
    <header className="navbar">
      <div className="container navbar-container">
        <Link href="/" className="logo">
          <img
            src="/logo.png"
            alt="10 Minute School Study Abroad"
            height={32}
            className="logo-img"
          />
        </Link>

        <div className="nav-actions">
          <button onClick={toggleLang} className="lang-toggle bn" aria-label="Switch language">
            <Globe size={16} weight="bold" />
            <span>{lang === 'bn' ? 'English' : 'বাংলা'}</span>
          </button>
        </div>
      </div>
    </header>
  );
}
