"use client";

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { Flag } from './Flag';

export interface CountryCardData {
  slug: string;
  name: string;
  flag: string;
  imageAlt: { en: string; bn: string };
  chipLabel: string;
  subjects: string;
  workPermit: string;
  guideHref: string;
  exploreHref: string;
}

// All 7 card photos share one crop/aspect ratio and live in one place, named
// by slug — see the "IMAGE SPEC" note this was built against for the master
// dimensions and processing pipeline (scripts/process-country-photos.py).
export const IMAGE_BASE = '/images/countries';
export const IMAGE_WIDTH = 1150;
export const IMAGE_HEIGHT = 507;

export function countryImagePaths(slug: string) {
  return {
    webp1x: `${IMAGE_BASE}/${slug}.webp`,
    webpSm: `${IMAGE_BASE}/${slug}-sm.webp`,
    jpg1x: `${IMAGE_BASE}/${slug}.jpg`,
    jpgSm: `${IMAGE_BASE}/${slug}-sm.jpg`,
  };
}

// Content lives here so it's easy to edit later — swap TODO placeholders for
// researched facts as they're confirmed.
export const countries: CountryCardData[] = [
  {
    slug: 'uk',
    name: 'United Kingdom',
    flag: '🇬🇧',
    imageAlt: {
      en: 'Student looking at Big Ben and the Houses of Parliament, United Kingdom',
      bn: 'বিগ বেন ও পার্লামেন্ট ভবনের সামনে একজন শিক্ষার্থী, যুক্তরাজ্য',
    },
    chipLabel: 'যুক্তরাজ্য',
    subjects: 'Computer Science, Law, Medicine',
    workPermit: '2-year Graduate Route',
    guideHref: '/destinations/uk',
    exploreHref: '/destinations/uk',
  },
  {
    slug: 'usa',
    name: 'United States',
    flag: '🇺🇸',
    imageAlt: {
      en: 'Student overlooking the New York City skyline, United States',
      bn: 'নিউ ইয়র্ক সিটির স্কাইলাইনের সামনে একজন শিক্ষার্থী, যুক্তরাষ্ট্র',
    },
    chipLabel: 'যুক্তরাষ্ট্র',
    subjects: 'TODO — confirm popular subjects for the USA',
    workPermit: 'TODO — confirm work-permit details for the USA',
    guideHref: '/destinations/united-states',
    exploreHref: '/destinations/united-states',
  },
  {
    slug: 'canada',
    name: 'Canada',
    flag: '🇨🇦',
    imageAlt: {
      en: 'Student in front of the CN Tower, Canada',
      bn: 'সিএন টাওয়ারের সামনে একজন শিক্ষার্থী, কানাডা',
    },
    chipLabel: 'কানাডা',
    subjects: 'TODO — confirm popular subjects for Canada',
    workPermit: 'TODO — confirm work-permit details for Canada',
    guideHref: '/destinations/canada',
    exploreHref: '/destinations/canada',
  },
  {
    slug: 'australia',
    name: 'Australia',
    flag: '🇦🇺',
    imageAlt: {
      en: 'Student in front of the Sydney Opera House, Australia',
      bn: 'সিডনি অপেরা হাউজের সামনে একজন শিক্ষার্থী, অস্ট্রেলিয়া',
    },
    chipLabel: 'অস্ট্রেলিয়া',
    subjects: 'TODO — confirm popular subjects for Australia',
    workPermit: 'TODO — confirm work-permit details for Australia',
    guideHref: '/destinations/australia',
    exploreHref: '/destinations/australia',
  },
  {
    slug: 'new-zealand',
    name: 'New Zealand',
    flag: '🇳🇿',
    imageAlt: {
      en: 'Student with the Auckland skyline, New Zealand',
      bn: 'অকল্যান্ড স্কাইলাইনের সামনে একজন শিক্ষার্থী, নিউজিল্যান্ড',
    },
    chipLabel: 'নিউজিল্যান্ড',
    subjects: 'TODO — confirm popular subjects for New Zealand',
    workPermit: 'TODO — confirm work-permit details for New Zealand',
    guideHref: '/destinations/new-zealand',
    exploreHref: '/destinations/new-zealand',
  },
  {
    slug: 'malaysia',
    name: 'Malaysia',
    flag: '🇲🇾',
    imageAlt: {
      en: 'Student in front of the Petronas Towers, Malaysia',
      bn: 'পেট্রোনাস টাওয়ারের সামনে একজন শিক্ষার্থী, মালয়েশিয়া',
    },
    chipLabel: 'মালয়েশিয়া',
    subjects: 'TODO — confirm popular subjects for Malaysia',
    workPermit: 'TODO — confirm work-permit details for Malaysia',
    guideHref: '/destinations/malaysia',
    exploreHref: '/destinations/malaysia',
  },
  {
    slug: 'malta',
    name: 'Malta',
    flag: '🇲🇹',
    imageAlt: {
      en: 'Student overlooking Valletta harbour, Malta',
      bn: 'ভালেত্তা হারবারের সামনে একজন শিক্ষার্থী, মাল্টা',
    },
    chipLabel: 'মাল্টা',
    subjects: 'TODO — confirm popular subjects for Malta',
    workPermit: 'TODO — confirm work-permit details for Malta',
    guideHref: '/destinations/malta',
    exploreHref: '/destinations/malta',
  },
];

