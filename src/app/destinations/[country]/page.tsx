import React from 'react';
import { destinations, universities } from '../../../data/destinations';
import Link from 'next/link';
import { MapPin, CurrencyDollar, BookOpen, Clock, CaretRight, GraduationCap, Medal, Calendar, Briefcase, Users, CheckCircle, ChartBar } from '@phosphor-icons/react/ssr';
import { Flag } from '../../../components/Flag';
import './country.css';

export async function generateMetadata({ params }: { params: Promise<{ country: string }> }) {
  const { country: countrySlug } = await params;
  const country = destinations.find(d => d.slug === countrySlug);
  if (country) {
    return { title: `Study in ${country.name} | 10 Minute School Study Abroad` };
  }
  return { title: 'Destination Coming Soon | 10 Minute School Study Abroad' };
}

export default async function CountryPage({ params }: { params: Promise<{ country: string }> }) {
  const { country: countrySlug } = await params;
  const country = destinations.find(d => d.slug === countrySlug);

  if (!country) {
    return (
      <div className="not-found-wrap">
        <div className="card not-found-box">
          <h2>Destination Coming Soon</h2>
          <p>We are still preparing the best universities and resources for this country.</p>
          <Link href="/destinations" className="btn btn-primary w-full">সব দেশে ফিরে যান</Link>
        </div>
      </div>
    );
  }

  const countryUniversities = universities.filter(u => u.country_slug === country.slug);

  return (
    <div className="country-details pb-24">
      {/* Hero Section */}
      <section 
        className="country-hero relative"
        style={{
          backgroundImage: `url(${country.hero_image || 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=2000'})`,
        }}
      >
        <div className="container relative z-10 hero-content text-white">
          <div className="breadcrumb-nav">
            <Link href="/" className="breadcrumb-link">Home</Link>
            <span className="breadcrumb-separator">&gt;</span>
            <Link href="/destinations" className="breadcrumb-link">Destinations</Link>
            <span className="breadcrumb-separator">&gt;</span>
            <span className="breadcrumb-current">{country.name}</span>
          </div>

          <div className="hero-header-flex">
            <div className="hero-title-area">
              <div className="hero-flag-title">
                <Flag emoji={country.flag_emoji} className="hero-flag" />
                <h1 className="hero-title">Study in {country.name}</h1>
              </div>
              <p className="hero-desc">
                {country.slug === 'uk' 
                  ? "The UK is home to some of the world's oldest and most prestigious universities, offering world-class education with globally recognized degrees."
                  : `Discover world-class education, vibrant campus life, and excellent career opportunities in ${country.name}.`
                }
              </p>
            </div>
            <div>
              <button className="hero-btn-compare">
                <ChartBar size={16} /> Add to Compare
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Overlapping Statistics Grid */}
      <section className="container stats-overlap-container">
        <div className="stats-grid">
          <div className="stat-card-custom">
            <div className="stat-icon-wrapper tuition">
              <CurrencyDollar size={18} />
            </div>
            <div className="stat-info-wrapper">
              <span className="stat-label-custom">Avg Tuition/yr</span>
              <span className="stat-value-custom">{country.tuitionRange}</span>
            </div>
          </div>

          <div className="stat-card-custom">
            <div className="stat-icon-wrapper living">
              <CurrencyDollar size={18} />
            </div>
            <div className="stat-info-wrapper">
              <span className="stat-label-custom">Cost of Living/mo</span>
              <span className="stat-value-custom">{country.costOfLiving}</span>
            </div>
          </div>

          <div className="stat-card-custom">
            <div className="stat-icon-wrapper universities">
              <Users size={18} />
            </div>
            <div className="stat-info-wrapper">
              <span className="stat-label-custom">Universities</span>
              <span className="stat-value-custom">{country.numUniversitiesStr}</span>
            </div>
          </div>

          <div className="stat-card-custom">
            <div className="stat-icon-wrapper work">
              <Briefcase size={18} />
            </div>
            <div className="stat-info-wrapper">
              <span className="stat-label-custom">Post-Study Work</span>
              <span className="stat-value-custom">{country.workPermitStr}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Two-Column Layout */}
      <section className="container">
        <div className="country-layout">
          {/* LEFT COLUMN - Content */}
          <div className="country-main-content">
            
            {/* Why Study Here */}
            {country.whyStudyHere && country.whyStudyHere.length > 0 && (
              <div className="content-section-card">
                <h2 className="section-title-custom">Why Study in {country.name}?</h2>
                <div className="why-study-list">
                  {country.whyStudyHere.map((reason, index) => (
                    <div key={index} className="why-study-item">
                      <CheckCircle className="why-study-icon-check" size={20} />
                      <p className="why-study-text">{reason}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Top Universities */}
            <div className="content-section-card">
              <h2 className="section-title-custom">Top Universities</h2>
              
              {countryUniversities.length === 0 ? (
                <div className="card text-center py-12 animate-fade-in-up">
                  <BookOpen size={48} className="mx-auto text-[var(--border-strong)] mb-4" />
                  <h3 className="text-lg font-bold mb-2 text-[var(--fg-1)]">Universities updating soon</h3>
                  <p className="text-sm text-[var(--fg-2)]">We are curating the best options for you.</p>
                </div>
              ) : (
                <div className="uni-list-container">
                  {countryUniversities.map(uni => (
                    <div key={uni.slug} className="uni-horizontal-card">
                      {uni.image && (
                        <img src={uni.image} alt={uni.name} className="uni-card-thumb" />
                      )}
                      <div className="uni-card-details">
                        <div>
                          <h3 className="uni-card-name">{uni.name}</h3>
                          <div className="uni-card-location">
                            <MapPin size={14} /> {uni.city}
                          </div>
                          <div className="uni-card-row-meta">
                            <span>Tuition: <strong>{uni.tuitionRangeStr || `$${uni.tuition_per_year.toLocaleString()}/yr`}</strong></span>
                            <span>IELTS: <strong>{uni.ielts_requirement}</strong></span>
                            {uni.hasScholarship && (
                              <span className="uni-scholarship-badge">Scholarship available</span>
                            )}
                          </div>
                        </div>
                        <div className="uni-compare-btn-wrap">
                          <button className="uni-compare-btn">+ Compare</button>
                        </div>
                      </div>
                      
                      <span className="uni-card-rank-badge">#{uni.world_ranking}</span>
                      <Link href={`/destinations/${country.slug}/${uni.slug}`} className="uni-card-view-link">
                        View <CaretRight size={14} />
                      </Link>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Available Scholarships */}
            {country.scholarships_list && country.scholarships_list.length > 0 && (
              <div className="content-section-card">
                <h2 className="section-title-custom">
                  <Medal className="text-amber-500 shrink-0" size={22} /> Available Scholarships
                </h2>
                <div className="schol-list-container">
                  {country.scholarships_list.map((schol, idx) => (
                    <div key={idx} className="schol-item-card">
                      <h3 className="schol-card-title">{schol.name}</h3>
                      {schol.level && (
                        <span className="schol-level-tag">{schol.level}</span>
                      )}
                      <div className="schol-card-amount">{schol.amount}</div>
                      <p className="schol-card-desc">{schol.desc}</p>
                      {schol.deadline && (
                        <div className="schol-card-deadline">
                          <Calendar size={14} /> {schol.deadline}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
                
                <Link href="/scholarships" className="schol-view-all-link">
                  View all scholarships <CaretRight size={14} />
                </Link>
              </div>
            )}

            {/* Visa Overview */}
            {country.visa_overview ? (
              <div className="content-section-card">
                <h2 className="section-title-custom">Visa Overview</h2>
                <div className="visa-badge-processing">
                  <Clock size={16} /> {country.visa_overview.processing}
                </div>
                <h3 className="visa-req-title">Key Requirements</h3>
                <ul className="visa-bullets-list">
                  {country.visa_overview.requirements.map((req, idx) => (
                    <li key={idx} className="visa-bullet-item">{req}</li>
                  ))}
                </ul>
              </div>
            ) : (
              <div className="content-section-card">
                <h2 className="section-title-custom">Visa Overview</h2>
                <p className="text-sm text-[var(--fg-2)] leading-relaxed">{country.visa_description}</p>
              </div>
            )}

            {/* Student Testimonials */}
            {country.testimonials && country.testimonials.length > 0 && (
              <div className="content-section-card">
                <h2 className="section-title-custom">Student Testimonials</h2>
                <div>
                  {country.testimonials.map((test, idx) => (
                    <div key={idx} className="testimonial-item-card">
                      <div className="test-header-wrap">
                        {test.avatar && (
                          <img src={test.avatar} alt={test.name} className="test-avatar-img" />
                        )}
                        <div>
                          <h4 className="test-student-name">{test.name}</h4>
                          <p className="test-student-uni">{test.university}</p>
                        </div>
                      </div>
                      <p className="test-quote-text">"{test.quote}"</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>

          {/* RIGHT COLUMN - Sticky Sidebar */}
          <div className="country-sidebar-wrapper">
            {/* Counseling Form */}
            <div className="sidebar-counseling-card">
              <h3 className="sidebar-form-title">Book a Free Counseling Session</h3>
              <p className="sidebar-form-subtitle">Our expert counselors are ready to guide you.</p>
              
              <form className="counseling-fields-form">
                <input 
                  type="text" 
                  placeholder="Your full name" 
                  className="sidebar-input-field" 
                  required 
                />
                <input 
                  type="tel" 
                  placeholder="Phone number" 
                  className="sidebar-input-field" 
                  required 
                />
                <input 
                  type="email" 
                  placeholder="Email address (optional)" 
                  className="sidebar-input-field" 
                />
                <button type="button" className="sidebar-submit-btn">
                  Get Free Counseling
                </button>
              </form>
              
              <p className="sidebar-form-disclaimer">Free, no obligation. We respect your privacy.</p>
            </div>

            {/* Popular Subjects */}
            {country.popular_subjects && country.popular_subjects.length > 0 && (
              <div className="sidebar-subjects-card">
                <h3 className="sidebar-sub-title">Popular Subjects</h3>
                <div className="subjects-flex-chips">
                  {country.popular_subjects.map((subject, idx) => (
                    <span key={idx} className="subject-custom-chip">{subject}</span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
