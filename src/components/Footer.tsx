"use client";

import { motion } from "framer-motion";
import { Linkedin, Twitter, Facebook, Instagram, Send, MapPin, Mail, Phone } from "lucide-react";
import Image from "next/image";
import styles from "./Footer.module.css";

const footerLinks = {
  platform: [
    { label: "About Us", href: "#about" },
    { label: "Stories", href: "#stories" },
    { label: "Transparency", href: "#transparency" },
    { label: "NGO List", href: "#" },
  ],
  community: [
    { label: "Become a Volunteer", href: "#volunteer" },
    { label: "Campaigns", href: "#" },
    { label: "Careers", href: "#" },
    { label: "Partnerships", href: "#" },
  ],
  legal: [
    { label: "Privacy Policy", href: "#" },
    { label: "Terms of Service", href: "#" },
    { label: "NGO Guidelines", href: "#" },
    { label: "Refund Policy", href: "#" },
  ],
};

const socialLinks = [
  { icon: Linkedin, href: "#", label: "LinkedIn" },
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Facebook, href: "#", label: "Facebook" },
  { icon: Instagram, href: "#", label: "Instagram" },
];

export default function Footer() {
  return (
    <footer className={styles.footer} data-testid="footer">
      <div className={styles.container}>
        {/* Main Grid */}
        <div className={styles.grid}>
          {/* Brand Column */}
          <motion.div
            className={styles.brandCol}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className={styles.logo} data-testid="footer-logo">
              <div className={styles.logoMark}>
                <Image 
                  src="/logo.png" 
                  alt="HelpSphere Logo" 
                  width={60} 
                  height={60} 
                  className={styles.logoImage}
                />
              </div>
              <span className={styles.logoText}>HelpSphere</span>
            </div>
            
            <p className={styles.desc}>
              Making a real impact through transparency. We connect people with verified NGOs for a better tomorrow.
            </p>

            {/* Newsletter */}
            <div className={styles.newsletter}>
              <p className={styles.newsletterLabel}>Get Updates</p>
              <div className={styles.inputGroup}>
                <input 
                  type="email" 
                  placeholder="Your Email" 
                  className={styles.input}
                  data-testid="newsletter-input"
                />
                <button className={styles.sendBtn} data-testid="newsletter-submit">
                  <Send size={18} />
                </button>
              </div>
            </div>
          </motion.div>

          {/* Links Columns */}
          <motion.div
            className={styles.linksCol}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.5 }}
          >
            <h4>HelpSphere</h4>
            <ul>
              {footerLinks.platform.map((link, i) => (
                <li key={i}>
                  <a href={link.href} data-testid={`footer-link-platform-${i}`}>{link.label}</a>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            className={styles.linksCol}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <h4>Community</h4>
            <ul>
              {footerLinks.community.map((link, i) => (
                <li key={i}>
                  <a href={link.href} data-testid={`footer-link-community-${i}`}>{link.label}</a>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            className={styles.linksCol}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <h4>Legal</h4>
            <ul>
              {footerLinks.legal.map((link, i) => (
                <li key={i}>
                  <a href={link.href} data-testid={`footer-link-legal-${i}`}>{link.label}</a>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Divider */}
        <div className={styles.divider} />

        {/* Bottom Bar */}
        <div className={styles.bottomBar}>
          <p className={styles.copyright} data-testid="copyright">
            © {new Date().getFullYear()} HelpSphere. All rights reserved.
          </p>
          
          <div className={styles.socials}>
            {socialLinks.map((social, i) => (
              <motion.a
                key={i}
                href={social.href}
                className={styles.socialIcon}
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                aria-label={social.label}
                data-testid={`social-${social.label.toLowerCase()}`}
              >
                <social.icon size={20} />
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
