export interface Scholarship {
  name: string;
  amount: string;
  desc: string;
  level?: string;
  deadline?: string;
}

export interface Testimonial {
  name: string;
  university: string;
  quote: string;
  avatar?: string;
}

export interface VisaOverview {
  processing: string;
  requirements: string[];
}

export interface Destination {
  id: string;
  name: string;
  slug: string;
  flag_emoji: string;
  hero_image: string;
  tuitionRange: string;
  costOfLiving: string;
  numUniversitiesStr: string;
  workPermitStr: string;
  whyStudyHere: string[];
  popular_subjects: string[];
  top_intakes: string[];
  scholarships_list: Scholarship[];
  visa_overview?: VisaOverview;
  visa_description: string;
  testimonials: Testimonial[];
}

export const destinations: Destination[] = [
  {
    id: "uk",
    name: "United Kingdom",
    slug: "uk",
    flag_emoji: "🇬🇧",
    hero_image: "/images/uk-hero.png",
    tuitionRange: "$12K–$38K",
    costOfLiving: "$1,200",
    numUniversitiesStr: "160+",
    workPermitStr: "2-year Graduate Route",
    whyStudyHere: [
      "Globally recognized degrees",
      "Post-study work visa of 2 years",
      "Rich multicultural experience",
      "Shorter program durations saving time & money"
    ],
    popular_subjects: ["Computer Science", "Law", "Medicine", "Architecture"],
    top_intakes: ["September", "January"],
    scholarships_list: [
      {
        name: "Chevening Scholarship",
        amount: "Full funding including tuition & living allowance",
        level: "Master",
        desc: "The UK government's flagship scholarship program, offering full financial support for one-year master's degrees at any UK university....",
        deadline: "Deadline: November each year"
      },
      {
        name: "Commonwealth Scholarship",
        amount: "Full tuition + stipend + airfare",
        level: "Master, PhD",
        desc: "Prestigious scholarships for candidates from Commonwealth countries to study at UK universities, covering all expenses....",
        deadline: "Deadline: December each year"
      }
    ],
    visa_overview: {
      processing: "Processing: 12 weeks",
      requirements: [
        "Valid passport",
        "CAS number from university",
        "Proof of English proficiency (IELTS 6.0+)",
        "Financial evidence (£1,334/month outside London)",
        "Health surcharge payment"
      ]
    },
    visa_description: "Student Visa (Tier 4) — Processing time: 12 weeks. Requires CAS number, valid passport, English proficiency, and financial evidence.",
    testimonials: [
      {
        name: "Farhan Ahmed",
        university: "University of Manchester — MSc Data Science",
        quote: "Coming to the UK was the best decision of my life. The academic quality is exceptional and I got a job at a London tech firm right after graduation. The Chevening Scholarship covered everything!",
        avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200"
      },
      {
        name: "Nadia Islam",
        university: "King's College London — LLM International Law",
        quote: "London gave me opportunities I never imagined possible back home. The networking events, the multicultural environment, and the world-class faculty transformed my career entirely.",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200"
      }
    ]
  },
  {
    id: "canada",
    name: "Canada",
    slug: "canada",
    flag_emoji: "🇨🇦",
    hero_image: "https://images.unsplash.com/photo-1627856013091-fed6e4e30025?q=80&w=2000",
    tuitionRange: "CAD 15,000 – CAD 40,000/year",
    costOfLiving: "CAD 12,000 – CAD 18,000/year",
    numUniversitiesStr: "100+",
    workPermitStr: "PGWP — up to 3 years post-study",
    whyStudyHere: [
      "One of the safest countries for international students",
      "Post-graduation work permit up to 3 years",
      "Pathway to permanent residency",
      "Affordable compared to USA and UK"
    ],
    popular_subjects: ["Computer Science", "Business", "Engineering"],
    top_intakes: ["September", "January", "May"],
    scholarships_list: [
      { name: "Vanier Canada Graduate Scholarship", amount: "Full funding", desc: "PhD students" },
      { name: "Ontario Graduate Scholarship", amount: "Partial", desc: "Merit-based" },
      { name: "University-specific merit awards", amount: "$5,000–$20,000", desc: "Merit-based" }
    ],
    visa_description: "Canadian Student Visa — Processing time: 4–12 weeks. Requires acceptance letter, proof of funds, biometrics, and medical exam (if applicable).",
    testimonials: [
      {
        name: "Nusrat J.",
        university: "University of Toronto",
        quote: "Canada feels like a second home now. The transition from student to working professional is so smooth here."
      }
    ]
  },
  {
    id: "australia",
    name: "Australia",
    slug: "australia",
    flag_emoji: "🇦🇺",
    hero_image: "https://images.unsplash.com/photo-1591130219388-ae3a189a674e?q=80&w=2000",
    tuitionRange: "AUD 20,000 – AUD 50,000/year",
    costOfLiving: "AUD 18,000 – AUD 25,000/year",
    numUniversitiesStr: "40+ world-class universities",
    workPermitStr: "Post-Study Work Visa — 2 to 4 years depending on degree level",
    whyStudyHere: [
      "Home to 7 of the world's top 100 universities",
      "Work up to 48 hours per fortnight during studies",
      "Pathway to Australian PR",
      "Excellent quality of life and student safety"
    ],
    popular_subjects: ["Business", "Engineering", "IT"],
    top_intakes: ["February", "July"],
    scholarships_list: [
      { name: "Australia Awards", amount: "Full funding", desc: "Developing countries" },
      { name: "Destination Australia", amount: "$15,000/year", desc: "Regional study" },
      { name: "University Excellence Scholarships", amount: "Varies", desc: "Merit-based" }
    ],
    visa_description: "Student Visa (Subclass 500) — Processing time: 4–6 weeks. Requires CoE, OSHC health cover, proof of funds, and GTE statement.",
    testimonials: []
  },
  {
    id: "germany",
    name: "Germany",
    slug: "germany",
    flag_emoji: "🇩🇪",
    hero_image: "https://images.unsplash.com/photo-1562774053-701939374585?q=80&w=2000",
    tuitionRange: "€0 – €3,000/year (most public universities are tuition-free)",
    costOfLiving: "€8,000 – €12,000/year",
    numUniversitiesStr: "400+ including 300+ tuition-free public universities",
    workPermitStr: "18 months job-seeking visa after graduation",
    whyStudyHere: [
      "Most public universities charge zero tuition fees",
      "Strong engineering and research programs",
      "18-month post-study job-seeking visa",
      "Thriving international student community"
    ],
    popular_subjects: ["Engineering", "Computer Science", "Natural Sciences"],
    top_intakes: ["October", "April"],
    scholarships_list: [
      { name: "DAAD Scholarship", amount: "Full/partial funding", desc: "All levels" },
      { name: "Deutschlandstipendium", amount: "€300/month", desc: "Merit-based" },
      { name: "Heinrich Böll Foundation grants", amount: "Varies", desc: "Merit and need-based" }
    ],
    visa_description: "German Student Visa — Processing time: 4–12 weeks. Requires university admission, blocked account (€11,904), health insurance, and language proficiency.",
    testimonials: []
  },
  {
    id: "malaysia",
    name: "Malaysia",
    slug: "malaysia",
    flag_emoji: "🇲🇾",
    hero_image: "https://images.unsplash.com/photo-1616190419596-e2839e7380d7?q=80&w=2000",
    tuitionRange: "MYR 15,000 – MYR 60,000/year",
    costOfLiving: "MYR 12,000 – MYR 18,000/year",
    numUniversitiesStr: "20+ internationally recognized universities",
    workPermitStr: "Student pass allows part-time work (20 hrs/week during breaks)",
    whyStudyHere: [
      "Affordable tuition with internationally recognized degrees",
      "English-medium instruction available",
      "Close to Bangladesh, easy travel home",
      "Multicultural environment familiar to Bangladeshi students"
    ],
    popular_subjects: ["Business", "IT", "Engineering"],
    top_intakes: ["February", "July", "October"],
    scholarships_list: [
      { name: "Malaysian International Scholarship", amount: "Full funding", desc: "Postgraduate" },
      { name: "MyCSD Scholarship", amount: "Partial", desc: "Merit-based" },
      { name: "University merit scholarships", amount: "Varies", desc: "Merit-based" }
    ],
    visa_description: "Student Pass — Processing time: 4–8 weeks. Requires EMGS approval, university offer letter, medical checkup, and financial proof.",
    testimonials: []
  },
  {
    id: "usa",
    name: "United States",
    slug: "united-states",
    flag_emoji: "🇺🇸",
    hero_image: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=2000",
    tuitionRange: "$20,000 - $55,000/year",
    costOfLiving: "$15,000 - $20,000/year",
    numUniversitiesStr: "4000+",
    workPermitStr: "OPT: 1-3 years post-study work authorization",
    whyStudyHere: [
      "Home to the world's top-ranked universities",
      "Cutting-edge research facilities and innovation hubs",
      "Flexible curriculum with major/minor options",
      "Strong alumni networks and career opportunities"
    ],
    popular_subjects: ["Computer Science", "Business", "Engineering"],
    top_intakes: ["Fall (August)", "Spring (January)"],
    scholarships_list: [
      { name: "Fulbright Scholarship", amount: "Full funding", desc: "Academic excellence and leadership" },
      { name: "Hubert Humphrey Fellowship", amount: "Full funding", desc: "Mid-career professionals" },
      { name: "University Merit Scholarships", amount: "$5,000 – $30,000", desc: "High GPA and test scores" }
    ],
    visa_description: "F-1 Student Visa – Processing time: 3-5 weeks. Requires I-20 form, SEVIS fee, financial documentation, and visa interview.",
    testimonials: [
      {
        name: "Karim Hassan",
        university: "MIT",
        quote: "The research opportunities here are unmatched. I got to work on projects that are shaping the future."
      },
      {
        name: "Nadia Islam",
        university: "Stanford University",
        quote: "The entrepreneurial culture pushed me to think bigger. I launched my startup during my second year."
      }
    ]
  },
  {
    id: "newzealand",
    name: "New Zealand",
    slug: "new-zealand",
    flag_emoji: "🇳🇿",
    hero_image: "https://images.unsplash.com/photo-1606761568499-6d2451b23c66?q=80&w=2000",
    tuitionRange: "NZD 25,000 – NZD 40,000/year",
    costOfLiving: "NZD 18,000 – NZD 25,000/year",
    numUniversitiesStr: "8 world-class universities",
    workPermitStr: "Up to 3 years post-study work visa",
    whyStudyHere: [
      "One of the safest and least corrupt countries globally",
      "All universities are ranked in the global top 3%",
      "Up to 3 years of post-study work visa",
      "Easy pathways to bring your family along"
    ],
    popular_subjects: ["Business", "Agricultural Studies", "IT"],
    top_intakes: ["February", "July"],
    scholarships_list: [
      { name: "Manaaki New Zealand Scholarships", amount: "Full funding", desc: "Government scholarships" },
      { name: "University Excellence Awards", amount: "$10,000", desc: "Merit-based awards" }
    ],
    visa_description: "Fee Paying Student Visa – Processing time: 4 weeks. Allows you to work up to 20 hours a week.",
    testimonials: []
  },
  {
    id: "ireland",
    name: "Ireland",
    slug: "ireland",
    flag_emoji: "🇮🇪",
    hero_image: "https://images.unsplash.com/photo-1590080875628-9866857422de?q=80&w=2000",
    tuitionRange: "€10,000 – €25,000/year",
    costOfLiving: "€10,000 – €14,000/year",
    numUniversitiesStr: "12 universities and ITs",
    workPermitStr: "Up to 2 years post-study",
    whyStudyHere: [
      "European headquarters for Google, Meta, Apple, and more",
      "Up to 2 years post-study work permit",
      "English-speaking country making communication seamless",
      "Incredible job market in the IT and Pharma sectors"
    ],
    popular_subjects: ["IT", "Business", "Pharmaceuticals"],
    top_intakes: ["September", "January"],
    scholarships_list: [
      { name: "Government of Ireland Scholarships", amount: "€10,000 + Tuition waiver", desc: "For high-achieving students" },
      { name: "Trinity College Global Excellence", amount: "€5,000", desc: "Academic achievement" }
    ],
    visa_description: "Stamp 2 Student Visa – Processing time: 4-6 weeks. Requires proof of €7,000 in a bank account for living costs.",
    testimonials: []
  },
  {
    id: "sweden",
    name: "Sweden",
    slug: "sweden",
    flag_emoji: "🇸🇪",
    hero_image: "https://images.unsplash.com/photo-1592280771190-3e2e4d571952?q=80&w=2000",
    tuitionRange: "SEK 80,000 – SEK 140,000/year",
    costOfLiving: "SEK 100,000/year",
    numUniversitiesStr: "39 top institutions",
    workPermitStr: "Job Seeker Visa: 1 year",
    whyStudyHere: [
      "Strong emphasis on group work and practical learning",
      "Incredible work-life balance and lifestyle",
      "1-year job seeker visa after graduation",
      "Hundreds of master's programs taught entirely in English"
    ],
    popular_subjects: ["Engineering", "IT", "Design"],
    top_intakes: ["September"],
    scholarships_list: [
      { name: "Swedish Institute Scholarships", amount: "Full funding", desc: "For global professionals" },
      { name: "KTH Royal Institute Scholarships", amount: "Tuition waiver", desc: "Merit-based" }
    ],
    visa_description: "Residence Permit for Studies – Processing time: 2-3 months. Must prove SEK 9,450 per month for living expenses.",
    testimonials: []
  },
  {
    id: "japan",
    name: "Japan",
    slug: "japan",
    flag_emoji: "🇯🇵",
    hero_image: "https://images.unsplash.com/photo-1544535830-9df3f5687760?q=80&w=2000",
    tuitionRange: "¥500,000 – ¥1,000,000/year",
    costOfLiving: "¥1,200,000/year",
    numUniversitiesStr: "700+ institutions",
    workPermitStr: "Subject to Job Offer",
    whyStudyHere: [
      "State-of-the-art technology and research facilities",
      "Highly attractive fully-funded scholarships like MEXT",
      "Huge job market for graduates and easy work visa conversion",
      "Extremely safe, clean, and culturally rich environment"
    ],
    popular_subjects: ["Engineering", "Robotics", "Japanese Studies"],
    top_intakes: ["April", "October"],
    scholarships_list: [
      { name: "MEXT Scholarship", amount: "Full funding", desc: "Government scholarship covering everything" },
      { name: "JASSO Scholarships", amount: "¥48,000/month", desc: "Privately-financed students" }
    ],
    visa_description: "Student Visa – Processing time: 2-4 weeks. Requires a COE (Certificate of Eligibility) issued by Japanese immigration.",
    testimonials: []
  },
  {
    id: "malta",
    name: "Malta",
    slug: "malta",
    flag_emoji: "🇲🇹",
    hero_image: "/images/countries/malta.jpg",
    tuitionRange: "€6,000 – €12,000/year",
    costOfLiving: "€8,000 – €10,000/year",
    numUniversitiesStr: "University of Malta + international campuses",
    workPermitStr: "Part-time work allowed during studies; job-seeker visa post-study",
    whyStudyHere: [
      "English is an official language, so all programs are English-taught",
      "EU member state with a Schengen-adjacent, English-speaking base for travel across Europe",
      "Lower tuition and living costs than the UK or mainland Western Europe",
      "Warm Mediterranean climate and a growing tech/iGaming/finance job market"
    ],
    popular_subjects: ["Business", "IT", "Tourism & Hospitality"],
    top_intakes: ["September", "February"],
    scholarships_list: [
      { name: "University of Malta International Scholarships", amount: "Partial tuition waiver", desc: "Merit-based, for international students" },
      { name: "Malta government/EU exchange grants", amount: "Varies", desc: "Available for select EU-linked programs" }
    ],
    visa_description: "Malta Student Visa/Residence Permit – Processing time: 4-8 weeks. Requires university acceptance letter, proof of funds, and health insurance.",
    testimonials: []
  }
];

