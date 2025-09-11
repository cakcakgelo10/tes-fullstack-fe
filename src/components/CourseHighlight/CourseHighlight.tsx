import React from 'react';
import { IonButton, IonIcon } from '@ionic/react';
import { personOutline, calendarOutline } from 'ionicons/icons';
import styles from './CourseHighlight.module.css';

const CourseHighlight: React.FC = () => {
  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <span className={styles.breadcrumb}>PEMROGRAMAN</span>
        <h2>Pemrograman Frontend Modern dengan React dan ionic</h2>
        <p className={styles.description}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        </p>
      </div>
      <div className={styles.footer}>
        <div className={styles.meta}>
          <span className={styles.metaItem}>
            <IonIcon icon={personOutline} />
            Pemateri By Joselep
          </span>
          <span className={styles.metaItem}>
            <IonIcon icon={calendarOutline} />
            14-06-2025
          </span>
        </div>
        <IonButton className={styles.actionButton}>Mulai Learning</IonButton>
      </div>
    </div>
  );
};

export default CourseHighlight;