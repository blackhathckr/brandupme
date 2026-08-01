/**
 * All site copy and configuration lives here so that changing a phone number
 * or a headline never means touching a component.
 *
 * VOICE RULE (design system): opportunity, never shame. The source material
 * was built on fear - "your competitor is beating you", "you are leaving money
 * on the table". Same facts, inverted posture. Nothing here should make a
 * business owner feel accused.
 */

/* ─────────────────────────────────────────────────────────────────────────
   PLACEHOLDERS - every one of these is pending client confirmation.
   Search for PENDING before launch. See docs open-items list.
   ───────────────────────────────────────────────────────────────────────── */
export const CONFIG = {
  phone: "+971501234567", // PENDING - poster number looks like a sample
  phoneDisplay: "+971 50 123 4567", // PENDING
  email: "hello@brandupme.ae", // PENDING - is this mailbox live?
  whatsapp: "971501234567", // PENDING
  city: "Dubai",
  country: "United Arab Emirates",
  price: 500,
  currency: "AED",
  /** Where the registration form POSTs. Swap for /submit.php on cPanel. */
  formEndpoint: "", // PENDING - form is blocked until this is set
  social: {
    linkedin: "#", // PENDING
    instagram: "#", // PENDING
    facebook: "#", // PENDING
  },
} as const;

export const WHATSAPP_LINK = `https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(
  "Hi BrandUpMe, I'd like to know more about the Business Partnership Program.",
)}`;

/**
 * Privacy / Terms / Refund are written but NOT published.
 *
 * They contain [TO BE CONFIRMED] placeholders on commercially significant
 * points (refund window, cancellation notice, jurisdiction) that only the
 * client can answer. Publishing a policy we invented would be worse than
 * having none.
 *
 * Flip to `true` once the client signs them off. That single change restores
 * the footer links, the consent-checkbox links and the sitemap entries, and
 * removes the noindex from the three pages.
 */
export const LEGAL_PAGES_PUBLISHED = false;

/* ── Navigation ─────────────────────────────────────────────────────────── */
export const NAV = [
  { label: "How it works", href: "#how" },
  { label: "What we do", href: "#services" },
  { label: "Why us", href: "#compare" },
  { label: "Pricing", href: "#pricing" },
  { label: "FAQ", href: "#faq" },
] as const;

/* ── Hero ───────────────────────────────────────────────────────────────── */
export const HERO = {
  badge: "Now onboarding UAE businesses",
  /** The italic word is rendered separately - the one-italic rule. */
  headlineBefore: "Hire your own",
  headlineItalic: "remote",
  headlineAfter: "sales representative",
  sub: "We find the right prospects, start the conversation and follow up until they are ready. You do what you do best - close the deal.",
  primaryCta: "Start growing today",
  secondaryCta: "See how it works",
} as const;

/** Illustrative until the client supplies real figures. Labelled as such. */
export const TICKER = [
  {
    label: "Calls made",
    meta: "across partner businesses",
    value: 47,
    tone: "red" as const,
  },
  {
    label: "Follow-ups sent",
    meta: "WhatsApp and email",
    value: 128,
    tone: "gold" as const,
  },
  {
    label: "Meetings booked",
    meta: "qualified and confirmed",
    value: 9,
    tone: "green" as const,
  },
];

export const MARQUEE = [
  "Cold calling",
  "WhatsApp outreach",
  "Email marketing",
  "Lead qualification",
  "Appointment setting",
  "Business pitching",
  "Customer follow-up",
  "Marketing support",
];

/* ── Revenue opportunity calculator ─────────────────────────────────────── */
export const CALC = {
  eyebrow: "Your numbers",
  headlineBefore: "The pipeline you",
  headlineItalic: "already",
  headlineAfter: "have",
  sub: "Most businesses do not need more leads. They need someone to follow up on the ones already arriving. Move the sliders to see what consistent follow-up is worth to you.",
  /** Industry-standard assumption, stated openly rather than hidden. */
  note: "Assumes a 25% close rate on properly followed-up enquiries, a common benchmark for considered B2B purchases. Your figures will differ - we will model them properly on our first call.",
} as const;

/* ── What we do ─────────────────────────────────────────────────────────── */
export const SERVICES = [
  {
    icon: "PhoneCall",
    title: "Cold calling",
    body: "Professional outbound calls that introduce your business to the decision makers who should already know you.",
  },
  {
    icon: "MessageCircle",
    title: "WhatsApp outreach",
    body: "The channel UAE customers actually reply on, used consistently rather than occasionally.",
  },
  {
    icon: "Mail",
    title: "Email campaigns",
    body: "Targeted introductions written around your offer, not a generic template blast.",
  },
  {
    icon: "Search",
    title: "Prospect research",
    body: "We build the list before we dial. The right companies, the right person, the right reason to call.",
  },
  {
    icon: "Filter",
    title: "Lead qualification",
    body: "Requirement, budget and timeline confirmed before anything reaches your desk.",
  },
  {
    icon: "CalendarCheck",
    title: "Appointment setting",
    body: "Qualified meetings booked straight into your calendar, with context attached.",
  },
  {
    icon: "Repeat",
    title: "Consistent follow-up",
    body: "The step most businesses lose money on. Every enquiry chased until it converts or closes.",
  },
  {
    icon: "TrendingUp",
    title: "Business development",
    body: "Positioning, messaging and campaign support that turns interest into conversations.",
  },
] as const;

