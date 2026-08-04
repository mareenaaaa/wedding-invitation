import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './Reception.module.css';

gsap.registerPlugin(ScrollTrigger);

export default function Reception() {
  const sectionRef = useRef(null);
  const bgRef = useRef(null);
  const titleRef = useRef(null);
  
  // Refs for cards and their internal elements
  const cardsRef = useRef([]);
  const iconRefs = useRef([]);
  const contentRefs = useRef([]);
  const mapRef = useRef(null);

  const mapUrl = "https://maps.google.com/maps?q=Paurastya%20Suvishesha%20Samajam,%20Athithi%20Mandhiram%20Convention%20Hall,%20Ayakkadu&t=&z=15&ie=UTF8&iwloc=&output=embed";
  const mapLink = "https://maps.app.goo.gl/AqMjAkBrMDKAT5qH8";

  useEffect(() => {
    // Background Parallax
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
    let tl = gsap.timeline({ paused: true });

    // Initial Hidden States
    gsap.set(titleRef.current, { opacity: 0, y: -30 });
    gsap.set(cardsRef.current, { opacity: 0, y: 50, scale: 0.95 });
    gsap.set(iconRefs.current, { opacity: 0, y: -20, scale: 0.5 });
    gsap.set(contentRefs.current, { opacity: 0, y: 20 });
    if (mapRef.current) gsap.set(mapRef.current, { scale: 0.9, opacity: 0 });

    // 1. Background slowly fades in
    tl.fromTo(bgRef.current, { opacity: 0.5 }, {
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
    }, '-=1.0');

    // 3. Staggered reveal of Cards
    cardsRef.current.forEach((card, index) => {
      // Card appears
      tl.to(card, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 1,
        ease: 'power4.out'
      }, index === 0 ? '-=0.5' : '-=0.8');

      // Icon drops / animates
      tl.to(iconRefs.current[index], {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.8,
        ease: 'elastic.out(1, 0.5)' // Bounce/Ripple effect
      }, '-=0.6');

      // Map zooms in for the Venue card (index 1)
      if (index === 1 && mapRef.current) {
        tl.to(mapRef.current, {
          scale: 1,
          opacity: 1,
          duration: 1.2,
          ease: 'power3.out'
        }, '-=0.5');
      }

      // Text content fades up
      tl.to(contentRefs.current[index], {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out'
      }, '-=0.7');
    });

    // Add CSS class for shimmer effect on title after reveal
    tl.call(() => {
      if (titleRef.current) {
        titleRef.current.classList.add(styles.shimmerEffect);
      }
    });

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          tl.play();
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
      tl.kill();
      observer.disconnect();
    };
  }, []);

  return (
    <section ref={sectionRef} className={`section ${styles.reception}`}>
      {/* Cinematic Background */}
      <div ref={bgRef} className={styles.bgContainer}>
        <div className={styles.bgOverlay}></div>
      </div>

      {/* Background Life: Bokeh, Fairy Lights, Petals */}
      <div className={styles.particlesContainer}>
        {[...Array(15)].map((_, i) => (
          <div key={`bokeh-${i}`} className={styles.bokeh} style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 5}s`,
            animationDuration: `${10 + Math.random() * 10}s`
          }}></div>
        ))}
        {[...Array(15)].map((_, i) => (
          <div key={`petal-${i}`} className={styles.petal} style={{
            left: `${Math.random() * 100}%`,
            top: `${-10 + Math.random() * 20}%`,
            animationDelay: `${Math.random() * 5}s`,
            animationDuration: `${8 + Math.random() * 8}s`
          }}></div>
        ))}
      </div>

      <div className={styles.contentWrapper}>
        <h2 ref={titleRef} className={`${styles.sectionTitle} script-text`}>Reception Details</h2>
        
        <div className={styles.cardsContainer}>
          {/* Date Card */}
          <div ref={el => cardsRef.current[0] = el} className={styles.glassCard}>
            <div ref={el => iconRefs.current[0] = el} className={styles.iconWrapper}>
              <span className={styles.icon}>📅</span>
            </div>
            <div ref={el => contentRefs.current[0] = el} className={styles.cardContent}>
              <h3 className={styles.cardTitle}>Date</h3>
              <p className={styles.cardDetail}>Monday</p>
              <p className={styles.cardHighlight}>24 August 2026</p>
            </div>
          </div>

          {/* Venue Card with Interactive Map */}
          <div ref={el => cardsRef.current[1] = el} className={`${styles.glassCard} ${styles.venueCard}`}>
            <div ref={el => iconRefs.current[1] = el} className={styles.iconWrapper}>
              <span className={styles.icon}>📍</span>
            </div>
            
            <div ref={el => contentRefs.current[1] = el} className={styles.cardContent}>
              <h3 className={styles.cardTitle}>Venue</h3>
              
              <div ref={mapRef} className={styles.mapContainer}>
                <iframe 
                  src={mapUrl}
                  width="100%" 
                  height="100%" 
                  style={{ border: 0 }} 
                  allowFullScreen="" 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Reception Venue Map"
                  className={styles.mapIframe}
                ></iframe>
              </div>
              
              <div className={styles.buttonsContainer}>
                <a href={mapLink} target="_blank" rel="noopener noreferrer" className={styles.actionBtn}>
                  <span className={styles.btnIcon}>📍</span> Get Directions
                </a>
                <a href={mapLink} target="_blank" rel="noopener noreferrer" className={`${styles.actionBtn} ${styles.outlineBtn}`}>
                  <span className={styles.btnIcon}>📱</span> Open in Maps
                </a>
              </div>
              
              <div className={styles.addressSection}>
                <p className={styles.cardDetail}>Paurastya Suvishesha Samajam</p>
                <p className={styles.cardHighlight}>Athithi Mandhiram Convention Hall</p>
                <p className={styles.cardDetail}>Ayakkadu</p>
              </div>
            </div>
          </div>

          {/* Time Card */}
          <div ref={el => cardsRef.current[2] = el} className={styles.glassCard}>
            <div ref={el => iconRefs.current[2] = el} className={styles.iconWrapper}>
              <span className={styles.icon}>🕒</span>
            </div>
            <div ref={el => contentRefs.current[2] = el} className={styles.cardContent}>
              <h3 className={styles.cardTitle}>Time</h3>
              <p className={styles.cardDetail}>Reception</p>
              <p className={styles.cardHighlight}>From 5.30 PM</p>
              <p className={styles.cardDetail}>Till 8.30 PM</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
