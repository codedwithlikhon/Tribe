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
      </main>
    </div>
  );
}
