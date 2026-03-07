import styles from "./Hero.module.css";

export default function Hero() {
  return (
    <section className={styles.heroContainer} id="home">
      {/* Decorative background shapes */}
      <div className={styles.bgGlow1}></div>
      <div className={styles.bgGlow2}></div>

      <div className={styles.heroContent}>
        <div className={styles.leftSide}>
          <h1 className={styles.headline}>
            Donate, Volunteer & Track<br />Real Impact <span className={styles.highlight}>All in One</span><br />Transparent Platform
          </h1>
          <p className={styles.subtext}>
            HelpSphere connects donors, volunteers, and verified NGOs.
            Track every rupee you donate and see real-world impact with complete transparency.
          </p>

        </div>


      </div>
    </section>
  );
}