const CARD_LABELS = {
  bn: { popularSubjects: 'জনপ্রিয় বিষয়', workPermit: 'Work Permit', countryGuide: 'কান্ট্রি গাইড', explore: 'এক্সপ্লোর' },
  en: { popularSubjects: 'Popular Subjects', workPermit: 'Work Permit', countryGuide: 'Country Guide', explore: 'Explore' },
};

interface CountryCardProps {
  data: CountryCardData;
  lang: string;
  tabIndex: number;
  ariaHidden: boolean;
  priority?: boolean;
}

function CountryCard({ data, lang, tabIndex, ariaHidden, priority }: CountryCardProps) {
  const t = lang === 'bn' ? CARD_LABELS.bn : CARD_LABELS.en;
  const img = countryImagePaths(data.slug);
  const alt = lang === 'bn' ? data.imageAlt.bn : data.imageAlt.en;
  const sizes = '(min-width: 1100px) 33vw, (min-width: 700px) 50vw, 90vw';

  return (
    <div className="country-map-card" tabIndex={tabIndex} aria-hidden={ariaHidden || undefined}>
      <div className="country-card-image-box">
        <picture>
          <source type="image/webp" srcSet={`${img.webpSm} 600w, ${img.webp1x} ${IMAGE_WIDTH}w`} sizes={sizes} />
          <source type="image/jpeg" srcSet={`${img.jpgSm} 600w, ${img.jpg1x} ${IMAGE_WIDTH}w`} sizes={sizes} />
          <img
            src={img.jpg1x}
            alt={alt}
            width={IMAGE_WIDTH}
            height={IMAGE_HEIGHT}
            className="country-card-img"
            draggable={false}
            loading={priority ? 'eager' : 'lazy'}
            decoding={priority ? 'sync' : 'async'}
            fetchPriority={priority ? 'high' : 'auto'}
          />
        </picture>
        <span className="country-card-badge">
          <Flag emoji={data.flag} /> {data.chipLabel}
        </span>
      </div>

      <div className="country-card-info-box">
        <div className="country-card-title-row">
          <h3 className="bn">{data.name}</h3>
          <Flag emoji={data.flag} className="country-card-flag-emoji" />
        </div>

        <div className="country-card-detail-item">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.832l8.57 3.908a2 2 0 0 0 1.66 0z"/><path d="M6 18.8v-4L2 13v6a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1z"/><path d="M21.5 12v6"/></svg>
          <div className="country-card-detail-text">
            <strong>{t.popularSubjects}: </strong>
            {data.subjects}
          </div>
        </div>

        <div className="country-card-detail-item">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 2H9a2 2 0 0 0-2 2v2H3a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h18a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-4V4a2 2 0 0 0-2-2z"/><path d="M7 6h10"/></svg>
          <div className="country-card-detail-text">
            <strong>{t.workPermit}: </strong>
            {data.workPermit}
          </div>
        </div>

        <div className="country-card-buttons-row">
          <Link href={data.guideHref} className="country-card-btn-outline bn" tabIndex={tabIndex}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
            {t.countryGuide}
          </Link>
          <Link href={data.exploreHref} className="country-card-btn-filled bn" tabIndex={tabIndex}>
            {t.explore}
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
          </Link>
        </div>
      </div>
    </div>
  );
}

