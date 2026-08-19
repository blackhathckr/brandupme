/**
 * INDIA-ONLY interior pages.
 *
 * The client was explicit that About Us and Why Choose Us apply to India only,
 * not Dubai, so these are not region-keyed and the UAE nav does not link to
 * them.
 *
 * Copy is taken verbatim from the client's PDFs:
 *   BrandUpMe_About_Us_Profile.pdf
 *   Why_Choose_BrandUpMe_LLP.pdf
 *
 * YEARS - RESOLVED 2026-08-06
 * The About PDF says "established in 2015" while the homepage stat band said
 * "3+ Years Experience". The client confirmed ten years for India, so the
 * homepage now reads "10+ Years Experience", which is consistent with a 2015
 * founding.
 *
 * CLIENT COUNT - RESOLVED 2026-08-06
 * The client confirmed "since 2015" and "100+ clients" are both correct, and
 * asked for the homepage's "250+ Happy Clients" to be changed to 100+. Done,
 * so every page now states the same figures.
 */

export const ABOUT = {
  eyebrow: "About Us",
  headline: "Making professional marketing",
  accent: "accessible",
  sub: "BrandUpMe LLP was established in 2015 with a vision to make professional digital marketing, branding and technology services accessible to businesses of every size.",

  /** Figures as stated in the client's About PDF. */
  stats: [
    { value: "2015", label: "Established" },
    { value: "100+", label: "Companies served" },
    { value: "2", label: "Countries" },
    { value: "9", label: "Service lines" },
  ],

  intro: {
    heading: "Why BrandUpMe was started",
    body: [
      "We recognised that many businesses had excellent products and services but lacked a strong online presence, because they could not afford an in-house marketing team.",
      "Every business needs visibility in the digital world. BrandUpMe was founded to help businesses build a professional online presence without the cost of hiring multiple marketing professionals. We act as an extended digital marketing team so business owners can focus on running and growing their business.",
    ],
    avatar: "/avatar/arms.webp",
  },

  /** The problem / solution pair, shown as a contrast panel. */
  problem: {
    heading: "The problem we solve",
    pains: [
      "Limited online visibility",
      "Inconsistent marketing",
      "High cost of an in-house marketing department",
    ],
    answer:
      "BrandUpMe provides a complete, affordable solution by managing digital branding, marketing and customer engagement under one roof.",
  },

  whatWeDo: {
    heading: "What we do",
    sub: "Our team manages content creation, regular posting, engagement and digital promotion to help businesses increase visibility and generate quality business inquiries.",
    items: [
      { icon: "Globe", label: "Website Development" },
      { icon: "Smartphone", label: "Mobile App Development" },
      { icon: "MessageSquare", label: "Social Media Management" },
      { icon: "Megaphone", label: "Digital Marketing" },
      { icon: "Search", label: "SEO" },
      { icon: "Sparkles", label: "Branding & Promotion" },
      { icon: "Palette", label: "Creative Poster Design" },
      { icon: "Video", label: "Video Advertising" },
      { icon: "TrendingUp", label: "Organic Marketing" },
    ],
  },

  /** Mission / vision / promise, presented as a forward-looking timeline. */
  future: {
    eyebrow: "Where we are going",
    heading: "The BrandUpMe",
    accent: "AI Platform",
    blocks: [
      {
        icon: "Target",
        title: "Our Mission",
        body: "To simplify digital marketing through the upcoming BrandUpMe AI Platform - an intelligent application where business owners can create posters, video ads, social posts and campaigns without technical skills, connect with the right customers and grow faster, while reducing dependence on expensive third-party tools.",
      },
      {
        icon: "Eye",
        title: "Our Vision",
        body: "BrandUpMe AI as an all-in-one business growth platform where entrepreneurs manage their complete digital presence, create professional marketing content, generate leads and expand globally from a single application - saving money and making advanced AI accessible to everyone.",
      },
      {
        icon: "Handshake",
        title: "Our Promise",
        body: "We are not just building another marketing platform. We are building the future operating system for business growth - an AI-powered ecosystem where entrepreneurs can promote, market, generate leads and expand globally with confidence, without requiring specialist marketing skills.",
      },
    ],
    avatar: "/avatar/laptop.webp",
  },
} as const;

export const WHY_CHOOSE = {
  eyebrow: "Why Choose Us",
  headline: "Why businesses choose",
  accent: "BrandUpMe LLP",
  sub: "We don't just create posts. We create opportunities.",

  reasons: [
    {
      icon: "Wallet",
      title: "Affordable Digital Marketing Solutions",
      body: "Professional digital marketing at competitive pricing, making high-quality branding and promotion accessible to startups, SMEs and established businesses without the expense of a full in-house marketing team.",
      stat: null,
    },
    {
      icon: "Palette",
      title: "More Creative Content, More Brand Visibility",
      body: "Every month we deliver 24 professionally designed posters and 4 promotional video advertisements, helping your business stay active, visible and engaging across social media.",
      stat: { value: "28", label: "creatives every month" },
    },
    {
      icon: "MessageSquare",
      title: "Complete Social Media Management",
      body: "From content planning and poster creation to publishing, organic promotion, audience engagement and customer inquiry handling - we manage your complete digital presence so you can focus on your business.",
      stat: null,
    },
    {
      icon: "TrendingUp",
      title: "Organic Growth With Long-Term Results",
      body: "We emphasise consistent organic marketing through quality content, regular posting, community engagement and brand awareness strategies that build long-term customer trust.",
      stat: null,
    },
    {
      icon: "Handshake",
      title: "Your Dedicated Business Growth Partner",
      body: "We work as an extension of your business, supporting branding, customer engagement, lead generation and sustainable growth - not just delivering marketing services.",
      stat: null,
    },
    {
      icon: "Sparkles",
      title: "Technology-Driven Future",
      body: "BrandUpMe is developing its own AI-powered platform to simplify marketing, content creation and lead generation, helping businesses reduce dependence on expensive third-party software.",
      stat: null,
    },
  ],

  commitment: {
    eyebrow: "Our Commitment",
    heading: "We don't just create posts.",
    accent: "We create opportunities.",
    body: "Our mission is to help businesses build stronger brands, reach more customers and grow with confidence through affordable, innovative and result-oriented digital marketing solutions.",
    avatar: "/avatar/tablet.webp",
  },
} as const;
