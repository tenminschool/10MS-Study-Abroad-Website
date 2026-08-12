import React from 'react';
import HomeClient from './HomeClient';
import { fetchSheetSafe } from '@/lib/fetchSheetData';
import { destinations as staticDestinations } from '@/data/destinations';
import { getHomeTestimonials } from '@/lib/testimonials';

export const metadata = {
  title: '10 Minute School | Study Abroad',
  description: 'From aspirations to admissions, trusted study abroad guidance from 10 Minute School',
};

export default async function Page() {
  // Testimonials have no static fallback; HomeClient hides the section when
  // the list is empty, so an unreachable sheet costs the carousel, not the page.
  const [testimonialRows, destinationRows] = await Promise.all([
    fetchSheetSafe('Testimonials'),
    fetchSheetSafe('Destinations', staticDestinations),
  ]);
  const testimonials = getHomeTestimonials(testimonialRows, destinationRows);

  return <HomeClient testimonials={testimonials} />;
}
