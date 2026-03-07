import styles from "./CTA.module.css";

export default function CTA() {
  return (
    <section className={styles.container}>
      <div className={styles.glowEffect}></div>
      <div className={styles.contentWrapper}>
        <div className={styles.imageCol}>
          <img src="/cta1.png" alt="Volunteers in action" className={styles.ctaImage1} />
        </div>
        
        <div className={styles.content}>
          <h2 className={styles.title}>Be the Reason Someone Smiles Today</h2>
          <p className={styles.subtitle}>
            Join thousands of donors and volunteers who are creating a transparent and meaningful impact around the world.
          </p>
          <div className={styles.buttonGroup}>
            <button className={`btn btn-primary ${styles.glowBtn}`}>Donate Now</button>
            <button className={`btn ${styles.volunteerBtn}`}>Become a Volunteer</button>
          </div>
        </div>

        <div className={styles.imageCol}>
          <img src="/cta2.png" alt="Helping hands" className={styles.ctaImage2} />
        </div>
      </div>
    </section>
  );
}
