import React from 'react';
import HomeClient from './HomeClient';
import { fetchSheet } from '@/lib/fetchSheetData';
import { getHomeTestimonials } from '@/lib/testimonials';

export const metadata = {
  title: '10 Minute School | Study Abroad',
  description: 'From aspirations to admissions, trusted study abroad guidance from 10 Minute School',
};

export default async function Page() {
  const [testimonialRows, destinationRows] = await Promise.all([
    fetchSheet('Testimonials'),
    fetchSheet('Destinations'),
  ]);
  const testimonials = getHomeTestimonials(testimonialRows, destinationRows);

  return <HomeClient testimonials={testimonials} />;
}
