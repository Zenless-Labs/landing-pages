import Link from 'next/link';
import { Arrow, Footer, Header } from './studio-components';
import ObjectGallery from './object-gallery';
import HeroScene from './hero-scene';

const steps = [
  {
    number: '01',
    title: 'It starts with your idea.',
    text: 'A sketch, a logo, a reference, or a 3D model. Tell us what you’re imagining and the moment you’re making it for.',
    note: 'A rough idea is a great starting point.',
  },
  {
    number: '02',
    title: 'We work out the shape.',
    text: 'We design from scratch or refine your existing file. Together, we work through the form, color, material, and details.',
    note: 'Your vision. Our design experience.',
  },
  {
    number: '03',
    title: 'Then, we make it real.',
    text: 'Once the design and project details are agreed, we print or craft your pieces and give the finished objects a careful check.',
    note: 'From a digital file to something you can hold.',
  },
];
const questions = [
  [
    'Do I need a 3D model to get started?',
    'No. A rough idea, a sketch, or a logo is enough to start the conversation. We offer custom 3D design as well as printing, and can help you figure out what the object should become.',
  ],
  [
    'Can you print a model we already have?',
    'Absolutely. Share a link to your model in the project brief. We’ll review its geometry, size, and printing requirements with you before confirming the project.',
  ],
  [
    'Can you make something for our launch or team event?',
    'That’s exactly the kind of project we love. Think custom mascots, sculptural logo objects, desk pieces, and keepsakes that connect to your product or team. Tell us about the occasion and the idea behind it.',
  ],
  [
    'What can you make beyond 3D prints?',
    'We also offer laser cutting and engraving, UV printing, and small CNC crafts. Share your design or the object you have in mind. We’ll work through suitable materials, dimensions, and finishes with you.',
  ],
  [
    'What about quantity, timing, and shipping?',
    'Every project is different. Include your estimated quantity, event date, delivery location, and any material or budget preferences in your brief. We’ll work through feasibility, timing, and a quote with you.',
  ],
];

