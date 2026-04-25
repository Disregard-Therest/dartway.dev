import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import { JSX } from 'react';
import styles from './index.module.css';

const content = {
  en: {
    title: 'DartWay Framework',
    description: 'The reusable engineering framework behind DartWay apps.',
    heroTitle: 'Build reliable apps in weeks, not months',
    heroSubtitle: 'Proven core and pre-built modules for Flutter + Serverpod teams that need faster builds and easier scaling.',
    docsCta: 'Open documentation',
    githubCta: 'GitHub',
    painTitle: 'Why Flutter development gets expensive',
    pain: [
      'Too much code is repeated between models, API, state, and UI.',
      'Every developer or AI assistant writes the same patterns differently.',
      'Architecture drifts over time and the product gets slower to change.',
    ],
    introTitle: 'What DartWay adds',
    introText:
      'DartWay is an opinionated framework with strict rules, generated structure, and shared patterns. It keeps product code fast to write, clean to review, and safer to scale.',
    features: [
      ['Strict logic/UI separation', 'Predictable feature architecture that keeps UI, local logic, domain logic, and shared UI kit separate.'],
      ['Universal data layer', 'Backend, API, serialization, filters, persistence, and UI lists follow one model-driven flow.'],
      ['Practical product toolkit', 'Auth, roles, CRUD configs, validation, pagination, real-time updates, and loading/error UX.'],
    ],
    stepsTitle: 'How it works',
    steps: [
      ['Scaffold', 'Generate a full-stack Flutter + Serverpod app foundation.'],
      ['Define', 'Describe models and CRUD rules once, then keep frontend and backend aligned.'],
      ['Build', 'Use typed data APIs, reactive views, UI kit, and feature-first modules.'],
      ['Launch', 'Ship with backend, auth, migrations, and real-time data in one Dart stack.'],
    ],
  },
  ru: {
    title: 'DartWay Framework',
    description: 'Переиспользуемый инженерный фреймворк, на котором DartWay строит приложения.',
    heroTitle: 'Создавайте надежные приложения за недели, а не месяцы',
    heroSubtitle: 'Проверенное ядро и готовые модули для команд на Flutter + Serverpod: быстрее разработка и проще масштабирование.',
    docsCta: 'Открыть документацию',
    githubCta: 'GitHub',
    painTitle: 'Почему Flutter-разработка становится дорогой',
    pain: [
      'Слишком много кода повторяется между моделями, API, state и UI.',
      'Каждый разработчик или AI-ассистент пишет одни и те же паттерны по-своему.',
      'Архитектура постепенно расползается, и продукт становится сложнее менять.',
    ],
    introTitle: 'Что добавляет DartWay',
    introText:
      'DartWay — opinionated-фреймворк со строгими правилами, generated-структурой и общими паттернами. Он помогает писать код быстрее, ревьюить проще и масштабировать безопаснее.',
    features: [
      ['Разделение логики и UI', 'Предсказуемая feature-архитектура разделяет UI, локальную логику, domain logic и общий UI kit.'],
      ['Универсальный data layer', 'Backend, API, serialization, filters, persistence и UI lists работают через единый model-driven flow.'],
      ['Практичный продуктовый toolkit', 'Auth, roles, CRUD configs, validation, pagination, real-time updates и loading/error UX.'],
    ],
    stepsTitle: 'Как это работает',
    steps: [
      ['Scaffold', 'Генерируем full-stack основу Flutter + Serverpod приложения.'],
      ['Define', 'Описываем модели и CRUD-правила один раз, затем синхронизируем frontend и backend.'],
      ['Build', 'Используем typed data APIs, reactive views, UI kit и feature-first modules.'],
      ['Launch', 'Запускаем backend, auth, migrations и real-time data в одном Dart-стеке.'],
    ],
  },
};

export default function Framework(): JSX.Element {
  const { i18n } = useDocusaurusContext();
  const t = i18n.currentLocale === 'ru' ? content.ru : content.en;

  return (
    <Layout title={t.title} description={t.description} wrapperClassName="frameworkPage">
      <main className={styles.main}>
        <section className={styles.hero}>
          <p className={styles.eyebrow}>DartWay Framework</p>
          <h1 className={styles.heroTitle}>{t.heroTitle}</h1>
          <p className={styles.heroSubtitle}>{t.heroSubtitle}</p>
          <div className={styles.heroButtons}>
            <Link className="button button--primary button--lg" to="/docs/intro">
              {t.docsCta}
            </Link>
            <Link className="button button--secondary button--lg" to="https://github.com/dartway/dartway">
              {t.githubCta}
            </Link>
          </div>
        </section>

        <section className={styles.section}>
          <h2>{t.painTitle}</h2>
          <ul className={styles.checkList}>
            {t.pain.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>

        <section className={styles.featuresSection}>
          <h2>{t.introTitle}</h2>
          <p className={styles.sectionLead}>{t.introText}</p>
          <div className={styles.featuresGrid}>
            {t.features.map(([title, text]) => (
              <article className={styles.featureCard} key={title}>
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className={styles.featuresSection}>
          <h2>{t.stepsTitle}</h2>
          <div className={styles.featuresGrid}>
            {t.steps.map(([title, text]) => (
              <article className={styles.featureCard} key={title}>
                <span className={styles.emoji}>{title}</span>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </section>
      </main>
    </Layout>
  );
}
