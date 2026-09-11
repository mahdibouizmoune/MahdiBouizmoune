export const SITE = {
  domain: 'https://mahdibouizmoune.com',
  legacyDomain: 'https://mahdi-bouizmoune.vercel.app',
  name: 'El Mahdi Bouizmoune',
  role: 'Digital Marketing Manager',
  email: 'mahdi.bouizmoune@gmail.com',
  location: { city: 'Safi', country: 'MA' },
  social: {
    linkedin: 'https://www.linkedin.com/in/mahdi-bouizmoune/',
    fiverr: 'https://www.fiverr.com/pro5services',
    github: 'https://github.com/mahdibouizmoune/content-studio',
  },
  cv: {
    en: '/assets/cv/el-mahdi-bouizmoune-cv-en.pdf',
    fr: '/assets/cv/el-mahdi-bouizmoune-cv-fr.pdf',
    ar: '/assets/cv/el-mahdi-bouizmoune-cv-ar.pdf',
  },
  booking: process.env.NEXT_PUBLIC_BOOKING_URL || 'mailto:mahdi.bouizmoune@gmail.com?subject=Project%20or%20role%20inquiry',
};
// Activate only after DNS and TLS for SITE.domain are verified.
export const publicOrigin = process.env.SITE_DOMAIN_ACTIVE === 'true' ? SITE.domain : SITE.legacyDomain;
