"use client";

import { motion } from "framer-motion";
import { Search, HandHeart, BarChart3, Share2 } from "lucide-react";
import styles from "./HowItWorks.module.css";

const steps = [
  {
    number: "01",
    title: "Find a Cause",
    desc: "Browse through verified NGOs and meaningful causes.",
    icon: Search,
    color: "#C96F4A"
  },
  {
    number: "02",
    title: "Donate or Volunteer",
    desc: "Help with your money, time, or skills.",
    icon: HandHeart,
    color: "#E38B6C"
  },
  {
    number: "03",
    title: "Track Impact",
    desc: "See how your contribution is making a difference.",
    icon: BarChart3,
    color: "#E8B66B"
  },
  {
    number: "04",
    title: "Share Impact",
    desc: "Build your impact profile and inspire others.",
    icon: Share2,
    color: "#F08A6B"
  }
];

export default function HowItWorks() {
  return (
    <section className={styles.container} id="about" data-testid="how-it-works-section">
      <div className={styles.bgDecor} />
      
      <div className={styles.content}>
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <span className={styles.sectionTag} data-testid="how-it-works-tag">How It Works</span>
          <h2 className={styles.title} data-testid="how-it-works-title">How HelpSphere Works</h2>
          <p className={styles.subtitle}>
            Making social impact simple, transparent, and trustworthy.
          </p>
        </motion.div>

        <div className={styles.grid}>
          {/* Connecting line */}
          <div className={styles.connectorLine}>
            <motion.div
              className={styles.lineProgress}
              initial={{ width: "0%" }}
              whileInView={{ width: "100%" }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease: "easeOut", delay: 0.3 }}
            />
          </div>

          {steps.map((step, index) => (
            <motion.div
              key={index}
              className={styles.stepCard}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 + index * 0.15, duration: 0.5 }}
              whileHover={{ y: -8 }}
              data-testid={`step-card-${index}`}
            >
              <motion.div
                className={styles.iconWrapper}
                style={{ boxShadow: `0 12px 32px ${step.color}25` }}
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ duration: 0.3 }}
              >
                <step.icon size={28} style={{ color: step.color }} />
              </motion.div>
              
              <span className={styles.stepNum} style={{ color: step.color }}>{step.number}</span>
              <h3 className={styles.stepTitle}>{step.title}</h3>
              <p className={styles.stepDesc}>{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
