import Link from 'next/link';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { projects, projectRoles } from '../projects';
import { Header, Footer, Contact } from '../../../components/portfolio-shell';
import { WorkImage } from '../../../components/work-image';
import { pageMetadata } from '../../../lib/seo';

type Props = { params: Promise<{ slug: string }> };
export function generateStaticParams() {
  return projects.map(({ slug }) => ({ slug }));
}
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  return project
    ? pageMetadata(
        project.name + ' | ' + projectRoles[slug].role,
        project.intro,
        '/work/' + slug,
      )
    : { title: 'Project not found', robots: { index: false } };
}
export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) notFound();
  const role = projectRoles[slug];
  const next = projects[(projects.indexOf(project) + 1) % projects.length];
  return (
    <>
      <Header />
      <main id="main">
        <section className="case-header wrap">
          <Link prefetch={false} className="text-link" href="/#work">
            ← All work
          </Link>
          <p className="eyebrow">
            {project.name} / {project.category}
          </p>
          <h1>{project.title}</h1>
          <div className="case-intro">
            <p>{project.intro}</p>
          </div>
        </section>
        <div className={project.theme}>
          {project.image ? (
            <figure className="case-figure wrap">
              <WorkImage
                name={project.image}
                alt={'Selected campaign creative for ' + project.name}
                eager
              />
              <figcaption>Selected creative from my portfolio.</figcaption>
            </figure>
          ) : (
            <div className="case-banner wrap">
              <p>{project.name}</p>
              <span>{project.tools.slice(0, 3).join(' / ')}</span>
            </div>
          )}
        </div>
        <div className="case-body wrap section">
          <aside>
            <p className="eyebrow">MY ROLE</p>
            <p className="case-role">{role.role}</p>
            {role.period && <p className="case-period">{role.period}</p>}
            <div className="tool-tags" aria-label="Tools and focus">
              {project.tools.map((t) => (
                <span key={t}>{t}</span>
              ))}
            </div>
          </aside>
          <div className="case-story">
            <section>
              <p className="eyebrow">01 / CONTEXT</p>
              <h2>The work behind the project.</h2>
              <p>{project.context}</p>
            </section>
            <section>
              <p className="eyebrow">02 / APPROACH</p>
              <h2>How I approached it.</h2>
              <ol>
                {project.approach.map((a) => (
                  <li key={a}>{a}</li>
                ))}
              </ol>
            </section>
            <section>
              <p className="eyebrow">03 / DELIVERY</p>
              <h2>What I delivered.</h2>
              <p>{project.delivered}</p>
            </section>
          </div>
        </div>
        <div className="wrap case-next">
          <span className="eyebrow">NEXT PROJECT</span>
          <Link prefetch={false} href={'/work/' + next.slug}>
            {next.name} <span aria-hidden="true">↗</span>
          </Link>
        </div>
        <Contact />
      </main>
      <Footer />
    </>
  );
}
