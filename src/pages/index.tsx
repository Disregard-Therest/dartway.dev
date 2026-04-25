import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import { JSX } from 'react';
import styles from './index.module.css';

const content = {
  en: {
    title: 'DartWay',
    description: 'DartWay builds mobile, web, and Telegram apps faster on a pre-built engineering foundation.',
    heroTitle: 'Apps in weeks, not months',
    heroSubtitle:
      'Proven core and pre-built modules - faster builds, easier scaling',
    heroMeta: ['MVPs from 4 weeks', '10+ projects', 'Ready architecture'],
    primaryCta: 'Discuss a project',
    secondaryCta: 'Our Framework',
    stats: [
      ['Cross-platform', 'One codebase for iOS, Android, and Web = save money and be flexible.'],
      ['Foundation', 'Authentication, admin panel, and chats work out of the box.'],
      ['Predictability', 'Clear architecture and delivery process - no deadline slips or expensive rewrites.'],
    ],
    casesTitle: 'Selected cases',
    casesFooter: 'And dozens of other projects - from global e-comm to tiny startups.',
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
          'Built a region-focused classifieds product with social mechanics and marketplace flows for everyday local transactions.',
      },
    ],
    servicesTitle: 'What we can build',
    services: [
      ['MVPs for startups', 'Fast first versions with auth, backend, admin flows, payments, and analytics-ready structure.'],
      ['Mobile apps', 'Cross-platform Flutter apps for iOS and Android with a shared codebase and stable architecture.'],
      ['Telegram Web Apps', 'Product flows inside Telegram with backend, user profiles, roles, and real-time data.'],
      ['Internal tools', 'Dashboards, CRMs, operational apps, and workflow automation for teams.'],
    ],
    proofTitle: 'Why this is faster and safer',
    proof: [
      'We start from a tested application foundation instead of an empty repository.',
      'Core patterns are fixed, so features stay predictable as the product grows.',
      'Backend rules, validation, access control, and UI data flow are explicit.',
      'AI can help produce code because the project has strict architectural boundaries.',
    ],
    processTitle: 'How we work',
    process: [
      ['Scope', 'Clarify product goals, users, risks, and the shortest useful release.'],
      ['MVP', 'Build the first usable release with the core user flow, backend, and operational basics.'],
      ['Launch', 'Prepare release, stabilize, monitor, and continue iterating after feedback.'],
      ['Iterations', 'Ship improvements, expand the product, and keep regular releases based on feedback and usage.'],
    ],
    finalTitle: 'Have an app idea or a product backlog?',
    finalText:
      'We can help turn it into a working Flutter product with a clear technical foundation.',
    contactCta: 'Write on Telegram',
  },
  ru: {
    title: 'DartWay',
    description: 'DartWay быстрее запускает мобильные, веб- и Telegram-приложения на готовом инженерном фундаменте.',
    heroTitle: 'Приложения за недели, не месяцы',
    heroSubtitle:
      'Проверенное ядро и готовые модули - быстрее разработка, проще масштабирование',
    heroMeta: ['MVP от 4 недель', '10+ проектов', 'Готовая архитектура'],
    primaryCta: 'Обсудить проект',
    secondaryCta: 'Наш фреймворк',
    stats: [
      ['Cross-platform', 'Один код для iOS, Android и Web = экономия и гибкость'],
      ['Фундамент', 'Аутентификация, админка и чаты работают из коробки'],
      ['Предсказуемость', 'Чёткая архитектура и процессы - без срыва сроков и переписываний'],
    ],
    casesTitle: 'Кейсы',
    casesFooter: 'И десятки других проектов - от глобального e-commerce до крошечных стартапов.',
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
          'Собрали локальный classifieds-продукт с социальными механиками и marketplace-сценариями для повседневных региональных сделок.',
      },
    ],
    servicesTitle: 'Что мы можем сделать',
    services: [
      ['MVP для стартапов', 'Быстрые первые версии с авторизацией, backend, админскими сценариями, платежами и аналитикой.'],
      ['Мобильные приложения', 'Кроссплатформенные Flutter-приложения для iOS и Android на общей кодовой базе.'],
      ['Telegram Web Apps', 'Продуктовые сценарии внутри Telegram с backend, профилями, ролями и real-time данными.'],
      ['Внутренние системы', 'Дашборды, CRM, операционные приложения и автоматизация процессов для команд.'],
    ],
    proofTitle: 'Почему это быстрее и надежнее',
    proof: [
      'Мы начинаем с проверенного фундамента приложения, а не с пустого репозитория.',
      'Базовые паттерны зафиксированы, поэтому продукт не разваливается при росте.',
      'Backend-правила, валидация, доступы и UI data flow описаны явно.',
      'AI может помогать писать код, потому что у проекта есть жесткие архитектурные границы.',
    ],
    processTitle: 'Как мы работаем',
    process: [
      ['Scope', 'Фиксируем цели продукта, пользователей, риски и самый короткий полезный релиз.'],
      ['MVP', 'Собираем первый рабочий релиз с основным пользовательским сценарием, backend и базовой операционной частью.'],
      ['Launch', 'Готовим релиз, стабилизируем, смотрим обратную связь и продолжаем итерации.'],
      ['Доработки', 'Выпускаем улучшения, расширяем продукт и поддерживаем регулярные релизы на основе обратной связи и использования.'],
    ],
    finalTitle: 'Есть идея приложения или продуктовый backlog?',
    finalText:
      'Поможем превратить это в рабочий Flutter-продукт с понятным техническим фундаментом.',
    contactCta: 'Написать в Telegram',
  },
};

export default function Home(): JSX.Element {
  const { i18n } = useDocusaurusContext();
  const t = i18n.currentLocale === 'ru' ? content.ru : content.en;

  return (
    <Layout title={t.title} description={t.description} wrapperClassName="homePage">
      <main className={styles.main}>
        <section className={styles.hero}>
          <h1 className={styles.heroTitle}>{t.heroTitle}</h1>
          <p className={styles.heroSubtitle}>{t.heroSubtitle}</p>
          <div className={styles.heroButtons}>
            <Link className="button button--primary button--lg" to="https://t.me/eu_novikov">
              {t.primaryCta}
            </Link>
            <Link className={styles.secondaryCta} to="/framework">
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
          <Link className="button button--primary button--lg" to="https://t.me/eu_novikov">
            {t.contactCta}
          </Link>
        </section>
      </main>
    </Layout>
  );
}
