import React from 'react';
import { fetchSheetSafe } from '@/lib/fetchSheetData';
import { destinations as staticDestinations } from '@/data/destinations';
import ScholarshipsClient from './ScholarshipsClient';

export const metadata = {
  title: 'Scholarships for Bangladeshi Students | 10 Minute School Study Abroad',
  description: 'Explore fully funded and partial scholarships in the UK, USA, Canada, and Australia.',
};

export default async function Page() {
  // Fetch from Google Sheet. Scholarships have no static fallback; ScholarshipsClient
  // renders an empty state when the list is empty.
  const scholarshipsRaw = await fetchSheetSafe("Scholarships");
  const destinations = await fetchSheetSafe("Destinations", staticDestinations);

  const scholarships = scholarshipsRaw.map((schol: any) => {
    // Match with destination to get slug, name, flag
    const dest = destinations.find((d: any) => 
      d.id?.toLowerCase() === schol.country_id?.toLowerCase() || 
      d.slug?.toLowerCase() === schol.country_id?.toLowerCase()
    );

    const countryId = dest ? dest.slug : (schol.country_id || 'others');
    const country = dest ? dest.name : (schol.country_id || 'Others');
    const flag = dest ? dest.flag_emoji : '🌍';

    // Parse eligibility list from Notes
    let eligibility = ['Academic excellence', 'English proficiency required'];
    if (schol.Notes) {
      if (schol.Notes.includes('|')) {
        eligibility = schol.Notes.split('|').map((s: string) => s.trim()).filter(Boolean);
      } else if (schol.Notes.includes(',')) {
        eligibility = schol.Notes.split(',').map((s: string) => s.trim()).filter(Boolean);
      } else {
        eligibility = [schol.Notes.trim()];
      }
    }

    // Parse degrees
    let degrees = ['Master'];
    if (schol.level) {
      if (schol.level.includes('|')) {
        degrees = schol.level.split('|').map((s: string) => s.trim()).filter(Boolean);
      } else if (schol.level.includes(',')) {
        degrees = schol.level.split(',').map((s: string) => s.trim()).filter(Boolean);
      } else {
        degrees = [schol.level.trim()];
      }
    }

    // Map country category
    let countryCategory: any = 'Others';
    const cleanCountry = country.toLowerCase();
    if (cleanCountry.includes('united kingdom') || cleanCountry.includes('uk')) {
      countryCategory = 'United Kingdom';
    } else if (cleanCountry.includes('united states') || cleanCountry.includes('usa')) {
      countryCategory = 'United States';
    } else if (cleanCountry === 'canada') {
      countryCategory = 'Canada';
    } else if (cleanCountry === 'australia') {
      countryCategory = 'Australia';
    } else if (cleanCountry === 'germany') {
      countryCategory = 'Germany';
    }

    // Map funding type
    const amount = schol.amount || '';
    let fundingType: any = 'Partial Funding';
    if (amount.toLowerCase().includes('full')) {
      fundingType = 'Fully Funded';
    } else if (amount.toLowerCase().includes('stipend')) {
      fundingType = 'Stipend Only';
    } else if (amount.toLowerCase().includes('living')) {
      fundingType = 'Living Allowance Only';
    }

    // Parse deadline month
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    let deadlineMonth = 'November';
    const deadline = schol.deadline || '';
    for (const m of months) {
      if (deadline.toLowerCase().includes(m.toLowerCase())) {
        deadlineMonth = m;
        break;
      }
    }

    // Map eligibility keys
    const eligibilityKeys = ['openToBangladeshi'];
    const lowerSchol = JSON.stringify(schol).toLowerCase();
    if (lowerSchol.includes('experience')) eligibilityKeys.push('workExperience');
    if (lowerSchol.includes('gpa') || lowerSchol.includes('first-class') || lowerSchol.includes('first class') || lowerSchol.includes('academic')) {
      eligibilityKeys.push('firstClass');
    }
    if (lowerSchol.includes('no ielts') || lowerSchol.includes('ielts not required')) {
      eligibilityKeys.push('noIelts');
    }
    if (lowerSchol.includes('age') || lowerSchol.includes('under 35')) {
      eligibilityKeys.push('ageLimit');
    }

    // Map scholarship type
    const name = schol.name || '';
    let scholarshipType: any = 'Government';
    if (name.toLowerCase().includes('university') || name.toLowerCase().includes('college')) {
      scholarshipType = 'University';
    } else if (name.toLowerCase().includes('foundation') || name.toLowerCase().includes('gates') || name.toLowerCase().includes('aga khan')) {
      scholarshipType = 'Private/NGO';
    }

    return {
      name,
      country,
      countryId,
      flag,
      funding: amount,
      description: schol.desc || '',
      eligibility,
      deadline,
      degrees,
      countryCategory,
      fundingType,
      deadlineMonth,
      eligibilityKeys,
      scholarshipType
    };
  });

  return <ScholarshipsClient scholarships={scholarships} />;
}
