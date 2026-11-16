import type { Metadata } from 'next';
import Image from 'next/image';
import { Arrow, Footer, Header } from '../studio-components';
import ContactForm from './contact-form';

export const metadata: Metadata = {
  title: 'Start a project — Zenless Labs',
  description:
    'Based in the San Francisco Bay Area, CA, serving individuals and companies. Custom 3D printing, laser cutting and engraving, UV printing, and small CNC crafts for your next launch or team event.',
};
export default async function ContactPage({
  searchParams,
}: {
  searchParams: Promise<{ service?: string | string[] }>;
}) {
  const { service } = await searchParams;
  const initialService =
    typeof service === 'string' &&
    [
      '3D printing',
      'Laser cutting & engraving',
      'UV printing',
      'CNC crafts',
    ].includes(service)
      ? service
      : 'Help me choose';
  return (
    <div className="site-shell contact-shell">
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <Header contact />
      <main id="main" className="contact-page wrap">
        <div className="contact-intro">
          <span className="eyebrow section-number">
            A good thing starts with a conversation
          </span>
          <h1>
            What’s on
            <br />
            your <span>mind?</span>
          </h1>
          <p>
            A sketch, a brand graphic, or a finished model. From multicolor 3D
            prints to laser cutting and engraving, UV printing, and small CNC
            crafts, let’s find the right way to make it.
          </p>
          <p className="contact-local">
            <strong>Based in the Bay Area, CA.</strong><br />
            Proudly serving individuals and companies in our local community.
            From a one-off personal piece to your team’s next launch, you’ll work
            directly with the person making it.
          </p>
          <a className="contact-email" href="mailto:hey@zenlesslabs.com">
            hey@zenlesslabs.com <Arrow diagonal />
          </a>
          <figure className="contact-object">
            <Image
              src="/images/multicolor-concept.webp"
              width={1536}
              height={1024}
              alt="Concept render of an intricate multicolor miniature world"
              sizes="(max-width: 800px) 100vw, 40vw"
            />
            <figcaption className="micro">
              SMALL OBJECTS. BIG PERSONALITY.
            </figcaption>
          </figure>
          <div className="contact-note">
            <span className="status-dot" />
            <p>
              Direct to the studio.
              <br />
              <span>
                A real conversation with the person making your project.
              </span>
            </p>
          </div>
        </div>
        <ContactForm initialService={initialService} />
      </main>
      <Footer />
    </div>
  );
}
