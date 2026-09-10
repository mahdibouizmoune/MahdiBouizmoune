import Link from 'next/link';
import { clients, sectors } from '../clients';
import { Header, Footer, Contact } from '../../components/portfolio-shell';
import { pageMetadata } from '../../lib/seo';
export const metadata = pageMetadata(
  'Clients & Collaborations',
  'Explore El Mahdi Bouizmoune’s client experience across real estate, fitness, e-commerce, agencies, hospitality, education and media.',
  '/clients',
);
export default function Clients() {
  return (
    <>
      <Header />
      <main id="main">
        <section className="wrap directory-header">
          <Link prefetch={false} className="text-link" href="/#work">
            ← Back to selected work
          </Link>
          <p className="eyebrow">CLIENTS & COLLABORATIONS</p>
          <h1>
            Many businesses.
            <br />
            <span className="serif">Individual stories.</span>
          </h1>
          <p className="section-intro">
            Organizations, businesses and people I’ve supported through
            freelance work and agency engagements. Detailed case studies show my
            responsibilities and deliverables.
          </p>
          <nav className="sector-nav" aria-label="Client industries">
            {sectors.map((s, i) => (
              <a href={'#sector-' + i} key={s}>
                {s}
              </a>
            ))}
          </nav>
        </section>
        <div className="wrap directory">
          {sectors.map((s, i) => (
            <section id={'sector-' + i} key={s} className="sector">
              <h2>{s}</h2>
              <ul>
                {clients
                  .filter((c) => c.sector === s)
                  .map((c) => (
                    <li key={c.name}>
                      <div>
                        <h3>{c.name}</h3>
                        {c.context && <p>{c.context}</p>}
                        <p className="client-scope">{c.scope}</p>
                        <p className="client-tools">{c.tools}</p>
                      </div>
                      {c.caseSlug ? (
                        <Link
                          prefetch={false}
                          href={'/work/' + c.caseSlug}
                          aria-label={c.name + ' case study'}
                        >
                          Case study ↗
                        </Link>
                      ) : c.href ? (
                        <a
                          href={c.href}
                          aria-label={c.name + ' official website or profile'}
                        >
                          Website ↗
                        </a>
                      ) : null}
                    </li>
                  ))}
              </ul>
            </section>
          ))}
        </div>
        <section className="wrap directory-note">
          <h2>Real estate CRM implementation</h2>
          <p>
            For a US real estate team, I configured kvCORE lead capture and
            routing, smart nurture campaigns, the IDX property-search site and
            pipeline stages. This was implementation work using Inside Real
            Estate’s platform for a client team.
          </p>
        </section>
        <section className="wrap directory-note">
          <h2>Employment experience</h2>
          <p>
            My roles at{' '}
            <Link prefetch={false} href="/work/bunchful">
              Bunchful Enterprise
            </Link>
            ,{' '}
            <Link prefetch={false} href="/work/generation-atomic">
              Generation Atomic
            </Link>{' '}
            and{' '}
            <Link prefetch={false} href="/work/strongman">
              Strongman Corporation
            </Link>{' '}
            are covered in my professional experience and selected work.
          </p>
        </section>
        <Contact />
      </main>
      <Footer />
    </>
  );
}
