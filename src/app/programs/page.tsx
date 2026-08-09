'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { MagnifyingGlass, CaretRight, GraduationCap, Sparkle, CaretDown, CaretUp, X, SlidersHorizontal, ArrowCounterClockwise, BookOpen, MapPin, Clock, Briefcase } from '@phosphor-icons/react';
import { destinations, universities, programs } from '../../data/destinations';
import { Flag } from '../../components/Flag';
import './programs.css';

export default function ProgramsPage() {
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

  // Enriched Programs data (joining with university and country info)
  const enrichedPrograms = programs.map(prog => {
    const uni = universities.find(u => u.slug === prog.university_slug || u.id === prog.university_slug);
    const country = uni ? destinations.find(d => d.slug === uni.country_slug || d.id === uni.country_slug) : null;
    return {
      ...prog,
      universityName: uni ? uni.name : prog.university_slug.toUpperCase(),
      universityRanking: uni ? uni.world_ranking : null,
      countryName: country ? country.name : 'Global',
      countryId: country ? country.id : '',
      countryFlag: country ? country.flag_emoji : '🌍',
      uniImage: uni?.image || ''
    };
  });

  // Filter States
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedCountries, setSelectedCountries] = useState<string[]>([]);
  const [selectedDegrees, setSelectedDegrees] = useState<string[]>([]);
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>([]);

  // Collapsible sidebar filter states
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    country: true,
    degree: true,
    subject: true
  });

  // Mobile Drawer toggle state
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);

  // Toggle sections collapse
  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  const isCollapsed = (section: string) => !expandedSections[section];

  // Checkbox toggle handler
  const handleToggle = (list: string[], setList: React.Dispatch<React.SetStateAction<string[]>>, val: string) => {
    if (list.includes(val)) {
      setList(list.filter(item => item !== val));
    } else {
      setList([...list, val]);
    }
  };

  // Clear all filters
  const handleClearAll = () => {
    setSelectedCountries([]);
    setSelectedDegrees([]);
    setSelectedSubjects([]);
    setSearchQuery('');
    setActiveCategory('all');
  };

  // Active filter count
  const activeFiltersCount = 
    selectedCountries.length +
    selectedDegrees.length +
    selectedSubjects.length +
    (searchQuery ? 1 : 0) +
    (activeCategory !== 'all' ? 1 : 0);

  // Lists of available options compiled dynamically from data
  const countriesList = Array.from(new Set(enrichedPrograms.map(p => p.countryName)));
  const degreesList = Array.from(new Set(enrichedPrograms.map(p => p.degree_level)));
  const subjectsList = Array.from(new Set(enrichedPrograms.flatMap(p => p.subjects_covered)));

  // Filter logic
  const filteredPrograms = enrichedPrograms.filter(prog => {
    // 1. MagnifyingGlass Query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchName = prog.name.toLowerCase().includes(q);
      const matchUni = prog.universityName.toLowerCase().includes(q);
      const matchCountry = prog.countryName.toLowerCase().includes(q);
      if (!matchName && !matchUni && !matchCountry) return false;
    }

    // 2. Category Tab Filter (Management/STEM/Law/Medicine check)
    if (activeCategory !== 'all') {
      const hasCategoryMatch = prog.subjects_covered.some(sub => {
        if (activeCategory === 'Medicine') {
          return sub === 'Medicine' || sub === 'Nursing';
        }
        return sub === activeCategory;
      });
      if (!hasCategoryMatch) return false;
    }

    // 3. Country Filter Checkbox
    if (selectedCountries.length > 0) {
      if (!selectedCountries.includes(prog.countryName)) return false;
    }

    // 4. Degree Level Checkbox
    if (selectedDegrees.length > 0) {
      if (!selectedDegrees.includes(prog.degree_level)) return false;
    }

    // 5. Subject Checkbox
    if (selectedSubjects.length > 0) {
      const hasSubjectMatch = prog.subjects_covered.some(sub => selectedSubjects.includes(sub));
      if (!hasSubjectMatch) return false;
    }

    return true;
  });

  const categories = [
    { id: 'all', label: 'সব', enLabel: 'All' },
    { id: 'Computer Science', label: 'কম্পিউটার সায়েন্স', enLabel: 'Computer Science' },
    { id: 'Business', label: 'বিজনেস', enLabel: 'Business' },
    { id: 'Engineering', label: 'ইঞ্জিনিয়ারিং', enLabel: 'Engineering' },
    { id: 'Law', label: 'আইন', enLabel: 'Law' },
    { id: 'Medicine', label: 'মেডিসিন ও হেলথ', enLabel: 'Medicine & Health' }
  ];

  const t = {
    bn: {
      title: "প্রোগ্রাম এক্সপ্লোর করো",
      subtitle: "বিশ্বসেরা সব বিশ্ববিদ্যালয় থেকে তোমার স্বপ্নের কোর্স ও ডিগ্রি বেছে নাও",
      allFunding: "ডিগ্রি ও কোর্সের বিস্তারিত তথ্য",
      searchPlaceholder: "প্রোগ্রাম বা বিশ্ববিদ্যালয়ের নাম দিয়ে খোঁজো...",
      filterTitle: "ফিল্টারসমূহ",
      clearAll: "সব মুছুন",
      countryFilter: "🌍 দেশ / গন্তব্য",
      degreeFilter: "🎓 ডিগ্রির স্তর",
      subjectFilter: "📚 বিষয় ক্ষেত্র",
      resultsCount: (count: number) => `মোট ${count} টি প্রোগ্রাম পাওয়া গেছে`,
      emptyTitle: "কোনো প্রোগ্রাম পাওয়া যায়নি",
      emptyDesc: "আপনার সিলেক্ট করা ফিল্টারের সাথে মিলে যায় এমন কোনো প্রোগ্রাম আপাতত নেই। শীঘ্রই যুক্ত করা হবে।",
      tuitionLabel: "বার্ষিক টিউশন ফি",
      viewDetails: "বিস্তারিত দেখো",
      durationLabel: "সময়কাল",
      gpaLabel: "নূন্যতম জিপিএ",
      ieltsLabel: "আইইএলটিএস",
      years: (y: number) => `${y} বছর`,
      popularTag: "জনপ্রিয়"
    },
    en: {
      title: "Explore Programs",
      subtitle: "Select your dream course and degree from top-ranked universities worldwide",
      allFunding: "Degree Details & Course Curriculum",
      searchPlaceholder: "Search by program or university name...",
      filterTitle: "Filters",
      clearAll: "Clear All",
      countryFilter: "🌍 Country / Destination",
      degreeFilter: "🎓 Degree Level",
      subjectFilter: "📚 Subject Area",
      resultsCount: (count: number) => `Found ${count} programs`,
      emptyTitle: "No Programs Found",
      emptyDesc: "There are currently no programs matching your selected filters. More programs will be added soon.",
      tuitionLabel: "Annual Tuition",
      viewDetails: "View Details",
      durationLabel: "Duration",
      gpaLabel: "Min GPA",
      ieltsLabel: "IELTS Req",
      years: (y: number) => `${y} ${y === 1 ? 'Year' : 'Years'}`,
      popularTag: "Popular"
    }
  };

  const currentTranslations = lang === 'bn' ? t.bn : t.en;

  return (
    <div className="bg-light-upgrade min-h-screen">
      {/* Dark Gradient Hero Header */}
      <section className="dark-hero-style-upgrade text-center relative pt-20 pb-36">
        <div className="announcement-shimmer mb-6 mx-auto inline-flex items-center gap-2">
          <Sparkle size={14} className="sparkle-anim" /> 🎓 {currentTranslations.allFunding}
        </div>
        <h1 className="h-display-upgrade text-white mb-6 bn">
          {currentTranslations.title}
        </h1>
        <p className="body-upgrade text-white max-w-600 mx-auto mb-10 bn" style={{ opacity: 0.85 }}>
          {currentTranslations.subtitle}
        </p>

        {/* MagnifyingGlass Box in Hero */}
        <div className="search-bar-hero-container">
          <div className="search-input-wrapper-upgrade">
            <MagnifyingGlass size={22} className="search-icon-upgrade" color="#22C55E" />
            <input 
              type="text" 
              placeholder={currentTranslations.searchPlaceholder} 
              className="input-search-upgrade bn" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </section>

      <section className="container relative z-20" style={{ marginTop: '-40px' }}>
        {/* Horizontal Category Tabs */}
        <div className="category-tabs-wrapper">
          <div className="category-tabs-scroll">
            {categories.map((cat) => {
              const active = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`category-tab-button bn ${active ? 'active' : ''}`}
                >
                  {lang === 'bn' ? cat.label : cat.enLabel}
                </button>
              );
            })}
          </div>
        </div>

        <div className="programs-layout-wrapper">
          <div className="layout-grid-sidebar">
            {/* Left Sidebar Filter Panel */}
            <aside className={`filter-sidebar-wrapper ${mobileDrawerOpen ? 'drawer-open' : ''}`}>
              <div className="filter-sidebar-inner">
                {/* Header */}
                <div className="filter-sidebar-header">
                  <div className="flex items-center gap-2">
                    <SlidersHorizontal size={18} className="text-emerald-500" />
                    <span className="font-bold text-slate-800 text-base">
                      {currentTranslations.filterTitle} {activeFiltersCount > 0 && `(${activeFiltersCount})`}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    {activeFiltersCount > 0 && (
                      <button
                        onClick={handleClearAll}
                        className="clear-all-btn text-xs font-semibold flex items-center gap-1"
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

                {/* Filter Scroll Block */}
                <div className="filter-scroll-area">
                  {/* Country Filter */}
                  <div className="filter-section-block">
                    <button 
                      className="filter-section-header"
                      onClick={() => toggleSection('country')}
                    >
                      <span className="bn">{currentTranslations.countryFilter}</span>
                      {isCollapsed('country') ? <CaretDown size={16} /> : <CaretUp size={16} />}
                    </button>

                    {!isCollapsed('country') && (
                      <div className="filter-section-body">
                        {countriesList.map((c, i) => (
                          <label key={i} className="filter-checkbox-label">
                            <input 
                              type="checkbox"
                              checked={selectedCountries.includes(c)}
                              onChange={() => handleToggle(selectedCountries, setSelectedCountries, c)}
                              className="filter-checkbox-input"
                            />
                            <span className="checkbox-text-custom">{c}</span>
                          </label>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Degree Filter */}
                  <div className="filter-section-block">
                    <button 
                      className="filter-section-header"
                      onClick={() => toggleSection('degree')}
                    >
                      <span className="bn">{currentTranslations.degreeFilter}</span>
                      {isCollapsed('degree') ? <CaretDown size={16} /> : <CaretUp size={16} />}
                    </button>

                    {!isCollapsed('degree') && (
                      <div className="filter-section-body">
                        {degreesList.map((deg, i) => (
                          <label key={i} className="filter-checkbox-label">
                            <input 
                              type="checkbox"
                              checked={selectedDegrees.includes(deg)}
                              onChange={() => handleToggle(selectedDegrees, setSelectedDegrees, deg)}
                              className="filter-checkbox-input"
                            />
                            <span className="checkbox-text-custom">{deg}</span>
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

            {/* Mobile Drawer overlay backdrop */}
            {mobileDrawerOpen && (
              <div
                className="mobile-drawer-backdrop"
                onClick={() => setMobileDrawerOpen(false)}
              ></div>
            )}

            {/* Right Content Area */}
            <div className="filtered-content-area">
              <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
                <div className="results-heading-with-line">
                  <h2 className="filtered-results-count-upgrade bn">
                    {currentTranslations.resultsCount(filteredPrograms.length)}
                  </h2>
                  <div className="heading-green-line"></div>
                </div>

                {/* Mobile Filter Toggle button */}
                <button
                  className="mobile-filter-toggle-btn btn btn-primary flex items-center gap-2"
                  onClick={() => setMobileDrawerOpen(true)}
                >
                  <SlidersHorizontal size={16} /> Filters {activeFiltersCount > 0 && `(${activeFiltersCount})`}
                </button>
              </div>

              {filteredPrograms.length === 0 ? (
                <div className="empty-state-container animate-fade-in-up">
                  <X size={48} className="empty-state-icon" />
                  <h3 className="empty-state-title bn">{currentTranslations.emptyTitle}</h3>
                  <p className="empty-state-desc bn">{currentTranslations.emptyDesc}</p>
                </div>
              ) : (
                <div className="programs-three-col-grid">
                  {filteredPrograms.map((prog, idx) => (
                    <ProgramCard key={idx} program={prog} lang={lang} currentTranslations={currentTranslations} />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function ProgramCard({ program, lang, currentTranslations }: { program: any; lang: string; currentTranslations: any }) {
  // Simple square icon based on program first character
  const logoText = program.name.substring(0, 2).toUpperCase();

  return (
    <div className="card program-card-upgrade animate-fade-in-up">
      <div className="program-card-top-row">
        <div className="uni-logo-box-square">{logoText}</div>
        <span className="degree-level-badge">{program.degree_level}</span>
      </div>

      <div className="program-card-uni-meta">
        <Flag emoji={program.countryFlag} className="country-flag-badge" />
        <span className="uni-name-text-sm">{program.universityName}</span>
      </div>

      <h3 className="program-card-title-heading">
        {program.name}
      </h3>

      <div className="program-card-detail-item">
        <Clock size={15} />
        <span>
          <strong>{currentTranslations.durationLabel}: </strong>
          {currentTranslations.years(program.duration_years)}
        </span>
      </div>

      <div className="program-card-detail-item">
        <GraduationCap size={15} />
        <span>
          <strong>{currentTranslations.ieltsLabel}: </strong>
          {program.ielts_requirement}
        </span>
      </div>

      <div className="program-card-detail-item">
        <BookOpen size={15} />
        <span>
          <strong>{currentTranslations.gpaLabel}: </strong>
          {program.min_gpa}
        </span>
      </div>

      <div className="program-card-divider"></div>

      <div className="program-card-cta-row">
        <div className="program-tuition-label">
          <span className="tuition-cost-val">
            {program.annual_tuition.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 })}
          </span>
          <span className="tuition-label-text bn">{currentTranslations.tuitionLabel}</span>
        </div>

        <Link href={`/destinations/${program.countryId}/${program.university_slug}`} className="program-details-link-btn bn">
          {currentTranslations.viewDetails} <CaretRight size={14} />
        </Link>
      </div>
    </div>
  );
}
