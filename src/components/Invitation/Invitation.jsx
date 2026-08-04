import React, { useEffect, useRef, useState } from 'react';
import styles from './Invitation.module.css';
import ganesha from '../../assets/ganesha.png';

export default function Invitation() {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section 
      ref={sectionRef} 
      className={`section ${styles.invitationSection} ${isVisible ? styles.visible : ''}`}
    >
      <div className={styles.card}>
        <div className={styles.floralCornerTopLeft}></div>
        <div className={styles.floralCornerBottomRight}></div>
        
        {/* TOP */}
        <div className={styles.topSection}>
          <img src={ganesha} alt="Ganesha" className={styles.ganeshaIcon} />
          
          <div className={styles.parentsTop}>
            <h3 className={styles.fadeUp1}>Mr. Ajith Kumar P. B. & Mrs. Bindu Ajith</h3>
            <p className={styles.fadeUp2}>Pullattu House,</p>
            <p className={styles.fadeUp3}>Ayakkadu,</p>
            <p className={styles.fadeUp4}>Kothamangalam,</p>
            <p className={styles.fadeUp5}>Ernakulam</p>
          </div>
        </div>
        
        {/* INVITATION MESSAGE */}
        <div className={styles.inviteMessageSection}>
          <div className={styles.divider}>
            <span className={styles.diamond}></span>
          </div>
          
          <p className={styles.inviteText}>
            Cordially invite your esteemed presence<br />
            with family to grace the
          </p>
          
          <h2 className={styles.receptionText}>WEDDING RECEPTION</h2>
          
          <p className={styles.inviteTextSub}>
            of our beloved son
          </p>
        </div>
        
        {/* COUPLE NAMES */}
        <div className={styles.coupleNamesSection}>
          <div className={styles.nameWrapper}>
            <h1 className={`${styles.name} ${styles.revealText}`}>Anandu Ajith</h1>
            <span className={styles.sparkle1}>✨</span>
            <span className={styles.sparkle2}>✨</span>
          </div>
          
          <div className={styles.withText}>with</div>
          
          <div className={styles.nameWrapper}>
            <h1 className={`${styles.name} ${styles.revealText}`}>Shyba K. V. (Ajala)</h1>
            <span className={styles.sparkle3}>✨</span>
            <span className={styles.sparkle4}>✨</span>
          </div>
        </div>
        
        {/* PARENTS DETAILS */}
        <div className={styles.parentsBottomSection}>
          <div className={styles.parentsBottomBlock}>
            <p className={styles.fadePara1}>
              (G. S/o. Late G. Balakrishnan Nair & Late Thankamani C. R.<br />
              and Mr. Narayanan Nair & Mrs. Omaanamma)
            </p>
          </div>
          
          <div className={styles.parentsBottomBlock}>
            <p className={styles.fadePara2}>
              (D/o. Mr. Sailendran P. P. & Mrs. Bindu K. V.<br />
              (G. D/o. Late T. P. Vijayan & Late P. P. Santhakumari<br />
              and Late P. V. Govindan Nambiar & Mrs. V. V. Valliamma)
            </p>
          </div>
        </div>
        
      </div>
    </section>
  );
}
