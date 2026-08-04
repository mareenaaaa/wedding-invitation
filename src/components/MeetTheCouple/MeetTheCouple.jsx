import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './MeetTheCouple.module.css';

// Using the provided image for the couple placeholder
import coupleImg from '../../assets/hero_couple.png';

gsap.registerPlugin(ScrollTrigger);

export default function MeetTheCouple() {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const cardRef = useRef(null);

  useEffect(() => {
    let tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 75%',
      }
    });

    gsap.set(headingRef.current, { y: 30, opacity: 0 });
    gsap.set(cardRef.current, { y: 60, opacity: 0 });

    tl.to(headingRef.current, {
      y: 0,
      opacity: 1,
      duration: 0.8,
      ease: 'power3.out'
    })
    .to(cardRef.current, {
      y: 0,
      opacity: 1,
      duration: 1,
      ease: 'power3.out'
    }, '-=0.4');

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <section ref={sectionRef} className={`section ${styles.meetSection}`}>
      <h2 ref={headingRef} className={styles.heading}>Meet the Couple</h2>
      
      <div ref={cardRef} className={styles.photoCard}>
        <img src={coupleImg} alt="Anandu and Shyba" className={styles.photo} />
        <div className={styles.cardContent}>
          <h3 className={styles.names}>Anandu & Shyba</h3>
          <p className={styles.subtitle}>Together Forever</p>
        </div>
      </div>
    </section>
  );
}
