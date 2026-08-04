import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './Cover.module.css';

import heroCouple from '../../assets/hero_couple.png';

gsap.registerPlugin(ScrollTrigger);

// Helper to split text into animated spans
const SplitText = ({ text }) => {
  return (
    <span style={{ display: 'inline-block' }}>
      {text.split('').map((char, index) => (
        <span
          key={index}
          className="split-char"
          style={{ display: 'inline-block', opacity: 0 }}
        >
          {char === ' ' ? '\u00A0' : char}
        </span>
      ))}
    </span>
  );
};

export default function Cover() {
  const coverRef = useRef(null);
  const groomRef = useRef(null);
  const brideRef = useRef(null);
  const andTextRef = useRef(null);
  const dateRef = useRef(null);
  const linesRef = useRef([]);
  const coupleRef = useRef(null);
  const bgGlowRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    // Master timeline
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: coverRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: 1, // Smooth scrolling transition
        pin: false,
      }
    });

    // Scroll Transition:
    // When the user scrolls: Couple slowly moves upward. Hero content fades gently.
    tl.to(coupleRef.current, { y: -100, ease: 'none' }, 0)
      .to(contentRef.current, { y: -50, opacity: 0, ease: 'none' }, 0);

    // Initial load animation timeline (fixed, non-scrolling)
    const loadTl = gsap.timeline();

    // 0.0s -> Background appears with soft golden glow
    gsap.set(coverRef.current, { opacity: 0 });
    gsap.set(bgGlowRef.current, { opacity: 0 });
    gsap.set(linesRef.current, { scaleX: 0 });
    gsap.set(coupleRef.current, { opacity: 0, scale: 0.8, y: 50 });
    gsap.set(andTextRef.current, { clipPath: 'polygon(0 0, 0 0, 0 100%, 0% 100%)' });
    gsap.set(dateRef.current, { opacity: 0, y: 20 });

    loadTl.to(coverRef.current, { opacity: 1, duration: 2, ease: 'power2.inOut' }, 0.0)
          .to(bgGlowRef.current, { opacity: 0.5, duration: 3, ease: 'power2.inOut' }, 0.0);

    // 1.3s -> Groom's name appears
    if (groomRef.current) {
      const groomChars = groomRef.current.querySelectorAll('.split-char');
      loadTl.fromTo(groomChars, 
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, stagger: 0.05, duration: 0.8, ease: 'power4.out' }, 1.3
      );
    }

    // 2.0s -> "and" writes itself (clip path sweep) with gold shimmer
    loadTl.to(andTextRef.current, {
      clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
      duration: 1.5,
      ease: 'power3.inOut'
    }, 2.0);
    // Add shimmer class via CSS

    // 2.6s -> Bride's name appears
    if (brideRef.current) {
      const brideChars = brideRef.current.querySelectorAll('.split-char');
      loadTl.fromTo(brideChars, 
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, stagger: 0.05, duration: 0.8, ease: 'power4.out' }, 2.6
      );
    }

    // 3.4s -> Date appears & lines draw
    loadTl.to(dateRef.current, { opacity: 1, y: 0, duration: 1, ease: 'power3.out' }, 3.4)
          .to(linesRef.current, { scaleX: 1, duration: 1, ease: 'power3.inOut', transformOrigin: 'center' }, 3.4);

    // 4.0s -> Couple walks in (scale up and translate Y, soft bounce)
    loadTl.to(coupleRef.current, {
      opacity: 1,
      scale: 1,
      y: 0,
      duration: 1.5,
      ease: 'back.out(1.2)' // Soft bounce when stopping
    }, 4.0);

    // Parallax mouse effect
    const handleMouseMove = (e) => {
      if (!coverRef.current) return;
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      
      const xPos = (clientX / innerWidth - 0.5) * 20; // -10 to 10
      const yPos = (clientY / innerHeight - 0.5) * 20;

      // Subtle parallax on background and couple
      gsap.to(coverRef.current, { backgroundPosition: `calc(50% + ${-xPos * 0.5}px) calc(0% + ${-yPos * 0.5}px)`, duration: 1, ease: 'power2.out' });
      gsap.to(coupleRef.current, { x: xPos * 1.5, y: yPos * 1.5, duration: 1, ease: 'power2.out' });
      gsap.to(contentRef.current, { x: -xPos * 0.5, y: -yPos * 0.5, duration: 1, ease: 'power2.out' });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      tl.kill();
      loadTl.kill();
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <section ref={coverRef} className={`section ${styles.cover}`}>
      <div ref={bgGlowRef} className={styles.ambientGlow}></div>
      
      {/* Floating Petals/Particles */}
      <div className={styles.particlesContainer}>
        {[...Array(20)].map((_, i) => (
          <div key={i} className={styles.petal} style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 5}s`,
            animationDuration: `${10 + Math.random() * 10}s`
          }}></div>
        ))}
      </div>

      <div ref={contentRef} className={styles.content}>
        <h1 ref={groomRef} className={styles.names}>
          <SplitText text="ANANDU AJITH" />
        </h1>
        
        <div className={styles.andDivider}>
          <span ref={el => linesRef.current[0] = el} className={styles.line}></span>
          <span ref={andTextRef} className={styles.andText}>and</span>
          <span ref={el => linesRef.current[1] = el} className={styles.line}></span>
        </div>
        
        <h1 ref={brideRef} className={styles.names}>
          <div style={{ display: 'block' }}>
            <SplitText text="SHYBA K. V." />
          </div>
          <div style={{ display: 'block', marginTop: '0.5rem' }}>
            <SplitText text="(AJALA)" />
          </div>
        </h1>
        
        <p ref={dateRef} className={styles.dateText}>AUGUST <span className={styles.separator}>|</span> 24 <span className={styles.separator}>|</span> 2026</p>
      </div>
      
      <div className={styles.bottomCoupleContainer}>
        <img ref={coupleRef} src={heroCouple} alt="Bride and Groom" className={styles.bottomCouple} />
      </div>
    </section>
  );
}
