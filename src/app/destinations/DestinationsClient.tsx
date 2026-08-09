"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { MagnifyingGlass, SlidersHorizontal, CaretRight, X, ArrowCounterClockwise, CaretDown, CaretUp } from '@phosphor-icons/react';
import { Flag } from '../../components/Flag';
import './destinations.css';

// Region helper mapping
const getCountryRegion = (id: string) => {
  switch (id?.toLowerCase()) {
    case 'uk':
    case 'germany':
    case 'sweden':
    case 'ireland':
      return 'Europe';
    case 'usa':
    case 'canada':
      return 'North America';
    case 'australia':
    case 'newzealand':
    case 'malaysia':
    case 'japan':
      return 'Asia-Pacific';
    default:
      return 'Other';
  }
};

interface DestinationsClientProps {
  destinations: any[];
}

export default function DestinationsClient({ destinations }: DestinationsClientProps) {
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

  // Filter States
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRegions, setSelectedRegions] = useState<string[]>([]);
  const [selectedIntakes, setSelectedIntakes] = useState<string[]>([]);
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>([]);

  // Collapsible sidebar filter sections toggle states
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    region: true,
    intake: true,
    subject: true
  });

  // Mobile Drawer Toggle state
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);

  // Toggle sections
  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  const isCollapsed = (section: string) => !expandedSections[section];

  // Handle single check/uncheck
  const handleToggle = (list: string[], setList: React.Dispatch<React.SetStateAction<string[]>>, val: string) => {
    if (list.includes(val)) {
      setList(list.filter(item => item !== val));
    } else {
      setList([...list, val]);
    }
  };

  // Clear all filters
  const handleClearAll = () => {
    setSelectedRegions([]);
    setSelectedIntakes([]);
    setSelectedSubjects([]);
    setSearchQuery('');
  };

  // Active filter count
  const activeFiltersCount = 
    selectedRegions.length +
    selectedIntakes.length +
    selectedSubjects.length +
    (searchQuery ? 1 : 0);

  // Enriched destinations data
  const enrichedDestinations = destinations.map(dest => ({
    ...dest,
    region: getCountryRegion(dest.id)
  }));

  // Compiling list options dynamically
  const regionsList = Array.from(new Set(enrichedDestinations.map(d => d.region)));
  const intakesList = Array.from(new Set(enrichedDestinations.flatMap(d => d.top_intakes || [])));
  const subjectsList = Array.from(new Set(enrichedDestinations.flatMap(d => d.popular_subjects || [])));

  // Filter application logic
  const filteredDestinations = enrichedDestinations.filter(country => {
    // 1. MagnifyingGlass Query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchName = country.name?.toLowerCase().includes(q);
      const matchDesc = country.whyStudyHere?.some((w: string) => w.toLowerCase().includes(q));
      const matchSubjects = country.popular_subjects?.some((s: string) => s.toLowerCase().includes(q));
      if (!matchName && !matchDesc && !matchSubjects) return false;
    }

    // 2. Region Filter
    if (selectedRegions.length > 0) {
      if (!selectedRegions.includes(country.region)) return false;
    }

    // 3. Intakes Filter
    if (selectedIntakes.length > 0) {
      const hasIntakeMatch = country.top_intakes?.some((i: string) => selectedIntakes.includes(i));
      if (!hasIntakeMatch) return false;
    }

    // 4. Subjects Filter
    if (selectedSubjects.length > 0) {
      const hasSubjectMatch = country.popular_subjects?.some((s: string) => selectedSubjects.includes(s));
      if (!hasSubjectMatch) return false;
    }

    return true;
  });

  const t = {
    bn: {
      title: "জনপ্রিয় গন্তব্যসমূহ",
      subtitle: "টিউশন ফি, জীবনযাত্রার খরচ, স্কলারশিপ ও ক্যারিয়ার সুযোগের ওপর ভিত্তি করে দেশসমূহ তুলনা করো",
      searchPlaceholder: "দেশ বা বিষয় দিয়ে খোঁজো...",
      filters: "ফিল্টারসমূহ",
      clearAll: "সব মুছুন",
      regionFilter: "🌍 অঞ্চল / মহাদেশ",
      intakeFilter: "📅 সেমিস্টার / ইনটেক",
      subjectFilter: "📚 জনপ্রিয় বিষয়",
      resultsCount: (count: number) => `মোট ${count} টি দেশ পাওয়া গেছে`,
      emptyTitle: "কোনো দেশ পাওয়া যায়নি",
      emptyDesc: "আপনার সিলেক্ট করা ফিল্টারের সাথে মিলে যায় এমন কোনো দেশ পাওয়া যায়নি।",
      tuitionLabel: "টিউশন ফি",
      intakesLabel: "ইনটেকসমূহ",
      viewDetails: "দেশ দেখুন",
      allRegions: "সব অঞ্চল",
      europe: "ইউরোপ",
      northAmerica: "উত্তর আমেরিকা",
      asiaPacific: "এশিয়া-প্যাসিফিক"
    },
    en: {
      title: "Study Abroad Destinations",
      subtitle: "Compare countries by tuition, living costs, scholarships, and career opportunities.",
      searchPlaceholder: "Search by country or subject...",
      filters: "Filters",
      clearAll: "Clear All",
      regionFilter: "🌍 Region / Continent",
      intakeFilter: "📅 Semesters / Intakes",
      subjectFilter: "📚 Popular Subjects",
      resultsCount: (count: number) => `Found ${count} destinations`,
      emptyTitle: "No Destinations Found",
      emptyDesc: "No countries matched your selected filters.",
      tuitionLabel: "Tuition",
      intakesLabel: "Intakes",
      viewDetails: "View Details",
      allRegions: "All Regions",
      europe: "Europe",
      northAmerica: "North America",
      asiaPacific: "Asia-Pacific"
    }
  };

  const currentTranslations = lang === 'bn' ? t.bn : t.en;

  const translateRegion = (reg: string) => {
    if (lang === 'bn') {
      if (reg === 'Europe') return t.bn.europe;
      if (reg === 'North America') return t.bn.northAmerica;
      if (reg === 'Asia-Pacific') return t.bn.asiaPacific;
    }
    return reg;
  };

  return (
    <div className="destinations-page">
      
      {/* 1. Breadcrumbs */}
      <div className="breadcrumbs-wrapper">
        <div className="container">
          <div className="breadcrumb-nav bn">
            <Link href="/" className="breadcrumb-link">Home</Link>
            <CaretRight size={14} className="breadcrumb-separator" />
            <span className="breadcrumb-current">Destinations</span>
          </div>
        </div>
      </div>

      <div className="container py-12">
        {/* 2. Page Header */}
        <div className="destinations-header">
          <h1 className="destinations-title bn">
            {currentTranslations.title}
          </h1>
          <p className="destinations-subtitle bn">
            {currentTranslations.subtitle}
          </p>
        </div>

        {/* 3. MagnifyingGlass and Filters Row */}
        <div className="filters-row">
          <div className="search-input-wrapper">
            <MagnifyingGlass size={18} className="search-icon" />
            <input 
              type="text" 
              placeholder={currentTranslations.searchPlaceholder} 
              className="search-input bn" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Layout Grid */}
        <div className="destinations-layout-wrapper">
          <div className="layout-grid-sidebar">
            
            {/* Left Sidebar Filter Panel */}
            <aside className={`filter-sidebar-wrapper ${mobileDrawerOpen ? 'drawer-open' : ''}`}>
              <div className="filter-sidebar-inner">
                {/* Header */}
                <div className="filter-sidebar-header">
                  <div className="flex items-center gap-2">
                    <SlidersHorizontal size={18} className="text-emerald-500" />
                    <span className="font-bold text-fg-1 text-base bn">
                      {currentTranslations.filters} {activeFiltersCount > 0 && `(${activeFiltersCount})`}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    {activeFiltersCount > 0 && (
                      <button
                        onClick={handleClearAll}
                        className="clear-all-btn text-xs font-semibold flex items-center gap-1 bn"
                      >
                        <ArrowCounterClockwise size={12} /> {currentTranslations.clearAll}
                      </button>
                    )}
                    <button
                      className="mobile-drawer-close-x"
                      onClick={() => setMobileDrawerOpen(false)}
                    >
                      <X size={20} />
                    </button>
                  </div>
                </div>

                {/* Filter List */}
                <div className="filter-scroll-area">
                  {/* Region Filter */}
                  <div className="filter-section-block">
                    <button 
                      className="filter-section-header"
                      onClick={() => toggleSection('region')}
                    >
                      <span className="bn">{currentTranslations.regionFilter}</span>
                      {isCollapsed('region') ? <CaretDown size={16} /> : <CaretUp size={16} />}
                    </button>

                    {!isCollapsed('region') && (
                      <div className="filter-section-body">
                        {regionsList.map((reg, i) => (
                          <label key={i} className="filter-checkbox-label">
                            <input 
                              type="checkbox"
                              checked={selectedRegions.includes(reg)}
                              onChange={() => handleToggle(selectedRegions, setSelectedRegions, reg)}
                              className="filter-checkbox-input"
                            />
                            <span className="checkbox-text-custom bn">{translateRegion(reg)}</span>
                          </label>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Intakes Filter */}
                  <div className="filter-section-block">
                    <button 
                      className="filter-section-header"
                      onClick={() => toggleSection('intake')}
                    >
                      <span className="bn">{currentTranslations.intakeFilter}</span>
                      {isCollapsed('intake') ? <CaretDown size={16} /> : <CaretUp size={16} />}
                    </button>

                    {!isCollapsed('intake') && (
                      <div className="filter-section-body">
                        {intakesList.map((intake, i) => (
                          <label key={i} className="filter-checkbox-label">
                            <input 
                              type="checkbox"
                              checked={selectedIntakes.includes(intake)}
                              onChange={() => handleToggle(selectedIntakes, setSelectedIntakes, intake)}
                              className="filter-checkbox-input"
                            />
                            <span className="checkbox-text-custom">{intake}</span>
                          </label>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Subject Area Filter */}
                  <div className="filter-section-block">
                    <button 
                      className="filter-section-header"
                      onClick={() => toggleSection('subject')}
                    >
                      <span className="bn">{currentTranslations.subjectFilter}</span>
                      {isCollapsed('subject') ? <CaretDown size={16} /> : <CaretUp size={16} />}
                    </button>

                    {!isCollapsed('subject') && (
                      <div className="filter-section-body">
                        {subjectsList.map((sub, i) => (
                          <label key={i} className="filter-checkbox-label">
                            <input 
                              type="checkbox"
                              checked={selectedSubjects.includes(sub)}
                              onChange={() => handleToggle(selectedSubjects, setSelectedSubjects, sub)}
                              className="filter-checkbox-input"
                            />
                            <span className="checkbox-text-custom">{sub}</span>
                          </label>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </aside>

            {/* Mobile Drawer Overlay Backdrop */}
            {mobileDrawerOpen && (
              <div
                className="mobile-drawer-backdrop"
                onClick={() => setMobileDrawerOpen(false)}
              ></div>
            )}

            {/* Right Side: Destination Cards Area */}
            <div className="filtered-content-area">
              <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
                <div className="results-heading-with-line">
                  <h2 className="filtered-results-count-upgrade bn">
                    {currentTranslations.resultsCount(filteredDestinations.length)}
                  </h2>
                  <div className="heading-green-line"></div>
                </div>

                {/* Mobile Filter Toggle Button */}
                <button
                  className="mobile-filter-toggle-btn btn flex items-center gap-2 bn"
                  onClick={() => setMobileDrawerOpen(true)}
                >
                  <SlidersHorizontal size={16} /> Filters {activeFiltersCount > 0 && `(${activeFiltersCount})`}
                </button>
              </div>

              {filteredDestinations.length === 0 ? (
                <div className="card text-center p-12 animate-fade-in-up">
                  <SlidersHorizontal size={48} className="mx-auto text-border-strong mb-4" />
                  <h3 className="h3 mb-2 bn">{currentTranslations.emptyTitle}</h3>
                  <p className="text-fg-3 mb-6 bn">{currentTranslations.emptyDesc}</p>
                  <button
                    onClick={handleClearAll}
                    className="btn btn-primary btn-clear-filters mx-auto bn"
                  >
                    Clear All Filters
                  </button>
                </div>
              ) : (
                <div className="destinations-grid-full">
                  {filteredDestinations.map(country => (
                    <div key={country.slug || country.id} className="destination-card-full group">
                      
                      <Link href={`/destinations/${country.slug}`} className="card-link">
                        {/* Country Image with Zoom on Hover */}
                        <div className="card-image-wrapper">
                          <div 
                            className="card-image" 
                            style={{ backgroundImage: `url(${country.hero_image})` }}
                          />
                        </div>
                        
                        {/* Content */}
                        <div className="card-content">
                          <div className="card-title-row">
                            <Flag emoji={country.flag_emoji} className="card-flag" />
                            <h2 className="card-country-name bn">
                              {country.name}
                            </h2>
                          </div>
                          
                          {/* Tuition */}
                          <div className="card-tuition bn">
                            {currentTranslations.tuitionLabel}: <span className="card-tuition-val">{country.tuitionRange}</span>
                          </div>
                          
                          {/* Subject Pills */}
                          <div className="card-pills-row">
                            {country.popular_subjects?.map((subject: string) => (
                              <span key={subject} className="card-pill bn">
                                {subject}
                              </span>
                            ))}
                          </div>
                          
                          {/* Dashed Separator */}
                          <div className="card-divider" />
                          
                          {/* Footer of the card */}
                          <div className="card-footer">
                            <span className="card-intakes bn">{currentTranslations.intakesLabel}: <span className="card-intakes-val">{country.top_intakes?.join(', ')}</span></span>
                            <div className="card-arrow-circle">
                              <CaretRight size={14} className="card-arrow-icon" />
                            </div>
                          </div>
                        </div>
                      </Link>

                    </div>
                  ))}
                </div>
              )}
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
