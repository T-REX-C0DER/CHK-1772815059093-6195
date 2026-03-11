"use client";

import { motion } from "framer-motion";
import { MapPin, Bell, Home, Check, ArrowRight } from "lucide-react";
import styles from "./ShelterSupport.module.css";

const steps = [
  {
    icon: MapPin,
    title: "Report a Person in Need",
    description: "Quickly submit the location and details of a homeless person through the HelpSphere platform."
  },
  {
    icon: Bell,
    title: "NGOs Receive the Alert",
    description: "Nearby verified NGOs are instantly notified and review the request."
  },
  {
    icon: Home,
    title: "Shelter & Support Provided",
    description: "The NGO arranges safe shelter, food, and necessary care for the person."
  }
];

export default function ShelterSupport() {
  return (
    <section className={styles.container} id="shelter-support" data-testid="shelter-support-section">
      <div className={styles.content}>
        <div className={styles.grid}>
          {/* Left Side: Illustration / Image */}
          <motion.div 
            className={styles.imageSection}
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className={styles.imageWrapper}>
              <img 
                src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=1200&auto=format&fit=crop" 
                alt="Volunteer helping someone in need" 
                className={styles.mainImage}
              />
              
              {/* Overlay Card */}
              <motion.div 
                className={styles.floatingCard}
                initial={{ opacity: 0, y: 20, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5, duration: 0.5 }}
              >
                <div className={styles.cardHeader}>
                  <MapPin size={20} className={styles.pinIcon} />
                  <span className={styles.cardTitle}>Shelter Request Sent</span>
                </div>
                <div className={styles.cardInfo}>
                  <p>NGO Response Time: ~15 min</p>
                  <span className={styles.status}>Status: Processing</span>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Right Side: Content & Steps */}
          <div className={styles.contentSection}>
            <motion.div 
              className={styles.header}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className={styles.sectionTag}>Community Help</span>
              <h2 className={styles.title}>Help Someone Find a Safe Shelter</h2>
              <p className={styles.subtitle}>
                If you come across a homeless person, elderly individual, or child in need, 
                you can quickly report their location through HelpSphere. Our verified NGOs will respond 
                and arrange shelter and support.
              </p>
            </motion.div>

            <div className={styles.stepsColumn}>
              {steps.map((step, index) => (
                <motion.div 
                  key={index}
                  className={styles.stepCard}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + index * 0.1, duration: 0.5 }}
                >
                  <div className={styles.iconWrapper}>
                    <step.icon size={24} className={styles.stepIcon} />
                  </div>
                  <div className={styles.stepContent}>
                    <h3>{step.title}</h3>
                    <p>{step.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div 
              className={styles.ctaGroup}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6, duration: 0.5 }}
            >
              <button className="btn btn-primary">
                Report Someone in Need
                <ArrowRight size={18} />
              </button>
              <button className="btn btn-secondary">
                Learn How It Works
              </button>
            </motion.div>

            <motion.div 
              className={styles.trustBadge}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.8, duration: 0.5 }}
            >
              <div className={styles.badgeItem}>
                <Check size={16} className={styles.checkIcon} />
                <span>Powered by Verified NGOs</span>
              </div>
              <div className={styles.badgeItem}>
                <Check size={16} className={styles.checkIcon} />
                <span>Real-time Response System</span>
              </div>
              <div className={styles.badgeItem}>
                <Check size={16} className={styles.checkIcon} />
                <span>Helping Homeless People Across India</span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
