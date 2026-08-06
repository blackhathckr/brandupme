/**
 * India service detail pages.
 *
 * Copy condensed from the client's WhatsApp write-ups. The originals run
 * 1,500+ words each of largely repeated structure; these keep every distinct
 * claim, number and process step but drop the repetition, because a wall of
 * text converts worse than a scannable page and the repeated blocks were
 * identical across all four services.
 *
 * Qualified Leads Delivered was reconstructed from the client's supplied
 * artwork - its written copy arrived truncated mid-sentence, but the
 * infographic contains the full deliverables list and six-step process.
 *
 * PENDING ARTWORK - social-media-management has copy but no circular image
 * yet. `art` is optional so the page ships now and the image drops in later;
 * until then both the detail page and the homepage card render an icon in a
 * circle of the same size, so nothing looks broken or collapses.
 */

export type ServicePage = {
  slug: string;
  /** Must match the title in lib/content.ts so homepage cards can link. */
  cardTitle: string;
  nav: string;
  metaTitle: string;
  metaDescription: string;
  eyebrow: string;
  headline: string;
  accent: string;
  sub: string;
  /** Circular service artwork supplied by the client. Absent until it lands. */
  art?: string;
  /** Icon shown in place of the artwork while `art` is missing. */
  icon: string;
  intro: { heading: string; body: string[] };
  highlights: { icon: string; value: string; label: string }[];
  offer: { heading: string; sub?: string; groups: { title: string; items: string[] }[] };
  process: { heading: string; steps: { n: string; title: string; body: string }[] };
  why: { heading: string; items: string[] };
  industries: string[];
  closing: { heading: string; body: string; tagline: string };
};

const INDUSTRIES_BROAD = [
  "Manufacturers",
  "Restaurants & Cafés",
  "Hotels",
  "Retail Businesses",
  "Healthcare & Clinics",
  "Educational Institutes",
  "Real Estate",
  "FMCG Brands",
  "Fashion & Lifestyle",
  "Jewellery Stores",
  "Automobile",
  "IT Companies",
  "Startups",
  "Professional Services",
  "Export & Import",
  "Corporate Organisations",
];