export interface University {
  id: string;
  name: string;
  slug: string;
  country_slug: string;
  city: string;
  world_ranking: number;
  intakes: string[];
  description: string;
  campus_life_notes: string;
  tuition_per_year: number;
  accommodation_per_year: number;
  living_cost_per_month: number;
  ielts_requirement: string;
  // Real-world sheet content mixes GPA scale ("3.8"), percentage scale ("75%"), and
  // ranges ("65-70%") — kept as free text rather than coerced to a single number.
  min_gpa: number | string;
  image?: string;
  tuitionRangeStr?: string;
  hasScholarship?: boolean;
}

export const universities: University[] = [
  {
    id: 'mit',
    name: 'Massachusetts Institute of Technology (MIT)',
    slug: 'mit',
    country_slug: 'united-states',
    city: 'Cambridge, MA',
    world_ranking: 1,
    intakes: ['September', 'January'],
    description: 'MIT is a world-leading research university renowned for its programs in science, engineering, and technology.',
    campus_life_notes: 'A vibrant campus community with over 500 student clubs, research labs, and innovation hubs.',
    tuition_per_year: 57986,
    accommodation_per_year: 12000,
    living_cost_per_month: 1200,
    ielts_requirement: '7.0 overall',
    min_gpa: 3.8,
    image: 'https://images.unsplash.com/photo-1564981797816-1043664bf78d?q=80&w=400'
  },
  {
    id: 'stanford',
    name: 'Stanford University',
    slug: 'stanford',
    country_slug: 'united-states',
    city: 'Stanford, CA',
    world_ranking: 3,
    intakes: ['September'],
    description: 'Stanford University is one of the world\'s leading research and teaching institutions, known for entrepreneurship and innovation.',
    campus_life_notes: 'Beautiful 8,180-acre campus with strong ties to Silicon Valley and a thriving startup culture.',
    tuition_per_year: 56169,
    accommodation_per_year: 13500,
    living_cost_per_month: 1400,
    ielts_requirement: '7.0 overall',
    min_gpa: 3.9,
    image: 'https://images.unsplash.com/photo-1581244277943-fe4a9c777189?q=80&w=400'
  },
  {
    id: 'edinburgh',
    name: 'University of Edinburgh',
    slug: 'university-of-edinburgh',
    country_slug: 'uk',
    city: 'Edinburgh, Scotland',
    world_ranking: 15,
    intakes: ['September'],
    description: 'The University of Edinburgh is one of the world\'s top universities, consistently ranked in the world top 50.',
    campus_life_notes: 'Beautiful historic campus integrated into the cultural capital of Scotland.',
    tuition_per_year: 25000,
    accommodation_per_year: 8000,
    living_cost_per_month: 1000,
    ielts_requirement: '6.5+',
    min_gpa: 3.5,
    image: 'https://images.unsplash.com/photo-1607237138185-eedd996fe574?q=80&w=400',
    tuitionRangeStr: '$22K–$30K/yr',
    hasScholarship: true
  },
  {
    id: 'manchester',
    name: 'University of Manchester',
    slug: 'university-of-manchester',
    country_slug: 'uk',
    city: 'Manchester, England',
    world_ranking: 28,
    intakes: ['September', 'January'],
    description: 'A Russell Group university with a rich history of academic excellence and a large international student community.',
    campus_life_notes: 'Located in the heart of Manchester, a vibrant city with a thriving student life and cultural scene.',
    tuition_per_year: 26500,
    accommodation_per_year: 7200,
    living_cost_per_month: 800,
    ielts_requirement: '6.5+',
    min_gpa: 3.3,
    image: 'https://images.unsplash.com/photo-1568283096533-078a24930eb8?q=80&w=400',
    tuitionRangeStr: '$21K–$28K/yr',
    hasScholarship: true
  },
  {
    id: 'kcl',
    name: 'King\'s College London',
    slug: 'kings-college-london',
    country_slug: 'uk',
    city: 'London, England',
    world_ranking: 37,
    intakes: ['September'],
    description: 'King\'s College London is an internationally renowned university delivering exceptional education and world-leading research.',
    campus_life_notes: 'Centrally located campuses along the River Thames offering unparalleled access to London life.',
    tuition_per_year: 28000,
    accommodation_per_year: 10000,
    living_cost_per_month: 1300,
    ielts_requirement: '7+',
    min_gpa: 3.5,
    image: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=400',
    tuitionRangeStr: '$23K–$32K/yr',
    hasScholarship: true
  },
  {
    id: 'toronto',
    name: 'University of Toronto',
    slug: 'university-of-toronto',
    country_slug: 'canada',
    city: 'Toronto',
    world_ranking: 21,
    intakes: ['September', 'January', 'May'],
    description: 'Canada\'s top-ranked university, known for research impact, diversity, and a broad range of graduate programs.',
    campus_life_notes: 'Three campuses across the Greater Toronto Area, with access to one of the world\'s most multicultural cities.',
    tuition_per_year: 45000,
    accommodation_per_year: 10000,
    living_cost_per_month: 1100,
    ielts_requirement: '6.5 overall',
    min_gpa: 3.5,
    image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=400'
  }
];

