import styles from "./TrustIndicators.module.css";

export default function TrustIndicators() {
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.item}>
          <span className={styles.check}>✔</span>
          <span className={styles.text}>120+ Verified NGOs</span>
        </div>
        <div className={styles.divider}></div>
        <div className={styles.item}>
          <span className={styles.check}>✔</span>
          <span className={styles.text}>₹5M+ Donations Tracked</span>
        </div>
        <div className={styles.divider}></div>
        <div className={styles.item}>
          <span className={styles.check}>✔</span>
          <span className={styles.text}>10,000+ Volunteers</span>
        </div>
        <div className={styles.divider}></div>
        <div className={styles.item}>
          <span className={styles.check}>✔</span>
          <span className={styles.text}>500+ Lives Impacted</span>
        </div>
      </div>
    </div>
  );
}
