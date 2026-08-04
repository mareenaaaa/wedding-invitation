import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { GlassWater, Heart, Sparkles } from 'lucide-react';
import styles from './About.module.css';

const About = () => {
  const sectionRef = useRef(null);
  
  useEffect(() => {
    const el = sectionRef.current;
    
    // Animate title and text
    gsap.fromTo(el.querySelectorAll('.animate-text'),
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        stagger: 0.2,
        scrollTrigger: {
          trigger: el,
          start: "top 80%",
        }
      }
    );

    // Animate cards
    gsap.fromTo(el.querySelectorAll('.about-card'),
      { y: 50, opacity: 0, rotationY: -15 },
      {
        y: 0,
        opacity: 1,
        rotationY: 0,
        duration: 1.2,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: '.about-cards-container',
          start: "top 75%",
        }
      }
    );
  }, []);

  const cards = [
    {
      icon: <Heart size={32} />,
      title: "The Union",
      desc: "Join us as we celebrate the beautiful union of two souls embarking on a journey of a lifetime."
    },
    {
      icon: <GlassWater size={32} />,
      title: "The Celebration",
      desc: "An evening filled with joy, laughter, fine dining, and dancing under the stars."
    },
    {
      icon: <Sparkles size={32} />,
      title: "The Memories",
      desc: "Create unforgettable moments with friends and family in a breathtakingly luxurious setting."
    }
  ];

  return (
    <section ref={sectionRef} className="section" id="about">
      <div className={styles.header}>
        <h2 className="animate-text">Join Us</h2>
        <p className={`animate-text ${styles.subtitle}`}>
          We invite you to share in our joy and celebrate a day we will cherish forever. 
          Expect a day filled with tradition, blessings, and boundless love.
        </p>
      </div>

      <div className={`about-cards-container ${styles.cardsContainer}`}>
        {cards.map((card, index) => (
          <div key={index} className={`about-card glass-panel ${styles.card}`}>
            <div className={styles.iconWrapper}>
              {card.icon}
            </div>
            <h3>{card.title}</h3>
            <p>{card.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default About;
