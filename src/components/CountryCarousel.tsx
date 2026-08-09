"use client";

import React from 'react';
import Link from 'next/link';
import { Flag } from './Flag';
import Carousel from './Carousel';

export interface CountryCardData {
  slug: string;
  name: string;
  flag: string;
  imageAlt: { en: string; bn: string };
  chipLabel: string;
  subjects: string;
  workPermit: string;
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
    exploreHref: '/destinations/malta',
  },
];

const CARD_LABELS = {
  bn: { popularSubjects: 'জনপ্রিয় বিষয়', workPermit: 'Work Permit', explore: 'এক্সপ্লোর' },
  en: { popularSubjects: 'Popular Subjects', workPermit: 'Work Permit', explore: 'Explore' },
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
          <Link href={data.exploreHref} className="country-card-btn-filled bn" tabIndex={tabIndex}>
            {t.explore}
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
          </Link>
        </div>
      </div>
    </div>
  );
}

interface CountryCarouselProps {
  lang: string;
}

export default function CountryCarousel({ lang }: CountryCarouselProps) {
  return (
    <Carousel
      items={countries}
      getKey={(c) => c.slug}
      renderItem={(c, meta) => (
        <CountryCard data={c} lang={lang} tabIndex={meta.tabIndex} ariaHidden={meta.ariaHidden} priority={meta.priority} />
      )}
      ariaLabel={lang === 'bn' ? 'দেশের কার্ড ক্যারোসেল' : 'Featured study-abroad countries carousel'}
      prevLabel={lang === 'bn' ? 'আগের দেশ' : 'Previous country'}
      nextLabel={lang === 'bn' ? 'পরের দেশ' : 'Next country'}
    />
  );
}
