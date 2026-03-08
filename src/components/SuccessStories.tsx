"use client";

import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import styles from "./SuccessStories.module.css";

const stories = [
  {
    name: "Aarav Patel",
    role: "Community Educator",
    text: "Thanks to HelpSphere's campaign, we were able to provide books and materials to 50 village children. Transparency gives donors confidence.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    rating: 5
  },
  {
    name: "Meera Reddy",
    role: "Medical Volunteer",
    text: "Volunteering through this platform changed my perspective. I could immediately see where my help was needed the most, without any paperwork.",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face",
    rating: 5
  },
  {
    name: "Rohan Sharma",
    role: "Regular Donor",
    text: "Being able to track every rupee I donated to the final recipient makes HelpSphere truly revolutionary.",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    rating: 5
  }
];

export default function SuccessStories() {
  return (
    <section className={styles.container} id="stories" data-testid="success-stories-section">
      <div className={styles.bgPattern} />
      
      <div className={styles.content}>
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <span className={styles.sectionTag} data-testid="stories-tag">Testimonials</span>
          <h2 className={styles.title} data-testid="stories-title">Real People, Real Impact</h2>
          <p className={styles.subtitle}>
            Discover the stories of lives changed by our verified campaigns and dedicated volunteers.
          </p>
        </motion.div>

        <div className={styles.grid}>
          {stories.map((story, index) => (
            <motion.div
              key={index}
              className={styles.storyCard}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15, duration: 0.5 }}
              whileHover={{ y: -8 }}
              data-testid={`testimonial-card-${index}`}
            >
              <div className={styles.cardTop}>
                <Quote className={styles.quoteIcon} />
                <div className={styles.stars}>
                  {[...Array(story.rating)].map((_, i) => (
                    <Star key={i} size={18} fill="#E8B66B" color="#E8B66B" />
                  ))}
                </div>
              </div>
              
              <p className={styles.text}>&ldquo;{story.text}&rdquo;</p>
              
              <div className={styles.profile}>
                <img 
                  src={story.image} 
                  alt={story.name} 
                  className={styles.avatar}
                  data-testid={`testimonial-avatar-${index}`}
                />
                <div className={styles.profileInfo}>
                  <h4 className={styles.name}>{story.name}</h4>
                  <p className={styles.role}>{story.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
