import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './Ceremony.module.css';

gsap.registerPlugin(ScrollTrigger);

export default function Ceremony() {
  const sectionRef = useRef(null);
  const bgRef = useRef(null);
  const titleRef = useRef(null);
  const cardRef = useRef(null);
  
  // Refs for staggered reveals
  const iconRefs = useRef([]);
  const textGroupRefs = useRef([]);

  useEffect(() => {
    // Parallax on background for scroll exit
    gsap.to(bgRef.current, {
      yPercent: 30,
      ease: "none",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top bottom", 
        end: "bottom top",
        scrub: true
      }
    });

    // Main entrance timeline
    let tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 75%',
      }
    });

    // Initial Hidden States
    gsap.set(bgRef.current, { opacity: 0 });
    gsap.set(titleRef.current, { opacity: 0, y: -30 });
    gsap.set(cardRef.current, { opacity: 0, y: 50, scale: 0.95 });
    gsap.set(iconRefs.current, { opacity: 0, y: -20 });
    gsap.set(textGroupRefs.current, { opacity: 0, y: 20 });

    // 1. Temple slowly fades into view
    tl.to(bgRef.current, {
      opacity: 1,
      duration: 2,
      ease: 'power2.inOut'
    })
    // 2. Title animates
    .to(titleRef.current, {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: 'power3.out'
    }, '-=1.0')
    // 3. Card fades and scales up
    .to(cardRef.current, {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 1.2,
      ease: 'power4.out'
    }, '-=0.5');

    // 4. Staggered reveal of icons and text
    iconRefs.current.forEach((icon, index) => {
      // Icon drops with bounce
      tl.to(icon, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'bounce.out'
      }, `-=0.6`);
      
      // Text fades up with stagger
      tl.to(textGroupRefs.current[index], {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out'
      }, `-=0.6`);
    });

    // Add CSS class for shimmer effect on title after reveal
    tl.call(() => {
      if (titleRef.current) {
        titleRef.current.classList.add(styles.shimmerEffect);
      }
    });

    // Background Parallax continues, but we don't fade the card out anymore.
    // The details will stay fully visible and full size.

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
      tl.kill();
    };
  }, []);

  return (
    <section ref={sectionRef} className={`section ${styles.ceremony}`}>
      {/* Background Image Container */}
      <div ref={bgRef} className={styles.bgContainer}>
        <div className={styles.bgOverlay}></div>
      </div>

      {/* Background Particles: Petals */}
      <div className={styles.particlesContainer}>
        {[...Array(15)].map((_, i) => (
          <div key={i} className={styles.petal} style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 5}s`,
            animationDuration: `${8 + Math.random() * 8}s`
          }}></div>
        ))}
      </div>

      {/* Distant Birds */}
      <div className={styles.birdsContainer}>
        {[...Array(3)].map((_, i) => (
          <div key={i} className={styles.bird} style={{
            top: `${10 + Math.random() * 20}%`,
            animationDelay: `${Math.random() * 10}s`,
            animationDuration: `${15 + Math.random() * 10}s`
          }}></div>
        ))}
      </div>

      <div className={styles.contentWrapper}>
        <h2 ref={titleRef} className={`${styles.title} script-text`}>Wedding Ceremony</h2>
        
        <div ref={cardRef} className={styles.glassCard}>
          <div className={styles.details}>
            {/* Calendar */}
            <div className={styles.row}>
              <span ref={el => iconRefs.current[0] = el} className={styles.icon}>📅</span>
              <div ref={el => textGroupRefs.current[0] = el} className={styles.textGroup}>
                <p className={styles.text}>Sunday, 23 August 2026</p>
              </div>
            </div>
            
            {/* Clock */}
            <div className={styles.row}>
              <span ref={el => iconRefs.current[1] = el} className={styles.icon}>🕒</span>
              <div ref={el => textGroupRefs.current[1] = el} className={styles.textGroup}>
                <span className={styles.label}>Muhurtham</span>
                <p className={styles.text}>11:45 A.M. – 12:10 P.M.</p>
              </div>
            </div>
            
            {/* Location */}
            <div className={styles.row}>
              <span ref={el => iconRefs.current[2] = el} className={styles.icon}>📍</span>
              <div ref={el => textGroupRefs.current[2] = el} className={styles.textGroup}>
                <span className={styles.label}>Venue</span>
                <p className={styles.text}>Kadalayi Sreekrishna Temple</p>
                <p className={styles.subtext}>Chirakkal, Kannur</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
