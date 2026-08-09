'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Clock, CaretRight, MapPin, CurrencyDollar, BookOpen, Medal, Calendar, Briefcase, Users, CheckCircle, ChartBar, X, Sparkle, ArrowRight, BookOpenText } from '@phosphor-icons/react';
import './detail.css';

interface ArticleData {
  title: string;
  category: string;
  readTime: string;
  hook: string;
  heroBg: string;
  takeaways: string[];
  sections: {
    title: string;
    content: string[];
    proTip?: string;
    statNumber?: string;
    statLabel?: string;
    checklist?: string[];
    dos?: string[];
    donts?: string[];
  }[];
}

const articlesDb: Record<string, ArticleData> = {
  'everything-you-need-to-know-about-the-us-f1-visa-interview': {
    title: 'Everything You Need to Know About the US F1 Visa Interview',
    category: 'Visa Guides',
    readTime: '9 min',
    hook: 'Your ultimate step-by-step master guide to cracking the US student visa interview on your very first attempt.',
    heroBg: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
    takeaways: [
      'Understand the core intent of the visa officer (the "Non-immigrant Intent")',
      'Master the top 5 most frequently asked questions and how to structure your answers',
      'Access a complete checklist of mandatory and supporting documents',
      'Avoid the common mistakes that lead to instant 214(b) visa denials'
    ],
    sections: [
      {
        title: '1. The Golden Rule: Proving Non-Immigrant Intent (Section 214b)',
        content: [
          'Under US immigration law, every student visa applicant is viewed as an intending immigrant. Your primary job during the interview is to convince the visa officer that you have strong ties to your home country and will return after completing your studies.',
          'Visa officers make decisions quickly—often in less than 3 minutes. Focus your answers on your long-term career plans in Bangladesh and how your US degree acts as a bridge to achieve them.'
        ],
        proTip: 'Never say you plan to stay in the US for work after graduation. Always frame your post-study goals around returning to Bangladesh to work for top companies, lead family businesses, or launch startups.',
        statNumber: '85%',
        statLabel: 'of successful US F1 visa applicants prepared their "home ties" strategy in advance.'
      },
      {
        title: '2. Top 5 F1 Interview Questions & Model Answers',
        content: [
          'Here are the most common questions asked by visa officers, along with the strategies to answer them effectively:',
          'Question 1: Why do you want to study in the USA and not Bangladesh?\nFocus on the practical labs, research-driven curriculum, and global recognition of US degrees that aren\'t available locally.',
          'Question 2: Why did you choose this specific University?\nBe specific. Name professors, courses, or labs. Do not just say "it is a top university."',
          'Question 3: Who is sponsoring your education and how will they fund it?\nState clearly who your sponsor is (e.g. parents), their profession, annual income, and total liquid savings available for your studies.'
        ],
        proTip: 'Be brief. Keep each answer between 30 to 45 seconds. The officer is judging your confidence and clarity of thoughts.'
      },
      {
        title: '3. Mandatory Document Checklist',
        content: [
          'Ensure you have these documents organized in a clear, tabbed folder in the following order:'
        ],
        checklist: [
          'Form I-20 (signed by you and the school DSO)',
          'DS-160 Confirmation Page with barcode',
          'SEVIS I-901 Fee Receipt ($350)',
          'Visa Fee Payment Receipt',
          'Valid Passport (at least 6 months validity)',
          'Academic Transcripts, Certificates, and Test Scores (IELTS/SAT/GRE)',
          'Financial Evidence (Bank certificates, tax returns, sponsor letter)'
        ]
      },
      {
        title: '4. Critical Do\'s and Don\'ts on Interview Day',
        content: [
          'Your body language, dress code, and tone of voice matter just as much as your documents. Follow these guidelines to ensure a smooth interview experience.'
        ],
        dos: [
          'Dress in formal or smart-casual attire.',
          'Maintain direct eye contact with the officer.',
          'Speak clearly in English.',
          'Keep your documents organized and ready.'
        ],
        donts: [
          'Do not memorize your answers like a script.',
          'Do not argue with the visa officer.',
          'Do not present fake financial documents.',
          'Do not volunteer documents unless asked.'
        ]
      }
    ]
  },
  'ielts-preparation-30-day-master-plan': {
    title: 'IELTS Preparation: 30-Day Master Plan',
    category: 'IELTS Prep',
    readTime: '5 min',
    hook: 'A highly structured, day-by-day prep guide designed to push your band score to 7.5+ in just 4 weeks.',
    heroBg: 'linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%)',
    takeaways: [
      'Day 1-7: Foundation & understanding the marking criteria',
      'Day 8-15: Sectional drill down (Listening, Reading, Writing, Speaking)',
      'Day 16-25: Integration, timing techniques, and full-length tests',
      'Day 26-30: Last-minute revision, speaking practice, and test-day strategy'
    ],
    sections: [
      {
        title: '1. Week 1: Build the Foundation & Strategy',
        content: [
          'Before diving into mock tests, spend your first week understanding the exact exam format and marking criteria for academic IELTS.',
          'Focus on learning vocabulary and practicing passive listening. Watch English news, read editorials, and get comfortable with different English accents (UK, US, Australian).'
        ],
        proTip: 'Write down at least 15 new academic collocations every day. Improving your vocabulary range is the quickest way to boost your Writing and Speaking scores.',
        statNumber: '7.5+',
        statLabel: 'is the average band score achieved by students following a structured sectional prep routine.'
      },
      {
        title: '2. Week 2 & 3: Master the Sections',
        content: [
          'Spend these weeks drilling down into each section. Devote 2 days each to Listening, Reading, Writing, and Speaking.',
          'Identify your weak spots. If Reading is your bottleneck, practice the "skimming and scanning" techniques specifically for multiple-choice and True/False/Not Given questions.'
        ],
        proTip: 'For IELTS Writing Task 2, always spend the first 5 minutes planning your essay structure before writing.'
      },
      {
        title: '3. Week 4: Full Mock Tests & Time Management',
        content: [
          'During the final week, take one full-length paper-based or computer-based mock test under strict exam conditions every single day.',
          'Track your errors and review them. Focus on managing your time so that you complete the Reading section with 5 minutes to spare.'
        ]
      }
    ]
  },
  'understanding-the-uk-graduate-route-visa': {
    title: 'Understanding the UK Graduate Route Visa',
    category: 'Visa Guides',
    readTime: '8 min',
    hook: 'Work, live, and launch your career in the UK for up to 3 years after graduation — here is how to apply.',
    heroBg: 'linear-gradient(135deg, #312e81 0%, #4338ca 100%)',
    takeaways: [
      'Eligibility criteria (which universities and degrees qualify)',
      'Application process timeline and exact costs (Visa fee + IHS surcharge)',
      'Permitted activities (work, self-employment, and study limits)',
      'How to transition from Graduate Route to Skilled Worker visa'
    ],
    sections: [
      {
        title: '1. What is the UK Graduate Route?',
        content: [
          'The Graduate Route allows international students who have successfully completed an undergraduate or postgraduate degree at a registered UK higher education provider to stay and work in the UK.',
          'Bachelor\'s and Master\'s graduates receive 2 years of work authorization, while PhD graduates receive 3 years.'
        ],
        proTip: 'You do not need a job offer to apply. You can work in any sector, at any salary level, and switch jobs without sponsorship.'
      },
      {
        title: '2. Eligibility & Application Costs',
        content: [
          'To qualify, you must be in the UK when you apply, hold a valid Student Visa, and your university must have reported your course completion to the Home Office.',
          'The visa application fee is £822, and you must also pay the Immigration Health Surcharge (IHS) of £1,035 per year of the visa.'
        ],
        statNumber: '£2.8K',
        statLabel: 'is the approximate total cost (fees + IHS) to secure a 2-year Graduate Route visa.'
      }
    ]
  },
  'how-to-write-a-winning-statement-of-purpose': {
    title: 'How to Write a Winning Statement of Purpose',
    category: 'Application Tips',
    readTime: '6 min',
    hook: 'The exact structural framework and storytelling techniques to make your SOP stand out to admissions committees.',
    heroBg: 'linear-gradient(135deg, #065f46 0%, #047857 100%)',
    takeaways: [
      'The "Hook, Line, and Sinker" introduction formula',
      'Crafting a compelling narrative around your academic background and career goals',
      'Addressing gaps, low GPA, or career changes strategically',
      'Editing checklist: Flow, tone, vocabulary, and length rules'
    ],
    sections: [
      {
        title: '1. The Anatomy of a Perfect SOP',
        content: [
          'Your Statement of Purpose (SOP) is your personal story. Admissions committees read thousands of essays; yours needs to stand out in the first 30 seconds.',
          'Start with a compelling hook—a specific story or problem that sparked your interest in the field. Avoid generic statements like "I have always loved computers."'
        ],
        proTip: 'Show, don\'t tell. Instead of writing "I am a hard worker," describe a project where you worked 14-hour days to solve a database bottle-neck.'
      },
      {
        title: '2. Paragraph-by-Paragraph Framework',
        content: [
          'Paragraph 1: The Hook & Core Intent (What drives you?).',
          'Paragraph 2-3: Academic Journey & Accomplishments (Highlight relevant courses, research, and papers).',
          'Paragraph 4: Professional Experience (Show how your work links to your future goals).',
          'Paragraph 5: Why this specific university, course, and professors?'
        ],
        statNumber: '70%',
        statLabel: 'of admissions officers state that a well-crafted SOP can compensate for a slightly lower GPA.'
      }
    ]
  },
  'cost-of-living-in-canada-for-international-students': {
    title: 'Cost of Living in Canada for International Students',
    category: 'Student Life',
    readTime: '7 min',
    hook: 'A comprehensive breakdown of housing, food, transport, and utilities in Canada\'s major student hubs.',
    heroBg: 'linear-gradient(135deg, #7f1d1d 0%, #b91c1c 100%)',
    takeaways: [
      'Average monthly expenses in Toronto/Vancouver vs. smaller cities',
      'Off-campus vs. on-campus accommodation costs and housing search tips',
      'Hidden costs: Health insurance, books, winter clothing, and mobile plans',
      'Smart budgeting tips and part-time work regulations (rules and hours)'
    ],
    sections: [
      {
        title: '1. Accommodation: Your Largest Expense',
        content: [
          'Housing will consume 50% to 60% of your monthly budget in Canada.',
          'Renting a room in shared off-campus housing in Toronto or Vancouver costs between CAD 800 and CAD 1,200 per month. In smaller cities like Halifax or Winnipeg, this drops to CAD 500 - CAD 700.'
        ],
        proTip: 'Look for accommodations along transit routes. Sharing a flat slightly further from campus can save you up to CAD 400 monthly.'
      },
      {
        title: '2. Average Monthly Budget Breakdown',
        content: [
          'A realistic monthly budget for a student looks like this:',
          '- Shared Housing: CAD 600 - 900',
          '- Groceries & Food: CAD 250 - 350',
          '- Public Transport (U-Pass): CAD 40 - 80',
          '- Utilities & Internet: CAD 100 - 150',
          '- Miscellaneous & Mobile Plan: CAD 100'
        ],
        statNumber: '$1.5K',
        statLabel: 'CAD is the recommended monthly budget for a student living in a major Canadian city.'
      }
    ]
  },
  'top-10-fully-funded-scholarships-for-2026': {
    title: 'Top 10 Fully Funded Scholarships for 2026',
    category: 'Scholarships',
    readTime: '10 min',
    hook: 'Your comprehensive roadmap to securing full funding (tuition + living allowance) at top-tier universities.',
    heroBg: 'linear-gradient(135deg, #1e1b4b 0%, #312e81 100%)',
    takeaways: [
      'List of top 10 prestigious fully funded scholarships (Chevening, Fulbright, DAAD, etc.)',
      'Key eligibility requirements and selection criteria',
      'How to write a convincing scholarship essay',
      'Timeline for document preparation and interview preparation'
    ],
    sections: [
      {
        title: '1. Top Prestigious Fully Funded Scholarships',
        content: [
          'Securing a fully funded scholarship is highly competitive but entirely possible with early planning.',
          'Top options include: 1. Chevening Scholarships (UK), 2. Fulbright Program (USA), 3. DAAD Scholarships (Germany), 4. Australia Awards, and 5. MEXT Scholarships (Japan).'
        ],
        proTip: 'Apply to at least 3 different scholarship programs. Each program evaluates candidates differently, increasing your overall chances.'
      },
      {
        title: '2. Key Selection Criteria',
        content: [
          'Scholarship boards look for three things: academic excellence, leadership potential, and a clear plan to contribute to your home country after studies.',
          'Start preparing your application at least 10 to 12 months before the deadline.'
        ],
        statNumber: '100%',
        statLabel: 'tuition waiver, monthly stipend, visa fees, and return airfare are covered by fully funded awards.'
      }
    ]
  }
};

