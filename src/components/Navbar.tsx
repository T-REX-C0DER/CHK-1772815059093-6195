"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import styles from "./Navbar.module.css";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className={`${styles.navContainer} ${scrolled ? styles.scrolled : ""}`}>
      <nav className={`glass ${styles.navbar}`}>
        <div className={styles.logo}>
          <Link href="/">
            <img src="/logo.png" alt="HelpSphere Logo" className={styles.logoImg} />
          </Link>
        </div>
        
        <div className={styles.navLinks}>
          <Link href="#home" className={styles.link}>Home</Link>
          <Link href="#about" className={styles.link}>About</Link>
          <Link href="#stories" className={styles.link}>Stories</Link>
          <Link href="#transparency" className={styles.link}>Transparency</Link>
        </div>
        
        <div className={styles.actions}>
          <button className={styles.textBtn}>Login</button>
          <button className={styles.textBtn}>Sign Up</button>
          <button className="btn btn-primary">Donate Now</button>
        </div>
      </nav>
    </div>
  );
}
