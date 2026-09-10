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
    <footer className="footer-shell">
      <div className="wrap footer">
        <Link prefetch={false} className="wordmark" href="/">
          mahdi b<span>.</span>
        </Link>
        <span>El Mahdi Bouizmoune · Safi, Morocco</span>
        <a href="https://www.linkedin.com/in/mahdibouizmoune">LinkedIn ↗</a>
        <a href="#main">Back to top ↑</a>
      </div>
    </footer>
  );
}
export function Contact() {
  return (
    <section className="contact" id="contact">
      <div className="wrap">
        <div className="contact-heading">
          <div>
            <p className="eyebrow">HAVE A ROLE OR A PROJECT IN MIND?</p>
            <h2>
              Good work starts
              <br />
              <span className="serif">with a conversation.</span>
            </h2>
          </div>
          <div className="contact-action">
            <p className="contact-description">
              Open to digital marketing roles and freelance collaborations,
              remotely and worldwide.
            </p>
            <a
              className="button contact-button"
              href="mailto:mahdi.bouizmoune@gmail.com"
            >
              Email Mahdi <span aria-hidden="true">↗</span>
            </a>
          </div>
        </div>
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
