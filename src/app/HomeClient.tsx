"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import HomeHero from '../components/HomeHero';
import CountryCarousel from '../components/CountryCarousel';
import Carousel from '../components/Carousel';
import { Flag } from '../components/Flag';
import { YouTubeFacade } from '../components/YouTubeFacade';
import type { Testimonial } from '../lib/testimonials';
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

function TestimonialAvatar({ name, avatar }: { name: string; avatar?: string }) {
  const [broken, setBroken] = useState(false);
  const initials = name
    .split(' ')
    .map((n: string) => n[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  if (!avatar || broken) {
    return <div className="test-avatar-circle">{initials}</div>;
  }
  return (
    <img
      src={avatar}
      alt={name}
      className="test-avatar-img"
      onError={() => setBroken(true)}
    />
  );
}

function TestimonialCard({ testimonial, tabIndex, ariaHidden }: { testimonial: Testimonial; tabIndex: number; ariaHidden: boolean }) {
  return (
    <div
      className={`testimonial-card-restyle${testimonial.type === 'video' ? ' testimonial-card-video' : ''}`}
      tabIndex={tabIndex}
      aria-hidden={ariaHidden || undefined}
    >
      {testimonial.type === 'video' ? (
        <>
          <YouTubeFacade videoId={testimonial.videoId} title={testimonial.name} />
          <div className="test-student-meta">
            <h4 className="test-student-name">{testimonial.name}</h4>
            <p className="test-student-uni">{testimonial.university}</p>
          </div>
        </>
      ) : (
        <>
          <div className="test-card-top-row">
            <TestimonialAvatar name={testimonial.name} avatar={testimonial.avatar} />
            <div className="test-student-meta">
              <h4 className="test-student-name">{testimonial.name}</h4>
              <p className="test-student-uni">{testimonial.university}</p>
            </div>
          </div>
          <p className="test-card-quote">"{testimonial.quote}"</p>
        </>
      )}
      <div className="test-card-footer">
        <span className="test-card-country-badge">
          <Flag emoji={testimonial.countryFlag} /> {testimonial.countryName}
        </span>
      </div>
    </div>
  );
}

function TestimonialsSection({ lang, testimonials }: CountrySectionProps & { testimonials: Testimonial[] }) {
  const t = {
    bn: {
      heading: "শিক্ষার্থীদের অভিজ্ঞতা",
      subheading: "আমাদের সফল শিক্ষার্থীদের স্বপ্ন পূরণের গল্প",
      prev: "আগের গল্প",
      next: "পরের গল্প",
      ariaLabel: "শিক্ষার্থীদের অভিজ্ঞতার ক্যারোসেল",
    },
    en: {
      heading: "Student Experiences",
      subheading: "Stories of our successful students turning their dreams into reality",
      prev: "Previous story",
      next: "Next story",
      ariaLabel: "Student testimonials carousel",
    }
  };

  const currentTranslations = lang === 'bn' ? t.bn : t.en;

  if (testimonials.length === 0) {
    return null;
  }

  return (
    <section className="success-stories-section">
      <div className="container">
        <div className="stories-header">
          <h2 className="bn">{currentTranslations.heading}</h2>
          <p className="stories-subtitle bn">{currentTranslations.subheading}</p>
        </div>

        <Carousel
          items={testimonials}
          getKey={(_, i) => String(i)}
          renderItem={(testimonial, meta) => (
            <TestimonialCard testimonial={testimonial} tabIndex={meta.tabIndex} ariaHidden={meta.ariaHidden} />
          )}
          ariaLabel={currentTranslations.ariaLabel}
          prevLabel={currentTranslations.prev}
          nextLabel={currentTranslations.next}
        />
      </div>
    </section>
  );
}

function FinalCTABand({ lang }: CountrySectionProps) {
  const t = {
    bn: {
      title: "এখনো বুঝতে পারছো না কোথা থেকে শুরু করবে?",
      btn: "প্রোফাইল ম্যাচ শুরু করো →",
    },
    en: {
      title: "Still not sure where to start?",
      btn: "Start Profile Match →",
    }
  };

  const currentTranslations = lang === 'bn' ? t.bn : t.en;

  return (
    <section className="final-cta-band-green">
      <div className="container final-cta-band-container">
        <h2 className="bn final-cta-band-title">
          {currentTranslations.title}
        </h2>
        <Link href="/profile-match" className="btn final-cta-band-btn bn">
          {currentTranslations.btn}
        </Link>
      </div>
    </section>
  );
}

interface HomeClientProps {
  testimonials: Testimonial[];
}

export default function HomeClient({ testimonials }: HomeClientProps) {
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

      {/* Success stories — approved testimonials from the Google Sheet */}
      <TestimonialsSection lang={lang} testimonials={testimonials} />

      {/* Final CTA band — brand red background */}
      <FinalCTABand lang={lang} />
    </div>
  );
}
