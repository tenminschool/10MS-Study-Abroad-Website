"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { X } from '@phosphor-icons/react';
import { Flag } from '../../components/Flag';
import './compare.css';

// --- Data ---
const countriesList = [
  { id: 'uk', name: 'United Kingdom', flag: '🇬🇧' },
  { id: 'us', name: 'United States', flag: '🇺🇸' },
  { id: 'ca', name: 'Canada', flag: '🇨🇦' },
  { id: 'au', name: 'Australia', flag: '🇦🇺' },
  { id: 'de', name: 'Germany', flag: '🇩🇪' },
  { id: 'my', name: 'Malaysia', flag: '🇲🇾' },
];

const universitiesList = [
  { id: 'man', name: 'University of Manchester' },
  { id: 'tor', name: 'University of Toronto' },
  { id: 'mel', name: 'University of Melbourne' },
  { id: 'nyu', name: 'New York University' },
];

const countryDetails: Record<string, any> = {
  'uk': {
    tuition: '£10,000 – £38,000/year',
    living: '£12,000 – £15,000/year',
    universities: '160+',
    workPermit: '2-year post-study work visa (Graduate Route)',
    intakes: 'September, January',
    subjects: 'Business, Engineering, Medicine, Law, Arts',
    scholarship: 'Chevening Scholarship – Full tuition + living expenses'
  },
  'us': {
    tuition: '$20,000 – $55,000/year',
    living: '$15,000 – $20,000/year',
    universities: '4000+',
    workPermit: 'OPT: 1-3 years post-study work authorization',
    intakes: 'Fall (August), Spring (January)',
    subjects: 'Computer Science, Business, Engineering, Medicine, Data Science',
    scholarship: 'Fulbright Scholarship – Full funding'
  },
  'ca': {
    tuition: 'CAD 15,000 – 40,000/year',
    living: 'CAD 12,000 – 15,000/year',
    universities: '100+',
    workPermit: 'Up to 3 years (PGWP)',
    intakes: 'September, January, May',
    subjects: 'IT, Nursing, Engineering, Business',
    scholarship: 'Vanier Canada Graduate Scholarships'
  },
  'au': {
    tuition: 'AUD 20,000 – 45,000/year',
    living: 'AUD 21,000 – 25,000/year',
    universities: '43',
    workPermit: '2-4 years post-study work visa',
    intakes: 'February, July',
    subjects: 'Accounting, IT, Healthcare, Engineering',
    scholarship: 'Australia Awards'
  },
  'de': {
    tuition: '€0 – €20,000/year (many public unis are free)',
    living: '€10,000 – €12,000/year',
    universities: '400+',
    workPermit: '18-month job seeker visa after graduation',
    intakes: 'October, April',
    subjects: 'Engineering, Computer Science, Automotive, Business, Natural Sciences',
    scholarship: 'DAAD Scholarship – €850 – €1,200/month'
  },
  'my': {
    tuition: 'RM 15,000 – 40,000/year',
    living: 'RM 12,000 – 18,000/year',
    universities: '100+',
    workPermit: 'Subject to employer sponsorship',
    intakes: 'March, July, October',
    subjects: 'Business, Engineering, IT',
    scholarship: 'Malaysian International Scholarship (MIS)'
  }
};

const universityDetails: Record<string, any> = {
  'man': {
    location: 'Manchester, England',
    ranking: '#32 World (QS 2024)',
    tuition: '£22,000 – £28,000',
    accommodation: '£6,000 – £9,000/year',
    ielts: '6.5 overall (min 6.0 per component)',
    gpa: '3.0/4.0 or equivalent',
    intakes: 'September 2025, January 2026'
  },
  'tor': {
    location: 'Toronto, Ontario',
    ranking: '#21 World (QS 2024)',
    tuition: 'CAD 45,000 – CAD 60,000',
    accommodation: 'CAD 12,000 – CAD 18,000/year',
    ielts: '6.5 overall (min 6.0 per component)',
    gpa: '3.3/4.0 or equivalent',
    intakes: 'September 2025, January 2026'
  },
  'mel': {
    location: 'Melbourne, Victoria',
    ranking: '#14 World (QS 2024)',
    tuition: 'AUD 35,000 – AUD 45,000',
    accommodation: 'AUD 15,000 – AUD 20,000/year',
    ielts: '6.5 overall (min 6.0 per component)',
    gpa: '3.2/4.0 or equivalent',
    intakes: 'February 2025, July 2025'
  },
  'nyu': {
    location: 'New York City, NY',
    ranking: '#38 World (QS 2024)',
    tuition: '$55,000 – $60,000',
    accommodation: '$18,000 – $24,000/year',
    ielts: '7.0 overall (min 6.5 per component)',
    gpa: '3.5/4.0 or equivalent',
    intakes: 'Fall 2025, Spring 2026'
  }
};

