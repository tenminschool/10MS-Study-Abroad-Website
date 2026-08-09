// ============================================================
// All user-facing copy, keyed. Every key carries both languages
// so the two can never drift apart.
//
// ⚠️ The Bangla here is a working draft written for structure.
// Have a Bangla-first writer rewrite `bn` values directly rather
// than translating from the English — counselling copy that reads
// like a translation loses trust fast.
// ============================================================

export type Lang = 'en' | 'bn'
type Pair = { en: string; bn: string }

export const strings: Record<string, Pair> = {
  // ---------- Shell ----------
  'app.brand': { en: '10 Minute School', bn: '১০ মিনিট স্কুল' },
  'app.brandSub': { en: 'Study Abroad', bn: 'স্টাডি অ্যাব্রোড' },
  'theme.toLight': { en: 'Light', bn: 'লাইট' },
  'theme.toDark': { en: 'Dark', bn: 'ডার্ক' },
  'lang.en': { en: 'EN', bn: 'EN' },
  'lang.bn': { en: 'বাং', bn: 'বাং' },

  // ---------- Hero ----------
  'hero.eyebrow': { en: 'Free destination matcher', bn: 'ফ্রি ডেস্টিনেশন ম্যাচার' },
  'hero.title1': { en: 'Find the country', bn: 'আপনার স্বপ্নের দেশ কোনটি?' },
  'hero.title2': { en: 'that fits you', bn: 'খুঁজে নিন আজই!' },
  'hero.lede': {
    en: 'Answer a few quick questions about your results, IELTS and budget. We will show you which destinations you qualify for right now, and exactly what is holding back the rest.',
    bn: 'আপনার রেজাল্ট, IELTS এবং বাজেট নিয়ে কয়েকটি সহজ প্রশ্নের উত্তর দিন। কোন দেশগুলোতে আপনি এখনই যোগ্য, এবং বাকিগুলোতে ঠিক কী আটকে রাখছে, সব দেখিয়ে দেব।',
  },
  'hero.cta': { en: 'See which countries fit me', bn: 'আমার জন্য কোন দেশ, দেখে নিন' },
  'hero.book': { en: 'Talk to a senior counsellor', bn: 'সিনিয়র কাউন্সেলরের সাথে কথা বলুন' },
  'hero.ctaNote': {
    en: 'Free, no signup. Get your country and university matches in about a minute.',
    bn: 'ফ্রি, সাইন-আপ ছাড়াই। প্রায় এক মিনিটেই আপনার দেশ ও বিশ্ববিদ্যালয়ের ম্যাচ পেয়ে যান।',
  },
  'glimpse.label': { en: "A peek at what you'll get", bn: 'যা পাবেন, তার এক ঝলক' },
  'glimpse.facts': {
    en: 'Tuition ৳3.6L/yr · IELTS 6.0 · 3 universities matched',
    bn: 'টিউশন ৳৩.৬ লক্ষ/বছর · IELTS ৬.০ · ৩টি বিশ্ববিদ্যালয় ম্যাচ',
  },
  'glimpse.sample': { en: 'Example result', bn: 'নমুনা ফলাফল' },
  'chip.destinations': { en: '7 destinations', bn: '৭টি দেশ' },
  'chip.visa': { en: 'Visa support', bn: 'ভিসা সাপোর্ট' },
  'chip.free': { en: 'Free counselling', bn: 'ফ্রি কাউন্সেলিং' },
  'hero.mapNote': {
    en: 'These 7 destinations are available today. More are being added.',
    bn: 'এই ৭টি গন্তব্য এখন চালু আছে। আরও যুক্ত হচ্ছে।',
  },
  'hero.imgAlt': {
    en: 'Landmarks of popular study destinations.',
    bn: 'জনপ্রিয় স্টাডি ডেস্টিনেশনের ল্যান্ডমার্ক।',
  },
  'hero.mapAlt': {
    en: 'Flight routes from Dhaka to the seven study destinations.',
    bn: 'ঢাকা থেকে সাতটি গন্তব্যে ফ্লাইট রুট।',
  },
  'stat.dest': { en: 'destinations available now', bn: 'দেশ এখনই আছে' },
  'stat.unis': { en: 'universities suggested', bn: 'বিশ্ববিদ্যালয়ের সাজেশন' },
  'stat.time.n': { en: '1 min', bn: '১ মিনিট' },
  'stat.time.l': { en: 'to get your country match', bn: 'দেশ ম্যাচ পেতে' },
  'stat.free.n': { en: '৳0', bn: '৳০' },
  'stat.free.l': { en: 'processing fee', bn: 'প্রসেসিং ফি' },

  // ---------- Journey roadmap ----------
  'journey.eyebrow': { en: 'How it works', bn: 'যেভাবে এগোবে' },
  'journey.title1': { en: 'Your journey,', bn: 'আপনার যাত্রা,' },
  'journey.title2': { en: 'step by step', bn: 'ধাপে ধাপে' },
  'journey.lede': {
    en: 'Six steps from where you are now to your first day abroad. We are with you at each one.',
    bn: 'এখন যেখানে আছেন সেখান থেকে বিদেশে প্রথম দিন পর্যন্ত ছয়টি ধাপ। প্রতিটিতেই আমরা আপনার পাশে।',
  },
  'journey.1.n': { en: '1', bn: '১' },
  'journey.1.t': { en: 'Find your match', bn: 'আপনার ম্যাচ' },
  'journey.1.d': { en: 'Your countries, cost and fit.', bn: 'আপনার দেশ, খরচ ও ফিট।' },
  'journey.2.n': { en: '2', bn: '২' },
  'journey.2.t': { en: 'Talk to a counsellor', bn: 'কাউন্সেলরের সাথে কথা' },
  'journey.2.d': { en: 'A free call to plan it.', bn: 'ফ্রি কলে পরিকল্পনা।' },
  'journey.3.n': { en: '3', bn: '৩' },
  'journey.3.t': { en: 'Choose universities', bn: 'বিশ্ববিদ্যালয় বাছাই' },
  'journey.3.d': { en: 'Shortlist and pick programs.', bn: 'শর্টলিস্ট ও প্রোগ্রাম বাছাই।' },
  'journey.4.n': { en: '4', bn: '৪' },
  'journey.4.t': { en: 'Build your profile', bn: 'প্রোফাইল তৈরি' },
  'journey.4.d': {
    en: 'IELTS, documents, bank and SOP/CV/LOR.',
    bn: 'IELTS, কাগজপত্র, ব্যাংক ও SOP/CV/LOR।',
  },
  'journey.5.n': { en: '5', bn: '৫' },
  'journey.5.t': { en: 'Apply & get your offer', bn: 'আবেদন ও অফার' },
  'journey.5.d': { en: 'We apply, you get the offer.', bn: 'আমরা আবেদন করি, অফার আপনার।' },
  'journey.6.n': { en: '6', bn: '৬' },
  'journey.6.t': { en: 'Visa & take off', bn: 'ভিসা ও যাত্রা' },
  'journey.6.d': { en: 'Visa help, then you fly.', bn: 'ভিসা সহায়তা, তারপর যাত্রা।' },

  // ---------- Services (legacy, unused) ----------
  'svc.eyebrow': { en: 'What we do', bn: 'আমরা যা করি' },
  'svc.title1': { en: 'From first call', bn: 'প্রথম কল থেকে' },
  'svc.title2': { en: 'to visa decision', bn: 'ভিসা পাওয়া পর্যন্ত' },
  'svc.lede': {
    en: 'The matcher is step one. Behind it is a full counselling team that stays with you through the whole journey.',
    bn: 'ম্যাচার শুধু প্রথম ধাপ। এর পেছনে আছে একটি পূর্ণাঙ্গ কাউন্সেলিং টিম, যারা পুরো যাত্রায় আপনার পাশে থাকবে।',
  },
  'svc.1.t': { en: 'End-to-end support', bn: 'শুরু থেকে শেষ পর্যন্ত সাপোর্ট' },
  'svc.1.d': {
    en: 'Complete support from counselling to university application to the visa decision. One team, the whole way.',
    bn: 'কাউন্সেলিং থেকে বিশ্ববিদ্যালয়ে আবেদন, ভিসার সিদ্ধান্ত পর্যন্ত পূর্ণ সহায়তা। একই টিম, পুরো পথ।',
  },
  'svc.2.t': { en: 'Visa application help', bn: 'ভিসা আবেদনে সহায়তা' },
  'svc.2.d': {
    en: 'We help you prepare and file your student visa application and stay with it until the decision.',
    bn: 'স্টুডেন্ট ভিসার আবেদন তৈরি ও জমা দিতে সাহায্য করি এবং সিদ্ধান্ত না আসা পর্যন্ত সাথে থাকি।',
  },
  'svc.3.t': { en: 'SOP, CV and LOR review', bn: 'SOP, CV ও LOR রিভিউ' },
  'svc.3.d': {
    en: 'Bring your drafts. A counsellor reviews your SOP, CV and LOR and gives you concrete feedback.',
    bn: 'আপনার খসড়া নিয়ে আসুন। কাউন্সেলর আপনার SOP, CV ও LOR দেখে সুনির্দিষ্ট পরামর্শ দেবেন।',
  },
  'svc.4.t': { en: 'Counselling is free', bn: 'কাউন্সেলিং সম্পূর্ণ ফ্রি' },
  'svc.4.d': {
    en: 'No paid tiers and no hidden fees. The counselling service costs you nothing.',
    bn: 'কোনো পেইড প্যাকেজ নেই, লুকানো ফি নেই। কাউন্সেলিং সেবার জন্য কোনো খরচ নেই।',
  },
  'svc.5.t': { en: 'Clear answers first', bn: 'আগে পরিষ্কার উত্তর' },
  'svc.5.d': {
    en: 'Eligibility, real costs, documents and scholarships, explained clearly before you commit to anything.',
    bn: 'যোগ্যতা, প্রকৃত খরচ, কাগজপত্র ও স্কলারশিপ, কোনো সিদ্ধান্তের আগেই পরিষ্কারভাবে জানিয়ে দিই।',
  },
  'svc.6.t': { en: 'A counsellor who knows you', bn: 'আপনাকে চেনেন এমন কাউন্সেলর' },
  'svc.6.d': {
    en: 'A senior-led team that takes a limited number of students each intake, so you always talk to someone who knows your file.',
    bn: 'সিনিয়র কাউন্সেলরের নেতৃত্বে টিম প্রতি ইনটেকে সীমিত সংখ্যক শিক্ষার্থী নেয়, তাই আপনার ফাইল চেনেন এমন কারো সাথেই কথা হবে।',
  },

  'tile.1.k': { en: 'What we check', bn: 'যা যাচাই করি' },
  'tile.1.v': { en: 'Every IELTS band, not just the overall', bn: 'প্রতিটি IELTS ব্যান্ড, শুধু ওভারঅল নয়' },
  'tile.1.d': {
    en: 'Most countries enforce a floor on each band. A 6.5 overall with a 5.0 in Writing fails where a flat 6.0 passes.',
    bn: 'বেশিরভাগ দেশে প্রতিটি ব্যান্ডে সর্বনিম্ন সীমা থাকে। Writing-এ ৫.০ থাকলে ৬.৫ ওভারঅলও আটকে যায়, অথচ সব ব্যান্ডে ৬.০ থাকলে পাস।',
  },
  'tile.2.k': { en: 'What we show', bn: 'যা দেখাই' },
  'tile.2.v': { en: 'The real first-year cost, in taka', bn: 'প্রথম বছরের প্রকৃত খরচ, টাকায়' },
  'tile.2.d': {
    en: 'Tuition, living, visa, insurance, deposit and airfare. The number your family actually has to find.',
    bn: 'টিউশন, থাকা-খাওয়া, ভিসা, বিমা, ডিপোজিট এবং বিমান ভাড়া, যে টাকাটা পরিবারকে আসলে জোগাড় করতে হবে।',
  },
  'tile.3.k': { en: "What we won't do", bn: 'যা করব না' },
  'tile.3.v': { en: "Hide the countries you can't reach", bn: 'যে দেশে যেতে পারবেন না, তা লুকানো' },
  'tile.3.d': {
    en: 'If a destination is out of range we say so, and we say why. So you know what would change the answer.',
    bn: 'কোনো দেশ নাগালের বাইরে হলে আমরা তা বলি, এবং কেন বলি, যাতে বোঝেন কী বদলালে উত্তর বদলাবে।',
  },

  // ---------- Steps ----------
  'step.progress': { en: 'Step {n} of {total}', bn: 'ধাপ {n} / {total}' },
  'step.1.title': { en: 'How do we reach you?', bn: 'আপনার সাথে কীভাবে যোগাযোগ করব?' },
  'step.1.sub': {
    en: 'A counsellor will follow up on your results within one working day.',
    bn: 'একজন কাউন্সেলর এক কর্মদিবসের মধ্যে আপনার সাথে যোগাযোগ করবেন।',
  },
  'step.2.title': { en: 'What do you want to study?', bn: 'আপনি কী পড়তে চান?' },
  'step.2.sub': {
    en: 'Requirements differ sharply between a Bachelor’s and a Master’s, so this changes everything downstream.',
    bn: 'ব্যাচেলর এবং মাস্টার্সের শর্ত একেবারেই আলাদা, তাই এই উত্তরটি বাকি সবকিছু নির্ধারণ করে।',
  },
  'step.3.title': { en: 'Your academic results', bn: 'আপনার একাডেমিক রেজাল্ট' },
  'step.3.sub': {
    en: 'Give what you have. Leave anything that does not apply to you blank.',
    bn: 'যা আছে তা দিন। যেটা প্রযোজ্য নয় সেটা ফাঁকা রাখুন।',
  },
  'step.4.title': { en: 'English proficiency', bn: 'ইংরেজি দক্ষতা' },
  'step.4.sub': {
    en: 'This is the single biggest factor. Individual band scores matter as much as the overall. Most countries enforce a floor on each band.',
    bn: 'এটিই সবচেয়ে বড় নির্ধারক। ওভারঅলের মতোই প্রতিটি ব্যান্ড স্কোরও গুরুত্বপূর্ণ, বেশিরভাগ দেশে প্রতি ব্যান্ডে সর্বনিম্ন সীমা থাকে।',
  },
  'step.5.title': { en: 'Your situation', bn: 'আপনার পরিস্থিতি' },
  'step.5.sub': {
    en: 'Budget and study gap decide as much as your results do. Be honest here. A realistic answer gets you a useful recommendation.',
    bn: 'রেজাল্টের মতোই বাজেট আর স্টাডি গ্যাপও গুরুত্বপূর্ণ। সৎ উত্তর দিন, বাস্তব উত্তর দিলেই কাজের পরামর্শ পাবেন।',
  },
  'step.6.title': { en: 'Your destination matches', bn: 'আপনার জন্য উপযুক্ত দেশ' },

  // ---------- Fields ----------
  'f.name': { en: 'Full name', bn: 'পুরো নাম' },
  'f.phone': { en: 'Mobile number', bn: 'মোবাইল নম্বর' },
  'f.phone.hint': {
    en: 'Bangladeshi number, e.g. +880 1712-345678 or 01712345678',
    bn: 'বাংলাদেশি নম্বর, যেমন +৮৮০ ১৭১২-৩৪৫৬৭৮ বা ০১৭১২৩৪৫৬৭৮',
  },
  'f.whatsappSame': { en: 'This number is on WhatsApp', bn: 'এই নম্বরটি WhatsApp-এ আছে' },
  'f.whatsapp': { en: 'WhatsApp number', bn: 'WhatsApp নম্বর' },
  'f.email': { en: 'Email (optional)', bn: 'ইমেইল (ঐচ্ছিক)' },
  'f.consent': {
    en: 'I agree to be contacted by 10 Minute School Study Abroad about my application, and I have read the privacy note below.',
    bn: '১০ মিনিট স্কুল স্টাডি অ্যাব্রোড আমার আবেদন নিয়ে যোগাযোগ করতে পারবে, এবং আমি নিচের প্রাইভেসি নোট পড়েছি।',
  },
  'f.level': { en: 'Study level', bn: 'পড়াশোনার স্তর' },
  'f.field': { en: 'Field of study', bn: 'পড়াশোনার বিষয়' },
  'f.intake': { en: 'When do you want to start?', bn: 'কবে শুরু করতে চান?' },
  'f.ssc': { en: 'SSC / O Levels', bn: 'এসএসসি / O Levels' },
  'f.hsc': { en: 'HSC / A Levels', bn: 'এইচএসসি / A Levels' },
  'f.ug': { en: 'Undergraduate (if completed or ongoing)', bn: 'স্নাতক (সম্পন্ন বা চলমান হলে)' },
  'f.year': { en: 'Year', bn: 'সাল' },
  'f.system': { en: 'Grading', bn: 'গ্রেডিং' },
  'f.value': { en: 'Result', bn: 'রেজাল্ট' },
  'f.backlogs': { en: 'Backlogs or failed papers', bn: 'ব্যাকলগ বা ফেল করা পেপার' },
  'f.backlogs.hint': { en: 'Enter 0 if none', bn: 'না থাকলে ০ দিন' },
  'f.englishTaken': {
    en: 'Have you completed an English proficiency test?',
    bn: 'আপনি কি ইংরেজি দক্ষতার কোনো পরীক্ষা দিয়েছেন?',
  },
  'f.predicted': { en: 'Expected IELTS score', bn: 'প্রত্যাশিত IELTS স্কোর' },
  'f.predicted.hint': {
    en: 'A mock or practice test score works fine. Leave it empty if you are not sure.',
    bn: 'মক বা প্র্যাকটিস টেস্টের স্কোর দিলেও চলবে। নিশ্চিত না হলে খালি রাখুন।',
  },
  'f.englishTest': { en: 'Which test?', bn: 'কোন পরীক্ষা?' },
  'f.englishOverall': { en: 'Overall score', bn: 'ওভারঅল স্কোর' },
  'f.band.listening': { en: 'Listening', bn: 'Listening' },
  'f.band.reading': { en: 'Reading', bn: 'Reading' },
  'f.band.writing': { en: 'Writing', bn: 'Writing' },
  'f.band.speaking': { en: 'Speaking', bn: 'Speaking' },
  'f.bands.title': { en: 'Individual band scores', bn: 'আলাদা ব্যান্ড স্কোর' },
  'f.bands.hint': {
    en: 'Countries enforce a minimum on each band, not just the overall. Leaving these out will make your match less accurate.',
    bn: 'দেশগুলো শুধু ওভারঅল নয়, প্রতিটি ব্যান্ডেও সর্বনিম্ন সীমা রাখে। এগুলো না দিলে ফলাফল কম নির্ভুল হবে।',
  },
  'f.currentStatus': { en: 'What are you doing now?', bn: 'বর্তমানে কী করছেন?' },
  'f.gapYears': { en: 'Study gap (years)', bn: 'স্টাডি গ্যাপ (বছর)' },
  'f.gapReason': { en: 'Reason for the gap', bn: 'গ্যাপের কারণ' },
  'f.visaRefusal': { en: 'Have you ever had a visa refused?', bn: 'আপনার কোনো ভিসা কি কখনো রিফিউজ হয়েছে?' },
  'f.refusalDetails': { en: 'Which country, which year, and the stated reason', bn: 'কোন দেশ, কোন বছর, এবং কী কারণ দেখানো হয়েছিল' },
  'f.passport': { en: 'Passport status', bn: 'পাসপোর্টের অবস্থা' },
  'f.budget': { en: 'Total budget for the first year', bn: 'প্রথম বছরের মোট বাজেট' },
  'f.budget.hint': {
    en: 'Everything: tuition, living, visa, flight. This is the number that decides most of your options.',
    bn: 'সবকিছু মিলিয়ে: টিউশন, থাকা-খাওয়া, ভিসা, বিমান ভাড়া। এই সংখ্যাটিই আপনার বেশিরভাগ সুযোগ নির্ধারণ করে।',
  },
  'f.funding': { en: 'Who is funding this?', bn: 'অর্থায়ন কে করছেন?' },
  'f.priorities': { en: 'What matters most to you? Pick up to 3', bn: 'আপনার কাছে সবচেয়ে গুরুত্বপূর্ণ কী? সর্বোচ্চ ৩টি বেছে নিন' },
  'f.preferred': { en: 'Any countries you already have in mind?', bn: 'কোনো দেশ কি আগে থেকেই ভেবে রেখেছেন?' },
  'f.preferred.hint': {
    en: 'Optional. We will still show you every destination you qualify for, including ones you had not considered.',
    bn: 'ঐচ্ছিক। আপনি যোগ্য এমন সব দেশই দেখাব, যেগুলো ভাবেননি সেগুলোসহ।',
  },
  'f.notes': { en: 'Anything else we should know?', bn: 'আর কিছু কি আমাদের জানা দরকার?' },

  // ---------- Options ----------
  'opt.choose': { en: 'Select…', bn: 'বেছে নিন…' },
  'opt.level.diploma': { en: 'Diploma / Foundation', bn: 'ডিপ্লোমা / ফাউন্ডেশন' },
  'opt.level.bachelors': { en: "Bachelor's", bn: 'ব্যাচেলর' },
  'opt.level.masters': { en: "Master's", bn: 'মাস্টার্স' },
  'opt.level.phd': { en: 'PhD', bn: 'পিএইচডি' },

  'opt.field.business': { en: 'Business & Management', bn: 'ব্যবসা ও ব্যবস্থাপনা' },
  'opt.field.engineering': { en: 'Engineering', bn: 'ইঞ্জিনিয়ারিং' },
  'opt.field.cs': { en: 'Computer Science & IT', bn: 'কম্পিউটার সায়েন্স ও আইটি' },
  'opt.field.health': { en: 'Health & Medical', bn: 'স্বাস্থ্য ও চিকিৎসা' },
  'opt.field.arts': { en: 'Arts & Design', bn: 'আর্টস ও ডিজাইন' },
  'opt.field.law': { en: 'Law', bn: 'আইন' },
  'opt.field.science': { en: 'Natural Sciences', bn: 'বিজ্ঞান' },
  'opt.field.social': { en: 'Social Sciences', bn: 'সমাজবিজ্ঞান' },
  'opt.field.other': { en: 'Other / Not decided', bn: 'অন্যান্য / ঠিক করিনি' },

  'opt.intake.within_6m': { en: 'Within 6 months', bn: '৬ মাসের মধ্যে' },
  'opt.intake.6_to_12m': { en: '6 to 12 months', bn: '৬ থেকে ১২ মাস' },
  'opt.intake.beyond_12m': { en: 'More than a year away', bn: 'এক বছরের বেশি পরে' },
  'opt.intake.undecided': { en: 'Not decided', bn: 'ঠিক করিনি' },

  'opt.system.gpa5': { en: 'GPA out of 5', bn: 'জিপিএ (৫ এর মধ্যে)' },
  'opt.system.cgpa4': { en: 'CGPA out of 4', bn: 'সিজিপিএ (৪ এর মধ্যে)' },
  'opt.system.cgpa5': { en: 'CGPA out of 5', bn: 'সিজিপিএ (৫ এর মধ্যে)' },
  'opt.system.percent': { en: 'Percentage', bn: 'শতাংশ' },
  'opt.system.grades': { en: 'O / A Level grades', bn: 'O / A Level গ্রেড' },

  'opt.grades.95': { en: 'A* A* A* / all A*', bn: 'A* A* A* / সব A*' },
  'opt.grades.88': { en: 'A A A / A* A A', bn: 'A A A / A* A A' },
  'opt.grades.80': { en: 'A A B', bn: 'A A B' },
  'opt.grades.73': { en: 'B B B', bn: 'B B B' },
  'opt.grades.66': { en: 'B B C', bn: 'B B C' },
  'opt.grades.58': { en: 'C C C', bn: 'C C C' },
  'opt.grades.50': { en: 'C C D', bn: 'C C D' },
  'opt.grades.42': { en: 'D D D or below', bn: 'D D D বা তার নিচে' },

  'opt.test.ielts': { en: 'IELTS Academic', bn: 'IELTS Academic' },
  'opt.test.ielts_ukvi': { en: 'IELTS UKVI', bn: 'IELTS UKVI' },
  'opt.test.pte': { en: 'PTE Academic', bn: 'PTE Academic' },
  'opt.test.toefl': { en: 'TOEFL iBT', bn: 'TOEFL iBT' },
  'opt.test.duolingo': { en: 'Duolingo English Test', bn: 'Duolingo English Test' },
  'opt.test.moi': { en: 'MOI certificate only', bn: 'শুধু MOI সার্টিফিকেট' },
  'opt.test.none': { en: 'Not taken yet', bn: 'এখনো দিইনি' },

  'opt.status.hsc_student': { en: 'HSC / A Level student', bn: 'এইচএসসি / A Level শিক্ষার্থী' },
  'opt.status.hsc_done': { en: 'Finished HSC, waiting', bn: 'এইচএসসি শেষ, অপেক্ষায় আছি' },
  'opt.status.ug_student': { en: 'University student', bn: 'বিশ্ববিদ্যালয়ের শিক্ষার্থী' },
  'opt.status.ug_done': { en: 'Graduated', bn: 'গ্র্যাজুয়েশন শেষ' },
  'opt.status.working': { en: 'Working full time', bn: 'ফুল-টাইম চাকরি করছি' },
  'opt.status.other': { en: 'Something else', bn: 'অন্য কিছু' },

  'opt.gapreason.job': { en: 'Working', bn: 'চাকরি করছিলাম' },
  'opt.gapreason.retake': { en: 'Exam retake or admission attempts', bn: 'পরীক্ষা পুনরায় দেওয়া বা ভর্তির চেষ্টা' },
  'opt.gapreason.family': { en: 'Family reasons', bn: 'পারিবারিক কারণ' },
  'opt.gapreason.health': { en: 'Health', bn: 'স্বাস্থ্যগত কারণ' },
  'opt.gapreason.other': { en: 'Other', bn: 'অন্যান্য' },

  'opt.passport.valid': { en: 'I have a valid passport', bn: 'বৈধ পাসপোর্ট আছে' },
  'opt.passport.applied': { en: 'Applied, waiting', bn: 'আবেদন করেছি, অপেক্ষায়' },
  'opt.passport.none': { en: 'Not yet applied', bn: 'এখনো আবেদন করিনি' },

  'opt.budget.500000': { en: 'Under ৳5 lakh', bn: '৳৫ লক্ষের নিচে' },
  'opt.budget.1000000': { en: '৳5–10 lakh', bn: '৳৫–১০ লক্ষ' },
  'opt.budget.1500000': { en: '৳10–15 lakh', bn: '৳১০–১৫ লক্ষ' },
  'opt.budget.2000000': { en: '৳15–20 lakh', bn: '৳১৫–২০ লক্ষ' },
  'opt.budget.2500000': { en: '৳20–25 lakh', bn: '৳২০–২৫ লক্ষ' },
  'opt.budget.3000000': { en: '৳25–30 lakh', bn: '৳২৫–৩০ লক্ষ' },
  'opt.budget.3500000': { en: '৳30–35 lakh', bn: '৳৩০–৩৫ লক্ষ' },
  'opt.budget.4000000': { en: '৳35–40 lakh', bn: '৳৩৫–৪০ লক্ষ' },
  'opt.budget.6000000': { en: '৳40 lakh+', bn: '৳৪০ লক্ষের বেশি' },

  'opt.funding.self': { en: 'Myself', bn: 'নিজে' },
  'opt.funding.parents': { en: 'Parents', bn: 'বাবা-মা' },
  'opt.funding.sponsor': { en: 'Relative or sponsor', bn: 'আত্মীয় বা স্পন্সর' },
  'opt.funding.bank_loan': { en: 'Bank loan', bn: 'ব্যাংক লোন' },
  'opt.funding.seeking_scholarship': { en: 'Depends on a scholarship', bn: 'স্কলারশিপের উপর নির্ভরশীল' },

  'opt.priority.lowest_cost': { en: 'Lowest total cost', bn: 'সবচেয়ে কম খরচ' },
  'opt.priority.fast_processing': { en: 'Fast visa processing', bn: 'দ্রুত ভিসা প্রসেসিং' },
  'opt.priority.post_study_work': { en: 'Post-study work rights', bn: 'পড়া শেষে কাজের সুযোগ' },
  'opt.priority.pr_pathway': { en: 'Path to permanent residency', bn: 'স্থায়ী বসবাসের সুযোগ' },
  'opt.priority.ranking': { en: 'University ranking', bn: 'বিশ্ববিদ্যালয়ের র‍্যাঙ্কিং' },
  'opt.priority.scholarship': { en: 'Scholarship availability', bn: 'স্কলারশিপের সুযোগ' },

  'opt.yes': { en: 'Yes', bn: 'হ্যাঁ' },
  'opt.no': { en: 'No', bn: 'না' },

  // ---------- Buttons ----------
  'btn.next': { en: 'Continue', bn: 'পরবর্তী' },
  'btn.back': { en: 'Back', bn: 'পেছনে' },
  'btn.submit': { en: 'Show my matches', bn: 'আমার ফলাফল দেখান' },
  'btn.restart': { en: 'Start over', bn: 'আবার শুরু করুন' },
  'btn.compare': { en: 'Compare {n} destinations', bn: '{n}টি দেশ তুলনা করুন' },
  'btn.clearPicks': { en: 'Clear', bn: 'বাতিল' },
  'btn.backToResults': { en: 'Back to results', bn: 'ফলাফলে ফিরুন' },
  'btn.print': { en: 'Save as PDF', bn: 'PDF হিসেবে সেভ করুন' },
  'btn.whatsapp': { en: 'Chat on WhatsApp', bn: 'WhatsApp-এ কথা বলুন' },
  'btn.call': { en: 'Call a counsellor', bn: 'কাউন্সেলরকে কল করুন' },
  'btn.book': { en: 'Book free counselling', bn: 'ফ্রি কাউন্সেলিং বুক করুন' },
  'btn.bookLong': {
    en: 'Book a free consultation',
    bn: 'ফ্রি কনসালটেশন বুক করুন',
  },
  'btn.home': { en: 'Home', bn: 'হোম' },

  // ---------- Results ----------
  'res.title': { en: 'Your destination matches', bn: 'আপনার জন্য উপযুক্ত দেশ' },
  'res.headline.checked': { en: '{n} checked.', bn: '{n}টি যাচাই করা হয়েছে।' },
  'res.headline.fit': { en: '{n} fit.', bn: '{n}টি মিলেছে।' },
  'res.basedOn': {
    en: 'Based on an academic index of {academic}, an IELTS equivalent of {ielts}, and a first-year budget of {budget}.',
    bn: 'একাডেমিক ইনডেক্স {academic}, IELTS সমতুল্য {ielts} এবং প্রথম বছরের বাজেট {budget} এর ভিত্তিতে।',
  },
  'res.verdict.best': { en: 'Strongest fit', bn: 'সবচেয়ে ভালো মিল' },
  'res.verdict.closest': { en: 'Closest to reach', bn: 'সবচেয়ে কাছাকাছি' },
  'res.alsoConsidered': { en: 'Also considered', bn: 'আরও যেগুলো বিবেচনা করা হয়েছে' },
  'res.unis': { en: 'Where you could apply', bn: 'যেখানে আবেদন করতে পারেন' },
  'res.unis.note': {
    en: 'Indicative shortlist and tuition. Your counsellor will confirm universities and current fees on your call.',
    bn: 'প্রাথমিক তালিকা ও আনুমানিক টিউশন, কাউন্সেলর কলে বিশ্ববিদ্যালয় ও বর্তমান ফি নিশ্চিত করবেন।',
  },
  'res.uni.strongIn': { en: 'Strong in {field}', bn: '{field}-এ শক্তিশালী' },
  'res.uni.tuition': { en: '{amount}/yr tuition', bn: 'টিউশন {amount}/বছর' },
  'res.uni.egLine': { en: 'e.g. {names}', bn: 'যেমন: {names}' },
  'uni.tier.competitive': { en: 'Competitive', bn: 'প্রতিযোগিতামূলক' },
  'uni.tier.moderate': { en: 'Solid option', bn: 'ভালো অপশন' },
  'uni.tier.accessible': { en: 'Safer entry', bn: 'সহজ ভর্তি' },
  'res.disclaimerLead': { en: 'This is indicative guidance.', bn: 'এটি প্রাথমিক ধারণা।' },
  'res.sub': {
    en: 'Based on the answers you gave. Select two or more to compare them side by side.',
    bn: 'আপনার দেওয়া উত্তরের ভিত্তিতে। পাশাপাশি তুলনা করতে দুটি বা তার বেশি বেছে নিন।',
  },
  'res.tier.strong': { en: 'Strong fit', bn: 'ভালো মিল' },
  'res.tier.strong.sub': {
    en: 'You meet the requirements and the fit is good on cost and priorities.',
    bn: 'আপনি শর্ত পূরণ করছেন এবং খরচ ও অগ্রাধিকারের দিক থেকেও মিল ভালো।',
  },
  'res.tier.possible': { en: 'Possible, with conditions', bn: 'সম্ভব, তবে কিছু শর্তসহ' },
  'res.tier.possible.sub': {
    en: 'Workable, but something needs attention first. Each card says what.',
    bn: 'সম্ভব, তবে আগে কিছু বিষয়ে কাজ করতে হবে। প্রতিটি কার্ডে সেটি লেখা আছে।',
  },
  'res.tier.unlikely': { en: 'Unlikely right now', bn: 'এই মুহূর্তে সম্ভাবনা কম' },
  'res.tier.unlikely.sub': {
    en: 'We show these anyway, with the exact blocker, so you know what would change the answer.',
    bn: 'তবুও দেখাচ্ছি, ঠিক কোন কারণে আটকে আছে তা সহ, যাতে বুঝতে পারেন কী বদলালে উত্তর বদলাবে।',
  },
  'res.score': { en: 'Fit score', bn: 'ফিট স্কোর' },
  'res.pick': { en: 'Add to comparison', bn: 'তুলনায় যোগ করুন' },
  'res.summary': {
    en: '{strong} strong, {possible} possible, {unlikely} unlikely. Out of {total} destinations.',
    bn: '{total}টি দেশের মধ্যে {strong}টি ভালো মিল, {possible}টি সম্ভব, {unlikely}টি সম্ভাবনা কম।',
  },
  'res.disclaimer': {
    en: 'It is generated from the answers you gave, not an admission or visa decision. Requirements change and vary by institution. A 10 Minute School counsellor will confirm your actual options before you commit to anything.',
    bn: 'এটি আপনার দেওয়া উত্তরের ভিত্তিতে তৈরি, কোনো ভর্তি বা ভিসা সিদ্ধান্ত নয়। শর্তাবলি পরিবর্তিত হয় এবং প্রতিষ্ঠানভেদে ভিন্ন হয়, কোনো সিদ্ধান্ত নেওয়ার আগে ১০ মিনিট স্কুলের কাউন্সেলর আপনার প্রকৃত সুযোগগুলো নিশ্চিত করবেন।',
  },
  'res.nextSteps': { en: 'What happens next', bn: 'এরপর কী হবে' },
  'res.nextSteps.body': {
    en: 'A counsellor has your details and will call within one working day to go through these options with you.',
    bn: 'একজন কাউন্সেলরের কাছে আপনার তথ্য পৌঁছে গেছে, তিনি এক কর্মদিবসের মধ্যে কল করে এই অপশনগুলো নিয়ে আলোচনা করবেন।',
  },
  'res.academicIndex': { en: 'Your academic index', bn: 'আপনার একাডেমিক ইনডেক্স' },
  'res.ieltsEq': { en: 'IELTS equivalent', bn: 'IELTS সমতুল্য' },
  'res.notTaken': { en: 'Not taken', bn: 'দেওয়া হয়নি' },

  // ---------- Facts ----------
  'fact.firstYear': { en: 'First year, typical', bn: 'প্রথম বছর, সাধারণত' },
  'fact.firstYearMin': { en: 'First year, minimum', bn: 'প্রথম বছর, সর্বনিম্ন' },
  'fact.tuition': { en: 'Tuition per year', bn: 'বছরে টিউশন' },
  'fact.living': { en: 'Living per year', bn: 'বছরে জীবনযাত্রার খরচ' },
  'fact.upfront': { en: 'Upfront before visa', bn: 'ভিসার আগে অগ্রিম' },
  'fact.ielts': { en: 'IELTS needed', bn: 'প্রয়োজনীয় IELTS' },
  'fact.ieltsTarget': { en: 'IELTS to aim for', bn: 'যে IELTS লক্ষ্য রাখবেন' },
  'fact.noBand': { en: 'No band below', bn: 'কোনো ব্যান্ড এর নিচে নয়' },
  'fact.academic': { en: 'Academic minimum', bn: 'একাডেমিক সর্বনিম্ন' },
  'fact.psw': { en: 'Post-study work', bn: 'পড়া শেষে কাজ' },
  'fact.pr': { en: 'PR prospects', bn: 'পিআর সম্ভাবনা' },
  'fact.prYears': { en: 'Years to PR', bn: 'পিআর পেতে বছর' },
  'fact.scholarship': { en: 'Scholarships', bn: 'স্কলারশিপ' },
  'fact.processing': { en: 'Visa processing', bn: 'ভিসা প্রসেসিং' },
  'fact.intakes': { en: 'Intakes', bn: 'ইনটেক' },
  'fact.work': { en: 'Work while studying', bn: 'পড়ার সময় কাজ' },
  'fact.gapTol': { en: 'Study gap accepted', bn: 'গ্রহণযোগ্য স্টাডি গ্যাপ' },
  'fact.refusalImpact': { en: 'Prior refusal impact', bn: 'আগের রিফিউজালের প্রভাব' },
  'fact.months': { en: '{n} months', bn: '{n} মাস' },
  'fact.years': { en: '{n} years', bn: '{n} বছর' },
  'fact.yearsRange': { en: '{min}–{max} years', bn: '{min}–{max} বছর' },
  'fact.weeksRange': { en: '{min}–{max} weeks', bn: '{min}–{max} সপ্তাহ' },
  'fact.hoursWeek': { en: '{n} hrs/week', bn: 'সপ্তাহে {n} ঘণ্টা' },
  'fact.waiverRange': { en: '{min}–{max}% tuition', bn: 'টিউশনের {min}–{max}%' },
  'fact.none': { en: 'None', bn: 'নেই' },

  // ---------- Ratings ----------
  'rating.very_weak': { en: 'Very weak', bn: 'খুবই দুর্বল' },
  'rating.weak': { en: 'Weak', bn: 'দুর্বল' },
  'rating.moderate': { en: 'Moderate', bn: 'মাঝারি' },
  'rating.strong': { en: 'Strong', bn: 'ভালো' },
  'rating.very_strong': { en: 'Very strong', bn: 'খুব ভালো' },
  'rating.very_limited': { en: 'Very limited', bn: 'খুবই সীমিত' },
  'rating.limited': { en: 'Limited', bn: 'সীমিত' },
  'impact.low': { en: 'Low', bn: 'কম' },
  'impact.moderate': { en: 'Moderate', bn: 'মাঝারি' },
  'impact.high': { en: 'High', bn: 'বেশি' },
  'impact.severe': { en: 'Severe', bn: 'অত্যন্ত বেশি' },

  // ---------- Reasons ----------
  'reason.english_strong': {
    en: 'Your English score of {score} is comfortably above the {required} needed. This opens up better institutions and scholarship eligibility.',
    bn: 'আপনার ইংরেজি স্কোর {score}, যা প্রয়োজনীয় {required} এর চেয়ে ভালোভাবেই বেশি, এতে ভালো প্রতিষ্ঠান ও স্কলারশিপের সুযোগ বাড়ে।',
  },
  'reason.english_meets': {
    en: 'Your English score of {score} meets the {required} minimum.',
    bn: 'আপনার ইংরেজি স্কোর {score}, যা সর্বনিম্ন {required} পূরণ করে।',
  },
  'reason.english_near': {
    en: 'Your {score} is just short of the {required} minimum. Half a band would change this answer. Retaking is usually worth it.',
    bn: 'আপনার {score} সর্বনিম্ন {required} থেকে সামান্য কম। মাত্র হাফ ব্যান্ড বাড়লেই এই উত্তর বদলে যাবে, আবার পরীক্ষা দেওয়া সাধারণত সার্থক।',
  },
  'reason.english_below': {
    en: 'Your {score} is below the {required} minimum required here.',
    bn: 'আপনার {score} এখানে প্রয়োজনীয় সর্বনিম্ন {required} এর চেয়ে কম।',
  },
  'reason.english_band_short': {
    en: 'Your {skill} band of {band} is below the {required} floor this country enforces on every band. The overall score alone is not enough.',
    bn: 'আপনার {skill} ব্যান্ড {band}, যা এই দেশের প্রতিটি ব্যান্ডের জন্য নির্ধারিত সর্বনিম্ন {required} এর নিচে, শুধু ওভারঅল স্কোর যথেষ্ট নয়।',
  },
  'reason.english_not_taken': {
    en: 'No English test yet. You need at least {required}, and {target} would give you real choice. Everything else here is provisional until you sit it.',
    bn: 'এখনো ইংরেজি পরীক্ষা দেননি। কমপক্ষে {required} লাগবে, আর {target} পেলে সত্যিকারের অপশন থাকবে। পরীক্ষা না দেওয়া পর্যন্ত এই ফলাফল প্রাথমিক।',
  },
  'reason.english_predicted': {
    en: 'Based on your expected score of {score}, not a real certificate. Sit the test to confirm this result.',
    bn: 'আপনার প্রত্যাশিত স্কোর {score} এর ভিত্তিতে, আসল সার্টিফিকেট নয়। নিশ্চিত হতে পরীক্ষাটি দিয়ে ফেলুন।',
  },
  'reason.english_moi_ok': {
    en: 'An MOI certificate may be accepted here, but only by some institutions and rarely for visa purposes. A test score is far safer.',
    bn: 'এখানে MOI সার্টিফিকেট গ্রহণ করা হতে পারে, তবে কিছু প্রতিষ্ঠানে এবং ভিসার ক্ষেত্রে খুব কমই। টেস্ট স্কোর অনেক বেশি নিরাপদ।',
  },
  'reason.english_moi_rejected': {
    en: 'MOI certificates are not accepted here. You will need a test score of at least {required}.',
    bn: 'এখানে MOI সার্টিফিকেট গ্রহণ করা হয় না। আপনার কমপক্ষে {required} টেস্ট স্কোর লাগবে।',
  },
  'reason.english_pathway': {
    en: 'A pre-sessional English or pathway programme could bridge the gap. Entry starts around {min}.',
    bn: 'প্রি-সেশনাল ইংরেজি বা পাথওয়ে প্রোগ্রাম দিয়ে ঘাটতি পূরণ করা যেতে পারে, ভর্তি শুরু প্রায় {min} থেকে।',
  },
  'reason.english_ukvi': {
    en: 'Some courses require IELTS UKVI specifically, not the standard Academic test. Check before you book a retake.',
    bn: 'কিছু কোর্সে সাধারণ Academic নয়, বিশেষভাবে IELTS UKVI লাগে। আবার পরীক্ষা বুক করার আগে যাচাই করুন।',
  },
  'reason.academic_strong': {
    en: 'Your result of {have} ({scale}) is at the competitive level here, which also strengthens your scholarship case.',
    bn: 'আপনার রেজাল্ট {have} ({scale}), যা এখানে প্রতিযোগিতামূলক পর্যায়ে, এটি স্কলারশিপের সম্ভাবনাও বাড়ায়।',
  },
  'reason.academic_meets': {
    en: 'Your result of {have} ({scale}) meets the {required} minimum for entry.',
    bn: 'আপনার রেজাল্ট {have} ({scale}), যা ভর্তির সর্বনিম্ন {required} পূরণ করে।',
  },
  'reason.academic_below': {
    en: 'Your result of {have} ({scale}) is below the {required} needed for this study level here.',
    bn: 'আপনার রেজাল্ট {have} ({scale}), যা এই স্তরের জন্য প্রয়োজনীয় {required} এর চেয়ে কম।',
  },
  'scale.gpa5': { en: 'GPA out of 5', bn: 'জিপিএ, ৫ এর মধ্যে' },
  'scale.cgpa4': { en: 'CGPA out of 4', bn: 'সিজিপিএ, ৪ এর মধ্যে' },
  'scale.percent': { en: '%', bn: '%' },
  'scale.index100': { en: 'index', bn: 'ইনডেক্স' },
  'reason.academic_backlogs': {
    en: '{count} backlog(s) will need explaining and may narrow which institutions accept you.',
    bn: '{count}টি ব্যাকলগের ব্যাখ্যা দিতে হবে এবং এতে কিছু প্রতিষ্ঠান বাদ পড়তে পারে।',
  },
  'reason.budget_comfortable': {
    en: 'Your budget covers the typical first-year cost of {typical}.',
    bn: 'আপনার বাজেট প্রথম বছরের সাধারণ খরচ {typical} বহন করতে পারবে।',
  },
  'reason.budget_tight': {
    en: 'Tuition and living fit your budget at the more affordable universities. Your counsellor will map the full funding picture with you.',
    bn: 'সাশ্রয়ী বিশ্ববিদ্যালয়গুলোতে টিউশন ও থাকা-খাওয়া আপনার বাজেটে মিলে যায়। পূর্ণ ফান্ডিং পরিকল্পনা কাউন্সেলর আপনার সাথে সাজিয়ে দেবেন।',
  },
  'reason.budget_planning': {
    en: 'Your budget covers tuition, which starts around {tuition} a year here. Living and visa funds will need a plan, and that is exactly what the free counselling call is for.',
    bn: 'আপনার বাজেটে টিউশন হয়ে যায়, এখানে বছরে প্রায় {tuition} থেকে শুরু। থাকা-খাওয়া ও ভিসা ফান্ডের পরিকল্পনা লাগবে, আর সেটাই ফ্রি কাউন্সেলিং কলের কাজ।',
  },
  'reason.budget_short': {
    en: 'Even the most affordable tuition here starts around {tuition} a year, beyond the budget you gave.',
    bn: 'এখানে সবচেয়ে সাশ্রয়ী টিউশনও বছরে প্রায় {tuition} থেকে শুরু, যা আপনার দেওয়া বাজেটের বাইরে।',
  },
  'reason.budget_deposit': {
    en: 'Around {upfront} must be paid or shown before the visa is even lodged, not spread across the year.',
    bn: 'ভিসা আবেদনের আগেই প্রায় {upfront} পরিশোধ বা দেখাতে হবে, এটি সারা বছরে ভাগ করে দেওয়ার সুযোগ নেই।',
  },
  'reason.gap_ok': {
    en: 'Your {years}-year study gap is within the {max} years generally accepted here, with documentation.',
    bn: 'আপনার {years} বছরের স্টাডি গ্যাপ এখানে সাধারণত গ্রহণযোগ্য {max} বছরের মধ্যেই, তবে কাগজপত্র লাগবে।',
  },
  'reason.gap_over': {
    en: 'A {years}-year study gap exceeds the roughly {max} years accepted here for this level.',
    bn: '{years} বছরের স্টাডি গ্যাপ এই স্তরের জন্য এখানে গ্রহণযোগ্য প্রায় {max} বছরের বেশি।',
  },
  'reason.refusal_risk': {
    en: 'Your previous visa refusal carries {impact} weight here and must be declared with full documentation.',
    bn: 'আপনার আগের ভিসা রিফিউজালের প্রভাব এখানে {impact} এবং সম্পূর্ণ কাগজপত্রসহ তা জানাতে হবে।',
  },
  'reason.refusal_low': {
    en: 'A previous refusal elsewhere carries little weight here.',
    bn: 'অন্য দেশে হওয়া রিফিউজাল এখানে খুব একটা প্রভাব ফেলে না।',
  },
  'reason.priority_lowest_cost': {
    en: 'Among the most affordable of your seven options. Matches your cost priority.',
    bn: 'আপনার সাতটি অপশনের মধ্যে সবচেয়ে সাশ্রয়ীগুলোর একটি, আপনার খরচের অগ্রাধিকারের সাথে মেলে।',
  },
  'reason.priority_fast_processing': {
    en: 'Comparatively fast visa processing. Matches your priority.',
    bn: 'তুলনামূলকভাবে দ্রুত ভিসা প্রসেসিং, আপনার অগ্রাধিকারের সাথে মেলে।',
  },
  'reason.priority_post_study_work': {
    en: 'Strong post-study work rights. Matches your priority.',
    bn: 'পড়া শেষে ভালো কাজের সুযোগ, আপনার অগ্রাধিকারের সাথে মেলে।',
  },
  'reason.priority_pr_pathway': {
    en: 'One of the clearer routes to permanent residency. Matches your priority.',
    bn: 'স্থায়ী বসবাসের তুলনামূলক স্পষ্ট পথগুলোর একটি, আপনার অগ্রাধিকারের সাথে মেলে।',
  },
  'reason.priority_ranking': {
    en: 'Strong global university rankings. Matches your priority.',
    bn: 'বিশ্বমানের র‍্যাঙ্কিংধারী বিশ্ববিদ্যালয়, আপনার অগ্রাধিকারের সাথে মেলে।',
  },
  'reason.priority_scholarship': {
    en: 'Better scholarship availability than most. Matches your priority.',
    bn: 'অন্যদের তুলনায় ভালো স্কলারশিপের সুযোগ, আপনার অগ্রাধিকারের সাথে মেলে।',
  },
  'reason.priority_weak': {
    en: 'You said {priority} matters to you. This is one of the weaker options on exactly that.',
    bn: 'আপনি বলেছেন {priority} আপনার কাছে গুরুত্বপূর্ণ, ঠিক এই দিক থেকেই এটি তুলনামূলক দুর্বল অপশন।',
  },
  'reason.scholarship_outlook': {
    en: 'Scholarship outlook: {rating}. Typical institutional waiver is {min}–{max}% of tuition.',
    bn: 'স্কলারশিপের সম্ভাবনা: {rating}। সাধারণত প্রতিষ্ঠান টিউশনের {min}–{max}% ছাড় দেয়।',
  },
  'reason.pr_outlook': {
    en: 'Permanent residency prospects: {rating}. Realistically {min}–{max} years from course start.',
    bn: 'স্থায়ী বসবাসের সম্ভাবনা: {rating}। বাস্তবে কোর্স শুরু থেকে {min}–{max} বছর।',
  },
  'reason.psw_duration': {
    en: '{months} months of post-study work via the {name}.',
    bn: '{name} এর মাধ্যমে পড়া শেষে {months} মাস কাজের সুযোগ।',
  },
  'reason.work_rights': {
    en: 'You may work {hours} hours a week during term.',
    bn: 'সেমিস্টার চলাকালীন সপ্তাহে {hours} ঘণ্টা কাজ করতে পারবেন।',
  },
  'reason.preferred_country': {
    en: 'You told us this country was already on your mind.',
    bn: 'আপনি জানিয়েছেন এই দেশটি আগে থেকেই আপনার বিবেচনায় ছিল।',
  },
  'reason.test_required': {
    en: 'A standardised test (SAT, GRE or GMAT) is required for most programmes here.',
    bn: 'এখানে বেশিরভাগ প্রোগ্রামে একটি স্ট্যান্ডার্ডাইজড টেস্ট (SAT, GRE বা GMAT) লাগে।',
  },
  'reason.no_ug_result': {
    en: 'No undergraduate result given, so this assessment relies on your HSC alone and is less reliable.',
    bn: 'স্নাতকের রেজাল্ট দেননি, তাই এই মূল্যায়ন শুধু এইচএসসির উপর ভিত্তি করে, নির্ভরযোগ্যতা কম।',
  },

  // ---------- Comparison ----------
  'cmp.title': { en: 'Side-by-side comparison', bn: 'পাশাপাশি তুলনা' },
  'cmp.sub': {
    en: 'The same rules that produced your matches, laid out so you can weigh the trade-offs yourself.',
    bn: 'যে নিয়মে আপনার ফলাফল তৈরি হয়েছে, সেটিই এখানে সাজানো, যাতে আপনি নিজেই বিবেচনা করতে পারেন।',
  },
  'cmp.pickMore': { en: 'Select at least two destinations to compare.', bn: 'তুলনা করতে অন্তত দুটি দেশ বেছে নিন।' },
  'cmp.selected': { en: '{n} selected', bn: '{n}টি নির্বাচিত' },
  'cmp.max': { en: 'You can compare up to 4.', bn: 'সর্বোচ্চ ৪টি তুলনা করতে পারবেন।' },
  'cmp.row.fit': { en: 'Your fit score', bn: 'আপনার ফিট স্কোর' },
  'cmp.row.verdict': { en: 'Verdict', bn: 'রায়' },
  'cmp.row.tuition': { en: 'Tuition per year', bn: 'বছরে টিউশন' },
  'cmp.row.living': { en: 'Living per year', bn: 'বছরে জীবনযাত্রার খরচ' },
  'cmp.row.totalMin': { en: 'First year (minimum)', bn: 'প্রথম বছর (সর্বনিম্ন)' },
  'cmp.row.totalTypical': { en: 'First year (typical)', bn: 'প্রথম বছর (সাধারণত)' },
  'cmp.row.upfront': { en: 'Payable before visa', bn: 'ভিসার আগে পরিশোধ' },
  'cmp.row.ieltsMin': { en: 'IELTS minimum', bn: 'IELTS সর্বনিম্ন' },
  'cmp.row.ieltsBand': { en: 'No band below', bn: 'কোনো ব্যান্ড এর নিচে নয়' },
  'cmp.row.ieltsTarget': { en: 'IELTS to aim for', bn: 'যে IELTS লক্ষ্য রাখবেন' },
  'cmp.row.academic': { en: 'Academic minimum', bn: 'একাডেমিক সর্বনিম্ন' },
  'cmp.row.gap': { en: 'Study gap accepted', bn: 'গ্রহণযোগ্য স্টাডি গ্যাপ' },
  'cmp.row.scholarship': { en: 'Scholarship outlook', bn: 'স্কলারশিপের সম্ভাবনা' },
  'cmp.row.waiver': { en: 'Typical merit waiver', bn: 'সাধারণ মেরিট ছাড়' },
  'cmp.row.work': { en: 'Work hours (term)', bn: 'কাজের ঘণ্টা (সেমিস্টার)' },
  'cmp.row.earnings': { en: 'Realistic monthly earnings', bn: 'বাস্তব মাসিক আয়' },
  'cmp.row.psw': { en: 'Post-study work', bn: 'পড়া শেষে কাজ' },
  'cmp.row.pr': { en: 'PR prospects', bn: 'পিআর সম্ভাবনা' },
  'cmp.row.prYears': { en: 'Realistic years to PR', bn: 'পিআর পেতে বাস্তব সময়' },
  'cmp.row.processing': { en: 'Visa processing', bn: 'ভিসা প্রসেসিং' },
  'cmp.row.refusal': { en: 'Prior refusal impact', bn: 'আগের রিফিউজালের প্রভাব' },
  'cmp.row.intakes': { en: 'Intakes', bn: 'ইনটেক' },
  'cmp.row.dependants': { en: 'Dependants allowed', bn: 'ডিপেনডেন্ট আনা যায়' },
  'cmp.row.interview': { en: 'Visa interview', bn: 'ভিসা ইন্টারভিউ' },

  // ---------- Errors / notices ----------
  'err.required': { en: 'This is required.', bn: 'এটি পূরণ করা আবশ্যক।' },
  'err.phone': { en: 'Enter a valid Bangladeshi mobile number.', bn: 'সঠিক বাংলাদেশি মোবাইল নম্বর দিন।' },
  'err.email': { en: 'Enter a valid email address, or leave it blank.', bn: 'সঠিক ইমেইল দিন, অথবা খালি রাখুন।' },
  'err.consent': { en: 'Please agree before continuing.', bn: 'এগোনোর আগে সম্মতি দিন।' },
  'err.level': { en: 'Select a study level.', bn: 'পড়াশোনার স্তর বেছে নিন।' },
  'err.english': { en: 'Select your English test, or choose “Not taken yet”.', bn: 'ইংরেজি পরীক্ষা বেছে নিন, অথবা “এখনো দিইনি” নির্বাচন করুন।' },
  'err.submit': { en: 'Something went wrong saving your details. Your matches are shown below anyway. Please also call us.', bn: 'আপনার তথ্য সংরক্ষণে সমস্যা হয়েছে। তবুও ফলাফল নিচে দেখানো হলো, অনুগ্রহ করে আমাদের কল করুন।' },
  'notice.saved': { en: 'Saved. A counsellor will call you within one working day.', bn: 'সংরক্ষিত হয়েছে। একজন কাউন্সেলর এক কর্মদিবসের মধ্যে কল করবেন।' },

  // ---------- Footer ----------
  'footer.privacy': {
    en: 'We store your answers so a counsellor can advise you. We do not sell your data or share it with third parties.',
    bn: 'কাউন্সেলর যাতে আপনাকে পরামর্শ দিতে পারেন সেজন্য আমরা আপনার উত্তর সংরক্ষণ করি। আমরা আপনার তথ্য বিক্রি করি না বা তৃতীয় পক্ষের সাথে শেয়ার করি না।',
  },
  'footer.rules': { en: 'Guidance data version {v} · last reviewed {d}', bn: 'গাইডেন্স ডেটা ভার্সন {v} · সর্বশেষ পর্যালোচনা {d}' },
  'footer.draft': {
    en: 'DRAFT DATA. {n} of these destinations still carry indicative placeholder figures pending verification: {list}.',
    bn: 'খসড়া ডেটা, এই দেশগুলোর {n}টির তথ্য এখনো যাচাই হয়নি, সংখ্যাগুলো প্রাথমিক: {list}।',
  },
}

/** Look up a string and interpolate {placeholders}. */
export function t(key: string, lang: Lang, params?: Record<string, string | number>): string {
  const entry = strings[key]
  if (!entry) return key
  let out = entry[lang] || entry.en
  if (params) {
    for (const [k, v] of Object.entries(params)) {
      out = out.split(`{${k}}`).join(String(v))
    }
  }
  return out
}
