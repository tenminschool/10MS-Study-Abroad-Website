import React from 'react';
import { MagnifyingGlass, Clock, CaretRight } from '@phosphor-icons/react/ssr';
import Link from 'next/link';
import './resources.css';

export default function ResourcesPage() {
  const articles = [
    { title: 'IELTS Preparation: 30-Day Master Plan', category: 'IELTS Prep', readTime: '5 min', image: '/images/ielts.jpg', slug: 'ielts-preparation-30-day-master-plan' },
    { title: 'Understanding the UK Graduate Route Visa', category: 'Visa Guides', readTime: '8 min', image: '/images/uk-visa.jpg', slug: 'understanding-the-uk-graduate-route-visa' },
    { title: 'How to Write a Winning Statement of Purpose', category: 'Application Tips', readTime: '6 min', image: '/images/sop.jpg', slug: 'how-to-write-a-winning-statement-of-purpose' },
    { title: 'Cost of Living in Canada for International Students', category: 'Student Life', readTime: '7 min', image: '/images/canada-life.jpg', slug: 'cost-of-living-in-canada-for-international-students' },
    { title: 'Top 10 Fully Funded Scholarships for 2026', category: 'Scholarships', readTime: '10 min', image: '/images/scholarships.jpg', slug: 'top-10-fully-funded-scholarships-for-2026' },
  ];

  return (
    <div className="py-12 container">
      <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
        <h1>Resources & Blog</h1>
        <div className="search-input-wrapper">
          <MagnifyingGlass size={18} className="icon" />
          <input type="text" placeholder="Search guides, tips..." className="input" />
        </div>
      </div>

      <div className="filters-row mb-8 flex gap-4 overflow-auto pb-2">
        <button className="badge bg-navy text-white">All Resources</button>
        <button className="badge">IELTS Prep</button>
        <button className="badge">Visa Guides</button>
        <button className="badge">Application Tips</button>
        <button className="badge">Student Life</button>
      </div>

      <div className="resources-layout">
        <div className="resources-main">
          {/* Featured Article */}
          <div className="card mb-8 p-0 overflow-hidden">
            <div className="featured-img-placeholder" style={{ background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)', height: '260px' }}></div>
            <div className="p-8">
              <span className="badge mb-2">Visa Guides</span>
              <h2 className="mb-4">Everything You Need to Know About the US F1 Visa Interview</h2>
              <p className="text-light mb-4">A complete step-by-step guide to preparing for your US student visa interview, including common questions and how to answer them.</p>
              <Link href="/resources/everything-you-need-to-know-about-the-us-f1-visa-interview" className="text-teal font-semibold flex items-center gap-1">Read Full Guide <CaretRight size={16}/></Link>
            </div>
          </div>

          <div className="articles-grid">
            {articles.map((art, idx) => (
              <Link href={`/resources/${art.slug}`} key={idx} className="card article-card p-0 overflow-hidden block">
                <div className="article-img-placeholder" style={{ background: 'linear-gradient(135deg, #3B82F6 0%, #1D4ED8 100%)', height: '160px' }}></div>
                <div className="p-4">
                  <span className="text-xs text-teal font-semibold mb-2 block">{art.category}</span>
                  <h3 className="text-md mb-2 text-fg-1" style={{ fontSize: '16px', fontWeight: '700' }}>{art.title}</h3>
                  <div className="flex items-center gap-1 text-xs text-light">
                    <Clock size={12}/> {art.readTime} read
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        <div className="resources-sidebar">
          <div className="card sticky-sidebar">
            <h3 className="mb-4">Need help with your application?</h3>
            <p className="text-sm text-light mb-6">Stop guessing. Get free expert guidance from counselors who have sent hundreds of students abroad.</p>
            <button className="btn btn-primary w-full text-sm">Book a Free Session</button>
          </div>
        </div>
      </div>
    </div>
  );
}
