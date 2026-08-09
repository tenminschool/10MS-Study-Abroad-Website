"use client";

import { useState } from 'react';
import Link from 'next/link';
import { AppProvider, useApp } from '../matcher/app/providers';
import { Skyline } from '../matcher/components/Skyline';
import { FlightMap } from '../matcher/components/FlightMap';
import { CONFIG } from '../matcher/config';
import { DESTINATIONS } from '../matcher/engine/match';
import { UNIVERSITY_COUNT } from '../matcher/engine/universities';
import { num } from '../matcher/lib/format';
import '../matcher/styles/matcher.css';

// The matcher project's homepage hero, ported wholesale (headline, CTAs,
// flight-map visual, stats strip, service tiles) so the two CTAs and their
// destination-matcher form (now living at /profile-match) carry over unchanged.
function HeroInner() {
  const { t, lang } = useApp();
  const [logoOk, setLogoOk] = useState(true);

  const bookHref =
    CONFIG.bookingUrl ||
    `https://wa.me/${CONFIG.whatsappNumber}?text=${encodeURIComponent(CONFIG.whatsappMessage[lang])}`;

  return (
    <section className="hero">
      <div className="wrap hero-in">
        <div className="hero-cols">
          <div className="hero-glow" aria-hidden="true" />
          <div className="hero-text">
            <h1 className="display">
              <span>{t('hero.title1')}</span>
              <span className="heavy">{t('hero.title2')}</span>
            </h1>

            <p className="lede">{t('hero.lede')}</p>

            <div className="cta-row">
              <Link href="/profile-match" className="btn btn-primary btn-lg">
                {t('hero.cta')}
                <span className="arrow" aria-hidden="true">→</span>
              </Link>
              <a className="btn btn-ghost btn-lg" href={bookHref} target="_blank" rel="noreferrer">
                {t('btn.bookLong')}
              </a>
            </div>
          </div>

          <div className="hero-visual">
            <div className="hero-visual-glow" aria-hidden="true" />
            {logoOk ? (
              <img src="/hero-landmarks.webp" alt={t('hero.imgAlt')} onError={() => setLogoOk(false)} />
            ) : null}
            <span className="float-chip fc-1">
              <span className="dot" aria-hidden="true" />
              {t('chip.destinations')}
            </span>
            <span className="float-chip fc-2">
              <span className="dot" aria-hidden="true" />
              {t('chip.visa')}
            </span>
            <span className="float-chip fc-3">
              <span className="dot" aria-hidden="true" />
              {t('chip.free')}
            </span>
          </div>
        </div>

        <div className="fm-zone">
          <Skyline />
          <FlightMap />
        </div>
        <p className="map-note">{t('hero.mapNote')}</p>

        <div className="stats">
          <div className="stat">
            <b className="num">{num(DESTINATIONS.length, lang)}</b>
            <span>{t('stat.dest')}</span>
          </div>
          <div className="stat">
            <b className="num">{num(UNIVERSITY_COUNT, lang)}+</b>
            <span>{t('stat.unis')}</span>
          </div>
          <div className="stat">
            <b className="num">{t('stat.time.n')}</b>
            <span>{t('stat.time.l')}</span>
          </div>
          <div className="stat">
            <b className="num">{t('stat.free.n')}</b>
            <span>{t('stat.free.l')}</span>
          </div>
        </div>

        <div className="cta-row" style={{ justifyContent: 'center', marginTop: 'var(--sam-sp-6)' }}>
          <a className="btn btn-primary btn-lg" href={bookHref} target="_blank" rel="noreferrer">
            {t('btn.bookLong')}
            <span className="arrow" aria-hidden="true">→</span>
          </a>
        </div>
      </div>
    </section>
  );
}

export default function HomeHero() {
  return (
    <div className="sam-ui sam-home-hero">
      <AppProvider>
        <HeroInner />
      </AppProvider>
    </div>
  );
}
