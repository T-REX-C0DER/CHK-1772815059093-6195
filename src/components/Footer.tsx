import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.grid}>
          
          <div className={styles.brandCol}>
            <div className={styles.logo}>
              <img src="/logo.png" alt="HelpSphere Logo" className={styles.logoImg} />
            </div>
            <p className={styles.desc}>
              Making real impact through transparency. We connect people with verified NGOs for a better tomorrow.
            </p>
          </div>

          <div className={styles.linksCol}>
            <h4>HelpSphere</h4>
            <ul>
              <li><a href="#">About</a></li>
              <li><a href="#">Stories</a></li>
              <li><a href="#">Transparency</a></li>
            </ul>
          </div>

          <div className={styles.linksCol}>
            <h4>Community</h4>
            <ul>
              <li><a href="#">Volunteer</a></li>
              <li><a href="#">Campaigns</a></li>
              <li><a href="#">Careers</a></li>
            </ul>
          </div>

          <div className={styles.linksCol}>
            <h4>Legal</h4>
            <ul>
              <li><a href="#">Privacy Policy</a></li>
              <li><a href="#">Terms of Service</a></li>
              <li><a href="#">NGO Guidelines</a></li>
            </ul>
          </div>

        </div>

        <div className={styles.bottomBar}>
          <p>&copy; {new Date().getFullYear()} HelpSphere. All rights reserved.</p>
          <div className={styles.socials}>
            <a href="#" className={styles.socialIcon}>LinkedIn</a>
            <a href="#" className={styles.socialIcon}>Twitter</a>
            <a href="#" className={styles.socialIcon}>Facebook</a>
            <a href="#" className={styles.socialIcon}>Instagram</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
