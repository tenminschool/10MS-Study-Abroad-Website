"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { MagnifyingGlass, Calendar, CheckCircle, CaretRight, GraduationCap, Sparkle, CaretDown, CaretUp, X, SlidersHorizontal, ArrowCounterClockwise } from '@phosphor-icons/react';
import { Flag } from '../../components/Flag';
import './scholarships.css';

interface Scholarship {
  name: string;
  country: string;
  countryId: string;
  flag: string;
  funding: string;
  description: string;
  eligibility: string[];
  deadline: string;
  degrees: string[];
  // Filter helper fields
  countryCategory: 'United Kingdom' | 'United States' | 'Canada' | 'Australia' | 'Germany' | 'Others';
  fundingType: 'Fully Funded' | 'Partial Funding' | 'Stipend Only' | 'Living Allowance Only';
  deadlineMonth: string; // 'January', 'February', etc.
  eligibilityKeys: string[]; // 'openToBangladeshi', 'workExperience', 'ageLimit', 'firstClass', 'noIelts'
  scholarshipType: 'Government' | 'University' | 'Private/NGO';
}

interface ScholarshipsClientProps {
  scholarships: Scholarship[];
}

export default function ScholarshipsClient({ scholarships: scholarshipsData }: ScholarshipsClientProps) {
  // Filter States
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCountries, setSelectedCountries] = useState<string[]>([]);
  const [selectedDegrees, setSelectedDegrees] = useState<string[]>([]);
  const [selectedFundingTypes, setSelectedFundingTypes] = useState<string[]>([]);
  const [selectedMonths, setSelectedMonths] = useState<string[]>([]);
  const [selectedEligibilities, setSelectedEligibilities] = useState<string[]>([]);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);

  // Collapsible sections toggle states
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    country: true,
    degree: true,
    funding: true,
    deadline: true,
    eligibility: true,
    type: true
  });

  // Mobile Drawer Toggle state
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);

  // Toggle Collapse helper
  const toggleSectionExpanded = (section: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const isCollapsed = (section: string) => {
    return !expandedSections[section];
  };

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
    setSelectedCountries([]);
    setSelectedDegrees([]);
    setSelectedFundingTypes([]);
    setSelectedMonths([]);
    setSelectedEligibilities([]);
    setSelectedTypes([]);
    setSearchQuery('');
  };

  // Active filter count
  const activeFiltersCount = 
    selectedCountries.length +
    selectedDegrees.length +
    selectedFundingTypes.length +
    selectedMonths.length +
    selectedEligibilities.length +
    selectedTypes.length;

  // Filter application logic
  const filteredScholarships = scholarshipsData.filter(schol => {
    // 1. MagnifyingGlass Query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchName = schol.name?.toLowerCase().includes(q);
      const matchCountry = schol.country?.toLowerCase().includes(q);
      const matchDesc = schol.description?.toLowerCase().includes(q);
      if (!matchName && !matchCountry && !matchDesc) return false;
    }

    // 2. Country Category
    if (selectedCountries.length > 0) {
      if (!selectedCountries.includes(schol.countryCategory)) {
        return false;
      }
    }

    // 3. Degree Level
    if (selectedDegrees.length > 0) {
      const hasDegreeMatch = schol.degrees?.some(d => {
        const normalized = d === 'Bachelor' ? 'Undergraduate' : d;
        return selectedDegrees.includes(normalized);
      });
      if (!hasDegreeMatch) return false;
    }

    // 4. Funding Type
    if (selectedFundingTypes.length > 0) {
      if (!selectedFundingTypes.includes(schol.fundingType)) {
        return false;
      }
    }

    // 5. Deadline Month
    if (selectedMonths.length > 0) {
      if (!selectedMonths.includes(schol.deadlineMonth)) {
        return false;
      }
    }

    // 6. Eligibility (AND logic - must satisfy all selected criteria)
    if (selectedEligibilities.length > 0) {
      const matchesAllEligibilities = selectedEligibilities.every(key => {
        return schol.eligibilityKeys?.includes(key);
      });
      if (!matchesAllEligibilities) return false;
    }

    // 7. Scholarship Type
    if (selectedTypes.length > 0) {
      if (!selectedTypes.includes(schol.scholarshipType)) {
        return false;
      }
    }

    return true;
  });

  const monthsList = [
    'January', 'February', 'March', 'April', 'May', 'June', 
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const eligibilityOptions = [
    { label: 'Open to Bangladeshi Citizens', key: 'openToBangladeshi' },
    { label: 'Work Experience Required', key: 'workExperience' },
    { label: 'Age Limit (Under 35)', key: 'ageLimit' },
    { label: 'First-class degree required', key: 'firstClass' },
    { label: 'No IELTS Required', key: 'noIelts' }
  ];

  return (
    <div className="scholarships-page bg-light-upgrade min-h-screen">
      {/* Dark Gradient Hero Section with Geo Watermarks */}
      <section className="dark-hero-style-upgrade text-center relative pt-20 pb-36">
        <div className="announcement-shimmer mb-6 mx-auto inline-flex items-center gap-2">
          <Sparkle size={14} className="sparkle-anim" /> 💰 ১০০% ফ্রি ফান্ডিং সুযোগ
        </div>
        <h1 className="h-display-upgrade text-white mb-6">
          সেরা স্কলারশিপ <span className="highlight-green">খুঁজে নাও</span>
        </h1>
        <p className="body-upgrade text-white max-w-600 mx-auto mb-10" style={{ opacity: 0.85 }}>
          বাংলাদেশি শিক্ষার্থীদের জন্য বিশ্বজুড়ে ছড়িয়ে থাকা সেরা ফান্ডিং ও স্কলারশিপের সুযোগগুলো এক্সপ্লোর করো।
        </p>

        {/* 2. Prominent MagnifyingGlass Bar sitting inside Hero */}
        <div className="search-bar-hero-container">
          <div className="search-input-wrapper-upgrade">
            <MagnifyingGlass size={22} className="search-icon-upgrade" color="#22C55E" />
            <input 
              type="text" 
              placeholder="স্কলারশিপ, দেশ বা প্রোগ্রামের নাম দিয়ে খোঁজো..." 
              className="input-search-upgrade" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </section>

      <section className="container relative z-20" style={{ marginTop: '-40px' }}>
        <div className="scholarships-layout-wrapper">
          <div className="layout-grid-sidebar">
            
            {/* Left Sidebar filter panel */}
            <aside className={`filter-sidebar-wrapper ${mobileDrawerOpen ? 'drawer-open' : ''}`}>
              <div className="filter-sidebar-inner">
                
                {/* Sidebar Header */}
                <div className="filter-sidebar-header">
                  <div className="flex items-center gap-2">
                    <SlidersHorizontal size={18} className="text-emerald-500" />
                    <span className="font-bold text-[var(--fg-1)] text-base">
                      Filters {activeFiltersCount > 0 && `(${activeFiltersCount})`}
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    {activeFiltersCount > 0 && (
                      <button 
                        onClick={handleClearAll}
                        className="clear-all-btn text-xs font-semibold text-red-500 flex items-center gap-1 hover:text-red-600 transition-colors"
                      >
                        <ArrowCounterClockwise size={12} /> Clear All
                      </button>
                    )}
                    <button 
                      className="mobile-drawer-close-x md:hidden" 
                      onClick={() => setMobileDrawerOpen(false)}
                    >
                      <X size={20} />
                    </button>
                  </div>
                </div>

                {/* Sidebar Filter Lists */}
                <div className="filter-scroll-area">
                  
                  {/* Section 1: Country */}
                  <div className="filter-section-block">
                    <button 
                      className="filter-section-header"
                      onClick={() => toggleSectionExpanded('country')}
                    >
                      <span>🌍 Country / Destination</span>
                      {isCollapsed('country') ? <CaretDown size={16} /> : <CaretUp size={16} />}
                    </button>
                    
                    {!isCollapsed('country') && (
                      <div className="filter-section-body">
                        {['United Kingdom', 'United States', 'Canada', 'Australia', 'Germany', 'Others'].map((c, i) => (
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

                  {/* Section 2: Degree Level */}
                  <div className="filter-section-block">
                    <button 
                      className="filter-section-header"
                      onClick={() => toggleSectionExpanded('degree')}
                    >
                      <span>🎓 Degree Level</span>
                      {isCollapsed('degree') ? <CaretDown size={16} /> : <CaretUp size={16} />}
                    </button>
                    
                    {!isCollapsed('degree') && (
                      <div className="filter-section-body">
                        {['Undergraduate', 'Master', 'PhD', 'Diploma'].map((deg, i) => (
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

                  {/* Section 3: Funding Type */}
                  <div className="filter-section-block">
                    <button 
                      className="filter-section-header"
                      onClick={() => toggleSectionExpanded('funding')}
                    >
                      <span>💰 Funding Type</span>
                      {isCollapsed('funding') ? <CaretDown size={16} /> : <CaretUp size={16} />}
                    </button>
                    
                    {!isCollapsed('funding') && (
                      <div className="filter-section-body">
                        {[
                          { label: 'Fully Funded (tuition + stipend + airfare)', val: 'Fully Funded' },
                          { label: 'Partial Funding (tuition only)', val: 'Partial Funding' },
                          { label: 'Stipend Only', val: 'Stipend Only' },
                          { label: 'Living Allowance Only', val: 'Living Allowance Only' }
                        ].map((fund, i) => (
                          <label key={i} className="filter-checkbox-label">
                            <input 
                              type="checkbox"
                              checked={selectedFundingTypes.includes(fund.val)}
                              onChange={() => handleToggle(selectedFundingTypes, setSelectedFundingTypes, fund.val)}
                              className="filter-checkbox-input"
                            />
                            <span className="checkbox-text-custom">{fund.label}</span>
                          </label>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Section 4: Deadline Month */}
                  <div className="filter-section-block">
                    <button 
                      className="filter-section-header"
                      onClick={() => toggleSectionExpanded('deadline')}
                    >
                      <span>📅 Deadline Month</span>
                      {isCollapsed('deadline') ? <CaretDown size={16} /> : <CaretUp size={16} />}
                    </button>
                    
                    {!isCollapsed('deadline') && (
                      <div className="filter-section-body">
                        <div className="months-grid-chips">
                          {monthsList.map((m, i) => {
                            const active = selectedMonths.includes(m);
                            return (
                              <button
                                key={i}
                                type="button"
                                onClick={() => handleToggle(selectedMonths, setSelectedMonths, m)}
                                className={`month-chip-button ${active ? 'active' : ''}`}
                              >
                                {m.substring(0, 3)}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Section 5: Eligibility */}
                  <div className="filter-section-block">
                    <button 
                      className="filter-section-header"
                      onClick={() => toggleSectionExpanded('eligibility')}
                    >
                      <span>✅ Eligibility</span>
                      {isCollapsed('eligibility') ? <CaretDown size={16} /> : <CaretUp size={16} />}
                    </button>
                    
                    {!isCollapsed('eligibility') && (
                      <div className="filter-section-body">
                        {eligibilityOptions.map((opt, i) => (
                          <label key={i} className="filter-checkbox-label">
                            <input 
                              type="checkbox"
                              checked={selectedEligibilities.includes(opt.key)}
                              onChange={() => handleToggle(selectedEligibilities, setSelectedEligibilities, opt.key)}
                              className="filter-checkbox-input"
                            />
                            <span className="checkbox-text-custom">{opt.label}</span>
                          </label>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Section 6: Scholarship Type */}
                  <div className="filter-section-block">
                    <button 
                      className="filter-section-header"
                      onClick={() => toggleSectionExpanded('type')}
                    >
                      <span>🔍 Scholarship Type</span>
                      {isCollapsed('type') ? <CaretDown size={16} /> : <CaretUp size={16} />}
                    </button>
                    
                    {!isCollapsed('type') && (
                      <div className="filter-section-body">
                        {[
                          { label: 'Government Scholarship', val: 'Government' },
                          { label: 'University Scholarship', val: 'University' },
                          { label: 'Private/NGO Scholarship', val: 'Private/NGO' }
                        ].map((t, i) => (
                          <label key={i} className="filter-checkbox-label">
                            <input 
                              type="checkbox"
                              checked={selectedTypes.includes(t.val)}
                              onChange={() => handleToggle(selectedTypes, setSelectedTypes, t.val)}
                              className="filter-checkbox-input"
                            />
                            <span className="checkbox-text-custom">{t.label}</span>
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
                className="mobile-drawer-backdrop md:hidden"
                onClick={() => setMobileDrawerOpen(false)}
              ></div>
            )}

            {/* Right Side: Content Area */}
            <div className="filtered-content-area">
              <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
                <div className="results-heading-with-line">
                  <h2 className="filtered-results-count-upgrade">
                    মোট {filteredScholarships.length} টি স্কলারশিপ পাওয়া গেছে
                  </h2>
                  <div className="heading-green-line"></div>
                </div>
                
                {/* Mobile Filter Toggle Button */}
                <button 
                  className="mobile-filter-toggle-btn btn btn-primary flex md:hidden items-center gap-2"
                  onClick={() => setMobileDrawerOpen(true)}
                >
                  <SlidersHorizontal size={16} /> Filters {activeFiltersCount > 0 && `(${activeFiltersCount})`}
                </button>
              </div>

              {filteredScholarships.length === 0 ? (
                <div className="card text-center p-12 animate-fade-in-up">
                  <SlidersHorizontal size={48} className="mx-auto text-[var(--border-strong)] mb-4" />
                  <h3 className="h3 mb-2">কোন স্কলারশিপ পাওয়া যায়নি</h3>
                  <p className="text-[var(--fg-3)] mb-6">আপনার সিলেক্ট করা ফিল্টারের সাথে মিলে যায় এমন কোন স্কলারশিপ পাওয়া যায়নি।</p>
                  <button 
                    onClick={handleClearAll}
                    className="btn btn-primary px-6 py-2.5 mx-auto"
                  >
                    Clear All Filters
                  </button>
                </div>
              ) : (
                <div className="scholarships-two-col-grid">
                  {filteredScholarships.map((schol, idx) => (
                    <ScholarshipCard key={idx} schol={schol} />
                  ))}
                </div>
              )}
            </div>

          </div>
        </div>

        {/* Lead Generation Bottom Banner */}
        <div className="card bg-inverse text-white p-12 dark-hero-style flex flex-col md:flex-row items-center justify-between gap-8 mb-12">
          <div className="flex-1 text-center md:text-left">
            <h2 className="text-white mb-4 h2 bn">যোগ্যতা অনুযায়ী স্কলারশিপ খুঁজছেন?</h2>
            <p className="max-w-600 text-white body bn" style={{ opacity: 0.85 }}>
              আমাদের এক্সপার্টরা আপনার প্রোফাইল অ্যানালাইজ করে জানিয়ে দিবেন কোন দেশে আপনার জন্য সেরা ফান্ডিং এর সুযোগ রয়েছে।
            </p>
          </div>
          <div>
            <button className="btn btn-primary btn-pulse bn text-lg px-8 py-4">
              ফ্রি সেশন বুক করো
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

// Helper: Calculate if the deadline month is within 3 months of current date
function isWithin3Months(deadlineMonthStr: string) {
  if (!deadlineMonthStr) return false;
  const months = [
    'january', 'february', 'march', 'april', 'may', 'june',
    'july', 'august', 'september', 'october', 'november', 'december'
  ];
  
  const currentMonthIdx = new Date().getMonth(); // 0 to 11
  const deadlineIdx = months.indexOf(deadlineMonthStr.toLowerCase());
  if (deadlineIdx === -1) return false;

  // calculate difference in circular calendar months
  const diff = (deadlineIdx - currentMonthIdx + 12) % 12;
  return diff >= 0 && diff <= 3;
}

// Subcomponent: Scholarship Card for animation and isolation
function ScholarshipCard({ schol }: { schol: Scholarship }) {
  const isNear = isWithin3Months(schol.deadlineMonth);

  return (
    <div className="card scholarship-card-upgrade hover-lift-upgrade animate-fade-in-up">
      <div className="flex justify-between items-start mb-2">
        <h3 className="scholarship-card-title-upgrade">{schol.name}</h3>
        <div className="flex flex-col gap-2 shrink-0">
          {schol.degrees?.map((degree, i) => (
            <span key={i} className="degree-pill-upgrade flex items-center gap-1 justify-center">
              <GraduationCap size={12}/> {degree}
            </span>
          ))}
        </div>
      </div>
      
      <div className="flex items-center gap-2 mb-3">
        <div className="country-pill-upgrade">
          <Flag emoji={schol.flag} className="text-base leading-none" />
          <span>{schol.country}</span>
        </div>
      </div>

      <div className="funding-box-upgrade flex items-start gap-2 mb-4">
        <div className="mt-0.5"><Sparkle size={16} className="text-emerald-500 sparkle-icon-pill" /></div>
        <div className="funding-text-p">{schol.funding}</div>
      </div>

      <p className="description-text-upgrade text-[var(--fg-2)] line-clamp-2 mb-4">
        {schol.description}
      </p>

      <div className="divider mb-4"></div>

      <div className="eligibility-section-upgrade flex-1 mb-4">
        <h4 className="meta text-[var(--fg-3)] uppercase tracking-wider mb-3 text-xs font-bold">Eligibility</h4>
        <ul className="flex flex-col gap-2.5">
          {schol.eligibility?.map((item, i) => (
            <li key={i} className="flex items-start gap-2 body-sm text-[var(--fg-1)]">
              <CheckCircle size={16} className="text-emerald-500 mt-0.5 shrink-0"/>
              <span className="eligibility-item-text">{item}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Card Footer */}
      <div className="card-footer-upgrade mt-auto pt-4 flex items-center justify-between border-t border-slate-100">
        <div className={`deadline-badge-upgrade ${isNear ? 'deadline-danger' : 'deadline-normal'}`}>
          <Calendar size={14}/>
          <span>{schol.deadline}</span>
        </div>
        {schol.countryId && (
          <Link href={`/destinations/${schol.countryId}`} className="view-country-link-upgrade">
            {schol.country} দেখুন <CaretRight size={14} className="arrow-icon" />
          </Link>
        )}
      </div>
    </div>
  );
}
