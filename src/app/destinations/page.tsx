import React from 'react';
import { fetchSheetSafe } from '@/lib/fetchSheetData';
import { destinations as staticDestinations } from '@/data/destinations';
import DestinationsClient from './DestinationsClient';

export const metadata = {
  title: 'Study Abroad Destinations | 10 Minute School Study Abroad',
  description: 'Compare countries by tuition, living costs, scholarships, and career opportunities.',
};

export default async function Page() {
  // The static dataset's field names match what keyMappings produces, so it is
  // a drop-in if the sheet is unreachable.
  const destinations = await fetchSheetSafe("Destinations", staticDestinations);
  return <DestinationsClient destinations={destinations} />;
}
