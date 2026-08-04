import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { Users, Mic, Camera, Trophy } from 'lucide-react';
import styles from './LiveStats.module.css';

const stats = [
  { icon: <Users />, target: 350, label: "Expected Guests" },
  { icon: <Mic />, target: 12, label: "Performers" },
  { icon: <Camera />, target: 4, label: "Photographers" },
  { icon: <Trophy />, target: 50, label: "Support Staff" }
];

const LiveStats = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const numbers = sectionRef.current.querySelectorAll('.stat-number');
    
    numbers.forEach((num, index) => {
      const target = stats[index].target;
      
      gsap.to(num, {
        innerHTML: target,
        duration: 2.5,
        snap: { innerHTML: 1 },
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        }
      });
    });

    gsap.fromTo(sectionRef.current.querySelectorAll('.stat-card'),
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        stagger: 0.15,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        }
      }
    );
  }, []);

  return (
    <section ref={sectionRef} className={`section ${styles.container}`} id="stats">
      <div className={styles.grid}>
        {stats.map((stat, index) => (
          <div key={index} className={`stat-card glass-panel ${styles.card}`}>
            <div className={styles.iconWrapper}>
              {stat.icon}
            </div>
            <div className={`stat-number ${styles.number}`}>0</div>
            <div className={styles.label}>{stat.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default LiveStats;
