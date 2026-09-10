// Relationships and work scopes are user-reported. Public identity research is documented outside the site in docs/client-research.md.
export type Client = {
  name: string;
  sector: string;
  context: string;
  scope: string;
  tools: string;
  href?: string;
  caseSlug?: string;
};
export const clients: Client[] = [
  {
    name: 'AKAM · Park City 3 & 4',
    sector: 'Real estate & property',
    context: 'Social strategy for a New York residential project.',
    scope:
      'Content calendars, community engagement and a reusable content playbook. Freelance engagement: February 2024–March 2025.',
    tools: 'Instagram · Facebook · Content strategy',
    caseSlug: 'akam',
  },
  {
    name: 'Marquis Developers',
    sector: 'Real estate & property',
    context: 'Digital marketing for a Dubai residential developer.',
    scope:
      'Property launch content, paid lead generation, English and French creative, and enquiries connected to the sales team.',
    tools: 'Meta Ads · Instagram · Lead forms · Canva',
    href: 'https://www.marquisdevelopers.com/',
  },
  {
    name: 'Contract 2 Close, Inc.',
    sector: 'Real estate & property',
    context: 'B2B marketing for a transaction coordination service.',
    scope:
      'Content and lead generation for real estate agents and team leads, supported by email nurture.',
    tools: 'LinkedIn · Facebook · Meta Ads · Email',
    href: 'https://www.linkedin.com/company/contract-2-close-inc/',
  },
  {
    name: 'Naples Luxury Team',
    sector: 'Real estate & property',
    context:
      'Social account setup and management for a Florida real estate team.',
    scope:
      'A 2018 engagement covering Facebook, Instagram, Twitter, Pinterest and LinkedIn, with scheduled content, engagement and a handover action plan.',
    tools: 'Social account setup · Scheduling · Content calendars',
  },
  {
    name: 'Fresh Body',
    sector: 'E-commerce & retail',
    context:
      'Store management, SEO and social content for a personal care brand.',
    scope:
      'Shopify product and collection pages, search-focused copy, merchandising and social content supporting product discovery.',
    tools: 'Shopify · SEO · Search Console · Instagram',
    href: 'https://freshbody.com/',
  },
  {
    name: 'PRIMOVA',
    sector: 'E-commerce & retail',
    context:
      'Amazon store and social media management for a pet-products brand.',
    scope:
      'Product listings, keywords, A+ content and storefront navigation, supported by customer questions and off-Amazon social content.',
    tools: 'Amazon Seller Central · A+ content · Keyword research',
  },
  {
    name: 'RetroChic',
    sector: 'E-commerce & retail',
    context:
      'Social and community marketing for a Moroccan resale marketplace.',
    scope:
      'French and Darija content for buyers and sellers, trust-focused messaging and app-discovery campaigns.',
    tools: 'Instagram · Facebook · TikTok · App campaigns',
    href: 'https://retrochic.ma/',
  },
  {
    name: 'Luxury Designers Club',
    sector: 'E-commerce & retail',
    context: 'Social content and community management for designer resale.',
    scope:
      'Product-led posts, condition and authenticity content, and responses to customer enquiries.',
    tools: 'Instagram · Content calendars · Canva',
  },
  {
    name: 'Annonces Maroc (annoncesmaroc.ma)',
    sector: 'E-commerce & retail',
    context:
      'Website development and operations for a Moroccan classifieds platform.',
    scope:
      'Search-focused categories, marketplace content, moderation and anti-spam workflows for a French and Darija audience.',
    tools: 'Marketplace development · SEO · Content moderation',
    href: 'https://www.annoncesmaroc.ma/',
  },
  {
    name: 'Etsy print-on-demand',
    sector: 'E-commerce & retail',
    context: 'Store development, listing SEO and creative production.',
    scope:
      'Keyword-led listings, product designs and mockups, pricing, Printful fulfillment and customer support.',
    tools: 'Etsy SEO · Etsy Ads · Printful · Canva',
    caseSlug: 'etsy',
  },
  {
    name: 'Hoosier Car Store',
    sector: 'E-commerce & retail',
    context:
      'Inventory-led social marketing for an independent car dealership.',
    scope:
      'Vehicle posts and short-form content, local paid promotion and responses to customer messages.',
    tools: 'Facebook · Instagram · Meta Ads · Canva',
  },
  {
    name: 'Raffaella Caffetteria',
    sector: 'Food & hospitality',
    context: 'Brand voice and social content for a Brooklyn café.',
    scope:
      'Instagram content, website and menu copy, and local discovery built around the café’s Italian identity.',
    tools: 'Instagram · Brand voice · Web copy · Local SEO',
    href: 'https://raffaellanyc.com/',
  },
  {
    name: 'Mandy’s Express Café',
    sector: 'Food & hospitality',
    context: 'Social media for a café in Montego Bay, Jamaica.',
    scope:
      'Recurring formats for daily and weekly specials, with content serving local regulars and visitors.',
    tools: 'Instagram · Facebook · Content calendars · Canva',
  },
  {
    name: 'Gourmet Gather',
    sector: 'Food & hospitality',
    context: 'SEO, publishing and automation for a recipe platform.',
    scope:
      'WordPress content, Pinterest distribution, Meta lead campaigns, newsletter workflows and monetization integrations.',
    tools: 'WordPress · Pinterest · GoHighLevel · SEO',
    caseSlug: 'gourmet-gather',
  },
  {
    name: 'Bel Hernandez Castillo / Latin Heat',
    sector: 'Media & entertainment',
    context:
      'Editorial social and audience development for entertainment media.',
    scope:
      'Article and interview distribution, event coverage, bilingual content and publishing aligned with the editorial calendar.',
    tools: 'Instagram · Facebook · WordPress · Analytics',
    href: 'https://latinheat.com/author/bel-hernandez-castillo/',
  },
  {
    name: 'Kenny Logic',
    sector: 'Media & entertainment',
    context:
      'Social media and release promotion for a DJ and recording artist.',
    scope:
      'Release and show campaigns, short-form video from performance material and ongoing fan engagement.',
    tools: 'Instagram · Facebook · TikTok · CapCut',
  },
  {
    name: 'Tilt Band',
    sector: 'Media & entertainment',
    context: 'Band social media and release promotion.',
    scope:
      'Release campaigns, location-specific show promotion and day-to-day fan community management.',
    tools: 'Instagram · Facebook · Content calendars',
  },
  {
    name: 'South East Magicians',
    sector: 'Media & entertainment',
    context: 'Facebook content for a children’s entertainment business.',
    scope:
      'A short 2018 engagement through Sigma Digital: scheduled content, audience engagement and a handover action plan.',
    tools: 'Facebook · Scheduling · Canva',
  },
  {
    name: 'Skyrocket Your Biz',
    sector: 'Coaching & professional services',
    context: 'Lead generation and conversion systems for a coaching brand.',
    scope:
      'GoHighLevel pages, lead capture, CRM pipelines, tagging, email nurture and Meta campaign integration.',
    tools: 'GoHighLevel · Meta Ads · Pixel & CAPI',
    caseSlug: 'skyrocket-your-biz',
  },
  {
    name: 'Aaron Pang',
    sector: 'Coaching & professional services',
    context: 'Personal-brand and podcast content for an author and coach.',
    scope:
      'Podcast repurposing, book promotion and community content connecting the author’s offers and The Purpose Club.',
    tools: 'Instagram · LinkedIn · YouTube · CapCut',
    href: 'https://www.thepurposeclub.co/',
  },
  {
    name: 'IFSCA / Derek Scott',
    sector: 'Coaching & professional services',
    context:
      'Workshop outreach for a Canadian professional training organization.',
    scope:
      'A 2018 engagement commissioned through an assistant: targeted prospect research and personalized workshop outreach using the supplied contact exclusions.',
    tools: 'Prospect research · List management · Outreach',
    href: 'https://ifsca.ca/',
  },
  {
    name: 'EMS Lifestyle',
    sector: 'Fitness & wellbeing',
    context: 'Social content for a fitness brand in Abu Dhabi.',
    scope:
      'Fitness-focused content and social creative, documented in my portfolio.',
    tools: 'Social content · Creative production',
  },
  {
    name: 'Lionlamb Personal Training',
    sector: 'Fitness & wellbeing',
    context:
      'Social content and local lead generation for a personal training business.',
    scope:
      'Coaching and client-results content, consultation calls to action and locally targeted promotion.',
    tools: 'Facebook · Instagram · Meta Ads · Canva',
  },
  {
    name: 'Aesthetica Maria',
    sector: 'Fitness & wellbeing',
    context: 'Booking-focused social content for an aesthetics practice.',
    scope:
      'Treatment and aftercare content, visual creative and calls to action connecting enquiries to bookings.',
    tools: 'Instagram · Facebook · Meta Ads · Canva',
  },
  {
    name: 'Excilify',
    sector: 'Agencies',
    context: 'Digital marketing within a web and digital solutions agency.',
    scope:
      'SEO, content and paid-channel delivery, working alongside the website and booking-system teams.',
    tools: 'SEO · Analytics · Paid social · WordPress',
    href: 'https://excilify.com/',
  },
  {
    name: 'Vestra Marketing',
    sector: 'Agencies',
    context: 'Marketing delivery through a small-business agency.',
    scope:
      'Social content, campaigns and web copy delivered to the agency’s client briefs and brand standards.',
    tools: 'Facebook · Instagram · Content production · Canva',
  },
  {
    name: 'GoGetCrypto',
    sector: 'Additional engagements',
    context: 'Social media management.',
    scope: 'An additional engagement from my freelance client roster.',
    tools: 'Social media',
  },
];
export const sectors = [...new Set(clients.map((c) => c.sector))];
