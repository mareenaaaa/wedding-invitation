import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { Calendar, Clock, MapPin } from 'lucide-react';
import styles from './EventDetails.module.css';

const EventDetails = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const el = sectionRef.current;
    
    gsap.fromTo(el.querySelectorAll('.event-block'),
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: el,
          start: "top 70%",
        }
      }
    );
  }, []);

  return (
    <section ref={sectionRef} className={`section ${styles.container}`} id="details">
      
      {/* Wedding Ceremony */}
      <div className={`event-block glass-panel ${styles.eventCard}`}>
        <h3 className={styles.eventTitle}>
          <span className={styles.titleDecoration}>~</span> Wedding Ceremony <span className={styles.titleDecoration}>~</span>
        </h3>
        
        <div className={styles.eventGrid}>
          <div className={styles.detailItem}>
            <Calendar className={styles.icon} size={24} />
            <div className={styles.detailText}>
              <strong>Sunday, 23 August 2026</strong>
            </div>
          </div>
          
          <div className={styles.detailItem}>
            <Clock className={styles.icon} size={24} />
            <div className={styles.detailText}>
              <span className={styles.label}>Muhurtham:</span>
              <strong>11:45 A.M. - 12:10 P.M.</strong>
            </div>
          </div>
          
          <div className={styles.detailItem}>
            <MapPin className={styles.icon} size={24} />
            <div className={styles.detailText}>
              <span className={styles.label}>Venue:</span>
              <strong>Kadalayi Sreekrishna Temple, Chirakkal, Kannur</strong>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.divider}></div>

      {/* Wedding Reception */}
      <div className={`event-block glass-panel-gold ${styles.eventCard}`}>
        <h3 className={styles.eventTitle}>
          <span className={styles.titleDecoration}>~</span> Wedding Reception <span className={styles.titleDecoration}>~</span>
        </h3>
        
        <div className={styles.eventGrid}>
          <div className={styles.detailItem}>
            <div className={styles.dateBlock}>
              <span className={styles.day}>MONDAY</span>
              <span className={styles.dateNumber}>24</span>
              <span className={styles.monthYear}>AUGUST 2026</span>
            </div>
          </div>
          
          <div className={styles.detailItem}>
            <MapPin className={styles.icon} size={32} />
            <div className={styles.detailTextCenter}>
              <span className={styles.label}>AT</span>
              <strong>Paurastya Suvishesha Samajam<br/>Athithi Mandhiram Convention Hall,<br/>Ayakkadu</strong>
            </div>
          </div>
          
          <div className={styles.detailItem}>
            <Clock className={styles.icon} size={32} />
            <div className={styles.detailTextCenter}>
              <span className={styles.label}>RECEPTION FROM</span>
              <strong>5.30 pm<br/>till 8.30 pm party</strong>
            </div>
          </div>
        </div>
      </div>

    </section>
  );
};

export default EventDetails;
