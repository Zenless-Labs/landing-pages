import Link from 'next/link';

export function Arrow({ diagonal = false }: { diagonal?: boolean }) {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d={diagonal ? 'M6 18 18 6M6 6h12v12' : 'M4 12h15m-6-6 6 6-6 6'}
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Header({ contact = false }: { contact?: boolean }) {
  return (
    <header className="site-header wrap">
      <Link className="brand" href="/" aria-label="Zenless Labs home">
        <img src="/zenless-logo.jpg" alt="" width="32" height="32" />
        <span>
          zenless<span className="brand-labs">labs</span>
        </span>
      </Link>
      <nav aria-label="Primary navigation">
        <Link className="nav-section" href="/#objects">
          The possibilities
        </Link>
        <Link className="nav-section" href="/#studio">
          The studio
        </Link>
        {!contact && (
          <Link className="nav-contact" href="/contact">
            Contact us
          </Link>
        )}
        <Link className="nav-cta" href={contact ? '/' : '/contact'}>
          {contact ? 'Back to studio' : 'Start a project'}
          <Arrow diagonal />
        </Link>
      </nav>
    </header>
  );
}

export function Footer() {
  return (
    <footer className="site-footer wrap">
      <Link className="brand" href="/">
        zenless<span className="brand-labs">labs</span>
      </Link>
      <span>Independent minds. Tangible things.</span>
      <a href="mailto:hey@zenlesslabs.com">
        Say hello <Arrow diagonal />
      </a>
      <span className="copyright">
        © {new Date().getFullYear()} Zenless Labs LLC
      </span>
    </footer>
  );
}
