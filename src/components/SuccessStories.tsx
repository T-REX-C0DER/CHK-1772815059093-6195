import styles from "./SuccessStories.module.css";

const stories = [
  {
    name: "Aarav Patel",
    role: "Community Teacher",
    text: "Thanks to the campaign on HelpSphere, we were able to provide books and supplies for 50 village children. The transparency gives donors confidence.",
    imageColor: "#E6B8A2",
    rating: 5
  },
  {
    name: "Meera Reddy",
    role: "Medical Volunteer",
    text: "Volunteering through this platform changed my perspective. I could instantly see where my help was needed the most, without bureaucracy.",
    imageColor: "#D8A48F",
    rating: 5
  },
  {
    name: "Rohan Sharma",
    role: "Regular Donor",
    text: "Being able to track every rupee I donate until it reaches the end recipient is what makes HelpSphere truly revolutionary.",
    imageColor: "#C97C5D",
    rating: 5
  }
];

export default function SuccessStories() {
  return (
    <section className={styles.container} id="stories">
      <div className={styles.header}>
        <h2 className={styles.title}>Real People, Real Impact</h2>
        <p className={styles.subtitle}>Discover the stories of lives changed through our verified campaigns and dedicated volunteers.</p>
      </div>

      <div className={styles.grid}>
        {stories.map((story, index) => (
          <div key={index} className={`card-soft ${styles.storyCard}`}>
            <div className={styles.stars}>
              {"★".repeat(story.rating)}
            </div>
            <p className={styles.text}>"{story.text}"</p>
            <div className={styles.profile}>
              <div 
                className={styles.avatar} 
                style={{ backgroundColor: story.imageColor }}
              ></div>
              <div>
                <h4 className={styles.name}>{story.name}</h4>
                <p className={styles.role}>{story.role}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
