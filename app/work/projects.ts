export type Project = {
  slug: string;
  name: string;
  title: string;
  category: string;
  intro: string;
  context: string;
  approach: string[];
  delivered: string;
  tools: string[];
  image?: string;
  theme: string;
  source: string;
};
export const projects: Project[] = [
  {
    slug: 'akam',
    name: 'AKAM · New York',
    title: 'A place to call home.',
    category: 'Real estate / Social & paid media',
    intro:
      'Connecting a residential community with the people who could call it home.',
    context:
      'For AKAM’s Park City 3 & 4 Apartments, I managed digital content around the properties, everyday amenities, and the surrounding community. The work brought a consistent, lifestyle-focused voice to a New York residential brand.',
    approach: [
      'Built a content calendar around property highlights, neighborhood context, and community amenities.',
      'Created social graphics and copy for Instagram and Facebook, using local context to make each post relevant.',
      'Supported the organic content with hyperlocal paid campaigns aimed at audiences in Queens and Brooklyn.',
    ],
    delivered:
      'A coordinated social presence, a library of property-focused creative assets, and a content playbook the team could continue using.',
    tools: ['Instagram', 'Facebook', 'Meta Ads', 'Canva', 'Content strategy'],
    image: 'akam.png',
    theme: 'blue',
    source: 'CV page 1; portfolio pages 10–11.',
  },
  {
    slug: 'gourmet-gather',
    name: 'Gourmet Gather',
    title: 'From inspiration to discovery.',
    category: 'Client project / Content & automation',
    intro:
      'A client recipe platform connecting useful content with search, social discovery and email automation.',
    context:
      'I built and managed Gourmet Gather, a WordPress food and recipe platform connecting search strategy, Pinterest content, email workflows and monetization. The project brought the complete publishing process into one system.',
    approach: [
      'Developed recipe content around search intent, seasonal topics, and Pinterest discovery.',
      'Created visuals and a consistent publishing schedule, with small paid campaigns supporting promising content.',
      'Connected lead generation with GoHighLevel email workflows and explored display advertising and affiliate revenue.',
    ],
    delivered:
      'A working content and monetization platform bringing together WordPress publishing, Pinterest distribution, lead capture, and automated follow-up.',
    tools: [
      'WordPress',
      'Pinterest',
      'Rank Math',
      'GoHighLevel',
      'Search Console',
      'Generative AI',
    ],
    image: 'gourmet.png',
    theme: 'green',
    source: 'CV page 2; portfolio pages 14–15.',
  },
  {
    slug: 'bunchful',
    name: 'Bunchful Enterprise',
    title: 'Giving a purpose its voice.',
    category: 'Social impact / Brand & content',
    intro:
      'Turning a mission of generosity into stories people can connect with.',
    context:
      'Bunchful Enterprise works in generosity, community giving, and corporate philanthropy. My role brought its purpose into digital communication, connecting brand storytelling, social content, and the website experience.',
    approach: [
      'Developed campaign narratives and social content around giving, kindness, and community impact.',
      'Aligned copy, visuals, and campaign direction with the organization’s identity and longer-term goals.',
      'Worked on WordPress SEO and user experience, supported by analytics and digital asset management.',
    ],
    delivered:
      'A consistent creative direction and communication framework spanning campaign content, social channels, and website work.',
    tools: [
      'WordPress',
      'GA4',
      'Content strategy',
      'Email automation',
      'Digital asset management',
    ],
    image: 'bunchful.png',
    theme: 'pink',
    source: 'CV page 1; portfolio pages 12–13.',
  },
  {
    slug: 'content-studio',
    name: 'AI Content Studio',
    title: 'Less friction. More creating.',
    category: 'Application project / AI publishing',
    intro:
      'A desktop application that brings the content publishing workflow into one place.',
    context:
      'Content production involves much more than writing. Research, images, SEO checks, distribution, and publishing can turn into disconnected tasks. I built AI Content Studio to connect those steps in a desktop application.',
    approach: [
      'Designed a workflow from topic research and AI-assisted drafting through image creation, SEO validation, and WordPress publishing.',
      'Added supporting outputs for Pinterest, Facebook, Instagram, scheduling CSVs, affiliate recommendations, and video.',
      'Built with Electron and React, integrating AI services and secure credential storage for connected publishing tools.',
    ],
    delivered:
      'A desktop content application that combines research, generation, validation, and publishing workflows, with multiple formats for distribution.',
    tools: [
      'Electron',
      'React',
      'Vite',
      'Tailwind CSS',
      'Replicate API',
      'WordPress',
      'AI-assisted development',
    ],
    theme: 'orange-panel',
    source:
      'CV page 2. Architecture is described from the CV; no live application screenshot is represented.',
  },
  {
    slug: 'skyrocket-your-biz',
    name: 'Skyrocket Your Biz',
    title: 'From first click to next conversation.',
    category: 'Lead generation / CRM & automation',
    intro:
      'Connecting acquisition with the follow-up that helps a lead move forward.',
    context:
      'For Skyrocket Your Biz, I built a lead generation and masterclass funnel using GoHighLevel. The system connected campaign traffic, contact capture, pipeline organization, and follow-up messaging.',
    approach: [
      'Built the website, landing pages, and lead forms around the masterclass and strategy-call journey.',
      'Configured contact tagging, a CRM pipeline, and automated email and messaging workflows.',
      'Connected Meta Instant Form leads to nurturing sequences and added conversion tracking with Meta Pixel and Conversions API.',
    ],
    delivered:
      'An end-to-end funnel connecting lead capture, CRM organization, automated nurturing, and strategy-call booking.',
    tools: [
      'GoHighLevel',
      'Meta Ads',
      'Meta Pixel',
      'Conversions API',
      'CRM workflows',
    ],
    theme: 'blue',
    source: 'CV page 2.',
  },
  {
    slug: 'strongman',
    name: 'Strongman Corporation',
    title: 'Built around the community.',
    category: 'Strength sports / Social & events',
    intro:
      'Supporting a national strength-sports community through content and event marketing.',
    context:
      'At Strongman Corporation, I worked across social content, community management, paid campaigns, and the event website. The focus was to connect athletes and fans with the organization and its competitions.',
    approach: [
      'Managed editorial calendars and coordinated content across social platforms.',
      'Created athlete features, event promotion, and branded graphic and video assets.',
      'Supported event registrations with paid media and maintained event information on the WordPress website.',
    ],
    delivered:
      'A coordinated content and event-marketing operation, with reusable creative assets and ongoing community communication.',
    tools: ['Social strategy', 'Paid media', 'WordPress', 'Canva', 'Photoshop'],
    theme: 'dark-panel',
    source:
      'CV page 1; portfolio pages 4–5. The 2025 creative sample is withheld pending date confirmation.',
  },
];