export interface Program {
  slug: string;
  university_slug: string;
  degree_level: string;
  name: string;
  duration_years: number;
  annual_tuition: number;
  subjects_covered: string[];
  avg_salary_entry: number;
  avg_salary_5yr: number;
  career_outcomes: string[];
  ielts_requirement: string;
  min_gpa: number;
  work_experience_required: boolean;
  related_scholarships: string[];
}

export const programs: Program[] = [
  {
    slug: "mit-mba",
    university_slug: "mit",
    degree_level: "Masters",
    name: "Master of Business Administration (MBA)",
    duration_years: 2,
    annual_tuition: 57986,
    subjects_covered: ["Business", "Management"],
    avg_salary_entry: 140000,
    avg_salary_5yr: 180000,
    career_outcomes: ["Product Manager", "Management Consultant", "Entrepreneur"],
    ielts_requirement: "7.0 overall",
    min_gpa: 3.8,
    work_experience_required: true,
    related_scholarships: ["Fulbright Scholarship"]
  },
  {
    slug: "stanford-mba",
    university_slug: "stanford",
    degree_level: "Masters",
    name: "Master of Business Administration (MBA)",
    duration_years: 2,
    annual_tuition: 56169,
    subjects_covered: ["Business", "Management"],
    avg_salary_entry: 150000,
    avg_salary_5yr: 195000,
    career_outcomes: ["Venture Capitalist", "CEO", "Strategy Director"],
    ielts_requirement: "7.0 overall",
    min_gpa: 3.9,
    work_experience_required: true,
    related_scholarships: ["Fulbright Scholarship"]
  },
  {
    slug: "mit-cs-ms",
    university_slug: "mit",
    degree_level: "Masters",
    name: "MS in Computer Science and Engineering",
    duration_years: 2,
    annual_tuition: 57986,
    subjects_covered: ["Computer Science", "IT"],
    avg_salary_entry: 125000,
    avg_salary_5yr: 175000,
    career_outcomes: ["Software Engineer", "AI Researcher", "Systems Architect"],
    ielts_requirement: "7.0 overall",
    min_gpa: 3.8,
    work_experience_required: false,
    related_scholarships: ["Fulbright Scholarship"]
  },
  {
    slug: "stanford-cs-bs",
    university_slug: "stanford",
    degree_level: "Bachelors",
    name: "BS in Computer Science",
    duration_years: 4,
    annual_tuition: 56169,
    subjects_covered: ["Computer Science", "IT"],
    avg_salary_entry: 110000,
    avg_salary_5yr: 160000,
    career_outcomes: ["Software Developer", "Data Analyst", "Product Engineer"],
    ielts_requirement: "7.0 overall",
    min_gpa: 3.9,
    work_experience_required: false,
    related_scholarships: ["University Merit Scholarships"]
  },
  {
    slug: "manchester-data-science-ms",
    university_slug: "university-of-manchester",
    degree_level: "Masters",
    name: "MSc Data Science",
    duration_years: 1,
    annual_tuition: 26500,
    subjects_covered: ["Computer Science", "IT"],
    avg_salary_entry: 60000,
    avg_salary_5yr: 95000,
    career_outcomes: ["Data Scientist", "Machine Learning Engineer", "BI Analyst"],
    ielts_requirement: "6.5 overall",
    min_gpa: 3.3,
    work_experience_required: false,
    related_scholarships: ["Chevening Scholarship", "Commonwealth Scholarship"]
  },
  {
    slug: "edinburgh-civil-eng-ms",
    university_slug: "university-of-edinburgh",
    degree_level: "Masters",
    name: "MSc in Civil Engineering",
    duration_years: 1,
    annual_tuition: 25000,
    subjects_covered: ["Engineering"],
    avg_salary_entry: 45000,
    avg_salary_5yr: 70000,
    career_outcomes: ["Civil Engineer", "Project Manager", "Structural Designer"],
    ielts_requirement: "6.5 overall",
    min_gpa: 3.5,
    work_experience_required: false,
    related_scholarships: ["Commonwealth Scholarship"]
  },
  {
    slug: "kcl-international-law-llm",
    university_slug: "kings-college-london",
    degree_level: "Masters",
    name: "LLM International Law",
    duration_years: 1,
    annual_tuition: 28000,
    subjects_covered: ["Law"],
    avg_salary_entry: 55000,
    avg_salary_5yr: 90000,
    career_outcomes: ["International Lawyer", "Legal Counsel", "Arbitrator"],
    ielts_requirement: "7.0 overall",
    min_gpa: 3.5,
    work_experience_required: false,
    related_scholarships: ["Chevening Scholarship"]
  },
  {
    slug: "toronto-nursing-bs",
    university_slug: "university-of-toronto",
    degree_level: "Bachelors",
    name: "Bachelor of Science in Nursing (BScN)",
    duration_years: 4,
    annual_tuition: 45000,
    subjects_covered: ["Medicine", "Nursing"],
    avg_salary_entry: 75000,
    avg_salary_5yr: 100000,
    career_outcomes: ["Registered Nurse", "Clinical Nurse Specialist", "Health Administrator"],
    ielts_requirement: "6.5 overall",
    min_gpa: 3.5,
    work_experience_required: false,
    related_scholarships: ["Lester B. Pearson International Scholarship"]
  }
];

