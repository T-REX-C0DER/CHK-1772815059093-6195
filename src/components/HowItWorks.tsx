import styles from "./HowItWorks.module.css";

const steps = [
  {
    number: "01",
    title: "Discover Causes",
    desc: "Browse verified NGOs and meaningful causes.",
    icon: "🔍"
  },
  {
    number: "02",
    title: "Donate or Volunteer",
    desc: "Support with money, time, or skills.",
    icon: "🤝"
  },
  {
    number: "03",
    title: "Track Your Impact",
    desc: "See exactly how your contribution is used.",
    icon: "📊"
  },
  {
    number: "04",
    title: "Share Your Impact",
    desc: "Build your impact profile and inspire others.",
    icon: "⭐"
  }
];

export default function HowItWorks() {
  return (
    <section className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.title}>How HelpSphere Works</h2>
        <p className={styles.subtitle}>Making social impact simple, transparent, and trustworthy.</p>
      </div>

      <div className={styles.grid}>
        {steps.map((step, index) => (
          <div key={index} className={`card-soft ${styles.stepCard}`}>
            <div className={styles.iconWrapper}>
              <span className={styles.icon}>{step.icon}</span>
            </div>
            <div className={styles.stepNum}>{step.number}</div>
            <h3 className={styles.stepTitle}>{step.title}</h3>
            <p className={styles.stepDesc}>{step.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
