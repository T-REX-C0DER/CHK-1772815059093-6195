"use client";

import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect, useState } from "react";
import { IndianRupee, Building2, Users, Heart } from "lucide-react";
import styles from "./ImpactStats.module.css";

const stats = [
  { value: 5000000, prefix: "₹", suffix: "+", label: "दान जुटाया", icon: IndianRupee, color: "#C96F4A" },
  { value: 120, prefix: "", suffix: "+", label: "सत्यापित NGOs", icon: Building2, color: "#E38B6C" },
  { value: 10000, prefix: "", suffix: "+", label: "स्वयंसेवक", icon: Users, color: "#E8B66B" },
  { value: 500, prefix: "", suffix: "+", label: "जीवन प्रभावित", icon: Heart, color: "#F08A6B" },
];

function AnimatedCounter({ value, prefix, suffix }: { value: number; prefix: string; suffix: string }) {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    const controls = animate(0, value, {
      duration: 2,
      ease: "easeOut",
      onUpdate: (v) => setDisplayValue(Math.floor(v)),
    });

    return () => controls.stop();
  }, [value]);

  const formatNumber = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(0)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(0)}K`;
    return num.toString();
  };

  return (
    <span>
      {prefix}{formatNumber(displayValue)}{suffix}
    </span>
  );
}

export default function ImpactStats() {
  return (
    <section className={styles.container} data-testid="impact-stats-section">
      <div className={styles.bgPattern} />
      
      <div className={styles.content}>
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <span className={styles.sectionTag} data-testid="stats-tag">हमारा प्रभाव</span>
          <h2 className={styles.title} data-testid="stats-title">हमारे आंकड़े खुद बोलते हैं</h2>
          <p className={styles.subtitle}>
            मिलकर, हम हर दिन एक मापने योग्य अंतर बना रहे हैं।
          </p>
        </motion.div>

        <div className={styles.grid}>
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              className={styles.statCard}
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{ y: -8, scale: 1.02 }}
              data-testid={`stat-card-${index}`}
            >
              <motion.div
                className={styles.iconBadge}
                style={{ background: `linear-gradient(135deg, ${stat.color} 0%, ${stat.color}CC 100%)` }}
                whileHover={{ scale: 1.1, rotate: 10 }}
              >
                <stat.icon size={24} />
              </motion.div>
              
              <motion.h3
                className={styles.value}
                style={{ color: stat.color }}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
              >
                <AnimatedCounter value={stat.value} prefix={stat.prefix} suffix={stat.suffix} />
              </motion.h3>
              
              <p className={styles.label}>{stat.label}</p>
              
              <div className={styles.progressBar}>
                <motion.div
                  className={styles.progressFill}
                  style={{ background: stat.color }}
                  initial={{ width: 0 }}
                  whileInView={{ width: "100%" }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + index * 0.1, duration: 1, ease: "easeOut" }}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
