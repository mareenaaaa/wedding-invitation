import React from 'react';
import styles from './Footer.module.css';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        
        <div className={styles.teamSection}>
          <h3 className={styles.teamTitle}>Meet the Team</h3>
          <a 
            href="https://www.instagram.com/bevate_digital?utm_source=qr&igsh=MW9vcWFoMjRmdXVxOA==&igsi=MW9vcWFoMjRmdXVxOA==" 
            target="_blank" 
            rel="noreferrer"
            className={styles.logoLink}
          >
            <img src="/images/team_photo.jpeg" alt="Meet the Team" className={styles.teamLogo} />
          </a>
        </div>

        <div className={styles.bottom}>
          <p>&copy; 2026 The Grand Celebration. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
