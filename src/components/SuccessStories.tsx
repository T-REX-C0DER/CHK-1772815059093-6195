"use client";

import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import styles from "./SuccessStories.module.css";

const stories = [
  {
    name: "आरव पटेल",
    role: "समुदाय शिक्षक",
    text: "HelpSphere के अभियान की बदौलत, हम 50 गाँव के बच्चों को किताबें और सामग्री प्रदान करने में सक्षम हुए। पारदर्शिता दानदाताओं को विश्वास देती है।",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    rating: 5
  },
  {
    name: "मीरा रेड्डी",
    role: "चिकित्सा स्वयंसेवक",
    text: "इस मंच के माध्यम से स्वयंसेवा ने मेरा नज़रिया बदल दिया। मैं तुरंत देख सकती थी कि मेरी मदद की सबसे ज़्यादा ज़रूरत कहाँ है, बिना किसी कागजी कार्रवाई के।",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face",
    rating: 5
  },
  {
    name: "रोहन शर्मा",
    role: "नियमित दानदाता",
    text: "मेरे द्वारा दान किए गए हर रुपये को अंतिम प्राप्तकर्ता तक ट्रैक करने में सक्षम होना HelpSphere को वास्तव में क्रांतिकारी बनाता है।",
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
          <span className={styles.sectionTag} data-testid="stories-tag">प्रशंसापत्र</span>
          <h2 className={styles.title} data-testid="stories-title">वास्तविक लोग, वास्तविक प्रभाव</h2>
          <p className={styles.subtitle}>
            हमारे सत्यापित अभियानों और समर्पित स्वयंसेवकों द्वारा बदले गए जीवन की कहानियाँ खोजें।
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