export default function ArticleDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = React.use(params);
  const slug = resolvedParams.slug;
  const article = articlesDb[slug];

  const [scrollProgress, setScrollProgress] = useState(0);
  const [showFloatingCta, setShowFloatingCta] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [hasTriggeredModal, setHasTriggeredModal] = useState(false);

  // Scroll listener for progress bar, floating CTA, and modal trigger
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight <= 0) return;

      const scrolled = (window.scrollY / totalHeight) * 100;
      setScrollProgress(scrolled);

      // Show floating CTA after 300px scroll
      if (window.scrollY > 300) {
        setShowFloatingCta(true);
      } else {
        setShowFloatingCta(false);
      }

      // Trigger modal at 40% scroll
      if (scrolled >= 40 && !hasTriggeredModal) {
        setShowModal(true);
        setHasTriggeredModal(true);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [hasTriggeredModal]);

  // Trigger modal after 5 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!hasTriggeredModal) {
        setShowModal(true);
        setHasTriggeredModal(true);
      }
    }, 5000);

    return () => clearTimeout(timer);
  }, [hasTriggeredModal]);

  if (!article) {
    return (
      <div className="not-found-wrap">
        <div className="card not-found-box">
          <h2>Article Not Found</h2>
          <p>The article you are looking for does not exist or has been moved.</p>
          <Link href="/resources" className="btn btn-primary w-full">Back to Resources</Link>
        </div>
      </div>
    );
  }

  // Related articles (excluding the current one)
  const relatedArticles = Object.keys(articlesDb)
    .filter(k => k !== slug)
    .slice(0, 3)
    .map(k => ({
      slug: k,
      ...articlesDb[k]
    }));

  return (
    <div className="resource-detail pb-24">
      {/* 1. Reading Progress Bar */}
      <div className="progress-bar-container">
        <div className="progress-bar-fill" style={{ width: `${scrollProgress}%` }}></div>
      </div>

      {/* 2. Hero Section */}
      <section 
        className="article-hero"
        style={{
          background: article.heroBg,
        }}
      >
        <div className="container hero-inner">
          <div className="hero-badge-row">
            <span className="category-badge-custom">{article.category}</span>
            <span className="readtime-badge-custom">{article.readTime} read</span>
          </div>
          <h1 className="hero-headline-custom">{article.title}</h1>
          <p className="hero-subtitle-custom">{article.hook}</p>
          <button onClick={() => setShowModal(true)} className="hero-cta-btn">
            Get Free Counseling
          </button>
        </div>
      </section>

      {/* 3. Takeaways Card */}
      <div className="container">
        <div className="takeaways-card">
          <h3 className="takeaways-title">
            <BookOpenText size={20} className="text-emerald-500" /> What You Will Learn:
          </h3>
          <div className="takeaways-grid">
            {article.takeaways.map((item, idx) => (
              <div key={idx} className="takeaway-item">
                <CheckCircle size={16} className="takeaway-icon" />
                <p className="takeaway-text">{item}</p>
              </div>
            ))}
          </div>
        </div>

        {/* 4. Two-Column Layout */}
        <div className="article-main-grid">
          {/* Left Column: Content */}
          <div className="article-content-area">
            {article.sections.map((sec, idx) => (
              <React.Fragment key={idx}>
                <div className="article-section-card">
                  <div className="section-num-badge">0{idx + 1}</div>
                  <h2 className="section-heading-custom">{sec.title}</h2>
                  
                  {sec.content.map((p, pIdx) => (
                    <p key={pIdx} className="section-paragraph">
                      {p.split('\n').map((line, lIdx) => (
                        <React.Fragment key={lIdx}>
                          {line}
                          {lIdx < p.split('\n').length - 1 && <br />}
                        </React.Fragment>
                      ))}
                    </p>
                  ))}

                  {/* Pro Tip Box */}
                  {sec.proTip && (
                    <div className="pro-tip-card">
                      <h4 className="pro-tip-title">Pro Tip</h4>
                      <p className="pro-tip-text">{sec.proTip}</p>
                    </div>
                  )}

                  {/* Stat Callout */}
                  {sec.statNumber && (
                    <div className="stat-callout-custom">
                      <span className="stat-number-huge">{sec.statNumber}</span>
                      <p className="stat-label-large">{sec.statLabel}</p>
                    </div>
                  )}

                  {/* Document Checklist */}
                  {sec.checklist && (
                    <div className="checklist-grid">
                      {sec.checklist.map((item, cIdx) => (
                        <div key={cIdx} className="checklist-item">
                          <CheckCircle size={16} className="checklist-icon" />
                          <p className="checklist-text">{item}</p>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Dos and Don'ts comparison */}
                  {sec.dos && sec.donts && (
                    <div className="dos-donts-container">
                      <div className="dos-col">
                        <h4 className="dos-title">DO'S</h4>
                        <ul className="dos-donts-list">
                          {sec.dos.map((item, dIdx) => (
                            <li key={dIdx} className="dos-donts-item">{item}</li>
                          ))}
                        </ul>
                      </div>
                      <div className="donts-col">
                        <h4 className="donts-title">DON'TS</h4>
                        <ul className="dos-donts-list">
                          {sec.donts.map((item, dIdx) => (
                            <li key={dIdx} className="dos-donts-item">{item}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}
                </div>

                {/* 5. Mid-Content CTA Banner after section 2 */}
                {idx === 1 && (
                  <div className="mid-content-banner">
                    <div className="mid-banner-text">
                      <h3 className="mid-banner-title">Still confused? Talk to an expert — it's free.</h3>
                      <p className="mid-banner-desc">Get your personalized university shortlist and visa checklist today.</p>
                    </div>
                    <button onClick={() => setShowModal(true)} className="mid-banner-btn">
                      Book a Free Session
                    </button>
                  </div>
                )}
              </React.Fragment>
            ))}


          </div>

          {/* Right Column: Sidebar */}
          <div className="article-sidebar-area">
            {/* Counseling Card */}
            <div className="sidebar-counseling-card">
              <h3 className="sidebar-form-title">Book a Free Session</h3>
              <p className="sidebar-form-subtitle">Get expert guidance from counselors who have sent hundreds of students abroad.</p>
              
              <form className="counseling-fields-form" onSubmit={(e) => e.preventDefault()}>
                <input type="text" placeholder="Your full name" className="sidebar-input-field" required />
                <input type="tel" placeholder="Phone number" className="sidebar-input-field" required />
                <input type="email" placeholder="Email address (optional)" className="sidebar-input-field" />
                <button type="submit" className="sidebar-submit-btn">Get Free Counseling</button>
              </form>
              
              <p className="sidebar-form-disclaimer">Free, no obligation. We respect your privacy.</p>
            </div>

            {/* Floating Tags or Subject list inside Sidebar */}
            <div className="sidebar-subjects-card">
              <h3 className="sidebar-sub-title">Popular Subjects</h3>
              <div className="subjects-flex-chips">
                <span className="subject-custom-chip">Computer Science</span>
                <span className="subject-custom-chip">Data Science</span>
                <span className="subject-custom-chip">MBA & Business</span>
                <span className="subject-custom-chip">Law & Politics</span>
                <span className="subject-custom-chip">Medicine</span>
              </div>
            </div>
          </div>
        </div>

        {/* 6. Related Articles */}
        <div className="related-section-wrap">
          <h3 className="related-title">Related Guides</h3>
          <div className="related-grid-custom">
            {relatedArticles.map((art, idx) => (
              <Link href={`/resources/${art.slug}`} key={idx} className="related-card-custom">
                <div className="related-card-img-placeholder"></div>
                <div className="related-card-body">
                  <div>
                    <span className="related-card-category">{art.category}</span>
                    <h4 className="related-card-title">{art.title}</h4>
                  </div>
                  <div className="related-card-meta">
                    <Clock size={12} /> {art.readTime} read
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* 7. Sticky Floating CTA */}
      <div className={`sticky-floating-cta ${showFloatingCta ? 'visible' : ''}`}>
        <h4 className="floating-cta-title">Need help with your application?</h4>
        <p className="floating-cta-desc">Get free expert guidance from counselors who have sent hundreds of students abroad.</p>
        <button onClick={() => setShowModal(true)} className="floating-cta-btn">
          Book a Free Session
        </button>
      </div>

      {/* 8. Triggered Modal Popup Form */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-card">
            <button className="modal-close-x" onClick={() => setShowModal(false)}>
              <X size={20} />
            </button>
            <div className="modal-emoji-header">🎓</div>
            <h3 className="modal-title-custom">Get Free Expert Guidance</h3>
            <p className="modal-desc-custom">
              Talk to a counselor who has helped 500+ students study in USA, UK, Canada, and Australia.
            </p>
            <form className="modal-form-fields" onSubmit={(e) => { e.preventDefault(); setShowModal(false); }}>
              <input type="text" placeholder="Your full name" className="modal-input-field" required />
              <input type="tel" placeholder="Phone number" className="modal-input-field" required />
              <input type="email" placeholder="Email address (optional)" className="modal-input-field" />
              <button type="submit" className="modal-submit-btn">Book Free Session</button>
            </form>
            <span className="modal-dismiss-link" onClick={() => setShowModal(false)}>
              Maybe later
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
