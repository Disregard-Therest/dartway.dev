import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import { JSX } from 'react';
import styles from './index.module.css';

const DOCS_ENTRY = '/docs/getting-started/what-is-dartway';
const GITHUB_URL = 'https://github.com/dartway/dartway';
const TELEGRAM_URL = 'https://t.me/dartway_dev';

const content = {
  title: 'DartWay',
  description:
    'DartWay is a full-stack Flutter + Serverpod framework for shipping real products faster with stricter architecture and less boilerplate.',
  heroTitle: 'Apps in days, not months',
  heroKicker: 'for Flutter + Serverpod teams',
  heroSubtitle:
    'Strict architecture, generated structure, and ready product primitives so teams can build with less boilerplate and fewer architectural mistakes.',
  heroMeta: ['3-5x faster delivery', '10+ shipped products', 'Flutter + Serverpod'],
  primaryCta: 'Open documentation',
  secondaryCta: 'GitHub',
  stats: [
    ['Strict architecture', 'UI, local logic, domain logic, and shared components stay separated by default.'],
    ['Typed product core', 'Models, CRUD rules, filters, and data flows stay explicit across frontend and backend.'],
    ['AI-friendly codebase', 'Consistent patterns make generation, review, and scaling much more predictable.'],
  ],
  casesTitle: 'Products built with DartWay',
  casesFooter: 'And dozens of other shipped flows, internal tools, and startup releases built on the same foundation.',
  cases: [
    {
      title: 'TVAITY',
      subtitle: 'Financial literacy app with regular content and chats',
      logo: '/img/tvaity_icon.png',
      status: 'EdTech platform',
      platforms: ['Android', 'iOS', 'Web'],
      facts: ['Chats', 'LMS', 'Analytics', 'Admin panel'],
      metric: '> 700 DAU',
      result:
        'Helped an online school move work from Telegram and LMS into its own application and create a unique learning experience for students.',
    },
    {
      title: 'Kerla',
      subtitle: 'Region-specific classified with social elements',
      logo: '/img/kerla_icon.webp',
      status: 'E-commerce startup',
      platforms: ['Android', 'iOS'],
      facts: ['Listings', 'Chats', 'Stories', 'Payments'],
      metric: '> 5000 Users',
      result:
        'Helped the founder turn ideas into product, launch on a local market, and keep expanding the feature set.',
    },
  ],
  servicesTitle: 'What the framework gives you',
  services: [
    ['Feature-first structure', 'A predictable application layout for features, shared UI, local state, and domain logic.'],
    ['Unified data pipeline', 'Backend models, API, validation, filters, persistence, and UI lists follow one model-driven flow.'],
    ['Ready product primitives', 'Auth, roles, admin flows, CRUD configs, loading states, errors, and real-time updates are built in.'],
    ['Cross-platform delivery', 'One Dart stack for iOS, Android, Web, and operational panels without fragmented architecture.'],
  ],
  proofTitle: 'Why teams switch to DartWay',
  proof: [
    'It removes repeated glue code between models, backend rules, state, and UI.',
    'It fixes core patterns early, so products do not drift into inconsistent architecture later.',
    'It gives AI and engineers the same boundaries, which makes code generation and review safer.',
    'It is already validated in production products, not just demo repositories.',
  ],
  processTitle: 'How teams adopt it',
  process: [
    ['Scaffold', 'Start from a full-stack DartWay base instead of assembling architecture from scratch.'],
    ['Define', 'Describe models and rules once, then keep frontend and backend aligned through the same system.'],
    ['Build', 'Ship features through shared patterns, typed APIs, reactive views, and reusable product modules.'],
    ['Scale', 'Grow the product without rewriting the foundation every time the scope expands.'],
  ],
  finalTitle: 'Want to evaluate DartWay for your next product?',
  finalText:
    'Start with the docs, inspect the architecture, and reach out if you want to discuss adoption or a real product use case.',
  contactCta: 'Join Telegram',
};

export default function Home(): JSX.Element {
  const t = content;

  return (
    <Layout title={t.title} description={t.description} wrapperClassName="homePage">
      <main className={styles.main}>
        <section className={styles.hero}>
          <p className={styles.eyebrow}>DartWay Framework</p>
          <h1 className={styles.heroTitle}>{t.heroTitle}</h1>
          <p className={styles.heroKicker}>{t.heroKicker}</p>
          <p className={styles.heroSubtitle}>{t.heroSubtitle}</p>
          <div className={styles.heroButtons}>
            <Link className="button button--primary button--lg" to={DOCS_ENTRY} data-cta="hero-docs">
              {t.primaryCta}
            </Link>
            <Link className={styles.secondaryCta} to={GITHUB_URL} data-cta="hero-github">
              {t.secondaryCta}
            </Link>
          </div>
          <div className={styles.heroMeta}>
            {t.heroMeta.map((item) => (
              <span key={item}>{item}</span>
            ))}
          </div>
          <div className={styles.statsGrid}>
            {t.stats.map(([value, label]) => (
              <div className={styles.statItem} key={value}>
                <strong>{value}</strong>
                <span>{label}</span>
              </div>
            ))}
          </div>
        </section>

        <section className={styles.featuresSection}>
          <h2>{t.casesTitle}</h2>
          <div className={styles.caseGrid}>
            {t.cases.map((caseItem) => (
              <article className={styles.caseCard} key={caseItem.title}>
                <div className={styles.caseHeader}>
                  <div className={styles.caseLogo}>
                    <img src={caseItem.logo} alt={`${caseItem.title} logo`} />
                  </div>
                  <div>
                    <span className={styles.caseStatus}>{caseItem.status}</span>
                    <h3>{caseItem.title}</h3>
                    <p>{caseItem.subtitle}</p>
                  </div>
                  <div className={styles.caseMetric}>{caseItem.metric}</div>
                </div>
                <div className={styles.caseChips}>
                  {caseItem.platforms.map((platform) => (
                    <span key={platform}>{platform}</span>
                  ))}
                </div>
                <ul className={styles.caseFacts}>
                  {caseItem.facts.map((fact) => (
                    <li key={fact}>{fact}</li>
                  ))}
                </ul>
                <p className={styles.caseResult}>{caseItem.result}</p>
              </article>
            ))}
          </div>
          <p className={styles.casesFooter}>{t.casesFooter}</p>
        </section>

        <section className={styles.featuresSection}>
          <h2>{t.servicesTitle}</h2>
          <div className={styles.featuresGrid}>
            {t.services.map(([title, text]) => (
              <article className={styles.featureCard} key={title}>
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className={styles.section}>
          <h2>{t.proofTitle}</h2>
          <ul className={styles.checkList}>
            {t.proof.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>

        <section className={styles.featuresSection}>
          <h2>{t.processTitle}</h2>
          <div className={styles.featuresGrid}>
            {t.process.map(([title, text]) => (
              <article className={styles.featureCard} key={title}>
                <span className={styles.emoji}>{title}</span>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className={styles.ctaSection}>
          <h2>{t.finalTitle}</h2>
          <p>{t.finalText}</p>
          <Link className="button button--primary button--lg" to={TELEGRAM_URL} data-cta="footer-telegram">
            {t.contactCta}
          </Link>
        </section>
      </main>
    </Layout>
  );
}
