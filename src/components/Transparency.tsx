import styles from "./Transparency.module.css";

export default function Transparency() {
  return (
    <section className={styles.container} id="transparency">
      <div className={styles.content}>
        <div className={styles.header}>
          <h2 className={styles.title}>See Where Every Contribution Goes</h2>
          <p className={styles.subtitle}>
            We believe in 100% transparency. Our tracking system ensures your donations and efforts turn into real-world impact.
          </p>
        </div>

        <div className={styles.flowContainer}>
          <div className={styles.flowLine}></div>
          
          <div className={styles.flowNodes}>
            <div className={styles.node}>
              <div className={styles.iconCircle}>👤</div>
              <h4>Donor</h4>
              <p>You choose a cause</p>
            </div>
            
            <div className={styles.node}>
              <div className={styles.iconCircle}>💳</div>
              <h4>Secure Payment</h4>
              <p>Direct & fee-free</p>
            </div>
            
            <div className={styles.node}>
              <div className={styles.iconCircle}>🏢</div>
              <h4>Verified NGO</h4>
              <p>Thoroughly vetted</p>
            </div>
            
            <div className={styles.node}>
              <div className={styles.iconCircle}>🏗️</div>
              <h4>Project Execution</h4>
              <p>Live progress updates</p>
            </div>
            
            <div className={styles.node}>
              <div className={styles.iconCircle}>✨</div>
              <h4>Real Impact Proof</h4>
              <p>Photo & video verification</p>
            </div>
          </div>
        </div>

        <div className={styles.featuresGrid}>
          <div className={styles.featureItem}>
            <span className={styles.checkIcon}>✓</span>
            <p>Strict NGO verification process</p>
          </div>
          <div className={styles.featureItem}>
            <span className={styles.checkIcon}>✓</span>
            <p>Direct transparent fund transfers</p>
          </div>
          <div className={styles.featureItem}>
            <span className={styles.checkIcon}>✓</span>
            <p>Photo & video proof of work</p>
          </div>
          <div className={styles.featureItem}>
            <span className={styles.checkIcon}>✓</span>
            <p>Milestone-based fund release</p>
          </div>
        </div>
      </div>
    </section>
  );
}
