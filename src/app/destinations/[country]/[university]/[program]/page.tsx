import React from 'react';
import { programs, universities } from '../../../../../data/destinations';
import Link from 'next/link';
import { Clock, BookOpen, Briefcase, Medal, ArrowLeft } from '@phosphor-icons/react/ssr';
import './program.css';

export default async function ProgramPage({ params }: { params: Promise<{ country: string, university: string, program: string }> }) {
  const { country, university, program } = await params;
  const prog = programs.find(p => p.slug === program && p.university_slug === university);
  const uni = universities.find(u => u.slug === university);
  
  if (!prog || !uni) {
    return (
      <div className="not-found-wrap">
        <div className="card not-found-box">
          <h2>Program Not Found</h2>
          <p>The program you are looking for does not exist or has been moved.</p>
          <Link href="/destinations" className="btn btn-primary w-full">Back to Destinations</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="program-page">
      {/* 1. Header */}
      <section className="prog-hero section pb-0">
        <div className="container">
          <Link href={`/destinations/${country}/${university}`} className="text-teal flex items-center gap-1 mb-6 text-sm font-semibold">
            <ArrowLeft size={16} /> Back to {uni.name}
          </Link>
          
          <div className="flex items-start justify-between flex-wrap gap-8">
            <div className="prog-hero-content">
              <div className="badge mb-4">{prog.degree_level}</div>
              <h1 className="mb-4">{prog.name}</h1>
              
              <div className="flex gap-6 text-light text-sm flex-wrap">
                <span className="flex items-center gap-1"><Clock size={16} /> {prog.duration_years} Years Full-Time</span>
                <span className="flex items-center gap-1"><BookOpen size={16} /> {uni.intakes.join(', ')} Intake</span>
              </div>
            </div>
            
            <div className="card prog-quick-stats">
              <div className="text-center mb-4">
                <span className="text-light text-sm block">Annual Tuition</span>
                <strong className="text-xl text-teal">£{prog.annual_tuition.toLocaleString()}</strong>
              </div>
              <button className="btn btn-primary w-full shadow-md">Apply Now</button>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="prog-layout">
            <div className="prog-main">
              {/* 2. Overview */}
              <div className="card mb-8">
                <h2 className="mb-4">Program Overview</h2>
                <p className="mb-6">This program is designed to equip you with the essential skills and knowledge required to succeed in a competitive global market. You will learn from industry experts and engage in practical, hands-on projects.</p>
                
                <h3 className="mb-3 text-md">Core Modules / Subjects:</h3>
                <ul className="subjects-list">
                  {prog.subjects_covered.map(sub => (
                    <li key={sub}><CheckIcon /> {sub}</li>
                  ))}
                </ul>
              </div>

              {/* 4. Career Outcomes */}
              <div className="card mb-8">
                <h2 className="mb-4 flex items-center gap-2"><Briefcase size={24} color="var(--success)" /> Career Outcomes</h2>
                <p className="mb-6">Graduates of this program are highly sought after by top employers globally.</p>
                
                <div className="grid-2-col mb-6">
                  <div>
                    <span className="text-light text-sm block">Avg. Entry Salary</span>
                    <strong>£{prog.avg_salary_entry.toLocaleString()}</strong>
                  </div>
                  <div>
                    <span className="text-light text-sm block">Avg. Salary (5 Yrs)</span>
                    <strong>£{prog.avg_salary_5yr.toLocaleString()}</strong>
                  </div>
                </div>

                <h3 className="mb-3 text-md">Typical Roles:</h3>
                <div className="flex flex-wrap gap-2">
                  {prog.career_outcomes.map(role => (
                    <span key={role} className="badge bg-alt">{role}</span>
                  ))}
                </div>
              </div>
            </div>

            <div className="prog-sidebar">
              {/* 3. Admission Requirements */}
              <div className="card mb-6">
                <h3 className="mb-4 border-b pb-4">Admission Requirements</h3>
                <ul className="req-list">
                  <li>
                    <span className="text-light block text-sm">IELTS</span>
                    <strong>{prog.ielts_requirement}</strong>
                  </li>
                  <li>
                    <span className="text-light block text-sm">Min GPA</span>
                    <strong>{prog.min_gpa}</strong>
                  </li>
                  <li>
                    <span className="text-light block text-sm">Work Experience</span>
                    <strong>{prog.work_experience_required ? 'Required (Minimum 2 years)' : 'Not Required'}</strong>
                  </li>
                </ul>
              </div>

              {/* 5. Scholarships */}
              {prog.related_scholarships.length > 0 && (
                <div className="card bg-alt">
                  <h3 className="mb-4 flex items-center gap-2 text-navy"><Medal size={20} color="var(--premium-gold-2)"/> Related Scholarships</h3>
                  <ul className="req-list">
                    {prog.related_scholarships.map(schol => (
                      <li key={schol} className="font-semibold text-teal">{schol}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function CheckIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--success)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12"></polyline>
    </svg>
  );
}
