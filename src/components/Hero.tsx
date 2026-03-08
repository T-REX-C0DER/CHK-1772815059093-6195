"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Heart, Users, ArrowRight, Play, CheckCircle } from "lucide-react";
import styles from "./Hero.module.css";

const trustBadges = [
  { icon: CheckCircle, value: "120+", label: "Verified NGOs" },
  { icon: CheckCircle, value: "₹5M+", label: "Donations Tracked" },
  { icon: CheckCircle, value: "10K+", label: "Volunteers" },
  { icon: CheckCircle, value: "500+", label: "Lives Impacted" },
];

export default function Hero() {
  return (
    <section className={styles.heroContainer} id="home" data-testid="hero-section">
      {/* Animated background elements */}
      <div className={styles.bgOrbs}>
        <motion.div
          className={styles.orb1}
          animate={{
            y: [0, 30, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className={styles.orb2}
          animate={{
            y: [0, -20, 0],
            x: [0, 20, 0],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className={styles.orb3}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className={styles.heroContent}>
        {/* Left Content */}
        <motion.div
          className={styles.leftContent}
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.div
            className={styles.badge}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            data-testid="hero-badge"
          >
            <span className={styles.badgeDot} />
            India's Most Transparent Donation Platform
          </motion.div>

          <motion.h1
            className={styles.headline}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            data-testid="hero-headline"
          >
            Donate, Volunteer, and<br />
            Track Real Impact<br />
            <span className={styles.highlight}>on a Transparent Platform</span>
          </motion.h1>

          <motion.p
            className={styles.subtext}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            data-testid="hero-subtext"
          >
            HelpSphere connects donors, volunteers, and verified NGOs.
            Track every rupee and see real impact with complete transparency.
          </motion.p>

          <motion.div
            className={styles.ctaGroup}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            <Link href="/signup" style={{ textDecoration: 'none' }}>
              <motion.button
                className={`btn btn-primary ${styles.primaryCta}`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                data-testid="hero-donate-btn"
              >
                <Heart size={20} />
                Donate Now
                <ArrowRight size={18} />
              </motion.button>
            </Link>
            <Link href="/signup" style={{ textDecoration: 'none' }}>
              <motion.button
                className={`btn btn-secondary ${styles.secondaryCta}`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                data-testid="hero-volunteer-btn"
              >
                <Users size={20} />
                Become a Volunteer
              </motion.button>
            </Link>
          </motion.div>

          {/* Trust Indicators */}
          <motion.div
            className={styles.trustBadges}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.5 }}
            data-testid="trust-badges"
          >
            {trustBadges.map((badge, index) => (
              <motion.div
                key={index}
                className={styles.trustItem}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.9 + index * 0.1, duration: 0.4 }}
                data-testid={`trust-badge-${index}`}
              >
                <badge.icon className={styles.trustIcon} size={18} />
                <div className={styles.trustText}>
                  <span className={styles.trustValue}>{badge.value}</span>
                  <span className={styles.trustLabel}>{badge.label}</span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Right Content - Hero Image */}
        <motion.div
          className={styles.rightContent}
          initial={{ opacity: 0, x: 50, scale: 0.95 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className={styles.imageWrapper}>
            <div className={styles.imageGlow} />
            <motion.img
              src="https://images.unsplash.com/photo-1560220604-1985ebfe28b1?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA2ODl8MHwxfHNlYXJjaHwxfHx2b2x1bnRlZXJzJTIwaGVscGluZyUyMGNvbW11bml0eSUyMGluZGlhJTIwY2hhcml0eXxlbnwwfHx8fDE3NzI5MTY0OTh8MA&ixlib=rb-4.1.0&q=85"
              alt="Volunteers helping community"
              className={styles.heroImage}
              data-testid="hero-image"
            />
            
            {/* Floating cards */}
            <motion.div
              className={`${styles.floatingCard} ${styles.card1}`}
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              data-testid="floating-card-1"
            >
              <div className={styles.cardIcon}>
                <Heart size={24} />
              </div>
              <div className={styles.cardContent}>
                <span className={styles.cardValue}>₹2.5 Lakh</span>
                <span className={styles.cardLabel}>Donated This Month</span>
              </div>
            </motion.div>

            <motion.div
              className={`${styles.floatingCard} ${styles.card2}`}
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              data-testid="floating-card-2"
            >
              <div className={styles.cardIcon} style={{ background: "linear-gradient(135deg, #22C55E 0%, #16A34A 100%)" }}>
                <CheckCircle size={24} />
              </div>
              <div className={styles.cardContent}>
                <span className={styles.cardValue}>100% Verified</span>
                <span className={styles.cardLabel}>All NGOs Checked</span>
              </div>
            </motion.div>

            {/* Video play button overlay */}
            <motion.button
              className={styles.playBtn}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              data-testid="hero-video-btn"
            >
              <Play size={32} fill="#fff" />
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
