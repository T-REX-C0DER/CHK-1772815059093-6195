"use client";

import { motion, useMotionValue, animate } from "framer-motion";
import { useEffect, useState } from "react";
import { Building2, Users, Heart, IndianRupee, Shield } from "lucide-react";
import styles from "./TrustSection.module.css";

const partners = [
  { name: "UNICEF India", initials: "UN" },
  { name: "Red Cross", initials: "RC" },
  { name: "Save the Children", initials: "SC" },
  { name: "CRY Foundation", initials: "CRY" },
  { name: "Goonj", initials: "G" },
  { name: "Pratham", initials: "P" },
];

const stats = [
  { value: 25000, suffix: "+", label: "Active Donors", icon: Heart, color: "#D88A6F" },
  { value: 10000, suffix: "+", label: "Volunteers", icon: Users, color: "#5FAF8F" },
  { value: 500, suffix: "+", label: "Verified NGOs", icon: Building2, color: "#D88A6F" },
  { value: 50, prefix: "₹", suffix: "M+", label: "Donations Tracked", icon: IndianRupee, color: "#5FAF8F" },
];

function AnimatedCounter({ value, prefix = "", suffix = "" }: { value: number; prefix?: string; suffix?: string }) {
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    const controls = animate(0, value, {
      duration: 2,
      ease: "easeOut",
      onUpdate: (v) => setDisplay(Math.floor(v)),
    });
    return () => controls.stop();
  }, [value]);

  const format = (num: number) => {
    if (num >= 1000) return `${(num / 1000).toFixed(num >= 10000 ? 0 : 1)}K`;
    return num.toString();
  };

  return <span>{prefix}{format(display)}{suffix}</span>;
}

export default function TrustSection() {
  return (
    <section className={styles.section} data-testid="trust-section">
      <div className={styles.container}>
        {/* Partners */}
        <motion.div
          className={styles.partners}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
        >
          <p className={styles.partnersLabel}>Trusted by leading organizations</p>
          <div className={styles.partnerLogos}>
            {partners.map((partner, i) => (
              <motion.div
                key={partner.name}
                className={styles.partnerBadge}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 * i, duration: 0.4 }}
                whileHover={{ y: -2 }}
              >
                <span className={styles.partnerInitials}>{partner.initials}</span>
                <span className={styles.partnerName}>{partner.name}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Divider */}
        <div className={styles.divider} />

        {/* Stats */}
        <motion.div
          className={styles.statsGrid}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              className={styles.statCard}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 * index, duration: 0.5 }}
              whileHover={{ y: -4, scale: 1.02 }}
              data-testid={`trust-stat-${index}`}
            >
              <div className={styles.statIcon} style={{ background: `${stat.color}12`, color: stat.color }}>
                <stat.icon size={22} />
              </div>
              <motion.h3
                className={styles.statValue}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
              >
                <AnimatedCounter value={stat.value} prefix={stat.prefix} suffix={stat.suffix} />
              </motion.h3>
              <p className={styles.statLabel}>{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
