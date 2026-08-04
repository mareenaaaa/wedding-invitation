import React, { useEffect, useState, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './Countdown.module.css';

gsap.registerPlugin(ScrollTrigger);

export default function Countdown() {
  const sectionRef = useRef(null);
  const boxesRef = useRef([]);
  const numberRefs = useRef({ days: null, hours: null, minutes: null, seconds: null });
  
  // Target date: August 24, 2026, 10:00:00
  const targetDate = new Date('2026-08-24T10:00:00').getTime();

  const [timeLeft, setTimeLeft] = useState({
    days: 0, hours: 0, minutes: 0, seconds: 0
  });

  const [liveMode, setLiveMode] = useState(false);

  // Calculate actual time left
  const calculateTimeLeft = () => {
    const now = new Date().getTime();
    const difference = targetDate - now;

    if (difference > 0) {
      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((difference % (1000 * 60)) / 1000)
      };
    }
    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  };

  useEffect(() => {
    const actualTime = calculateTimeLeft();
    let tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 80%',
      }
    });

    // 1 & 2: Fade in section and stagger boxes upward
    gsap.set(sectionRef.current, { opacity: 0 });
    gsap.set(boxesRef.current, { y: 50, opacity: 0 });
    
    tl.to(sectionRef.current, { opacity: 1, duration: 1, ease: 'power3.inOut' })
      .to(boxesRef.current, { 
        y: 0, 
        opacity: 1, 
        duration: 0.8, 
        stagger: 0.2, 
        ease: 'power3.out' 
      }, '-=0.5');

    // 3: Rolling flip-clock effect (fast count up)
    const dummyObj = { d: 0, h: 0, m: 0, s: 0 };
    tl.to(dummyObj, {
      d: actualTime.days,
      h: actualTime.hours,
      m: actualTime.minutes,
      s: actualTime.seconds,
      duration: 2,
      ease: 'power3.inOut',
      onUpdate: () => {
        setTimeLeft({
          days: Math.round(dummyObj.d),
          hours: Math.round(dummyObj.h),
          minutes: Math.round(dummyObj.m),
          seconds: Math.round(dummyObj.s)
        });
      },
      onComplete: () => {
        setLiveMode(true);
        // 5. Brief golden glow on complete
        gsap.to(boxesRef.current, {
          boxShadow: '0 0 20px rgba(198, 170, 100, 0.8)',
          duration: 0.5,
          yoyo: true,
          repeat: 1,
          ease: 'power1.inOut'
        });
      }
    }, '-=0.2');

    return () => {
      tl.kill();
    };
  }, []);

  // 7. Live countdown tick
  useEffect(() => {
    if (!liveMode) return;
    
    const interval = setInterval(() => {
      const newTime = calculateTimeLeft();
      
      // 4. Subtle bounce when number changes
      Object.keys(newTime).forEach(key => {
        if (newTime[key] !== timeLeft[key]) {
          if (numberRefs.current[key]) {
            gsap.fromTo(numberRefs.current[key], 
              { y: -10, scale: 1.1, opacity: 0.5 },
              { y: 0, scale: 1, opacity: 1, duration: 0.4, ease: 'bounce.out' }
            );
          }
        }
      });
      
      setTimeLeft(newTime);
    }, 1000);
    
    return () => clearInterval(interval);
  }, [liveMode, timeLeft]);

  return (
    <section ref={sectionRef} className={`section ${styles.countdownSection}`}>
      <div className={styles.floralCornerTop}></div>
      
      <div className={styles.header}>
        <h2 className={styles.saveTheDate}>save the date</h2>
        <h3 className={styles.dateText}>24 August 2026</h3>
        
        <div className={styles.divider}>
          <span className={styles.line}></span>
          <span className={styles.diamond}></span>
          <span className={styles.line}></span>
        </div>
      </div>
      
      <div className={styles.countdownGrid}>
        {[
          { label: 'Days', key: 'days', val: timeLeft.days },
          { label: 'Hours', key: 'hours', val: timeLeft.hours },
          { label: 'Minutes', key: 'minutes', val: timeLeft.minutes },
          { label: 'Seconds', key: 'seconds', val: timeLeft.seconds }
        ].map((item, index) => (
          <div 
            key={item.key} 
            className={styles.countdownBox}
            ref={el => boxesRef.current[index] = el}
          >
            <div className={styles.shimmerEffect}></div>
            <div 
              className={styles.number} 
              ref={el => numberRefs.current[item.key] = el}
            >
              {item.val.toString().padStart(2, '0')}
            </div>
            <div className={styles.label}>{item.label}</div>
          </div>
        ))}
      </div>
      
      {/* 6. Tiny particles background */}
      <div className={styles.particlesContainer}>
        {[...Array(15)].map((_, i) => (
          <div key={i} className={styles.particle} style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 5}s`,
            animationDuration: `${5 + Math.random() * 5}s`
          }}></div>
        ))}
      </div>
    </section>
  );
}
