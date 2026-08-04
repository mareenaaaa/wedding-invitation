import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './Location.module.css';

gsap.registerPlugin(ScrollTrigger);

export default function Location() {
  const sectionRef = useRef(null);
  const cardRef = useRef(null);
  const mapRef = useRef(null);
  
  const mapUrl = "https://maps.google.com/maps?q=Paurastya%20Suvishesha%20Samajam,%20Athithi%20Mandhiram%20Convention%20Hall,%20Ayakkadu&t=&z=15&ie=UTF8&iwloc=&output=embed";
  const mapLink = "https://maps.app.goo.gl/AqMjAkBrMDKAT5qH8";

  useEffect(() => {
    let tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 75%',
      }
    });

    gsap.set(cardRef.current, { opacity: 0, y: 30 });
    gsap.set(mapRef.current, { scale: 0.95, opacity: 0 });

    tl.to(cardRef.current, {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: 'power3.out'
    })
    .to(mapRef.current, {
      scale: 1,
      opacity: 1,
      duration: 1.2,
      ease: 'power3.out'
    }, '-=0.5');

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <section ref={sectionRef} className={`section ${styles.location}`}>
      {/* Floating Particles */}
      <div className={styles.particlesContainer}>
        {[...Array(12)].map((_, i) => (
          <div key={i} className={styles.particle} style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 5}s`,
            animationDuration: `${6 + Math.random() * 6}s`
          }}></div>
        ))}
      </div>

      <div ref={cardRef} className={`glass-panel ${styles.mapCard}`}>
        <div className={styles.pinIcon}>📍</div>
        
        <h2 className={styles.title}>Reception Venue</h2>
        
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
            <span className={styles.btnIcon}>📱</span> Open in Google Maps
          </a>
        </div>
        
        <div className={styles.addressSection}>
          <p className={styles.address}>
            Paurastya Suvishesha Samajam<br />
            Athithi Mandhiram Convention Hall<br />
            Ayakkadu
          </p>
        </div>
      </div>
    </section>
  );
}
