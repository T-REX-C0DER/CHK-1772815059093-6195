"use client";

import { motion } from "framer-motion";
import { User, CreditCard, Building2, Hammer, Sparkles, CheckCircle, Shield, Image, Target } from "lucide-react";
import styles from "./Transparency.module.css";

const flowSteps = [
  { icon: User, title: "Donor", subtitle: "You choose a cause", color: "#C96F4A" },
  { icon: CreditCard, title: "Secure Payment", subtitle: "Direct and fee-free", color: "#E38B6C" },
  { icon: Building2, title: "Verified NGO", subtitle: "Fully vetted", color: "#E8B66B" },
  { icon: Hammer, title: "Project Execution", subtitle: "Live progress updates", color: "#F08A6B" },
  { icon: Sparkles, title: "Real Impact Proof", subtitle: "Photo and video verification", color: "#C96F4A" },
];

const trustFeatures = [
  { icon: Shield, text: "Strict NGO verification process" },
  { icon: CreditCard, text: "Direct transparent fund transfer" },
  { icon: Image, text: "Photo and video proof of work" },
  { icon: Target, text: "Milestone-based fund release" },
];

export default function Transparency() {
  return (
    <section className={styles.container} id="transparency" data-testid="transparency-section">
      <div className={styles.bgGradient} />
      
      <div className={styles.content}>
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <span className={styles.sectionTag} data-testid="transparency-tag">Transparency</span>
          <h2 className={styles.title} data-testid="transparency-title">See Where Every Contribution Goes</h2>
          <p className={styles.subtitle}>
            We believe in 100% transparency. Our tracking system ensures that your donation and effort turn into real impact.
          </p>
        </motion.div>

        {/* Flow Timeline */}
        <div className={styles.flowContainer} data-testid="flow-timeline">
          <div className={styles.flowLine}>
            <motion.div
              className={styles.flowLineProgress}
              initial={{ width: "0%" }}
              whileInView={{ width: "100%" }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, ease: "easeOut", delay: 0.3 }}
            />
          </div>
          
          <div className={styles.flowNodes}>
            {flowSteps.map((step, index) => (
              <motion.div
                key={index}
                className={styles.node}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 + index * 0.15, duration: 0.5 }}
                data-testid={`flow-step-${index}`}
              >
                <motion.div
                  className={styles.iconCircle}
                  style={{ boxShadow: `0 8px 32px ${step.color}30` }}
                  whileHover={{ scale: 1.1, y: -5 }}
                  transition={{ duration: 0.3 }}
                >
                  <step.icon size={28} style={{ color: step.color }} />
                </motion.div>
                <h4 className={styles.nodeTitle}>{step.title}</h4>
                <p className={styles.nodeSubtitle}>{step.subtitle}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Trust Features */}
        <motion.div
          className={styles.featuresGrid}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.6 }}
          data-testid="trust-features"
        >
          {trustFeatures.map((feature, index) => (
            <motion.div
              key={index}
              className={styles.featureItem}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 + index * 0.1, duration: 0.4 }}
              whileHover={{ scale: 1.02, y: -2 }}
              data-testid={`trust-feature-${index}`}
            >
              <span className={styles.checkIcon}>
                <CheckCircle size={18} />
              </span>
              <p>{feature.text}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