export const SERVICE_PAGES: ServicePage[] = [
  /* ── Social Media Management ──────────────────────────────────────────── */
  {
    slug: "social-media-management",
    // art pending from the client - icon fallback renders until it arrives.
    icon: "MessageSquare",
    cardTitle: "Social Media Management",
    nav: "Social Media Management",
    metaTitle: "Social Media Management Services",
    metaDescription:
      "End-to-end social media management across Facebook, Instagram, X (Twitter) and YouTube. Account setup, creative content, publishing, engagement and monthly performance reporting.",
    eyebrow: "Social Media Management",
    headline: "Build a powerful online presence and grow your",
    accent: "business",
    sub: "We create, manage, optimise and promote your brand across leading social media platforms to increase visibility, customer engagement and business growth.",

    intro: {
      heading: "Every platform handled, end to end",
      body: [
        "We manage your Facebook Business Page, Instagram Business Profile, X (Twitter) account and YouTube channel - created, branded, optimised and kept active by a dedicated account team.",
        "Account creation, profile optimisation, creative design, content writing, publishing, audience engagement, organic promotion and monthly performance reporting are all included, so your business stays professional and visible without an in-house social media team.",
      ],
    },

    highlights: [
      { icon: "Smartphone", value: "4", label: "Platforms managed" },
      { icon: "MessageCircle", value: "Daily", label: "Audience engagement" },
      { icon: "BarChart3", value: "Monthly", label: "Performance reports" },
      { icon: "TrendingUp", value: "2015", label: "Managing since" },
    ],

    offer: {
      heading: "What your account team delivers",
      sub: "Facebook Business Page, Instagram Business Profile, X (Twitter) and YouTube Channel.",
      groups: [
        {
          title: "Account Creation & Optimisation",
          items: [
            "Professional business accounts on all major platforms",
            "Business logo and cover banner",
            "Business description and contact information",
            "Website and social links",
            "Call-to-action buttons",
            "Keywords and SEO optimisation",
          ],
        },
        {
          title: "Creative Content Design",
          items: [
            "Creative poster designs",
            "Product promotions",
            "Service promotions",
            "Festival greetings",
            "Brand awareness posts",
            "Informative business posts",
          ],
        },
        {
          title: "Content Writing & Publishing",
          items: [
            "Professional, engaging captions",
            "Relevant hashtags for reach and engagement",
            "Consistent post publishing",
            "Post scheduling",
            "Regular account management",
          ],
        },
        {
          title: "Audience Engagement",
          items: [
            "Responding to comments",
            "Managing customer interactions",
            "Increasing engagement",
            "Encouraging community participation",
            "Consistent brand identity across every platform",
          ],
        },
        {
          title: "Organic Marketing & Leads",
          items: [
            "Organic content promotion",
            "Local community sharing",
            "Relevant group sharing",
            "Hashtag strategy",
            "Audience targeting",
            "Quality business enquiries through strategic campaigns",
          ],
        },
        {
          title: "Campaigns & Reporting",
          items: [
            "New product launches and business promotions",
            "Seasonal offers and festival campaigns",
            "Brand awareness and customer engagement activities",
            "Audience growth, reach and impressions",
            "Engagement and post performance analysis",
            "Content effectiveness reporting",
          ],
        },
      ],
    },

    // The client supplied deliverables rather than a numbered process. These
    // steps restate his own list in delivery order - nothing added.
    process: {
      heading: "How we manage your social media",
      steps: [
        { n: "01", title: "Account Creation", body: "We create professional business accounts across all major platforms with complete branding and business information." },
        { n: "02", title: "Profile Optimisation", body: "Logo, cover banner, description, contact details, links, call-to-action buttons and keywords." },
        { n: "03", title: "Content Planning & Design", body: "Monthly creative plan, poster designs, captions and hashtag research." },
        { n: "04", title: "Publishing & Scheduling", body: "Posts published and scheduled consistently to keep your presence active." },
        { n: "05", title: "Engagement & Promotion", body: "Comment replies, community and group sharing, hashtag strategy and campaign execution." },
        { n: "06", title: "Performance Reporting", body: "Regular reports on audience growth, reach, engagement and content effectiveness." },
      ],
    },

    why: {
      heading: "Why choose BrandUpMe",
      items: [
        "Professional social media management",
        "Creative and high-quality content",
        "Consistent brand identity",
        "Increased online visibility",
        "Better customer engagement",
        "Organic business growth strategies",
        "Lead generation focused marketing",
        "Dedicated account management",
        "Multi-platform social media management",
        "Affordable monthly partnership plans",
      ],
    },

    industries: INDUSTRIES_BROAD,

    closing: {
      heading: "Our goal for your business",
      body: "To build a strong digital presence, increase brand awareness, engage the right audience, generate quality business enquiries and help your business achieve sustainable growth through strategic social media management.",
      tagline: "Building brands. Creating connections. Growing businesses.",
    },
  },

  /* ── Creative Design & Video Ads ──────────────────────────────────────── */
  {
    slug: "creative-design-video-ads",
    art: "/services/creative-design-video-ads.webp",
    icon: "Palette",
    cardTitle: "Creative Design & Video Ads",
    nav: "Creative Design & Video Ads",
    metaTitle: "Creative Design & Video Advertisement Services",
    metaDescription:
      "24 professional poster advertisements and 4 promotional video ads every month. AI-assisted creative workflows, customised to your brand, by BrandUpMe LLP since 2015.",
    eyebrow: "Creative Design & Video Ads",
    headline: "Creative advertising that gets your business",
    accent: "noticed",
    sub: "Businesses have only a few seconds to capture attention. We create visually compelling marketing content that builds brand recognition and encourages engagement.",

    intro: {
      heading: "More than an attractive poster",
      body: [
        "Every design represents your brand identity and communicates your business message. Our creative team studies your business, products, services, target audience and marketing objectives before designing anything.",
        "Every design follows your branding guidelines - logo, brand colours, typography and visual identity - so your marketing stays consistent across every platform.",
      ],
    },

    highlights: [
      { icon: "Palette", value: "24", label: "Poster ads per month" },
      { icon: "Video", value: "4", label: "Video ads per month" },
      { icon: "Sparkles", value: "AI", label: "Assisted workflows" },
      { icon: "TrendingUp", value: "2015", label: "Creating since" },
    ],

    offer: {
      heading: "What you receive every month",
      groups: [
        {
          title: "24 Professional Poster Advertisements",
          items: [
            "Promote your products and services",
            "Build brand awareness",
            "Announce offers and discounts",
            "Highlight new product launches",
            "Seasonal and festival campaigns",
            "Educate customers about your services",
          ],
        },
        {
          title: "4 Promotional Video Advertisements",
          items: [
            "Introduce your business",
            "Showcase customer benefits",
            "Launch new products",
            "Promote special offers",
            "Build trust and credibility",
            "Optimised for Facebook, Instagram Reels, YouTube, X and WhatsApp",
          ],
        },
        {
          title: "AI-Assisted Creative Workflows",
          items: [
            "Creative concept development",
            "Product visualisation and promotional mockups",
            "Storyboard and video concept planning",
            "Background creation and visual enhancement",
            "Every AI-assisted design reviewed and refined by our creative team",
          ],
        },
      ],
    },

    process: {
      heading: "Our creative process",
      steps: [
        { n: "01", title: "Business Understanding", body: "We study your company, products, services, competitors and target audience." },
        { n: "02", title: "Content Planning", body: "We plan monthly marketing topics and promotional campaigns." },
        { n: "03", title: "Creative Strategy", body: "We prepare creative concepts based on your business goals." },
        { n: "04", title: "Design & Production", body: "Posters and videos created with modern tools and AI-assisted workflows." },
        { n: "05", title: "Review & Publishing", body: "After your approval, content is ready to publish across your platforms." },
      ],
    },

    why: {
      heading: "Why 24 posters and 4 videos every month?",
      items: [
        "Most businesses post only a few times a month and struggle to stay visible",
        "Consistency is one of the strongest factors in social media success",
        "Regular posting improves customer recall and keeps your audience engaged",
        "Video consistently earns higher engagement than static posts",
        "Video explains products visually and demonstrates services quickly",
        "Customised designs, never generic templates",
      ],
    },

    industries: INDUSTRIES_BROAD,

    closing: {
      heading: "Build a stronger brand with creative advertising",
      body: "With 24 poster advertisements and 4 promotional videos every month, we help businesses maintain an active digital presence without the cost of building an in-house creative team.",
      tagline: "Creative ideas. AI-driven innovation. Advertising that builds brands.",
    },
  },

  /* ── Organic Marketing ────────────────────────────────────────────────── */
  {
    slug: "organic-marketing",
    art: "/services/organic-marketing.webp",
    icon: "Megaphone",
    cardTitle: "Organic Marketing",
    nav: "Organic Marketing",
    metaTitle: "Organic Marketing Services",
    metaDescription:
      "Grow naturally through consistent content, social media management, audience engagement and local group sharing. Long-term visibility without depending on ad spend.",
    eyebrow: "Organic Marketing",
    headline: "Grow your business",
    accent: "naturally",
    sub: "Paid campaigns stop working the moment the budget ends. Organic marketing builds long-term visibility, trust and customer relationships that keep working.",

    intro: {
      heading: "What organic marketing actually is",
      body: [
        "Promoting your business without depending entirely on paid advertisements. Instead of paying for every click, organic marketing focuses on quality content, active profiles, genuine engagement and trust built over time.",
        "Customers are more likely to interact with businesses that regularly share useful information, respond to enquiries and maintain an active presence. Organic marketing creates those opportunities while strengthening your credibility.",
      ],
    },

    highlights: [
      { icon: "TrendingUp", value: "Long-term", label: "Compounding results" },
      { icon: "Users", value: "Organic", label: "Audience engagement" },
      { icon: "Megaphone", value: "Local", label: "Community reach" },
      { icon: "Target", value: "Lower", label: "Ad spend dependence" },
    ],

    offer: {
      heading: "What our organic marketing includes",
      groups: [
        {
          title: "Content Writing & Strategy",
          items: [
            "Product descriptions and service highlights",
            "Educational and promotional posts",
            "Festival greetings and awareness campaigns",
            "Industry updates and customer-focused messaging",
            "SEO-friendly, tailored to your audience",
          ],
        },
        {
          title: "Publishing & Local Reach",
          items: [
            "Regular publishing against a planned content calendar",
            "Sharing in relevant local business groups and communities",
            "Increased local visibility and targeted exposure",
            "Better community engagement",
          ],
        },
        {
          title: "Engagement & Enquiry Support",
          items: [
            "Responding to comments and encouraging conversations",
            "Interacting with followers and building relationships",
            "Replying to customer enquiries professionally",
            "Collecting contact details and qualifying interest",
            "Forwarding genuine leads to your company",
          ],
        },
      ],
    },

    process: {
      heading: "Our organic marketing process",
      steps: [
        { n: "01", title: "Business Analysis", body: "We understand your industry, products, competitors and target audience." },
        { n: "02", title: "Content Planning", body: "A monthly content calendar aligned with your marketing goals." },
        { n: "03", title: "Creative Development", body: "Posters, captions and content that reflect your brand identity." },
        { n: "04", title: "Publishing & Promotion", body: "Content published and promoted through relevant organic channels." },
        { n: "05", title: "Community Engagement", body: "We manage audience interactions and support engagement." },
        { n: "06", title: "Enquiry Management", body: "Interested customer enquiries are organised and shared with you." },
      ],
    },

    why: {
      heading: "Why organic marketing matters",
      items: [
        "Higher customer trust and stronger brand recognition",
        "Better online visibility that compounds over time",
        "Increased audience engagement",
        "Sustainable results rather than results that stop with the budget",
        "Lower dependence on paid advertising",
        "Improved long-term customer relationships",
      ],
    },

    industries: [
      "Manufacturing",
      "Restaurants & Cafés",
      "Retail Stores",
      "Healthcare & Clinics",
      "Educational Institutions",
      "Real Estate",
      "E-commerce Brands",
      "Fashion & Lifestyle",
      "Professional Services",
      "Startups",
      "Local Businesses",
      "Corporate Organisations",
    ],

    closing: {
      heading: "Build sustainable growth",
      body: "Organic marketing is more than posting on social media. It is creating a trusted brand that customers recognise and remember, attracting genuine enquiries over time.",
      tagline: "Growing your business organically. Building trust naturally.",
    },
  },

  /* ── Lead Generation & Business Development ───────────────────────────── */
  {
    slug: "lead-generation-business-development",
    art: "/services/lead-generation-business-development.webp",
    icon: "UserSearch",
    cardTitle: "Lead Generation & Business Development",
    nav: "Lead Generation",
    metaTitle: "Lead Generation & Business Development Services",
    metaDescription:
      "Generate qualified business enquiries through organic digital marketing. We identify, engage and qualify prospects, then hand verified leads to your sales team.",
    eyebrow: "Lead Generation & Business Development",
    headline: "Generate quality enquiries and",
    accent: "accelerate growth",
    sub: "Most agencies run campaigns and leave the follow-up to you. We identify potential customers, engage them professionally, qualify their interest and connect them with your business.",

    intro: {
      heading: "What makes a quality lead",
      body: [
        "Lead generation attracts customers who are genuinely interested in your products or services. Instead of marketing to everyone, it focuses on the people and businesses most likely to buy.",
        "A quality lead shows interest, requests information or pricing, sends an enquiry, calls or messages your business, or wants to schedule a meeting. Our objective is not traffic - it is qualified enquiries that become long-term customers.",
      ],
    },

    highlights: [
      { icon: "UserSearch", value: "Qualified", label: "Not just traffic" },
      { icon: "Globe", value: "Pan-India", label: "Business promotion" },
      { icon: "Sparkles", value: "AI", label: "Assisted research" },
      { icon: "Handshake", value: "Partner", label: "Not just an agency" },
    ],

    offer: {
      heading: "How we generate leads",
      groups: [
        {
          title: "Social Media Lead Generation",
          items: [
            "Promotion across Facebook, Instagram, X and YouTube",
            "Professionally designed content and engaging captions",
            "Strategic posting schedules that prompt enquiries",
          ],
        },
        {
          title: "Business Enquiry Management",
          items: [
            "Replying to comments and direct messages",
            "Answering basic business questions",
            "Understanding customer requirements",
            "Collecting and verifying contact details",
            "Forwarding qualified leads to your sales team",
          ],
        },
        {
          title: "Business Development Support",
          items: [
            "Understanding your products, services and target audience",
            "Planning and running digital marketing campaigns",
            "Managing online customer interactions",
            "Pan-India promotion without physical offices in every city",
            "AI-assisted audience research and campaign optimisation",
          ],
        },
      ],
    },

    process: {
      heading: "Our lead generation process",
      steps: [
        { n: "01", title: "Business Consultation", body: "We understand your company, products, audience and objectives." },
        { n: "02", title: "Digital Presence Setup", body: "We optimise your social platforms and marketing assets." },
        { n: "03", title: "Campaign Planning", body: "A monthly strategy using posters, videos and informative content." },
        { n: "04", title: "Organic Promotion", body: "Content published and promoted across platforms and communities." },
        { n: "05", title: "Customer Engagement", body: "We monitor comments and messages and respond professionally." },
        { n: "06", title: "Lead Qualification", body: "We collect essential details and understand requirements." },
        { n: "07", title: "Lead Handover", body: "Verified enquiries are forwarded to your company for conversion." },
      ],
    },

    why: {
      heading: "Why invest in lead generation",
      items: [
        "Reach potential customers instead of waiting to be found",
        "Build a stronger sales pipeline",
        "Increase conversion opportunities",
        "Expand into new markets",
        "Strengthen your brand reputation",
        "Achieve sustainable, repeatable growth",
      ],
    },

    industries: [
      "Manufacturing",
      "Restaurants & Cafés",
      "Retail Businesses",
      "Healthcare & Clinics",
      "Educational Institutions",
      "Real Estate",
      "IT & Software",
      "Export & Import",
      "Startups",
      "Professional Services",
      "Automobile",
      "FMCG",
      "Fashion & Lifestyle",
      "Corporate Organisations",
    ],

    closing: {
      heading: "The BrandUpMe advantage",
      body: "Marketing should produce business opportunities, not just likes and followers. We focus on genuine engagement that leads to real conversations and qualified enquiries.",
      tagline: "Connecting businesses with opportunities. Turning enquiries into growth.",
    },
  },

  /* ── Customer Inquiry Handling ────────────────────────────────────────── */
  {
    slug: "customer-inquiry-handling",
    art: "/services/customer-inquiry-handling.webp",
    icon: "MessagesSquare",
    cardTitle: "Customer Inquiry Handling",
    nav: "Customer Inquiry Handling",
    metaTitle: "Customer Inquiry Handling Services",
    metaDescription:
      "Every comment, message and enquiry answered professionally and promptly. We collect the details, qualify the interest and forward genuine leads to your sales team.",
    eyebrow: "Customer Inquiry Handling",
    headline: "Never miss a business",
    accent: "opportunity",
    sub: "Many businesses invest in marketing but lose customers simply because nobody was available to respond. Every enquiry represents a potential customer.",

    intro: {
      heading: "Why response speed decides the sale",
      body: [
        "Customers today have many options. If they do not hear back from one business, they contact another. Fast, professional communication creates confidence and increases the chance of converting an enquiry into a sale.",
        "We act as the first point of contact between your business and your potential customers, making sure every enquiry is acknowledged and handled before it reaches your sales team.",
      ],
    },

    highlights: [
      { icon: "MessagesSquare", value: "4", label: "Platforms monitored" },
      { icon: "BadgeCheck", value: "Qualified", label: "Before handover" },
      { icon: "Sparkles", value: "AI", label: "Assisted responses" },
      { icon: "Handshake", value: "Your tone", label: "Approved messaging" },
    ],

    offer: {
      heading: "What we handle",
      groups: [
        {
          title: "Comments & Direct Messages",
          items: [
            "Facebook and Facebook Messenger",
            "Instagram posts and direct messages",
            "X posts and direct messages",
            "YouTube comments and messages",
            "Responses using approved business information only",
          ],
        },
        {
          title: "Information Collection",
          items: [
            "Customer name and contact number",
            "Email address and business name where given",
            "Product or service requirement",
            "Preferred location",
            "Budget or quantity when shared",
          ],
        },
        {
          title: "Qualification & Handover",
          items: [
            "Product, service and partnership enquiries",
            "Distributor, dealer and corporate requirements",
            "Initial qualification to filter out irrelevant enquiries",
            "Forwarded by WhatsApp, email or your CRM",
          ],
        },
      ],
    },

    process: {
      heading: "Our enquiry handling process",
      steps: [
        { n: "01", title: "Monitor Activity", body: "We monitor customer interactions across your connected platforms." },
        { n: "02", title: "Respond Professionally", body: "Every enquiry receives a polite, brand-appropriate response." },
        { n: "03", title: "Understand Requirements", body: "We ask relevant questions without making promises outside your approved information." },
        { n: "04", title: "Collect Details", body: "We gather what your team needs to continue the conversation." },
        { n: "05", title: "Verify the Enquiry", body: "An initial review confirms the enquiry is genuine and relevant." },
        { n: "06", title: "Share With You", body: "Qualified enquiries are forwarded promptly for your team to take over." },
      ],
    },

    why: {
      heading: "What this changes for your business",
      items: [
        "Faster response to customer enquiries",
        "Fewer opportunities lost to delayed replies",
        "Better engagement across social platforms",
        "Organised, qualified lead forwarding",
        "Time saved for business owners",
        "Stronger brand reputation and customer confidence",
      ],
    },

    industries: [
      "Manufacturers",
      "Restaurants & Cafés",
      "Retail Stores",
      "Healthcare Providers",
      "Educational Institutions",
      "Real Estate",
      "IT & Software",
      "Exporters & Importers",
      "E-commerce",
      "Professional Services",
      "Startups",
      "Corporate Organisations",
    ],

    closing: {
      heading: "Build better customer relationships",
      body: "Every message, comment and enquiry is the start of a possible business relationship. Respond faster, improve satisfaction, and convert more interest into long-term clients.",
      tagline: "Every enquiry matters. Every conversation creates an opportunity.",
    },
  },

  /* ── Qualified Leads Delivered ────────────────────────────────────────── */
  {
    slug: "qualified-leads-delivered",
    art: "/services/qualified-leads-delivered.webp",
    icon: "BadgeCheck",
    cardTitle: "Qualified Leads Delivered",
    nav: "Qualified Leads",
    metaTitle: "Qualified Leads Delivered",
    metaDescription:
      "Verified, interested and genuine leads delivered to your business, so your team can focus on closing deals. Quality over quantity.",
    eyebrow: "Qualified Leads Delivered",
    headline: "Real leads. Real opportunities.",
    accent: "Better results.",
    sub: "We deliver verified, interested and genuine leads so your business can focus on what matters most - closing deals and growing faster.",

    intro: {
      heading: "Quality over quantity",
      body: [
        "Generating enquiries is only the first step. Real growth comes from receiving qualified leads - people or businesses with genuine interest who are ready for a meaningful conversation.",
        "Quality leads create better conversions and long-term business value. Rather than simply increasing traffic or engagement, we identify, engage, qualify and deliver leads that match your business goals.",
      ],
    },

    highlights: [
      { icon: "BadgeCheck", value: "Verified", label: "Every lead checked" },
      { icon: "Target", value: "Targeted", label: "Right audience" },
      { icon: "Handshake", value: "Ready", label: "For conversation" },
      { icon: "TrendingUp", value: "Quality", label: "Not quantity" },
    ],

    offer: {
      heading: "What we deliver",
      groups: [
        {
          title: "Lead Quality",
          items: [
            "Verified and genuine leads",
            "Right audience targeting",
            "High interest enquiries",
          ],
        },
        {
          title: "Ready For Your Sales Team",
          items: [
            "Ready for business conversation",
            "Detailed lead information",
            "Better chances of conversion",
          ],
        },
        {
          title: "What This Means For You",
          items: [
            "More quality leads",
            "More business opportunities",
            "Better lead relevance",
            "Higher conversion potential",
            "Sustainable business growth",
          ],
        },
      ],
    },

    process: {
      heading: "Our lead delivery process",
      steps: [
        { n: "01", title: "Identify Target Audience", body: "We define who is most likely to need your products or services." },
        { n: "02", title: "Promote & Attract", body: "We promote your business to reach those potential customers." },
        { n: "03", title: "Engage & Understand", body: "We engage prospects and understand their requirements." },
        { n: "04", title: "Qualify & Verify", body: "Each lead is qualified and verified before it goes any further." },
        { n: "05", title: "Deliver To Your Business", body: "Verified leads are delivered with the detail your team needs." },
        { n: "06", title: "Increase Sales", body: "Your team converts, and the relationship grows from there." },
      ],
    },

    why: {
      heading: "Why qualified leads matter",
      items: [
        "Your sales team spends time on prospects who are actually interested",
        "Better lead relevance means higher conversion potential",
        "Detailed lead information shortens the first conversation",
        "A stronger pipeline rather than a longer one",
        "Sustainable growth built on real opportunities",
        "We focus on quality, not quantity",
      ],
    },

    industries: [
      "Manufacturing",
      "Restaurants & Cafés",
      "Retail Businesses",
      "Healthcare & Clinics",
      "Educational Institutions",
      "Real Estate",
      "IT & Software",
      "Export & Import",
      "Startups",
      "Professional Services",
      "Automobile",
      "Corporate Organisations",
    ],

    closing: {
      heading: "Better leads. Better results.",
      body: "Quality leads create better conversions and long-term business value. A stronger pipeline means a stronger business.",
      tagline: "We focus on quality, not quantity.",
    },
  },
];

export function getServicePage(slug: string) {
  return SERVICE_PAGES.find((s) => s.slug === slug);
}

/** Map homepage card title -> service page slug, for cards that have a page. */
export const SERVICE_LINKS: Record<string, string> = Object.fromEntries(
  SERVICE_PAGES.map((s) => [s.cardTitle, `/services/${s.slug}/`]),
);

/**
 * Card title -> circular artwork, so the homepage grid can show the same
 * images the detail pages do. Keyed by title rather than slug because the
 * homepage cards come from lib/content.ts and have no slug.
 */
export const SERVICE_ART: Record<string, string> = Object.fromEntries(
  SERVICE_PAGES.flatMap((s) => (s.art ? [[s.cardTitle, s.art] as const] : [])),
);
