import Link from 'next/link';
import { Header, Footer, Contact } from '../components/portfolio-shell';
import { WorkImage } from '../components/work-image';
import { experience, capabilities } from './profile';
import { projects } from './work/projects';
import { pageMetadata, siteUrl } from '../lib/seo';

export const metadata = {
  ...pageMetadata(
    'El Mahdi Bouizmoune | Digital Marketing Manager',
    'Paid social, SEO, CRM automation and AI content. Explore El Mahdi Bouizmoune’s experience at Bunchful, Generation Atomic, AKAM and Strongman Corporation.',
    '/',
  ),
  title: { absolute: 'El Mahdi Bouizmoune | Digital Marketing Manager' },
};
const featured = [
  'bunchful',
  'skyrocket-your-biz',
  'generation-atomic',
  'strongman',
];
const built = ['content-studio', 'gourmet-gather', 'etsy'];
export default function Home() {
  const person = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'El Mahdi Bouizmoune',
    jobTitle: 'Digital Marketing Manager',
    description:
      'Digital marketing professional specializing in paid social advertising, CRM automation, SEO and AI content.',
    ...(siteUrl ? { url: siteUrl } : {}),
    sameAs: [
      'https://www.linkedin.com/in/mahdibouizmoune',
      'https://www.fiverr.com/pro5services',
    ],
    knowsLanguage: ['English', 'French', 'Arabic'],
    knowsAbout: [
      'Paid social advertising',
      'Marketing automation',
      'SEO',
      'Content marketing',
      'CRM',
    ],
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Safi',
      addressCountry: 'MA',
    },
  };
  return (
    <>
      <Header />
      <main id="main">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(person).replace(/</g, '\\u003c'),
          }}
        />
        <section className="hero wrap">
          <div className="hero-meta">
            <p className="eyebrow">EL MAHDI BOUIZMOUNE</p>
            <span className="availability">
              <i aria-hidden="true" />
              Safi, Morocco · Working worldwide
            </span>
          </div>
          <h1>
            Digital marketing.
            <br />
            <span className="serif">Built to connect.</span>
          </h1>
          <div className="hero-bottom">
            <div className="hero-role">
              <p className="eyebrow">DIGITAL MARKETING MANAGER</p>
              <p>
                Paid social advertising
                <br />
                CRM & marketing automation
                <br />
                SEO & AI-powered content
              </p>
            </div>
            <div className="hero-intro">
              <p>
                I connect the campaign, the content and the follow-up. Since
                2018, I’ve helped international teams bring their marketing
                together—from the first impression to the next customer.
              </p>
              <div className="hero-actions">
                <a className="button dark" href="#experience">
                  Explore my experience ↓
                </a>
                <a className="text-link" href="#work">
                  Selected work ↗
                </a>
              </div>
            </div>
          </div>
          <div className="career-facts">
            <div>
              <strong>8+</strong>
              <span>years in digital marketing</span>
            </div>
            <div>
              <strong>EN / FR / AR</strong>
              <span>English, French & Arabic</span>
            </div>
            <div>
              <strong>Strategy → delivery</strong>
              <span>Campaigns, content & systems</span>
            </div>
          </div>
        </section>
        <section className="experience-section wrap section" id="experience">
          <div className="section-top">
            <div>
              <p className="eyebrow">01 / PROFESSIONAL EXPERIENCE</p>
              <h2>
                A career built
                <br />
                <span className="serif">by doing the work.</span>
              </h2>
            </div>
            <p>
              From community management
              <br />
              to connected digital strategy.
            </p>
          </div>
          <div className="experience-list">
            {experience.map((e) => (
              <article className="experience-row" key={e.company}>
                <div>
                  <p className="date-label">{e.period}</p>
                  <p className="location">{e.location}</p>
                </div>
                <div>
                  <h3>{e.company}</h3>
                  <p className="role">{e.role}</p>
                </div>
                <div>
                  <p>{e.copy}</p>
                  {e.slug && (
                    <Link
                      prefetch={false}
                      className="text-link"
                      href={'/work/' + e.slug}
                    >
                      Explore the work ↗
                    </Link>
                  )}
                </div>
              </article>
            ))}
          </div>
        </section>
        <section className="selected-section section" id="work">
          <div className="wrap">
            <div className="section-top">
              <div>
                <p className="eyebrow">02 / SELECTED WORK</p>
                <h2>
                  The strategy.
                  <br />
                  <span className="serif">And the execution.</span>
                </h2>
              </div>
              <p>
                My role, the approach
                <br />
                and what I delivered.
              </p>
            </div>
            <div className="work-grid">
              {featured.map((slug, i) => {
                const p = projects.find((p) => p.slug === slug)!;
                return (
                  <article className="work-card" key={p.slug}>
                    <Link
                      prefetch={false}
                      href={'/work/' + p.slug}
                      aria-label={'Read ' + p.name + ' case study'}
                    >
                      <div className={'work-image ' + p.theme}>
                        {p.image ? (
                          <WorkImage
                            name={p.image}
                            alt={'Campaign creative for ' + p.name}
                          />
                        ) : (
                          <div className="project-type">
                            <span>{p.category.split('/')[0]}</span>
                            <strong>{p.name}</strong>
                            <span>{p.tools.slice(0, 3).join(' / ')}</span>
                          </div>
                        )}
                        <span className="card-index">0{i + 1}</span>
                        <span className="round-arrow" aria-hidden="true">
                          ↗
                        </span>
                      </div>
                      <div className="work-caption">
                        <p className="eyebrow">{p.category}</p>
                        <h3>{p.name}</h3>
                        <p>{p.intro}</p>
                      </div>
                    </Link>
                  </article>
                );
              })}
            </div>
            <Link
              prefetch={false}
              className="additional-work"
              href="/work/akam"
            >
              <span>Also in real estate</span>
              <strong>AKAM · Park City 3 & 4</strong>
              <span>Social strategy & community content ↗</span>
            </Link>
          </div>
        </section>
        <section className="wrap section" id="projects">
          <div className="section-top">
            <div>
              <p className="eyebrow">03 / PROJECTS & SYSTEMS</p>
              <h2>
                Things I’ve
                <br />
                <span className="serif">built and managed.</span>
              </h2>
            </div>
            <p>
              Publishing, automation
              <br />
              and e-commerce in practice.
            </p>
          </div>
          <div className="project-list">
            {built.map((slug, i) => {
              const p = projects.find((p) => p.slug === slug)!;
              return (
                <Link prefetch={false} href={'/work/' + slug} key={slug}>
                  <span className="eyebrow">0{i + 1}</span>
                  <div>
                    <h3>{p.name}</h3>
                    <p>{p.intro}</p>
                  </div>
                  <span aria-hidden="true">↗</span>
                </Link>
              );
            })}
          </div>
        </section>
        <section className="expertise section" id="expertise">
          <div className="wrap">
            <p className="eyebrow">04 / EXPERTISE</p>
            <h2>
              One perspective.
              <br />
              <span className="serif">The whole journey.</span>
            </h2>
            <div className="capability-grid">
              {capabilities.map((c, i) => (
                <article key={c.title}>
                  <span className="eyebrow">0{i + 1}</span>
                  <h3>{c.title}</h3>
                  <p>{c.copy}</p>
                  <p className="tools-line">{c.tools}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
        <section className="wrap section client-preview">
          <p className="eyebrow">05 / CLIENTS & COLLABORATIONS</p>
          <h2>
            Different industries.
            <br />
            <span className="serif">A wider perspective.</span>
          </h2>
          <p className="section-intro">
            From real estate and fitness to education, retail and hospitality.
            Explore the businesses and people I’ve worked with, including
            freelance and agency engagements.
          </p>
          <div className="client-names">
            {[
              'AKAM',
              'Fresh Body',
              'Excilify',
              'PRIMOVA',
              'Raffaella',
              'RetroChic',
            ].map((n) => (
              <span key={n}>{n}</span>
            ))}
          </div>
          <Link prefetch={false} className="button outline" href="/clients">
            Explore the client directory ↗
          </Link>
        </section>
        <section className="about wrap section" id="about">
          <div>
            <p className="eyebrow">06 / A LITTLE ABOUT ME</p>
            <h2>
              A strategist’s mind.
              <br />A builder’s <span className="serif">instinct.</span>
            </h2>
          </div>
          <div className="about-copy">
            <p className="lead">
              I’m El Mahdi, a trilingual Digital Marketing Manager based in
              Safi, Morocco.
            </p>
            <p>
              I work across paid acquisition, lifecycle marketing, SEO and
              content. I enjoy connecting the creative work with the systems
              behind it: the story, the campaign, the CRM workflow and the
              measurement.
            </p>
            <p>
              My background includes Mathematics and Computer Science coursework
              at Université Cadi Ayyad (2015–2018), a Social Media Marketing
              Professional Certification from the Institute of Management,
              Technology and Finance, and a Generative AI Certification from
              LinkedIn.
            </p>
            <div className="languages">
              <span>English</span>
              <span>Français</span>
              <span lang="ar" dir="rtl">
                العربية
              </span>
            </div>
            <a
              className="text-link"
              href="https://www.linkedin.com/in/mahdibouizmoune"
            >
              View my professional profile ↗
            </a>
          </div>
        </section>
        <Contact />
      </main>
      <Footer />
    </>
  );
}
