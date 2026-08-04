import React, { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import styles from './EnvelopeIntro.module.css';
import envelopeImg from '../../assets/envelope_closed.png';

export default function EnvelopeIntro({ onOpenComplete }) {
  const containerRef = useRef(null);
  const envelopeRef = useRef(null);
  const letterRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = 'hidden';

    // Subtle idle floating animation
    gsap.to(envelopeRef.current, {
      y: -8,
      duration: 2.5,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut'
    });

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  const handleOpen = () => {
    if (isOpen) return;
    setIsOpen(true);

    const tl = gsap.timeline({
      onComplete: () => {
        if (onOpenComplete) onOpenComplete();
      }
    });

    // Simple elegant fade out — go directly to website
    tl.to(containerRef.current, {
      opacity: 0,
      scale: 1.05,
      duration: 0.8,
      ease: 'power2.inOut'
    });
  };

  return (
    <div ref={containerRef} className={styles.introContainer} onClick={handleOpen}>
      <div ref={envelopeRef} className={styles.envelopeWrapper}>
        
        {/* The full envelope image split into top and bottom */}
        <div className={styles.envelopeImageContainer}>
          {/* Top half — this flips open */}
          <div className={styles.topHalf}>
            <img src={envelopeImg} alt="Envelope" className={styles.envelopeImage} 
                 style={{ objectPosition: 'top' }} />
          </div>
          {/* Bottom half — stays in place */}
          <div className={styles.bottomHalf}>
            <img src={envelopeImg} alt="Envelope" className={styles.envelopeImage} 
                 style={{ objectPosition: 'bottom' }} />
          </div>
        </div>

        {/* Letter that slides out */}
        <div ref={letterRef} className={styles.letter}>
          <div className={styles.letterContent}>
            <p className={styles.letterScript}>You are Invited</p>
            <p className={styles.letterNames}>Anandu & Shyba</p>
          </div>
        </div>
      </div>

      {/* Click Prompt */}
      {!isOpen && (
        <p className={styles.clickPrompt}>Tap to Open</p>
      )}
    </div>
  );
}