/* ── How it works ───────────────────────────────────────────────────────── */
export const STAGES = [
  {
    n: "01",
    title: "Understand your business",
    who: "Before we speak to anyone",
    body: "We study your products, services, pricing, competitors and goals. We cannot represent a business we do not understand, so this comes first - always.",
    output: "Business brief agreed",
    icon: "BookOpen",
  },
  {
    n: "02",
    title: "Define your ideal customer",
    who: "Who actually buys",
    body: "We build a profile of the companies most likely to need you, and identify the person inside them who can say yes.",
    output: "Target profile built",
    icon: "Target",
  },
  {
    n: "03",
    title: "Find the right prospects",
    who: "Research, then reach",
    body: "We research and build the outreach list. Quality over volume - a hundred right companies beats a thousand wrong ones.",
    output: "Prospect list ready",
    icon: "Search",
  },
  {
    n: "04",
    title: "Start the conversation",
    who: "Calls, WhatsApp, email",
    body: "Your dedicated representative introduces your business professionally, on the channel each prospect actually responds to.",
    output: "Conversations opened",
    icon: "PhoneCall",
  },
  {
    n: "05",
    title: "Understand their needs",
    who: "Listen before pitching",
    body: "We establish requirement, challenge, budget and timeline before recommending anything. Successful sales begin with understanding.",
    output: "Need qualified",
    icon: "Ear",
  },
  {
    n: "06",
    title: "Present the right solution",
    who: "Matched, not pushed",
    body: "We recommend the product or service that genuinely fits, and handle questions clearly - looping in your team for technical detail.",
    output: "Solution presented",
    icon: "Lightbulb",
  },
  {
    n: "07",
    title: "Follow up properly",
    who: "Where the revenue is",
    body: "Structured, persistent, professional follow-up. Not one message and silence - a real sequence until there is a decision either way.",
    output: "Interest sustained",
    icon: "Repeat",
  },
  {
    n: "08",
    title: "Hand you the opportunity",
    who: "You close",
    body: "A qualified prospect, briefed and ready to talk business, arrives in your calendar with full context.",
    output: "Meeting booked",
    icon: "Handshake",
  },
] as const;

/* ── A day with your rep ────────────────────────────────────────────────── */
export const DAY = [
  { time: "09:00", title: "Research and list building", body: "New prospects identified and verified for the day's outreach.", icon: "Search" },
  { time: "10:00", title: "First call block", body: "Introductions to decision makers at target companies.", icon: "PhoneCall" },
  { time: "12:00", title: "WhatsApp follow-ups", body: "Yesterday's conversations continued on the channel they prefer.", icon: "MessageCircle" },
  { time: "14:00", title: "Email sequences", body: "Proposals, company profiles and answers sent to warm prospects.", icon: "Mail" },
  { time: "16:00", title: "Second call block", body: "Callbacks, qualification and objection handling.", icon: "PhoneCall" },
  { time: "17:30", title: "Appointments confirmed", body: "Qualified meetings booked into your calendar with full context.", icon: "CalendarCheck" },
] as const;

/* ── Comparison ─────────────────────────────────────────────────────────── */
export const COMPARE = {
  inhouse: {
    label: "Hiring in-house",
    price: "AED 8,000+",
    period: "per month, before commission",
    rows: [
      "Visa and sponsorship costs",
      "Office space and equipment",
      "Recruitment takes 30 to 60 days",
      "Training before productivity",
      "HR, payroll and leave management",
      "You pay the salary regardless of results",
    ],
  },
  brandupme: {
    label: "BrandUpMe partnership",
    price: `${CONFIG.currency} ${CONFIG.price}`,
    period: "per month + success-based commission",
    rows: [
      "No visa, no sponsorship",
      "No office, no equipment",
      "Outreach starts in days",
      "Already trained and working",
      "Fully managed by us",
      "Commission only on completed business",
    ],
  },
} as const;

/* ── Industries ─────────────────────────────────────────────────────────── */
export const INDUSTRIES = [
  "Real Estate",
  "Restaurants & F&B",
  "Manufacturing",
  "FMCG",
  "Healthcare & Clinics",
  "Education & Training",
  "IT & Software",
  "Logistics & Freight",
  "Retail & E-Commerce",
  "Tourism & Travel",
  "Construction",
  "Finance & Insurance",
  "Startups & SMEs",
  "Professional Services",
] as const;

