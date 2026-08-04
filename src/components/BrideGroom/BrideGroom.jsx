import React from 'react';
import styles from './BrideGroom.module.css';
import couple from '../../assets/couple.png';

export default function BrideGroom() {
  return (
    <section className={`section ${styles.brideGroom}`}>
      <div className={styles.imageContainer}>
        <img src={couple} alt="Bride and Groom Illustration" className={styles.coupleImage} />
      </div>
      
      <div className={styles.detailsContainer}>
        <div className={styles.personCard}>
          <h2 className={styles.name}>Anandu Ajith</h2>
          <p className={styles.parentage}>
            (G. S/o. Late G. Balakrishnan Nair & Late Thankamani C. R.<br />
            and Mr. Narayanan Nair & Mrs. Omaanamma)
          </p>
        </div>
        
        <div className={styles.withText}>with</div>
        
        <div className={styles.personCard}>
          <h2 className={styles.name}>Shyba K. V. (Ajala)</h2>
          <p className={styles.parentage}>
            (D/o. Mr. Sailendran P. P. & Mrs. Bindu K. V.<br />
            (G. D/o. Late T. P. Vijayan & Late P. P. Santhakumari<br />
            and Late P. V. Govindan Nambiar & Mrs. V. V. Valliamma)
          </p>
        </div>
      </div>
    </section>
  );
}