export default function Home() {
  return (
    <div className="site-shell site-shell-home">
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <Header />
      <main id="main">
        <HeroScene>
          <picture className="scene-picture">
            <source
              media="(max-width: 800px)"
              srcSet="/images/explorer-mobile-zenless.webp"
            />
            <img
              src="/images/explorer-hero-zenless.webp"
              alt="Concept render of a detailed multicolor 3D printed explorer, with orange, ivory, teal, yellow, and navy parts"
              width="1672"
              height="941"
              fetchPriority="high"
            />
          </picture>
          <div className="scene-shade" aria-hidden="true" />
          <div className="scene-content wrap">
            <span className="eyebrow">
              <i className="status-dot" /> Independent design & making studio
            </span>
            <h1 id="hero-title">
              From your
              <br />
              imagination.
              <br />
              <span>Into your hands.</span>
            </h1>
            <p>
              For the teams building what’s next.
              <br />
              3D printing. Laser cutting & engraving.
              <br />
              UV printing. Small CNC crafts.
              <br className="desktop-break" /> Your idea, made in every detail.
            </p>
            <div className="scene-actions">
              <Link className="button button-light" href="/contact">
                Let’s make something <Arrow diagonal />
              </Link>
              <a className="text-link" href="#objects">
                Explore the possibilities <Arrow />
              </a>
            </div>
          </div>
          <div className="scene-footer wrap">
            <span className="micro">
              Digital imagination. Physical expression.
            </span>
            <div>
              <span className="micro">
                THE EXPLORER / MULTICOLOR 3D PRINTING
              </span>
            </div>
          </div>
        </HeroScene>
        <div className="capability-strip">
          <div className="wrap">
            <span>ONE STUDIO. MORE POSSIBILITIES.</span>
            <span>Multicolor 3D printing</span>
            <b>+</b>
            <span>Laser cutting & engraving</span>
            <b>+</b>
            <span>UV printing</span>
            <b>+</b>
            <span>Small CNC crafts</span>
            <span className="strip-arrow">↗</span>
          </div>
        </div>
        <section className="objects-section wrap section-space" id="objects">
          <div className="section-heading">
            <div>
              <span className="eyebrow section-number">The possibilities</span>
              <h2>
                Make something
                <br />
                worth keeping.
              </h2>
            </div>
            <p>
              A multicolor mascot. An engraved keepsake. A vivid printed
              graphic. A small carved object. We find the right process for the
              thing you have in mind.
            </p>
          </div>
          <ObjectGallery />
          <p className="gallery-disclaimer">
            <span>↳</span> Explore what’s possible. Illustrative designs to
            inspire your own project.
          </p>
        </section>
        <section className="process-section" id="process">
          <div className="wrap section-space">
            <div className="section-heading">
              <div>
                <span className="eyebrow section-number">
                  From first thought to final form
                </span>
                <h2>
                  A good idea.
                  <br />A close collaboration.
                </h2>
              </div>
              <p>
                You bring the context, the taste, the “what if.”
                <br />
                We bring the design thinking and the tools to make it happen.
              </p>
            </div>
            <div className="process-grid">
              {steps.map((step) => (
                <article className="process-step" key={step.number}>
                  <div className="step-line">
                    <span className="micro">{step.number}</span>
                    <Arrow />
                  </div>
                  <h3>{step.title}</h3>
                  <p>{step.text}</p>
                  <span className="step-note">{step.note}</span>
                </article>
              ))}
            </div>
            <div className="process-bottom">
              <span className="micro">FROM “WHAT IF” TO “HERE IT IS.”</span>
              <Link className="text-link" href="/contact">
                Tell us what you’re thinking <Arrow diagonal />
              </Link>
            </div>
          </div>
        </section>
        <section className="studio-section wrap section-space" id="studio">
          <div className="studio-intro">
            <span className="eyebrow section-number">The studio</span>
            <h2>
              Built by a mind
              <br />
              that lives in <span>what’s next.</span>
            </h2>
          </div>
          <div className="studio-story">
            <p className="large-copy">
              Rooted in the AI industry.
              <br />
              Obsessed with the physical world.
            </p>
            <p>
              Zenless Labs is an independent design and making studio founded by
              an AI practitioner. We bring a builder’s curiosity to physical
              objects: explore an idea, refine the details, and make something
              that feels unmistakably yours.
            </p>
            <p>
              Work directly with the person shaping your project, from the first
              reference to the finished piece. Thoughtful design. Dedicated
              attention. A shared excitement for what it could become.
            </p>
            <div className="studio-signature">
              <span className="signature-mark">z.</span>
              <span>
                Small studio.
                <br />
                <strong>Fully invested.</strong>
              </span>
            </div>
          </div>
        </section>
        <section className="equipment-section wrap">
          <div className="equipment-art" aria-hidden="true">
            <div className="equipment-grid" />
            <span className="equipment-code micro">STUDIO HARDWARE / 001</span>
            <div className="layer-object">
              {Array.from({ length: 36 }, (_, i) => (
                <span
                  key={i}
                  style={
                    {
                      '--i': i,
                      '--layer-color': [
                        '#e96b39',
                        '#f1be50',
                        '#f1e7d4',
                        '#68b5a3',
                        '#238c91',
                        '#56728f',
                        '#cd7970',
                        '#b1c77f',
                        '#e4a271',
                      ][Math.floor(i / 4) % 9],
                    } as React.CSSProperties
                  }
                />
              ))}
            </div>
            <div className="equipment-art-bottom micro">
              <span>MORE COLORS. MORE CHARACTER.</span>
              <span>↗</span>
            </div>
          </div>
          <div className="equipment-copy">
            <span className="eyebrow">
              <i className="status-dot" /> Now in the studio
            </span>
            <h2>
              More color.
              <br />
              More possibility.
            </h2>
            <p>
              Our <strong>Bambu Lab H3C</strong> supports up to 24-color
              printing with compatible AMS expansion. Nine dedicated print tools
              make intricate multicolor objects more practical, giving your
              mascot, miniature, or brand idea more room for personality.
            </p>
            <div className="equipment-specs">
              <div>
                <strong>24</strong>
                <span>Colors with AMS expansion*</span>
              </div>
              <div>
                <strong>H3C</strong>
                <span>Bambu Lab platform</span>
              </div>
              <div>
                <strong>&lt;6s</strong>
                <span>Dedicated-tool changes*</span>
              </div>
            </div>
            <a
              className="equipment-source"
              href="https://blog.bambulab.com/tool-changer-game-changer-bambu-lab-presents-h3c-the-defining-new-generation-of-3d-printers/"
              target="_blank"
              rel="noopener noreferrer"
            >
              * Manufacturer specifications · Bambu Lab <Arrow diagonal />
            </a>
          </div>
        </section>
        <section className="faq-section wrap section-space">
          <div>
            <span className="eyebrow section-number">A few good questions</span>
            <h2>
              Curious?
              <br />
              Good.
            </h2>
            <a className="text-link" href="mailto:hey@zenlesslabs.com">
              Ask us anything <Arrow diagonal />
            </a>
          </div>
          <div className="faq-list">
            {questions.map(([question, answer]) => (
              <details key={question}>
                <summary>
                  {question}
                  <span className="faq-plus" aria-hidden="true">
                    +
                  </span>
                </summary>
                <p>{answer}</p>
              </details>
            ))}
          </div>
        </section>
        <section className="closing-section">
          <div className="wrap">
            <span className="eyebrow">
              Custom objects for teams building what’s next
            </span>
            <h2>
              Your next launch,
              <br />
              <span>in good hands.</span>
            </h2>
            <div className="closing-bottom">
              <p>
                Send a sketch, a model, or a brief. We’ll work out the design,
                materials, and details with you.
              </p>
              <Link className="button button-light" href="/contact">
                Start a project <Arrow diagonal />
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
