import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { Map, Navigation } from 'lucide-react';
import styles from './Venue.module.css';

const Venue = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    gsap.fromTo('.venue-content',
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
        }
      }
    );
  }, []);

  return (
    <section ref={sectionRef} className={`section ${styles.container}`} id="venue">
      <h2 className={styles.title}>The Venue</h2>
      
      <div className={`venue-content glass-panel ${styles.contentWrapper}`}>
        <div className={styles.mapContainer}>
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d193595.2528001097!2d-74.14482963383022!3d40.69766333423724!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24fa5d33f083b%3A0xc80b8f06e177fe62!2sNew%20York%2C%20NY%2C%20USA!5e0!3m2!1sen!2s!4v1700000000000!5m2!1sen!2s" 
            width="100%" 
            height="100%" 
            style={{ border: 0 }} 
            allowFullScreen="" 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
            title="Venue Map"
            className={styles.mapIframe}
          ></iframe>
        </div>
        
        <div className={styles.infoContainer}>
          <h3>The Royal Palace</h3>
          <p className={styles.address}>123 Grand Avenue, New York, NY 10001</p>
          
          <div className={styles.features}>
            <div className={styles.featureItem}>
              <strong>Parking:</strong> Valet parking available at the main entrance.
            </div>
            <div className={styles.featureItem}>
              <strong>Landmarks:</strong> Opposite the Central City Park, near the Grand Plaza.
            </div>
          </div>
          
          <div className={styles.actions}>
            <a href="https://maps.google.com" target="_blank" rel="noreferrer" className="btn-gold">
              <Navigation size={18} style={{ marginRight: '8px' }} />
              Get Directions
            </a>
            <a href="https://maps.google.com" target="_blank" rel="noreferrer" className="btn-outline">
              <Map size={18} style={{ marginRight: '8px' }} />
              Open in Maps
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Venue;
