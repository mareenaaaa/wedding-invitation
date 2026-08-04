import React from 'react';
import styles from './Closing.module.css';
import couple from '../../assets/couple.png';

export default function Closing() {
  return (
    <section className={`section ${styles.closing}`}>
      <div className={styles.imageWrapper}>
        <img src={couple} alt="Bride and Groom Walking" className={styles.image} />
      </div>
      
      <div className={styles.content}>
        <p className={styles.message}>
          We look forward to celebrating<br />
          this joyous occasion with you.
        </p>
        
        <div className={styles.divider}>
          <span className={styles.diamond}></span>
        </div>
        
        <p className={styles.sharingText}>Sharing the happiness:</p>
        <p className={styles.familyText}>Family and Friends</p>
      </div>
    </section>
  );
}
