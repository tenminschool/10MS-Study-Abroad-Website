"use client";

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { X } from '@phosphor-icons/react';
import HomeHero from '../components/HomeHero';
import CountryCarousel from '../components/CountryCarousel';
import Carousel from '../components/Carousel';
import { Flag } from '../components/Flag';
import { YouTubeFacade } from '../components/YouTubeFacade';
import type { Testimonial, TextTestimonial } from '../lib/testimonials';
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

function TestimonialCard({
  testimonial,
  tabIndex,
  ariaHidden,
  onReadMore,
  readMoreLabel,
}: {
  testimonial: Testimonial;
  tabIndex: number;
  ariaHidden: boolean;
  onReadMore: (testimonial: TextTestimonial) => void;
  readMoreLabel: string;
}) {
  const quoteRef = useRef<HTMLParagraphElement>(null);
  const [isClamped, setIsClamped] = useState(false);

  useEffect(() => {
    if (testimonial.type !== 'text') return;
    const el = quoteRef.current;
    if (!el) return;

    const measure = () => setIsClamped(el.scrollHeight - el.clientHeight > 1);
    measure();

    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, [testimonial]);

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
          <p className="test-card-quote" ref={quoteRef}>"{testimonial.quote}"</p>
          {isClamped && (
            <button
              type="button"
              className="test-read-more-btn"
              tabIndex={tabIndex}
              onClick={() => onReadMore(testimonial)}
            >
              {readMoreLabel}
            </button>
          )}
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

function TestimonialQuoteModal({
  testimonial,
  closeLabel,
  onClose,
}: {
  testimonial: TextTestimonial;
  closeLabel: string;
  onClose: () => void;
}) {
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const titleId = `test-quote-modal-title-${testimonial.name.replace(/\s+/g, '-')}`;

  useEffect(() => {
    const previouslyFocused = document.activeElement as HTMLElement | null;
    closeBtnRef.current?.focus();

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKeyDown);

    return () => {
      window.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = originalOverflow;
      previouslyFocused?.focus();
    };
  }, [onClose]);

  return (
    <div
      className="test-quote-modal-overlay"
      onClick={onClose}
    >
      <div
        className="test-quote-modal-card"
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          ref={closeBtnRef}
          className="test-quote-modal-close"
          aria-label={closeLabel}
          onClick={onClose}
        >
          <X size={18} weight="bold" />
        </button>
        <div className="test-card-top-row">
          <TestimonialAvatar name={testimonial.name} avatar={testimonial.avatar} />
          <div className="test-student-meta">
            <h4 className="test-student-name" id={titleId}>{testimonial.name}</h4>
            <p className="test-student-uni">{testimonial.university}</p>
          </div>
        </div>
        <p className="test-quote-modal-quote">&ldquo;{testimonial.quote}&rdquo;</p>
        <div className="test-card-footer">
          <span className="test-card-country-badge">
            <Flag emoji={testimonial.countryFlag} /> {testimonial.countryName}
          </span>
        </div>
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
      readMore: "আরও পড়ুন",
      close: "বন্ধ করুন",
    },
    en: {
      heading: "Student Experiences",
      subheading: "Stories of our successful students turning their dreams into reality",
      prev: "Previous story",
      next: "Next story",
      ariaLabel: "Student testimonials carousel",
      readMore: "Read more",
      close: "Close",
    }
  };

  const currentTranslations = lang === 'bn' ? t.bn : t.en;
  const [activeQuote, setActiveQuote] = useState<TextTestimonial | null>(null);

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
            <TestimonialCard
              testimonial={testimonial}
              tabIndex={meta.tabIndex}
              ariaHidden={meta.ariaHidden}
              onReadMore={setActiveQuote}
              readMoreLabel={currentTranslations.readMore}
            />
          )}
          ariaLabel={currentTranslations.ariaLabel}
          prevLabel={currentTranslations.prev}
          nextLabel={currentTranslations.next}
        />
      </div>

      {activeQuote && (
        <TestimonialQuoteModal
          testimonial={activeQuote}
          closeLabel={currentTranslations.close}
          onClose={() => setActiveQuote(null)}
        />
      )}
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
