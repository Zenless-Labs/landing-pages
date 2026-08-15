import type { Metadata } from 'next';
import ContactForm from './contact-form';

export const metadata: Metadata = {
  title: 'Contact — Zenless Labs',
  description: 'Tell Zenless Labs about the AI media pipeline, 3D prototype, or product system you want to build.',
};

export default function ContactPage() {
  return (
    <main className="site-shell contact-page-shell">
      <div className="site-grid" aria-hidden="true" />
      <div className="site-glow site-glow-one" aria-hidden="true" />

      <header className="site-header">
        <a className="brand" href="/" aria-label="Zenless Labs home">
          <img src="/zenless-logo.jpg" alt="" width="30" height="30" />
          <span className="status-dot" aria-hidden="true" />
          <span>Zenless Labs</span>
        </a>
        <nav aria-label="Contact page navigation">
          <a href="/">← Home</a>
          <a href="mailto:hey@zenlesslabs.com">Email</a>
        </nav>
      </header>

      <section className="contact-page">
        <div className="contact-intro">
          <span className="section-kicker">// START A CONVERSATION</span>
          <h1>Tell us what should<br /><span>move, think, or scale.</span></h1>
          <p>
            Share the product, workflow, 3D prototype, or creative system you have in mind. We’ll respond from
            <a href="mailto:hey@zenlesslabs.com"> hey@zenlesslabs.com</a>.
          </p>
          <div className="contact-availability"><i /> Accepting select design-partner engagements</div>
        </div>
        <ContactForm />
      </section>

      <footer>
        <div className="brand footer-brand">
          <img src="/zenless-logo.jpg" alt="" width="22" height="22" />
          <span>Zenless Labs</span>
        </div>
        <span>AI media · 3D prototyping · Product engineering</span>
        <span>© 2026 Zenless Labs LLC</span>
      </footer>
    </main>
  );
}
