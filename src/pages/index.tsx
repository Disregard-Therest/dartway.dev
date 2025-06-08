import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import { JSX } from 'react';
import styles from './index.module.css';

export default function Home(): JSX.Element {
  return (
    <Layout title="Dart Way" description="Fullstack Dart Framework: Flutter + Serverpod">
      <main className={styles.main}>
        {/* Hero Section */}
        <section className={styles.hero}>
          <h1 className={styles.heroTitle}>Build apps faster with ease</h1>
          <p className={styles.heroSubtitle}>
            Full-Stack Dart Framework for startups, freelancers and studios.
          </p>
          <div className={styles.heroButtons}>
            <Link className="button button--primary button--lg" to="/docs/intro">
              Get Started
            </Link>
            <Link className="button button--secondary button--lg" to="https://github.com/novikov-it/dartway">
              GitHub
            </Link>
          </div>
        </section>

        {/* Pain Points */}
        <section className={styles.section}>
          <h2>What is painful to build fast in Flutter?</h2>
          <ul>
            <li>❌ 50%+ of code is boilerplate: domain, data, api, etc.</li>
            <li>❌ Logic gets very complicated over time</li>
            <li>❌ Every developer uses his own rules and style</li>
          </ul>
        </section>

        {/* Principles */}
        <section className={styles.featuresSection}>
          <h2>Introducing Dart Way</h2>
          <p>Dart Way isn't just a set of tools — it's a philosophy for building scalable apps fast and clean.</p>
          <div className={styles.featuresGrid}>
            <div className={styles.featureCard}>
              <span className={styles.emoji}>🧱</span>
              <h3>Strict logic/UI separation</h3>
              <p>
                Clear architectural boundaries make your codebase predictable and scalable — even juniors won't break it.
              </p>
            </div>
            <div className={styles.featureCard}>
              <span className={styles.emoji}>🔁</span>
              <h3>Universal data layer</h3>
              <p>
                A single source of truth for your backend, API, serialization, and UI. No boilerplate, no desync — just clean flow.
              </p>
            </div>
            <div className={styles.featureCard}>
              <span className={styles.emoji}>🛠️</span>
              <h3>Practical developer toolkit</h3>
              <p>
                Built-in patterns and ready-made solutions for real-world tasks: auth, roles, filtering, pagination, real-time updates.
              </p>
            </div>
          </div>
        </section>

        {/* How it works */}
        <section className={styles.section}>
          <h2>How Dart Way works</h2>
          <p>
            Dart Way transforms your workflow from chaos to clarity in just four steps — keeping your focus on what matters most.
          </p>
          <ol className={styles.stepsList}>
            <li>
              <strong>📦 Scaffold:</strong> Generate a fullstack Flutter + Serverpod app in seconds.
            </li>
            <li>
              <strong>🧱 Define:</strong> Describe your models and logic once — codegen syncs backend and frontend.
            </li>
            <li>
              <strong>🛠 Build:</strong> Use a clean UI kit, reactive views, and shared logic to deliver fast.
            </li>
            <li>
              <strong>🚀 Launch:</strong> Deploy with backend, auth, and real-time updates — all in Dart.
            </li>
          </ol>
        </section>

        {/* Features */}
        <section className={styles.featuresSection}>
          <h2>Key Features</h2>
          <div className={styles.featuresGrid}>
            <div className={styles.featureCard}>
              <span className={styles.emoji}>⚡</span>
              <h3>Fast Setup</h3>
              <p>CLI + templates get you running in minutes</p>
            </div>
            <div className={styles.featureCard}>
              <span className={styles.emoji}>🧼</span>
              <h3>Clean Code</h3>
              <p>Minimal boilerplate and consistent structure</p>
            </div>
            <div className={styles.featureCard}>
              <span className={styles.emoji}>📦</span>
              <h3>Built-in UI & Data</h3>
              <p>UI Kit + typed data-layer out of the box</p>
            </div>
            <div className={styles.featureCard}>
              <span className={styles.emoji}>🔒</span>
              <h3>Auth & Permissions</h3>
              <p>Secure by design with role-based access control</p>
            </div>
            <div className={styles.featureCard}>
              <span className={styles.emoji}>🌍</span>
              <h3>Cross-platform</h3>
              <p>Mobile, Web and Telegram WebApp ready</p>
            </div>
            <div className={styles.featureCard}>
              <span className={styles.emoji}>🧠</span>
              <h3>Real-time & CRUD</h3>
              <p>Live updates, filtering, sorting, pagination</p>
            </div>
          </div>
        </section>

        {/* Who it's for */}
        <section className={styles.featuresSection}>
          <h2>Who Dart Way is for</h2>
          <p>Dart Way is made for teams and solo devs who want to build apps faster, cleaner, and without tech debt.</p>
          <div className={styles.featuresGrid}>
            <div className={styles.featureCard}>
              <span className={styles.emoji}>👨‍💻</span>
              <h3>Freelancers</h3>
              <p>Speed up delivery and focus on features — not infrastructure and boilerplate.</p>
            </div>
            <div className={styles.featureCard}>
              <span className={styles.emoji}>🏢</span>
              <h3>Studios</h3>
              <p>Keep your codebase clean across teams. Let juniors code safely and seniors focus on architecture.</p>
            </div>
            <div className={styles.featureCard}>
              <span className={styles.emoji}>🚀</span>
              <h3>Startup founders</h3>
              <p>Launch MVPs quickly with built-in backend, auth, UI, and real-time features — no extra team required.</p>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className={styles.section}>
          <h2>Join the Dart Way</h2>
          <p>Follow our journey and join the growing community of builders.</p>
          <div className={styles.heroButtons}>
            <Link className="button button--primary button--lg" to="/docs/intro">
              Start Now
            </Link>
            <Link className="button button--secondary button--lg" to="https://t.me/dartwaydev">
              Telegram Chat
            </Link>
          </div>
        </section>
      </main>
    </Layout>
  );
}
