"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import HomeHero from '../components/HomeHero';
import CountryCarousel from '../components/CountryCarousel';
import { Flag } from '../components/Flag';
import { destinations } from '../data/destinations';
import './page.css';

interface CountrySectionProps {
  lang: string;
}

function CountrySection({ lang }: CountrySectionProps) {
  const t = {
    bn: {
      mapHeading: "একটাই পথ, ",
      mapHeadingHighlight: "একাধিক গন্তব্য",
      mapSubheading: "10 Minute School-এর গাইডেন্স নিয়ে শুরু করো বাংলাদেশ থেকে, পছন্দের দেশ ও বিশ্ববিদ্যালয় বেছে নিয়ে নিশ্চিন্তে পড়তে যাও বিদেশে।",
    },
    en: {
      mapHeading: "One path, ",
      mapHeadingHighlight: "multiple destinations",
      mapSubheading: "Start from Bangladesh with 10 Minute School's guidance, select your preferred country and university, and study abroad with confidence.",
    }
  };

  const currentTranslations = lang === 'bn' ? t.bn : t.en;

  return (
    <section className="map-section">
      <div className="container">
        <div className="map-section-heading">
          <h2 className="bn">
            {currentTranslations.mapHeading}
            <span>{currentTranslations.mapHeadingHighlight}</span>
          </h2>
          <p className="bn">{currentTranslations.mapSubheading}</p>
        </div>

        <CountryCarousel lang={lang} />
      </div>
    </section>
  );
}

function TestimonialsSection({ lang }: CountrySectionProps) {
  const t = {
    bn: {
      heading: "শিক্ষার্থীদের অভিজ্ঞতা",
      subheading: "আমাদের সফল শিক্ষার্থীদের স্বপ্ন পূরণের গল্প",
    },
    en: {
      heading: "Student Experiences",
      subheading: "Stories of our successful students turning their dreams into reality",
    }
  };

  const currentTranslations = lang === 'bn' ? t.bn : t.en;

  // One testimonial per country, most-populated destinations first.
  const homeTestimonials = destinations
    .filter((dest) => dest.testimonials && dest.testimonials.length > 0)
    .map((dest) => ({
      ...dest.testimonials[0],
      countryName: dest.name,
      countryFlag: dest.flag_emoji,
    }))
    .slice(0, 3);

  return (
    <section className="success-stories-section">
      <div className="container">
        <div className="stories-header">
          <h2 className="bn">{currentTranslations.heading}</h2>
          <p className="stories-subtitle bn">{currentTranslations.subheading}</p>
        </div>

        <div className="testimonials-grid-new">
          {homeTestimonials.map((testimonial, idx) => {
            const initials = testimonial.name
              .split(' ')
              .map((n: string) => n[0])
              .join('')
              .slice(0, 2)
              .toUpperCase();
            return (
              <div key={idx} className="testimonial-card-restyle">
                <div className="test-card-top-row">
                  <div className="test-avatar-circle">{initials}</div>
                  <div className="test-student-meta">
                    <h4 className="test-student-name">{testimonial.name}</h4>
                    <p className="test-student-uni">{testimonial.university}</p>
                  </div>
                </div>
                <p className="test-card-quote">"{testimonial.quote}"</p>
                <div className="test-card-footer">
                  <span className="test-card-country-badge">
                    <Flag emoji={testimonial.countryFlag} /> {testimonial.countryName}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function FinalCTABand({ lang }: CountrySectionProps) {
  const t = {
    bn: {
      title: "এখনো বুঝতে পারছো না কোথা থেকে শুরু করবে?",
      btn: "কুইজ শুরু করো →",
    },
    en: {
      title: "Still not sure where to start?",
      btn: "Take the quiz →",
    }
  };

  const currentTranslations = lang === 'bn' ? t.bn : t.en;

  return (
    <section className="final-cta-band-green">
      <div className="container final-cta-band-container">
        <h2 className="bn final-cta-band-title">
          {currentTranslations.title}
        </h2>
        <Link href="/quiz" className="btn final-cta-band-btn bn">
          {currentTranslations.btn}
        </Link>
      </div>
    </section>
  );
}

export default function HomeClient() {
  const [lang, setLang] = useState('en');

  // Initialize lang from localStorage and listen to language toggles
  useEffect(() => {
    const saved = localStorage.getItem('lang');
    if (saved) setLang(saved);

    const handleLangChange = () => {
      const updated = localStorage.getItem('lang');
      if (updated) setLang(updated);
    };

    window.addEventListener('langChange', handleLangChange);
    return () => {
      window.removeEventListener('langChange', handleLangChange);
    };
  }, []);

  return (
    <div className="home">
      {/* 1. Hero (ported wholesale from study-abroad-matcher's homepage, incl. both CTAs) */}
      <HomeHero />

      {/* "একটাই পথ, একাধিক গন্তব্য" — country carousel section (map illustration
          replaced by a horizontally scrolling carousel of country cards). */}
      <CountrySection lang={lang} />

      {/* Success stories — one testimonial per destination country */}
      <TestimonialsSection lang={lang} />

      {/* Final CTA band — brand red background */}
      <FinalCTABand lang={lang} />
    </div>
  );
}
