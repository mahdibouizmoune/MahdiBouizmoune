import Link from 'next/link';
export default function NotFound() {
  return (
    <main id="main" className="wrap section">
      <Link prefetch={false} href="/" className="wordmark">
        mahdi b<span>.</span>
      </Link>
      <p className="eyebrow" style={{ marginTop: 60 }}>
        404 / NOT HERE
      </p>
      <h1
        style={{
          fontSize: 'clamp(40px,7vw,90px)',
          lineHeight: 1.1,
          marginTop: 20,
        }}
      >
        Let’s get you
        <br />
        back to the work.
      </h1>
      <Link prefetch={false} className="text-link" href="/#work">
        Explore selected work ↗
      </Link>
    </main>
  );
}
