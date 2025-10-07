import { ArrowRightIcon, Code2Icon, MessageCircleIcon, MonitorSmartphoneIcon, SparklesIcon } from 'lucide-react';
import logoUrl from '../assets/star-of-david.svg';

interface LandingPageProps {
  onLaunch: () => void;
}

const featureHighlights = [
  {
    icon: SparklesIcon,
    title: 'Chat-first workflows',
    description:
      'Describe your idea in natural language and Tribe scaffolds the project, installs dependencies, and runs commands for you.',
  },
  {
    icon: Code2Icon,
    title: 'Code & preview side-by-side',
    description:
      'Switch between Preview and Code views at any time to tweak files directly or inspect the runtime workspace.',
  },
  {
    icon: MonitorSmartphoneIcon,
    title: 'Live app previews',
    description:
      'See the app you are building update instantly inside the browser without managing local environments.',
  },
];

export function LandingPage({ onLaunch }: LandingPageProps) {
  return (
    <div className="landing-page">
      <header className="landing-nav">
        <div className="landing-logo" aria-label="Tribe">
          <img src={logoUrl} alt="Tribe logo" />
          <span>Tribe</span>
        </div>
        <div className="landing-nav-actions">
          <button type="button" className="secondary-button">
            View docs
          </button>
          <button type="button" className="primary-button" onClick={onLaunch}>
            Launch workspace
          </button>
        </div>
      </header>

      <main className="landing-content">
        <section className="landing-hero">
          <div className="landing-hero-copy">
            <span className="landing-eyebrow">Your AI product studio</span>
            <h1 className="landing-headline">What should we build today?</h1>
            <p className="landing-subheadline">Create stunning apps &amp; websites by chatting with AI.</p>
            <div className="landing-cta">
              <textarea
                className="landing-textarea"
                placeholder="Type your idea and we'll build it together."
                aria-label="Describe the project you want to create"
              />
              <button type="button" className="primary-button" onClick={onLaunch}>
                Start building
                <ArrowRightIcon aria-hidden="true" />
              </button>
            </div>
            <p className="landing-tip">
              Want to edit your project files directly? Switch from Preview to Code view using the Code Preview icon (&lt;&gt;). It
              is perfect when you know exactly what needs changing, want to troubleshoot, or explore your project assets.
            </p>
          </div>

          <div className="landing-hero-preview" aria-hidden="true">
            <div className="landing-preview-card chat">
              <header>
                <MessageCircleIcon aria-hidden="true" />
                <span>Conversation</span>
              </header>
              <div className="landing-chat-message user">
                <span>You</span>
                <p>Can you scaffold a landing page for my AI portfolio?</p>
              </div>
              <div className="landing-chat-message assistant">
                <span>Tribe</span>
                <p>
                  Absolutely. I will create a Vite + React project, install Tailwind, and wire up a hero section with a live
                  preview.
                </p>
              </div>
              <div className="landing-chat-message assistant">
                <span>Action</span>
                <p>• createOrUpdateFile src/App.tsx{'\n'}• runCommand npm install tailwindcss</p>
              </div>
            </div>

            <div className="landing-preview-card app">
              <header>
                <MonitorSmartphoneIcon aria-hidden="true" />
                <span>Live preview</span>
              </header>
              <div className="landing-preview-window">
                <div className="landing-preview-bar" />
                <div className="landing-preview-body">
                  <div className="landing-preview-chip">Vite dev server</div>
                  <h3>Instant updates</h3>
                  <p>Every code change is reflected immediately in your embedded preview.</p>
                  <div className="landing-preview-buttons">
                    <button type="button">Open preview</button>
                    <button type="button" className="ghost-button">
                      View source
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="landing-highlights">
          {featureHighlights.map(({ icon: Icon, title, description }) => (
            <article key={title} className="landing-highlight">
              <div className="landing-highlight-icon">
                <Icon aria-hidden="true" />
              </div>
              <div>
                <h3>{title}</h3>
                <p>{description}</p>
              </div>
            </article>
          ))}
        </section>

        <section className="landing-design-mode">
          <div className="landing-design-copy">
            <span className="landing-eyebrow">Design mode</span>
            <h2>Build visually, iterate instantly</h2>
            <p>
              Design mode provides an intuitive, visual way to build and refine your app&apos;s interface. Select any element in
              the preview, inspect its properties, and make precise adjustments using natural language or the full design
              control panel.
            </p>

            <div className="landing-design-grid">
              <article>
                <h3>Enable Design Mode</h3>
                <ul>
                  <li>
                    <strong>Keyboard shortcut:</strong> Press <kbd>Option</kbd> + <kbd>D</kbd> to toggle Design Mode from
                    anywhere.
                  </li>
                  <li>
                    <strong>Using the UI:</strong> Open the <em>Design</em> tab at the top of the interface to switch from the
                    chat view.
                  </li>
                </ul>
              </article>

              <article>
                <h3>Select exactly what you need</h3>
                <p>
                  With Design Mode active, hovering over the preview highlights selectable regions so you can target the exact
                  component you want to modify. Click any highlighted element to lock it into the design panel.
                </p>
              </article>

              <article>
                <h3>Modify elements your way</h3>
                <ul>
                  <li>
                    <strong>Prompt for complex updates:</strong> Describe structural changes like &quot;add a button next to this
                    text&quot; or &quot;make this a three-column grid&quot; for instant layout edits.
                  </li>
                  <li>
                    <strong>Fine-tune in the panel:</strong> Adjust typography, colors, spacing, borders, radius, shadows, and
                    more with Tailwind-native controls.
                  </li>
                </ul>
              </article>

              <article>
                <h3>Stay on brand effortlessly</h3>
                <p>
                  The design panel reads directly from your <code>tailwind.config.js</code>, so every tweak uses your existing
                  design tokens. Experiment freely—prompt-based updates use AI tokens, while panel adjustments are unlimited.
                </p>
              </article>

              <article>
                <h3>Save when it&apos;s perfect</h3>
                <p>
                  Once you&apos;re happy with the results, tap <strong>Save</strong> at the bottom of the preview to capture your
                  edits and keep iterating with confidence.
                </p>
              </article>
            </div>
          </div>

          <aside className="landing-design-aside" aria-hidden="true">
            <div className="landing-design-card">
              <span className="landing-eyebrow">Preview</span>
              <h3>Design controls at a glance</h3>
              <ul>
                <li>Typography presets with weight, leading, and spacing adjustments.</li>
                <li>Color, background, border, and shadow controls aligned with your tokens.</li>
                <li>Layout tools for margin, padding, alignment, and responsive sizing.</li>
                <li>Content editing to update copy inline while you design.</li>
              </ul>
            </div>
          </aside>
        </section>

        <section className="landing-anyone">
          <div className="landing-anyone-card">
            <h2>Anyone, anywhere can build with Tribe</h2>
            <p>
              Turn your ideas into real web apps without writing code. Describe the experience you want, remix generated
              layouts in Design Mode, and deploy with a single click—all from one collaborative canvas.
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}