projects.push(
  {
    slug: 'generation-atomic',
    name: 'Generation Atomic',
    title: 'Make a complex subject accessible.',
    category: 'Clean energy / Digital marketing',
    intro:
      'Social content, search visibility and event campaigns for a nuclear energy advocacy organization.',
    context:
      'As Digital Marketing Specialist from January 2022 to May 2023, I supported Generation Atomic’s digital communications. The work connected public-facing content with search, reporting, an e-commerce store and event promotion.',
    approach: [
      'Led social strategy and editorial calendars across Facebook, LinkedIn, Twitter and Instagram.',
      'Conducted keyword research and on-page SEO, using Google Analytics reporting to evaluate campaigns.',
      'Managed the e-commerce store and coordinated digital event campaigns.',
    ],
    delivered:
      'Editorial calendars, search-focused content, performance reporting, store operations and coordinated event promotion.',
    tools: [
      'Social media strategy',
      'SEO',
      'Google Analytics',
      'E-commerce',
      'Event campaigns',
    ],
    theme: 'green',
    source: 'CV page 1; portfolio pages 8–9.',
  },
  {
    slug: 'etsy',
    name: 'Print-on-demand e-commerce',
    title: 'From a search to a storefront.',
    category: 'Client project / Etsy & e-commerce',
    intro:
      'Keyword-led product listings, creative production and store operations for a print-on-demand apparel shop.',
    context:
      'The ExclusiveShirtDesign project brought together Etsy search, design production, conversion optimization and fulfillment. From 2024, I worked across store development and management, covering both the product and the customer experience.',
    approach: [
      'Researched keywords and tags to build relevant, discoverable product listings.',
      'Produced designs and mockups using generative AI and Canva, alongside pricing and conversion improvements.',
      'Connected Printful fulfillment and managed customer service and review workflows.',
    ],
    delivered:
      'A managed apparel storefront with search-focused listings, product creative, fulfillment workflows and customer support.',
    tools: [
      'Etsy SEO',
      'Etsy Ads',
      'Printful',
      'Canva',
      'Pinterest',
      'Generative AI',
    ],
    theme: 'orange-panel',
    source:
      'CV page 2. Changing sales and review totals are not independently established.',
  },
);
export const projectRoles: Record<string, { role: string; period: string }> = {
  bunchful: { role: 'Digital Marketing Manager', period: 'May 2023 – Present' },
  akam: {
    role: 'Social Media Manager · Freelance',
    period: 'Feb 2024 – Mar 2025',
  },
  strongman: { role: 'Community Manager', period: 'Feb 2018 – Jan 2022' },
  'generation-atomic': {
    role: 'Digital Marketing Specialist',
    period: 'Jan 2022 – May 2023',
  },
  'skyrocket-your-biz': {
    role: 'Lead generation & CRM implementation',
    period: '',
  },
  'content-studio': { role: 'Application design & development', period: '' },
  'gourmet-gather': { role: 'Content, SEO & marketing automation', period: '' },
  etsy: {
    role: 'Store development & e-commerce operations',
    period: 'From 2024',
  },
};
