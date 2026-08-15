const services = [
  {
    number: '01',
    title: 'Embedded Media Pipelines',
    description:
      'Turn image-to-video into a native product action—not a separate tool your users have to learn, operate, and download from.',
    capabilities: ['One-click generation', 'In-app delivery', 'Workflow integration'],
  },
  {
    number: '02',
    title: 'Adaptive Creative Systems',
    description:
      'Persistent taste, brand rules, and feedback loops that make every generation feel like your product—not a generic model demo.',
    capabilities: ['Taste profiles', 'Brand consistency', 'Feedback loops'],
  },
  {
    number: '03',
    title: 'Inference & Model Orchestration',
    description:
      'We choose, route, and benchmark models behind the scenes so your team can focus on the experience instead of the model menu.',
    capabilities: ['Automatic routing', 'Quality fallbacks', 'Cost optimization'],
  },
];

const additionalCapabilities = [
  {
    number: '04',
    title: 'Custom 3D Printing & Prototyping',
    description:
      'Bring your own model, reference, or idea. We prepare, refine, and print custom parts and prototypes for your use case.',
    capabilities: ['Bring your own model', 'Custom 3D modeling', 'Small-batch 3D printing'],
  },
  {
    number: '05',
    title: 'On-chain Product Engineering',
    description:
      'Wallet, payment, and ownership experiences when they add genuine product value. Sui integrations available, crypto jargon optional.',
    capabilities: ['Product onboarding', 'Smart contracts', 'Payments'],
  },
];

