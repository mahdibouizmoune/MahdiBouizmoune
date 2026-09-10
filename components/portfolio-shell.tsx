import Link from 'next/link';
export function Header() {
  return (
    <header className="header wrap">
      <Link
        prefetch={false}
        className="wordmark"
        href="/"
        aria-label="El Mahdi Bouizmoune, home"
      >
        mahdi b<span>.</span>
      </Link>
      <nav aria-label="Main navigation">
        <Link prefetch={false} href="/#about">
          About
        </Link>
        <Link prefetch={false} href="/#experience">
          Experience
        </Link>
        <Link prefetch={false} href="/#work">
          Work
        </Link>
        <Link prefetch={false} href="/clients">
          Clients
        </Link>
      </nav>
      <a className="nav-contact" href="mailto:mahdi.bouizmoune@gmail.com">
        Let’s talk <span aria-hidden="true">↗</span>
      </a>
    </header>
  );
}
export function Footer() {
  return (
    <footer className="wrap footer">
      <Link prefetch={false} className="wordmark" href="/">
        mahdi b<span>.</span>
      </Link>
      <span>El Mahdi Bouizmoune · Safi, Morocco</span>
      <a href="https://www.linkedin.com/in/mahdibouizmoune">LinkedIn ↗</a>
      <a href="#main">Back to top ↑</a>
    </footer>
  );
}
export function Contact() {
  return (
    <section className="contact" id="contact">
      <div className="wrap">
        <p className="eyebrow">
          YOUR NEXT TEAM MEMBER. YOUR NEXT COLLABORATOR.
        </p>
        <h2>
          Let’s make
          <br />
          <span className="serif">the next move.</span>
        </h2>
        <p className="contact-description">
          Open to digital marketing roles and freelance collaborations, remotely
          and worldwide.
        </p>
        <a className="button dark" href="mailto:mahdi.bouizmoune@gmail.com">
          Email Mahdi <span aria-hidden="true">↗</span>
        </a>
        <div className="contact-bottom">
          <a href="mailto:mahdi.bouizmoune@gmail.com">
            mahdi.bouizmoune@gmail.com
          </a>
          <div>
            <a href="https://www.linkedin.com/in/mahdibouizmoune">LinkedIn ↗</a>
            <a href="https://www.fiverr.com/pro5services">Fiverr ↗</a>
          </div>
        </div>
      </div>
    </section>
  );
}
