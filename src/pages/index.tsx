import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import { JSX } from 'react';
import styles from './index.module.css';

const content = {
  en: {
    title: 'DartWay',
    description: 'DartWay is a full-stack Flutter + Serverpod framework for shipping real products faster with stricter architecture and less boilerplate.',
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
  },
  ru: {
    title: 'DartWay',
    description: 'DartWay — full-stack фреймворк на Flutter + Serverpod для более быстрой поставки продуктов со строгой архитектурой и меньшим количеством boilerplate.',
    heroTitle: 'Приложения за дни, а не месяцы',
    heroKicker: 'для команд на Flutter + Serverpod',
    heroSubtitle:
      'Строгая архитектура, generated-структура и готовые продуктовые примитивы, чтобы команда писала меньше boilerplate и реже ошибалась в архитектуре.',
    heroMeta: ['Разработка в 3-5 раз быстрее', '10+ запущенных продуктов', 'Flutter + Serverpod'],
    primaryCta: 'Открыть документацию',
    secondaryCta: 'GitHub',
    stats: [
      ['Строгая архитектура', 'UI, локальная логика, domain logic и shared-компоненты разделены по умолчанию.'],
      ['Типизированное ядро', 'Модели, CRUD-правила, фильтры и data flow описаны явно и на frontend, и на backend.'],
      ['AI-friendly кодовая база', 'Единые паттерны делают генерацию, ревью и масштабирование заметно предсказуемее.'],
    ],
    casesTitle: 'Продукты на DartWay',
    casesFooter: 'И десятки других релизов, внутренних систем и стартап-продуктов, собранных на том же фундаменте.',
    cases: [
      {
        title: 'ТВАЙТИ',
        subtitle: 'Обучение финансовой грамотности с регулярным контентом и чатами',
        logo: '/img/tvaity_icon.png',
        status: 'EdTech-платформа',
        platforms: ['Android', 'iOS', 'Web'],
        facts: ['Чаты', 'LMS', 'Аналитика', 'Админка'],
        metric: '> 700 DAU',
        result:
          'Помогли онлайн-школе перенести работу из Telegram и LMS в собственное приложение и создать уникальный опыт для своих учеников.',
      },
      {
        title: 'Керла',
        subtitle: 'Локальный classified с социальными механиками',
        logo: '/img/kerla_icon.webp',
        status: 'E-commerce startup',
        platforms: ['Android', 'iOS'],
        facts: ['Объявления', 'Чаты', 'Сториз', 'Платежи'],
        metric: '> 5000 Users',
        result:
          'Помогли основателю реализовать идеи, запуститься на локальном рынке и постоянно расширять функционал.',
      },
    ],
    servicesTitle: 'Что дает фреймворк',
    services: [
      ['Feature-first структура', 'Предсказуемая раскладка приложения по фичам, общему UI, локальному state и domain logic.'],
      ['Единый data pipeline', 'Backend-модели, API, validation, filters, persistence и UI lists работают через один model-driven flow.'],
      ['Готовые продуктовые примитивы', 'Auth, roles, admin flows, CRUD configs, loading states, errors и real-time updates уже встроены.'],
      ['Кроссплатформенная поставка', 'Один Dart-стек для iOS, Android, Web и внутренних панелей без фрагментированной архитектуры.'],
    ],
    proofTitle: 'Почему команды переходят на DartWay',
    proof: [
      'Он убирает повторяющийся glue-код между моделями, backend-правилами, state и UI.',
      'Он фиксирует базовые паттерны заранее, поэтому продукт не уходит в хаотичную архитектуру по мере роста.',
      'Он задаёт одинаковые границы и для AI, и для инженеров, поэтому код проще генерировать и безопаснее ревьюить.',
      'Он уже обкатан в продакшн-продуктах, а не только в демонстрационных репозиториях.',
    ],
    processTitle: 'Как команды его внедряют',
    process: [
      ['Scaffold', 'Стартуют с full-stack базы DartWay вместо того, чтобы собирать архитектуру с нуля.'],
      ['Define', 'Описывают модели и правила один раз, а потом держат frontend и backend синхронизированными в одной системе.'],
      ['Build', 'Собирают фичи через общие паттерны, typed APIs, reactive views и переиспользуемые продуктовые модули.'],
      ['Scale', 'Расширяют продукт без постоянного переписывания фундамента при каждом новом витке сложности.'],
    ],
    finalTitle: 'Хотите оценить DartWay для следующего продукта?',
    finalText:
      'Начните с документации, посмотрите архитектуру и напишите нам, если захотите обсудить внедрение или реальный продуктовый кейс.',
    contactCta: 'Telegram-сообщество',
  },
};

export default function Home(): JSX.Element {
  const { i18n } = useDocusaurusContext();
  const t = i18n.currentLocale === 'ru' ? content.ru : content.en;

  return (
    <Layout title={t.title} description={t.description} wrapperClassName="homePage">
      <main className={styles.main}>
        <section className={styles.hero}>
          <p className={styles.eyebrow}>DartWay Framework</p>
          <h1 className={styles.heroTitle}>{t.heroTitle}</h1>
          <p className={styles.heroKicker}>{t.heroKicker}</p>
          <p className={styles.heroSubtitle}>{t.heroSubtitle}</p>
          <div className={styles.heroButtons}>
            <Link className="button button--primary button--lg" to="/docs/intro">
              {t.primaryCta}
            </Link>
            <Link className={styles.secondaryCta} to="https://github.com/dartway/dartway">
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
                  {'metric' in caseItem && <div className={styles.caseMetric}>{caseItem.metric}</div>}
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
          <Link className="button button--primary button--lg" to="https://t.me/dartway_dev">
            {t.contactCta}
          </Link>
        </section>
      </main>
    </Layout>
  );
}
