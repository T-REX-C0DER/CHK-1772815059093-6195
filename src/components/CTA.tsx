"use client";

import { motion } from "framer-motion";
import { Heart, Users, ArrowRight, Sparkles } from "lucide-react";
import styles from "./CTA.module.css";

export default function CTA() {
  return (
    <section className={styles.container} data-testid="cta-section">
      {/* Decorative elements */}
      <div className={styles.glowEffect} />
      <div className={styles.gridPattern} />
      
      <motion.div
        className={styles.contentWrapper}
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.7 }}
      >
        {/* Left Image */}
        <motion.div
          className={styles.imageCol}
          initial={{ opacity: 0, x: -30, rotate: -5 }}
          whileInView={{ opacity: 1, x: 0, rotate: -3 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <img 
            src="https://images.unsplash.com/photo-1708417148451-addac93f0b67?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA2ODl8MHwxfHNlYXJjaHw0fHx2b2x1bnRlZXJzJTIwaGVscGluZyUyMGNvbW11bml0eSUyMGluZGlhJTIwY2hhcml0eXxlbnwwfHx8fDE3NzI5MTY0OTh8MA&ixlib=rb-4.1.0&q=85" 
            alt="स्वयंसेवक कार्रवाई में" 
            className={styles.ctaImage}
            data-testid="cta-image-1"
          />
        </motion.div>
        
        {/* Center Content */}
        <motion.div
          className={styles.content}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <motion.div
            className={styles.iconBadge}
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
          >
            <Sparkles size={32} />
          </motion.div>
          
          <h2 className={styles.title} data-testid="cta-title">
            आज किसी की मुस्कान का<br />कारण बनें
          </h2>
          
          <p className={styles.subtitle} data-testid="cta-subtitle">
            हज़ारों दानदाताओं और स्वयंसेवकों से जुड़ें जो दुनिया भर में पारदर्शी और सार्थक प्रभाव बना रहे हैं।
          </p>
          
          <div className={styles.buttonGroup}>
            <motion.button
              className={`btn btn-white ${styles.primaryBtn}`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              data-testid="cta-donate-btn"
            >
              <Heart size={20} />
              अभी दान करें
              <ArrowRight size={18} />
            </motion.button>
            
            <motion.button
              className={`btn btn-outline-white ${styles.secondaryBtn}`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              data-testid="cta-volunteer-btn"
            >
              <Users size={20} />
              स्वयंसेवक बनें
            </motion.button>
          </div>
        </motion.div>

        {/* Right Image */}
        <motion.div
          className={styles.imageCol}
          initial={{ opacity: 0, x: 30, rotate: 5 }}
          whileInView={{ opacity: 1, x: 0, rotate: 3 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <img 
            src="https://images.unsplash.com/photo-1740065592719-052d3e5ec6fb?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA1NTJ8MHwxfHNlYXJjaHwzfHxkaXZlcnNlJTIwcGVvcGxlJTIwdGVhbXdvcmslMjBoYW5kcyUyMHRvZ2V0aGVyfGVufDB8fHx8MTc3MjkxNjQ5OXww&ixlib=rb-4.1.0&q=85" 
            alt="मदद के हाथ" 
            className={styles.ctaImage}
            data-testid="cta-image-2"
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
