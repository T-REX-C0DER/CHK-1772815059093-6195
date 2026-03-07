import styles from "./CommunityImpact.module.css";

export default function CommunityImpact() {
  return (
    <section className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.title}>Community in Action</h2>
        <p className={styles.subtitle}>See the real work happening on the ground.</p>
      </div>

      <div className={styles.masonryGrid}>
        <div className={`${styles.gridItem} ${styles.item1}`}>
          <div className={styles.imageOverlay}>
            <h4>Food Distribution</h4>
            <p>1,200 meals served</p>
          </div>
        </div>
        
        <div className={`${styles.gridItem} ${styles.item2}`}>
          <div className={styles.imageOverlay}>
            <h4>Education Support</h4>
            <p>New library built</p>
          </div>
        </div>
        
        <div className={`${styles.gridItem} ${styles.item3}`}>
          <div className={styles.imageOverlay}>
            <h4>Medical Camp</h4>
            <p>500+ checkups</p>
          </div>
        </div>
        
        <div className={`${styles.gridItem} ${styles.item4}`}>
          <div className={styles.imageOverlay}>
            <h4>Disaster Relief</h4>
            <p>Emergency supplies</p>
          </div>
        </div>
        
        <div className={`${styles.gridItem} ${styles.item5}`}>
          <div className={styles.imageOverlay}>
            <h4>Skill Training</h4>
            <p>Empowering youth</p>
          </div>
        </div>
      </div>
    </section>
  );
}