const AUTO_SPEED_PX_PER_SEC = 26; // slow continuous drift
const DRAG_CLICK_THRESHOLD_PX = 6;
const EASE_RATE = 8; // higher = snappier arrow-step easing

interface CountryCarouselProps {
  lang: string;
}

export default function CountryCarousel({ lang }: CountryCarouselProps) {
  const n = countries.length;
  const loopItems = [...countries, ...countries];

  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const firstCardRef = useRef<HTMLDivElement>(null);

  const [activeIndex, setActiveIndex] = useState(0);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);

  const isPausedRef = useRef(false);
  const draggingRef = useRef(false);
  const hasDraggedRef = useRef(false);
  const dragStartXRef = useRef(0);
  const dragStartOffsetRef = useRef(0);
  const offsetRef = useRef(0);
  const targetOffsetRef = useRef<number | null>(null);
  const stepPxRef = useRef(0);
  const reducedMotionRef = useRef(false);
  const suppressNextClickRef = useRef(false);

  useEffect(() => {
    isPausedRef.current = hovered || focused;
  }, [hovered, focused]);

  // Measure a single card's rendered width (+ gap) so px math matches actual layout.
  useEffect(() => {
    const measure = () => {
      if (!firstCardRef.current || !trackRef.current) return;
      const cardRect = firstCardRef.current.getBoundingClientRect();
      const gap = parseFloat(getComputedStyle(trackRef.current).columnGap || '0') || 0;
      stepPxRef.current = cardRect.width + gap;
    };
    measure();
    const ro = new ResizeObserver(measure);
    if (viewportRef.current) ro.observe(viewportRef.current);
    window.addEventListener('resize', measure);
    return () => {
      ro.disconnect();
      window.removeEventListener('resize', measure);
    };
  }, []);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    reducedMotionRef.current = mq.matches;
    const handler = (e: MediaQueryListEvent) => { reducedMotionRef.current = e.matches; };
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  // Continuous rAF loop: auto-drift, arrow easing, and infinite seamless wrap.
  useEffect(() => {
    let raf = 0;
    let last = performance.now();

    const tick = (time: number) => {
      const dt = Math.min((time - last) / 1000, 0.05);
      last = time;
      const step = stepPxRef.current;

      if (step > 0) {
        const singleSetWidth = step * n;

        if (targetOffsetRef.current !== null) {
          const diff = targetOffsetRef.current - offsetRef.current;
          if (Math.abs(diff) < 0.4) {
            offsetRef.current = targetOffsetRef.current;
            targetOffsetRef.current = null;
          } else {
            offsetRef.current += diff * Math.min(1, dt * EASE_RATE);
          }
        } else if (!isPausedRef.current && !draggingRef.current && !reducedMotionRef.current) {
          offsetRef.current += AUTO_SPEED_PX_PER_SEC * dt;
        }

        if (offsetRef.current >= singleSetWidth) {
          offsetRef.current -= singleSetWidth;
          if (targetOffsetRef.current !== null) targetOffsetRef.current -= singleSetWidth;
        } else if (offsetRef.current < 0) {
          offsetRef.current += singleSetWidth;
          if (targetOffsetRef.current !== null) targetOffsetRef.current += singleSetWidth;
        }

        if (trackRef.current) {
          trackRef.current.style.transform = `translate3d(${-offsetRef.current}px,0,0)`;
        }

        const idx = (Math.round(offsetRef.current / step) % n + n) % n;
        setActiveIndex((prev) => (prev === idx ? prev : idx));
      }

      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [n]);

  const stepBy = (dir: 1 | -1) => {
    const step = stepPxRef.current;
    if (!step) return;
    const base = targetOffsetRef.current ?? offsetRef.current;
    targetOffsetRef.current = base + dir * step;
  };

  const onPointerDown = (e: React.PointerEvent) => {
    if (e.pointerType === 'mouse' && e.button !== 0) return;
    // Don't hijack pointer capture when starting on a link/button — capturing
    // it here retargets the click away from the anchor and silently eats
    // its navigation, even for a plain tap with no drag movement.
    if ((e.target as HTMLElement).closest('a, button')) return;
    draggingRef.current = true;
    hasDraggedRef.current = false;
    dragStartXRef.current = e.clientX;
    dragStartOffsetRef.current = offsetRef.current;
    targetOffsetRef.current = null;
    trackRef.current?.setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!draggingRef.current) return;
    const dx = e.clientX - dragStartXRef.current;
    if (!hasDraggedRef.current && Math.abs(dx) > DRAG_CLICK_THRESHOLD_PX) {
      hasDraggedRef.current = true;
    }
    if (hasDraggedRef.current) {
      offsetRef.current = dragStartOffsetRef.current - dx;
    }
  };

  const endDrag = () => {
    if (!draggingRef.current) return;
    draggingRef.current = false;
    if (hasDraggedRef.current) {
      const step = stepPxRef.current;
      if (step) targetOffsetRef.current = Math.round(offsetRef.current / step) * step;
      suppressNextClickRef.current = true;
    }
    hasDraggedRef.current = false;
  };

  const onCaptureClick = (e: React.MouseEvent) => {
    if (suppressNextClickRef.current) {
      suppressNextClickRef.current = false;
      e.preventDefault();
      e.stopPropagation();
    }
  };

  return (
    <div className="country-card-container">
      <div
        className="cs-viewport"
        ref={viewportRef}
        role="region"
        aria-label={lang === 'bn' ? 'দেশের কার্ড ক্যারোসেল' : 'Featured study-abroad countries carousel'}
        aria-roledescription="carousel"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onFocus={() => setFocused(true)}
        onBlur={(e) => {
          if (!e.currentTarget.contains(e.relatedTarget as Node)) setFocused(false);
        }}
      >
        <div
          className="cs-track"
          ref={trackRef}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={endDrag}
          onPointerCancel={endDrag}
          onClickCapture={onCaptureClick}
        >
          {loopItems.map((c, i) => (
            <div
              className="cs-card-slot"
              key={`${c.slug}-${i}`}
              ref={i === 0 ? firstCardRef : undefined}
            >
              <CountryCard data={c} lang={lang} tabIndex={i < n ? 0 : -1} ariaHidden={i >= n} priority={i === 0} />
            </div>
          ))}
        </div>
      </div>

      <div className="carousel-controls-row">
        <button
          className="carousel-arrow-btn"
          onClick={() => stepBy(-1)}
          aria-label={lang === 'bn' ? 'আগের দেশ' : 'Previous country'}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>
        </button>

        <div className="carousel-progress-wrapper">
          <div
            className="carousel-progress-bar"
            style={{ width: `${((activeIndex + 1) / n) * 100}%` }}
          />
        </div>

        <button
          className="carousel-arrow-btn"
          onClick={() => stepBy(1)}
          aria-label={lang === 'bn' ? 'পরের দেশ' : 'Next country'}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
        </button>
      </div>
    </div>
  );
}