/* ── Pricing ────────────────────────────────────────────────────────────── */
export const PRICING = {
  includes: [
    "A dedicated remote sales representative",
    "Business understanding and prospect research",
    "Cold calling and business outreach",
    "WhatsApp and email communication",
    "Lead qualification and appointment booking",
    "Consistent, structured follow-up",
    "Business development and marketing support",
  ],
  notes: [
    {
      title: "Why AED 500?",
      body: "It covers the business development work your representative actually performs. This is not software or CRM access - it is a person doing outreach on behalf of your business.",
    },
    {
      title: "Success-based commission",
      body: "Commission applies only when business is successfully generated and completed, on terms agreed with you in writing before we start.",
    },
    {
      title: "What it replaces",
      body: "No salary, no visa, no office, no recruitment, no training, no HR administration. Only business development.",
    },
    {
      title: "Monthly, flexible",
      body: "The programme runs month to month. Scale up as your pipeline grows. No long-term lock-in contract.",
    },
  ],
} as const;

/* ── FAQ ────────────────────────────────────────────────────────────────── */
export const FAQ = [
  {
    q: "Why partner with BrandUpMe instead of hiring a salesperson?",
    a: "Hiring means recruitment, onboarding, salary, incentives, leave and supervision. BrandUpMe gives you a dedicated remote sales representative working as your business development partner, without the fixed cost and management overhead of a full-time employee.",
  },
  {
    q: "What does the AED 500 monthly fee include?",
    a: "Business understanding, prospect research, cold calling, WhatsApp outreach, email communication, appointment booking, lead qualification, customer follow-up and ongoing business development, all performed by your dedicated representative.",
  },
  {
    q: "How is this different from a marketing agency?",
    a: "Marketing creates awareness. We create conversations. We actively reach out to potential customers, understand what they need, qualify the opportunity and support your sales process through to a booked meeting.",
  },
  {
    q: "How do you identify the right customers?",
    a: "We start by understanding your business, products, target audience, pricing and goals. Then we approach the customers most likely to benefit from what you offer - not everyone with a phone number.",
  },
  {
    q: "Do you pitch the same thing to everyone?",
    a: "No. We establish each customer's requirement, challenge, budget and buying intent before recommending anything. A pitch that ignores the customer's situation does not close.",
  },
  {
    q: "Can you work alongside my existing sales team?",
    a: "Yes, and that is often the best fit. We extend your reach, improve follow-up consistency and create additional qualified opportunities for your team to close.",
  },
  {
    q: "What happens when customers ask technical questions?",
    a: "Your representative captures the requirement in detail and coordinates with your team whenever product-specific or technical expertise is needed. We never guess on your behalf.",
  },
  {
    q: "How does the commission work?",
    a: "It is success-based. Commission applies only when business is successfully generated and completed, at the percentage and on the terms agreed with you in writing before the partnership begins.",
  },
  {
    q: "Which businesses can join?",
    a: "Startups, SMEs, manufacturers, retailers, healthcare providers, restaurants, IT companies, real estate firms, educational institutions and other growing businesses across the UAE.",
  },
  {
    q: "Can I cancel?",
    a: "The programme runs on a monthly basis with no long-term lock-in. You may discontinue in line with the terms of your partnership agreement.",
  },
  {
    q: "How will my business be represented?",
    a: "Your representative communicates as a professional representative of your business, using messaging you have approved. Nothing is said to a customer that you have not agreed to.",
  },
  {
    q: "How quickly does outreach start?",
    a: "Once your business brief is agreed and the partnership is active, outreach typically begins within days - compared with 30 to 60 days to recruit and onboard an employee.",
  },
  {
    q: "Why BrandUpMe?",
    a: "Because we do not just generate leads. We represent your business properly, listen before we pitch, and focus on building opportunities that actually convert.",
  },
] as const;

/* ── Registration form ──────────────────────────────────────────────────── */
export const INDUSTRY_OPTIONS = [...INDUSTRIES, "Other"];

export const CITY_OPTIONS = [
  "Dubai",
  "Abu Dhabi",
  "Sharjah",
  "Ajman",
  "Ras Al Khaimah",
  "Fujairah",
  "Umm Al Quwain",
  "Al Ain",
  "Other",
];

export const ORDER_VALUE_OPTIONS = [
  "Under 5,000",
  "5,000 - 25,000",
  "25,000 - 100,000",
  "Over 100,000",
];

export const COMMISSION_OPTIONS = [
  "2% - 5%",
  "5% - 10%",
  "10% - 15%",
  "15% - 20%",
  "Fixed amount per deal",
  "To be discussed",
];
