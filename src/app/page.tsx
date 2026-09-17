import React from 'react';
import HomeClient from './HomeClient';
import { fetchSheetSafe } from '@/lib/fetchSheetData';
import { destinations as staticDestinations } from '@/data/destinations';
import { getHomeTestimonials } from '@/lib/testimonials';
import { getCountryCards } from '@/lib/countryCards';
import { getHomeFaqs } from '@/lib/faqs';

export const metadata = {
  title: '10 Minute School | Study Abroad',
  description: 'From aspirations to admissions, trusted study abroad guidance from 10 Minute School',
};

export default async function Page() {
  // Testimonials and FAQ have no static fallback; HomeClient hides each
  // section when its list is empty, so an unreachable sheet costs the
  // carousel, not the page.
  const [testimonialRows, destinationRows, faqRows] = await Promise.all([
    fetchSheetSafe('Testimonials'),
    fetchSheetSafe('Destinations', staticDestinations),
    fetchSheetSafe('FAQ'),
  ]);
  const testimonials = getHomeTestimonials(testimonialRows, destinationRows);
  const countries = getCountryCards(destinationRows);
  const faqs = getHomeFaqs(faqRows);

  return <HomeClient testimonials={testimonials} countries={countries} faqs={faqs} />;
}
