import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import styles from './Timeline.module.css';

const Timeline = () => {
  const sectionRef = useRef(null);
  const lineRef = useRef(null);

  const events = [
    {
      time: "11:45 AM",
      title: "Wedding Ceremony",
      desc: "Muhurtham at Kadalayi Sreekrishna Temple, Chirakkal, Kannur."
    },
    {
      time: "12:30 PM",
      title: "Traditional Feast",
      desc: "Join us for a traditional Sadhya following the ceremony."
    },
    {
      time: "5:30 PM",
      title: "Wedding Reception",
      desc: "Evening reception and party at Paurastya Suvishesha Samajam Athithi Mandhiram."
    },
    {
      time: "8:30 PM",
      title: "Celebration Concludes",
      desc: "Thank you for sharing our special day with us."
    }
  ];

  useEffect(() => {
    const el = sectionRef.current;
    const items = el.querySelectorAll('.timeline-item');
    
    // Animate the line drawing down
    gsap.fromTo(lineRef.current,
      { scaleY: 0 },
      {
        scaleY: 1,
        ease: "none",
        scrollTrigger: {
          trigger: el,
          start: "top 60%",
          end: "bottom 80%",
          scrub: 1
        }
      }
    );

    // Animate each item
    items.forEach((item, index) => {
      const direction = index % 2 === 0 ? 50 : -50;
      gsap.fromTo(item,
        { x: direction, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: item,
            start: "top 85%",
          }
        }
      );
    });
  }, []);

  return (
    <section ref={sectionRef} className={`section ${styles.container}`} id="timeline">
      <h2 className={styles.title}>Event Timeline</h2>
      
      <div className={styles.timelineWrapper}>
        <div ref={lineRef} className={styles.timelineLine}></div>
        
        {events.map((event, index) => (
          <div key={index} className={`timeline-item ${styles.item} ${index % 2 === 0 ? styles.left : styles.right}`}>
            <div className={styles.dot}></div>
            <div className={`glass-panel ${styles.content}`}>
              <span className={styles.time}>{event.time}</span>
              <h3>{event.title}</h3>
              <p>{event.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Timeline;
