"use client";

import { motion } from "framer-motion";
import { MapPin, Calendar, Clock, ArrowRight, Briefcase, Zap } from "lucide-react";
import styles from "./VolunteerOpportunities.module.css";

const opportunities = [
  {
    title: "Weekend Teaching Support",
    ngo: "Pratham Education Foundation",
    location: "Mumbai, Maharashtra",
    duration: "4 hours / week",
    urgent: true,
    skills: ["Teaching", "English"],
    icon: Briefcase,
    color: "#D88A6F",
  },
  {
    title: "Medical Camp Assistant",
    ngo: "Red Cross Society",
    location: "Chennai, Tamil Nadu",
    duration: "Full Weekend",
    urgent: false,
    skills: ["First Aid", "Registration"],
    icon: Zap,
    color: "#5FAF8F",
  },
  {
    title: "Community Kitchen Help",
    ngo: "Feeding India",
    location: "Delhi, NCR",
    duration: "3 hours / day",
    urgent: true,
    skills: ["Cooking", "Distribution"],
    icon: Clock,
    color: "#D88A6F",
  },
];

export default function VolunteerOpportunities() {
  return (
    <section className={styles.section} id="volunteer" data-testid="volunteer-section">
      <div className={styles.container}>
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
        >
          <span className={styles.tag}>Volunteer</span>
          <h2 className={styles.title}>Make an Impact with Your Time</h2>
          <p className={styles.subtitle}>
            Discover meaningful volunteering opportunities near you and contribute your skills to verified causes.
          </p>
        </motion.div>

        <div className={styles.grid}>
          {opportunities.map((opp, index) => (
            <motion.div
              key={index}
              className={styles.card}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.12, duration: 0.5 }}
              whileHover={{ y: -8 }}
              data-testid={`volunteer-card-${index}`}
            >
              <div className={styles.cardHeader}>
                <div className={styles.iconBox} style={{ background: `${opp.color}10`, color: opp.color }}>
                  <opp.icon size={24} />
                </div>
                {opp.urgent && (
                  <span className={styles.urgentBadge}>Urgent</span>
                )}
              </div>

              <h3 className={styles.oppTitle}>{opp.title}</h3>
              <p className={styles.ngoName}>{opp.ngo}</p>

              <div className={styles.details}>
                <div className={styles.detailItem}>
                  <MapPin size={14} />
                  <span>{opp.location}</span>
                </div>
                <div className={styles.detailItem}>
                  <Calendar size={14} />
                  <span>{opp.duration}</span>
                </div>
              </div>

              <div className={styles.skillsWrap}>
                {opp.skills.map((skill, i) => (
                  <span key={i} className={styles.skillTag}>{skill}</span>
                ))}
              </div>

              <motion.button
                className={styles.applyBtn}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
              >
                Apply Now
                <ArrowRight size={14} />
              </motion.button>
            </motion.div>
          ))}
        </div>

        <motion.div
          className={styles.viewMore}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <button className="btn btn-secondary">Explore All Opportunities</button>
        </motion.div>
      </div>
    </section>
  );
}
