import React from 'react';
import { universities, programs } from '../../../../data/destinations';
import Link from 'next/link';
import { MapPin, Trophy, GraduationCap, Clock, CheckSquare } from '@phosphor-icons/react/ssr';
import './university.css';

export default async function UniversityPage({ params }: { params: Promise<{ country: string, university: string }> }) {
  const { country, university } = await params;
  const uni = universities.find(u => u.slug === university && u.country_slug === country);
  
  if (!uni) {
    return (
      <div className="not-found-wrap">
        <div className="card not-found-box">
          <h2>University Not Found</h2>
          <p>The university you are looking for does not exist or has been moved.</p>
          <Link href="/destinations" className="btn btn-primary w-full">Back to Destinations</Link>
        </div>
      </div>
    );
  }

  const uniPrograms = programs.filter(p => p.university_slug === uni.slug);

  return (
    <div className="university-page">
      {/* 1. Header */}
      <section className="uni-hero">
        <div className="container">
          <div className="flex items-start justify-between flex-wrap gap-8">
            <div className="flex gap-6 items-center">
              <div className="uni-logo-large">U</div>
              <div>
                <h1 className="text-white mb-2">{uni.name}</h1>
                <div className="flex gap-4 text-light-blue text-sm">
                  <span className="flex items-center gap-1"><MapPin size={16} /> {uni.city}, {country.toUpperCase()}</span>
                  <span className="flex items-center gap-1"><Trophy size={16} /> World Rank: #{uni.world_ranking}</span>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-3">
              <button className="btn btn-primary bg-gold text-navy hover-bg-gold-light border-none">
                Apply / Enquire Now
              </button>
              <button className="btn btn-secondary border-white text-white hover-bg-white">
                + Compare this University
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="section bg-light">
        <div className="container">
          <div className="uni-layout">
            <div className="uni-main">
              {/* 2. Overview */}
              <div className="card mb-8">
                <h2 className="mb-4">About {uni.name}</h2>
                <p className="mb-4">{uni.description}</p>
                <p>{uni.campus_life_notes}</p>
              </div>

              {/* 5. Programs Offered */}
              <div className="card mb-8">
                <h2 className="mb-6">Programs Offered</h2>
                <div className="programs-list">
                  {uniPrograms.map(prog => (
                    <Link href={`/destinations/${country}/${university}/${prog.slug}`} key={prog.slug} className="program-row">
                      <div className="prog-info">
                        <h3>{prog.name}</h3>
                        <div className="flex gap-4 text-sm text-light mt-2">
                          <span className="flex items-center gap-1"><GraduationCap size={14} /> {prog.degree_level}</span>
                          <span className="flex items-center gap-1"><Clock size={14} /> {prog.duration_years} Years</span>
                        </div>
                      </div>
                      <div className="prog-action">
                        <span className="text-teal font-semibold">View Details →</span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="uni-sidebar">
              {/* 3. Admission Requirements */}
              <div className="card mb-6 bg-navy text-white">
                <h3 className="text-white mb-4 flex items-center gap-2"><CheckSquare size={20}/> Requirements</h3>
                <ul className="req-list">
                  <li>
                    <span className="text-light-blue block text-sm">IELTS</span>
                    <strong>{uni.ielts_requirement}</strong>
                  </li>
                  <li>
                    <span className="text-light-blue block text-sm">Min GPA</span>
                    <strong>{uni.min_gpa}</strong>
                  </li>
                </ul>
              </div>

              {/* 4. Fee Breakdown */}
              <div className="card mb-6">
                <h3 className="mb-4">Estimated Costs</h3>
                <div className="fee-row">
                  <span>Tuition / Year</span>
                  <strong>£{uni.tuition_per_year.toLocaleString()}</strong>
                </div>
                <div className="fee-row">
                  <span>Accommodation / Year</span>
                  <strong>£{uni.accommodation_per_year.toLocaleString()}</strong>
                </div>
                <div className="fee-row mb-4 pb-4 border-b">
                  <span>Living / Month</span>
                  <strong>£{uni.living_cost_per_month.toLocaleString()}</strong>
                </div>
                <div className="fee-row total">
                  <span>Total Est. / Year</span>
                  <strong className="text-teal">£{(uni.tuition_per_year + uni.accommodation_per_year + (uni.living_cost_per_month * 12)).toLocaleString()}</strong>
                </div>
              </div>

              {/* 6. Intakes */}
              <div className="card">
                <h3 className="mb-4">Intake Dates</h3>
                <div className="flex gap-2 flex-wrap">
                  {uni.intakes.map(intake => (
                    <span key={intake} className="badge bg-alt">{intake}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
