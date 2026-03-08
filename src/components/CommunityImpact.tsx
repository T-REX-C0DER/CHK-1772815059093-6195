"use client";

import { motion } from "framer-motion";
import styles from "./CommunityImpact.module.css";

const impactItems = [
  {
    title: "Food Distribution",
    stat: "1,200 Meals Served",
    image: "https://images.unsplash.com/photo-1708670295755-dd2dd643af85?crop=entropy&cs=srgb&fm=jpg&w=600&q=80",
    span: "large"
  },
  {
    title: "Education Support",
    stat: "New Library Built",
    image: "https://images.unsplash.com/photo-1567057419565-4349c49d8a04?crop=entropy&cs=srgb&fm=jpg&w=600&q=80",
    span: "wide"
  },
  {
    title: "Medical Camp",
    stat: "500+ Checkups",
    image: "https://images.unsplash.com/photo-1589104759909-e355f8999f7e?crop=entropy&cs=srgb&fm=jpg&w=600&q=80",
    span: "normal"
  },
  {
    title: "Skill Training",
    stat: "Empowering Youth",
    image: "https://images.unsplash.com/photo-1616680214429-d79397e56688?crop=entropy&cs=srgb&fm=jpg&w=600&q=80",
    span: "normal"
  }
];

export default function CommunityImpact() {
  return (
    <section className={styles.container} id="volunteer" data-testid="community-impact-section">
      <div className={styles.content}>
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <span className={styles.sectionTag} data-testid="community-tag">Community</span>
          <h2 className={styles.title} data-testid="community-title">Community in Action</h2>
          <p className={styles.subtitle}>
            See the real work happening on the ground.
          </p>
        </motion.div>

        <div className={styles.masonryGrid}>
          {impactItems.map((item, index) => (
            <motion.div
              key={index}
              className={`${styles.gridItem} ${styles[item.span]}`}
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{ y: -8, scale: 1.02 }}
              data-testid={`impact-item-${index}`}
            >
              <img src={item.image} alt={item.title} className={styles.itemImage} />
              <div className={styles.imageOverlay}>
                <h4>{item.title}</h4>
                <p>{item.stat}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
