import React, { useEffect } from 'react';
import gsap from 'gsap';
import { ArrowDown } from 'lucide-react';
import styles from './Hero.module.css';

const Hero = () => {
  useEffect(() => {
    // Content fade in
    gsap.fromTo('.hero-content > *', 
      { y: 30, opacity: 0 },
      { 
        y: 0, 
        opacity: 1, 
        duration: 1.2, 
        stagger: 0.15, 
        ease: "power3.out",
        delay: 0.5
      }
    );
  }, []);

  return (
    <section className={`hero-container ${styles.container}`}>
      <div className={`hero-content ${styles.content}`}>
        
        <div className={styles.ganesha}>
          {/* Placeholder for Ganesha Icon */}
          <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="var(--color-maroon)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 2a8 8 0 0 0-8 8c0 3 2.5 5 4 7s2 6 2 6h4s0-4 2-6 4-4 4-7a8 8 0 0 0-8-8z"/>
            <path d="M9 14a3 3 0 0 0 6 0"/>
            <circle cx="9" cy="10" r="1" fill="var(--color-maroon)"/>
            <circle cx="15" cy="10" r="1" fill="var(--color-maroon)"/>
          </svg>
        </div>

        <div className={styles.hosts}>
          <h3>Mr. Ajith Kumar P. B. & Mrs. Bindu Ajith</h3>
          <p>Pullattu House, Ayakkadu,<br/>Kothamangalam, Ernakulam</p>
        </div>
        
        <div className={styles.invitationText}>
          <p>Cordially invite your esteemed presence<br/>with family to grace the</p>
          <h4 className={styles.eventHighlight}>WEDDING RECEPTION</h4>
          <p className={styles.beloved}>of our beloved son</p>
        </div>
        
        <div className={styles.coupleNames}>
          <h1 className="script-text">Anandu Ajith</h1>
          <p className={styles.parentsText}>
            (G. S/o. Late G. Balakrishnan Nair & Late Thankamani C. R.<br/>
            and Mr. Narayanan Nair & Mrs. Omaanamma)
          </p>
          
          <div className={styles.withText}>with</div>
          
          <h1 className="script-text">Shyba K. V. (Ajala)</h1>
          <p className={styles.parentsText}>
            D/o. Mr. Sailendran P. P. & Mrs. Bindu K. V.<br/>
            (G. D/o. Late T. P. Vijayan & Late P. P. Santhakumari<br/>
            and Late P. V. Govindan Nambiar & Mrs. V. V. Valliamma)
          </p>
        </div>

        <div className={styles.actions}>
          <button className="btn-gold" onClick={() => document.getElementById('details').scrollIntoView()}>Event Details</button>
        </div>
      </div>
      
      <div className={styles.scrollIndicator}>
        <ArrowDown className="animate-float" size={32} />
      </div>
    </section>
  );
};

export default Hero;
