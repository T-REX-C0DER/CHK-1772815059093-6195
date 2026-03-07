import styles from "./ImpactStats.module.css";

const stats = [
  { value: "₹5M+", label: "Donations Raised" },
  { value: "120+", label: "Verified NGOs" },
  { value: "10k+", label: "Volunteers" },
  { value: "500+", label: "Lives Impacted" }
];

export default function ImpactStats() {
  return (
    <section className={styles.container}>
      <div className={styles.content}>
        <div className={styles.header}>
          <h2 className={styles.title}>Our Numbers Speak for Themselves</h2>
          <p className={styles.subtitle}>Together, we are making a measurable difference every single day.</p>
        </div>
        
        <div className={styles.grid}>
          {stats.map((stat, index) => (
            <div key={index} className={`card-soft ${styles.statCard}`}>
              <h3 className={styles.value}>{stat.value}</h3>
              <p className={styles.label}>{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