export default function ComparePage() {
  const [activeTab, setActiveTab] = useState<'country' | 'university'>('country');
  const [selectedCountries, setSelectedCountries] = useState<string[]>(['de', 'uk', 'us']);
  const [selectedUniversities, setSelectedUniversities] = useState<string[]>(['man', 'tor']);

  const handleCountryToggle = (id: string) => {
    if (selectedCountries.includes(id)) {
      setSelectedCountries(selectedCountries.filter(c => c !== id));
    } else {
      if (selectedCountries.length < 3) {
        setSelectedCountries([...selectedCountries, id]);
      }
    }
  };

  const handleUniversityToggle = (id: string) => {
    if (selectedUniversities.includes(id)) {
      setSelectedUniversities(selectedUniversities.filter(u => u !== id));
    } else {
      if (selectedUniversities.length < 3) {
        setSelectedUniversities([...selectedUniversities, id]);
      }
    }
  };

  const currentSelection = activeTab === 'country' ? selectedCountries : selectedUniversities;
  const isReady = currentSelection.length >= 2;

  return (
    <div className="compare-page container py-12">
      {/* Header section */}
      <div className="mb-10">
        <h1 className="h1 bn mb-2">তুলনা অপশন (Compare Options)</h1>
        <p className="body text-light">
          Compare countries or universities side by side to make an informed decision.
        </p>
      </div>

      {/* Tabs */}
      <div className="capsule-tabs mb-8">
        <button 
          className={`capsule-tab ${activeTab === 'country' ? 'active' : ''}`}
          onClick={() => setActiveTab('country')}
        >
          Country vs Country
        </button>
        <button 
          className={`capsule-tab ${activeTab === 'university' ? 'active' : ''}`}
          onClick={() => setActiveTab('university')}
        >
          University vs University
        </button>
      </div>

      {/* Selectors */}
      <div className="mb-8">
        <p className="meta mb-4 font-semibold text-[var(--fg-1)]">
          Add {activeTab === 'country' ? 'Countries' : 'Universities'} to Compare (max 3)
        </p>
        <div className="pill-container">
          {activeTab === 'country' && countriesList.map(item => {
            const isSelected = selectedCountries.includes(item.id);
            return (
              <button 
                key={item.id} 
                onClick={() => handleCountryToggle(item.id)}
                className={`select-pill ${isSelected ? 'selected' : ''}`}
              >
                <span className="pill-icon">{isSelected ? '−' : '+'}</span>
                <span><Flag emoji={item.flag} /> {item.name}</span>
              </button>
            )
          })}
          
          {activeTab === 'university' && universitiesList.map(item => {
            const isSelected = selectedUniversities.includes(item.id);
            return (
              <button 
                key={item.id} 
                onClick={() => handleUniversityToggle(item.id)}
                className={`select-pill ${isSelected ? 'selected' : ''}`}
              >
                <span className="pill-icon">{isSelected ? '−' : '+'}</span>
                <span>{item.name}</span>
              </button>
            )
          })}
        </div>
      </div>

      {/* Table or Empty State */}
      {!isReady ? (
        <div className="empty-state-box">
          Select at least 2 {activeTab === 'country' ? 'countries' : 'universities'} to start comparing
        </div>
      ) : (
        <div className="compare-card card p-0">
          <div className="table-responsive">
            <table className="routine-table compare-table-custom">
              <thead>
                <tr>
                  <th className="feature-col">CRITERIA</th>
                  {currentSelection.map(id => {
                    const data = activeTab === 'country' 
                      ? countriesList.find(c => c.id === id)
                      : universitiesList.find(u => u.id === id);
                    
                    return (
                      <th key={id}>
                        <div className="compare-header-item flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            {activeTab === 'country' && <Flag emoji={(data as any).flag} />}
                            <h3 className="h3 text-[var(--fg-1)] m-0 p-0 leading-tight">{(data as any).name}</h3>
                          </div>
                          <button 
                            className="btn-remove-inline"
                            onClick={() => activeTab === 'country' ? handleCountryToggle(id) : handleUniversityToggle(id)}
                          >
                            <X size={16}/>
                          </button>
                        </div>
                      </th>
                    );
                  })}
                </tr>
              </thead>
              <tbody>
                {activeTab === 'country' ? (
                  <>
                    <tr>
                      <td className="feature-name">TUITION RANGE</td>
                      {currentSelection.map(id => <td key={id}>{countryDetails[id].tuition}</td>)}
                    </tr>
                    <tr>
                      <td className="feature-name">COST OF LIVING</td>
                      {currentSelection.map(id => <td key={id}>{countryDetails[id].living}</td>)}
                    </tr>
                    <tr>
                      <td className="feature-name">UNIVERSITIES</td>
                      {currentSelection.map(id => <td key={id}>{countryDetails[id].universities}</td>)}
                    </tr>
                    <tr>
                      <td className="feature-name">WORK PERMIT</td>
                      {currentSelection.map(id => <td key={id}>{countryDetails[id].workPermit}</td>)}
                    </tr>
                    <tr>
                      <td className="feature-name">INTAKES</td>
                      {currentSelection.map(id => <td key={id}>{countryDetails[id].intakes}</td>)}
                    </tr>
                    <tr>
                      <td className="feature-name">POPULAR SUBJECTS</td>
                      {currentSelection.map(id => <td key={id}>{countryDetails[id].subjects}</td>)}
                    </tr>
                    <tr>
                      <td className="feature-name">TOP SCHOLARSHIP</td>
                      {currentSelection.map(id => <td key={id}>{countryDetails[id].scholarship}</td>)}
                    </tr>
                  </>
                ) : (
                  <>
                    <tr>
                      <td className="feature-name">LOCATION</td>
                      {currentSelection.map(id => <td key={id}>{universityDetails[id].location}</td>)}
                    </tr>
                    <tr>
                      <td className="feature-name">RANKING</td>
                      {currentSelection.map(id => <td key={id}>{universityDetails[id].ranking}</td>)}
                    </tr>
                    <tr>
                      <td className="feature-name">TUITION/YEAR</td>
                      {currentSelection.map(id => <td key={id}>{universityDetails[id].tuition}</td>)}
                    </tr>
                    <tr>
                      <td className="feature-name">ACCOMMODATION</td>
                      {currentSelection.map(id => <td key={id}>{universityDetails[id].accommodation}</td>)}
                    </tr>
                    <tr>
                      <td className="feature-name">IELTS REQUIRED</td>
                      {currentSelection.map(id => <td key={id}>{universityDetails[id].ielts}</td>)}
                    </tr>
                    <tr>
                      <td className="feature-name">MIN GPA</td>
                      {currentSelection.map(id => <td key={id}>{universityDetails[id].gpa}</td>)}
                    </tr>
                    <tr>
                      <td className="feature-name">INTAKES</td>
                      {currentSelection.map(id => <td key={id}>{universityDetails[id].intakes}</td>)}
                    </tr>
                  </>
                )}
                <tr className="bg-[var(--surface-subtle)]">
                  <td className="feature-name border-none"></td>
                  {currentSelection.map(id => {
                    const data = activeTab === 'country' 
                      ? countriesList.find(c => c.id === id)
                      : universitiesList.find(u => u.id === id);
                    
                    if (activeTab === 'country' && data) {
                      const slug = data.name.toLowerCase().replace(/\s+/g, '-');
                      return (
                        <td key={id} className="border-none py-6">
                          <Link href={`/destinations/${slug}`} className="btn btn-primary bn w-full">
                            Interested in {data.name}?
                          </Link>
                        </td>
                      );
                    }

                    return (
                      <td key={id} className="border-none py-6">
                        <button className="btn btn-primary bn w-full">
                          Interested in {data?.name}?
                        </button>
                      </td>
                    );
                  })}
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
