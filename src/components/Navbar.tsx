"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronRight } from "lucide-react";
import Image from "next/image";
import styles from "./Navbar.module.css";

const navLinks = [
  { href: "#home", label: "Home", labelEn: "Home" },
  { href: "#about", label: "About", labelEn: "About" },
  { href: "#stories", label: "Stories", labelEn: "Stories" },
  { href: "#transparency", label: "Transparency", labelEn: "Transparency" },
  { href: "#volunteer", label: "Volunteer", labelEn: "Volunteer" },
  { href: "/organization/dashboard", label: "Organizations", labelEn: "Organizations" },
];
export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <motion.div
        className={`${styles.navContainer} ${scrolled ? styles.scrolled : ""}`}
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <nav className={`${styles.navbar} glass`} data-testid="main-navbar">
          <Link href="/" className={styles.logo} data-testid="logo-link">
            <div className={styles.logoMark}>
              <Image 
                src="/logo.png" 
                alt="HelpSphere Logo" 
                width={48} 
                height={48} 
                className={styles.logoImage}
                priority
              />
            </div>
            <span className={styles.logoText}>HelpSphere</span>
          </Link>

          <div className={styles.navLinks}>
            {navLinks.map((link, index) => (
              <motion.div
                key={link.href}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index, duration: 0.4 }}
              >
                <Link href={link.href} className={styles.link} data-testid={`nav-link-${link.labelEn.toLowerCase()}`}>
                  {link.label}
                </Link>
              </motion.div>
            ))}
          </div>

          <div className={styles.actions}>
            <Link href="/login" className={styles.textBtn} data-testid="login-btn">Login</Link>
            <Link href="/signup" className={`btn btn-primary ${styles.textBtn}`} data-testid="signup-btn">Sign Up</Link>
          </div>

          <button
            className={styles.mobileMenuBtn}
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
            data-testid="mobile-menu-toggle"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </nav>
      </motion.div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className={styles.mobileMenu}
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            data-testid="mobile-menu"
          >
            <div className={styles.mobileMenuInner}>
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * index }}
                >
                  <Link
                    href={link.href}
                    className={styles.mobileLink}
                    onClick={() => setMobileOpen(false)}
                    data-testid={`mobile-nav-${link.labelEn.toLowerCase()}`}
                  >
                    {link.label}
                    <ChevronRight size={20} />
                  </Link>
                </motion.div>
              ))}
              <div className={styles.mobileCta}>
                <button className="btn btn-primary" style={{ width: "100%" }} data-testid="mobile-signup-btn">
                  Sign Up
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
