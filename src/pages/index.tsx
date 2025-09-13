import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import { JSX } from 'react';
import styles from './index.module.css';

export default function Home(): JSX.Element {
  return (
    <Layout title="DartWay" description="Full-stack Dart framework: Flutter + Serverpod">
      <main className={styles.main}>
        {/* Hero Section */}
        <section className={styles.hero}>
          <h1 className={styles.heroTitle}>Build reliable Flutter apps in days, not months</h1>
          <p className={styles.heroSubtitle}>
            Full-stack Dart framework — AI-ready by design.
          </p>
          <div className={styles.heroButtons}>
            <Link className="button button--primary button--lg" to="/docs/intro">
              Get Started
            </Link>
            <Link className="button button--secondary button--lg" to="https://github.com/dartway/dartway">
              GitHub
            </Link>
          </div>
        </section>

        {/* Pain Points */}
        <section className={styles.section}>
          <h2>Why Flutter development is painful?</h2>
          <ul>
            <li>❌ 50%+ of code is boilerplate (models, API, sync)</li>
            <li>❌ Every dev or AI assistant writes it differently</li>
            <li>❌ Chaos grows, quality drops</li>
          </ul>
        </section>

        {/* Principles / Introducing */}
        <section className={styles.featuresSection}>
          <h2>Introducing DartWay</h2>
          <p>
            DartWay is an opinionated framework that gives AI and developers strict rules and patterns.
            Result: code that’s fast to write, clean to read, and safe to scale.
          </p>
          <div className={styles.featuresGrid}>
            <div className={styles.featureCard}>
              <span className={styles.emoji}>🧱</span>
              <h3>Strict logic/UI separation</h3>
              <p>Predictable architecture that scales — juniors and AI can’t mess things up.</p>
            </div>
            <div className={styles.featureCard}>
              <span className={styles.emoji}>🔁</span>
              <h3>Universal data layer</h3>
              <p>Backend, API, serialization, and UI stay in sync. No boilerplate, no desync.</p>
            </div>
            <div className={styles.featureCard}>
              <span className={styles.emoji}>🛠️</span>
              <h3>Practical toolkit</h3>
              <p>Built-in patterns: auth, roles, filters, pagination, real-time updates.</p>
            </div>
          </div>
        </section>

        {/* How it works */}
        <section className={styles.section}>
          <h2>How DartWay works</h2>
          <p>From chaos to clarity in just four steps.</p>
          <ol className={styles.stepsList}>
            <li><strong>📦 Scaffold:</strong> Generate a full-stack Flutter + Serverpod app in seconds.</li>
            <li><strong>🧱 Define:</strong> Describe models once — AI and codegen keep backend & frontend in sync.</li>
            <li><strong>🛠 Build:</strong> Use clean UI kit, reactive views, and shared logic to deliver fast.</li>
            <li><strong>🚀 Launch:</strong> Deploy with backend, auth, and real-time — all in Dart.</li>
          </ol>
        </section>

        {/* Features */}
        <section className={styles.featuresSection}>
          <h2>Key Features</h2>
          <div className={styles.featuresGrid}>
            <div className={styles.featureCard}>
              <span className={styles.emoji}>⚡</span>
              <h3>Instant setup</h3>
              <p>CLI + templates in minutes</p>
            </div>
            <div className={styles.featureCard}>
              <span className={styles.emoji}>🧼</span>
              <h3>Clean by default</h3>
              <p>Less boilerplate, strict structure</p>
            </div>
            <div className={styles.featureCard}>
              <span className={styles.emoji}>📦</span>
              <h3>UI & Data out of the box</h3>
              <p>UI Kit + typed data-layer</p>
            </div>
            <div className={styles.featureCard}>
              <span className={styles.emoji}>🔒</span>
              <h3>Secure</h3>
              <p>Auth & role-based permissions</p>
            </div>
            <div className={styles.featureCard}>
              <span className={styles.emoji}>🌍</span>
              <h3>Cross-platform</h3>
              <p>Mobile, Web, Telegram WebApp</p>
            </div>
            <div className={styles.featureCard}>
              <span className={styles.emoji}>🧠</span>
              <h3>Real-time & CRUD</h3>
              <p>Live data, filters, triggers, pagination</p>
            </div>
          </div>
        </section>

        {/* Who it's for */}
        <section className={styles.featuresSection}>
          <h2>Who is DartWay for?</h2>
          <div className={styles.featuresGrid}>
            <div className={styles.featureCard}>
              <span className={styles.emoji}>👨‍💻</span>
              <h3>Freelancers</h3>
              <p>Deliver faster, skip boilerplate.</p>
            </div>
            <div className={styles.featureCard}>
              <span className={styles.emoji}>🏢</span>
              <h3>Studios</h3>
              <p>Keep teams aligned, juniors safe, seniors free.</p>
            </div>
            <div className={styles.featureCard}>
              <span className={styles.emoji}>🚀</span>
              <h3>Founders</h3>
              <p>MVPs in days with backend, auth & real-time built-in.</p>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className={styles.section}>
          <h2>Ready for the new way of building Flutter apps?</h2>
          <p>Join the community. Build with us.</p>
          <div className={styles.heroButtons}>
            <Link className="button button--primary button--lg" to="/docs/intro">
              Start Now
            </Link>
            <Link className="button button--secondary button--lg" to="https://t.me/dartway_dev">
              Telegram Community
            </Link>
          </div>
        </section>
      </main>
    </Layout>
  );
}