export default function Home() {
  return (
    <main className="site-shell">
      <div className="site-grid" aria-hidden="true" />
      <div className="site-glow site-glow-one" aria-hidden="true" />
      <div className="site-glow site-glow-two" aria-hidden="true" />

      <header className="site-header">
        <a className="brand" href="#top" aria-label="Zenless Labs home">
          <img src="/zenless-logo.jpg" alt="" width="30" height="30" />
          <span className="status-dot" aria-hidden="true" />
          <span>Zenless Labs</span>
        </a>
        <nav aria-label="Primary navigation">
          <a href="#services">Services</a>
          <a href="#work">Work</a>
          <a href="/contact">Contact</a>
        </nav>
      </header>

      <section className="hero" id="top">
        <div className="hero-copy">
          <div className="eyebrow"><span>Independent AI studio</span><span>California · Worldwide</span></div>
          <h1 aria-label="Custom AI media, built into your product.">
            Custom AI media,
            <span>built into your product.</span>
          </h1>
          <p>
            <strong>One click for your users.</strong> A complete pipeline underneath—tuned to
            your product, your taste, and your quality bar.
          </p>
          <div className="hero-actions">
            <a className="primary-action" href="#services">Explore services <span>↘</span></a>
            <a className="text-action" href="/contact">Build with us <span>→</span></a>
          </div>
        </div>

        <div
          className="motion-lab"
          role="img"
          aria-label="Animated illustration showing a still image becoming a video sequence"
        >
          <div className="motion-toolbar">
            <span><i /> embedded.media_pipeline</span>
            <span>LIVE PREVIEW</span>
          </div>
          <div className="motion-canvas">
            <div className="input-module">
              <div className="module-label"><span>INPUT</span><span>01 / IMAGE</span></div>
              <div className="source-image">
                <div className="source-sun" />
                <div className="source-road" />
                <div className="source-car">
                  <span className="car-roof" />
                  <span className="car-body" />
                  <span className="car-wheel wheel-left" />
                  <span className="car-wheel wheel-right" />
                </div>
                <div className="scan-line" />
              </div>
              <div className="module-meta"><span>still_001.jpg</span><span>2048 × 1365</span></div>
            </div>

            <div className="pipeline-bridge" aria-hidden="true">
              <span className="bridge-line" />
              <span className="bridge-node node-one" />
              <span className="bridge-node node-two" />
              <span className="bridge-node node-three" />
              <span className="bridge-label">ROUTING</span>
            </div>

            <div className="output-module">
              <div className="module-label"><span>IN-APP OUTPUT</span><span>96 FRAMES</span></div>
              <div className="video-window">
                <div className="motion-frame frame-one">
                  <span className="moving-glow" />
                  <span className="moving-road" />
                  <span className="moving-car">
                    <span className="moving-car-roof" />
                    <span className="moving-car-body" />
                    <span className="moving-car-wheel moving-wheel-left" />
                    <span className="moving-car-wheel moving-wheel-right" />
                  </span>
                </div>
                <div className="motion-frame frame-two">
                  <span className="moving-glow" />
                  <span className="moving-road" />
                  <span className="moving-car">
                    <span className="moving-car-roof" />
                    <span className="moving-car-body" />
                    <span className="moving-car-wheel moving-wheel-left" />
                    <span className="moving-car-wheel moving-wheel-right" />
                  </span>
                </div>
                <div className="motion-frame frame-three">
                  <span className="moving-glow" />
                  <span className="moving-road" />
                  <span className="moving-car">
                    <span className="moving-car-roof" />
                    <span className="moving-car-body" />
                    <span className="moving-car-wheel moving-wheel-left" />
                    <span className="moving-car-wheel moving-wheel-right" />
                  </span>
                </div>
                <div className="video-progress"><span /></div>
              </div>
              <div className="module-meta"><span>motion_001.mp4</span><span>00:04</span></div>
            </div>
          </div>
          <div className="motion-footer">
            <span>PROFILE: BRAND_01</span>
            <span>MODEL ROUTING: AUTO</span>
            <span>DELIVERED</span>
          </div>
        </div>
      </section>

      <section className="section" id="services">
        <div className="section-heading">
          <span className="section-kicker">// SERVICES</span>
          <div>
            <h2>One click in your product.<br />An entire pipeline underneath.</h2>
            <p>We turn model capabilities into product experiences that feel obvious.</p>
          </div>
        </div>
        <div className="service-grid">
          {services.map((service) => (
            <article className="service-card" key={service.number}>
              <div className="service-topline">
                <span>{service.number}</span>
                <span className="service-arrow">↗</span>
              </div>
              <h3>{service.title}</h3>
              <p>{service.description}</p>
              <ul>
                {service.capabilities.map((capability) => <li key={capability}>{capability}</li>)}
              </ul>
            </article>
          ))}
        </div>
        <div className="secondary-services">
          {additionalCapabilities.map((capability) => (
            <article className="secondary-service" key={capability.number}>
              <div className="secondary-label">
                <span>{capability.number}</span>
                <span>ADDITIONAL CAPABILITY</span>
              </div>
              <h3>{capability.title}</h3>
              <p>{capability.description}</p>
              <ul>
                {capability.capabilities.map((item) => <li key={item}>{item}</li>)}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className="section work-section" id="work">
        <div className="section-heading compact-heading">
          <span className="section-kicker">// SELECTED WORK</span>
          <div>
            <h2>Products, not demos.</h2>
            <p>We build and operate our own ideas, too.</p>
          </div>
        </div>
        <a className="project-card" href="https://kitty.zenlesslabs.com" target="_blank" rel="noopener noreferrer">
          <div className="project-visual">
            <img src="/kitty-logo.jpg" alt="Kitty" width="84" height="84" />
            <div className="project-orbit orbit-one" />
            <div className="project-orbit orbit-two" />
          </div>
          <div className="project-content">
            <div className="project-status"><span /> LIVE PRODUCT</div>
            <h3>Kitty</h3>
            <p>Private group payments with on-chain settlement. Designed and shipped on Sui Mainnet.</p>
            <span className="project-link">Visit product <b>↗</b></span>
          </div>
          <div className="project-index">01</div>
        </a>
      </section>

      <section className="principles-section">
        <div className="principle"><span>01</span><strong>Learn your taste</strong><p>Capture the creative rules and preferences that make the output yours.</p></div>
        <div className="principle"><span>02</span><strong>Choose what works</strong><p>Route across models by quality, latency, and cost—not by hype.</p></div>
        <div className="principle"><span>03</span><strong>Return to product</strong><p>Deliver finished media where the user already is. No download-and-reupload loop.</p></div>
      </section>

      <section className="contact-section" id="contact">
        <span className="section-kicker">// START A CONVERSATION</span>
        <h2>Have a product that should<br /><span>move, think, or scale?</span></h2>
        <p>We are exploring a small number of design-partner engagements.</p>
        <a href="/contact">
          Start a conversation <span aria-hidden="true">→</span>
        </a>
      </section>

      <footer>
        <div className="brand footer-brand">
          <img src="/zenless-logo.jpg" alt="" width="22" height="22" />
          <span>Zenless Labs</span>
        </div>
        <span>AI media · 3D printing · Product engineering</span>
        <span>© 2026 Zenless Labs LLC</span>
      </footer>
    </main>
  );
}
