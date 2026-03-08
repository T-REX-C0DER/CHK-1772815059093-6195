"use client";

import { motion } from "framer-motion";
import { CheckCircle, Heart, ArrowRight, Clock } from "lucide-react";
import styles from "./CampaignDiscovery.module.css";

const campaigns = [
  {
    ngo: "WaterAid India",
    verified: true,
    title: "Clean Water for 500 Villages",
    description: "Providing sustainable water solutions to drought-hit rural communities across Rajasthan.",
    raised: "₹8.2L",
    goal: "₹12L",
    progress: 68,
    donors: 892,
    daysLeft: 18,
    image: "https://images.unsplash.com/photo-1541544741938-0af808871cc0?w=600&h=400&fit=crop",
    category: "Water & Sanitation",
  },
  {
    ngo: "Pratham Foundation",
    verified: true,
    title: "Digital Classrooms for Rural Schools",
    description: "Setting up smart classrooms with tablets and internet in 50 rural schools.",
    raised: "₹15.4L",
    goal: "₹20L",
    progress: 77,
    donors: 1543,
    daysLeft: 12,
    image: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=600&h=400&fit=crop",
    category: "Education",
  },
  {
    ngo: "Feeding India",
    verified: true,
    title: "Zero Hunger Community Kitchen",
    description: "Operating community kitchens to serve 1,000 daily meals to underprivileged families.",
    raised: "₹5.8L",
    goal: "₹8L",
    progress: 72,
    donors: 634,
    daysLeft: 24,
    image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=600&h=400&fit=crop",
    category: "Food & Nutrition",
  },
];

export default function CampaignDiscovery() {
  return (
    <section className={styles.section} id="campaigns" data-testid="campaign-section">
      <div className={styles.container}>
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
        >
          <span className={styles.tag}>Campaigns</span>
          <h2 className={styles.title}>Discover Verified Campaigns</h2>
          <p className={styles.subtitle}>
            Every campaign is thoroughly vetted. Choose a cause and make a real difference today.
          </p>
        </motion.div>

        <div className={styles.grid}>
          {campaigns.map((campaign, index) => (
            <motion.div
              key={index}
              className={styles.card}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.12, duration: 0.5 }}
              whileHover={{ y: -8 }}
              data-testid={`campaign-card-${index}`}
            >
              <div className={styles.imageWrapper}>
                <img src={campaign.image} alt={campaign.title} className={styles.image} />
                <span className={styles.category}>{campaign.category}</span>
              </div>

              <div className={styles.cardBody}>
                <div className={styles.ngoRow}>
                  <span className={styles.ngoName}>{campaign.ngo}</span>
                  {campaign.verified && (
                    <span className={styles.verifiedBadge}>
                      <CheckCircle size={13} />
                      Verified
                    </span>
                  )}
                </div>

                <h3 className={styles.campaignTitle}>{campaign.title}</h3>
                <p className={styles.campaignDesc}>{campaign.description}</p>

                <div className={styles.progressSection}>
                  <div className={styles.progressBar}>
                    <motion.div
                      className={styles.progressFill}
                      initial={{ width: 0 }}
                      whileInView={{ width: `${campaign.progress}%` }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.3, duration: 1, ease: "easeOut" }}
                    />
                  </div>
                  <div className={styles.progressInfo}>
                    <span className={styles.raised}>{campaign.raised} raised</span>
                    <span className={styles.goal}>of {campaign.goal}</span>
                  </div>
                </div>

                <div className={styles.cardFooter}>
                  <div className={styles.meta}>
                    <span><Heart size={13} /> {campaign.donors}</span>
                    <span><Clock size={13} /> {campaign.daysLeft} days left</span>
                  </div>
                  <motion.button
                    className={styles.donateBtn}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    Donate
                    <ArrowRight size={14} />
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          className={styles.viewAll}
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <motion.button
            className={`btn btn-secondary`}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
          >
            View All Campaigns
            <ArrowRight size={16} />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
