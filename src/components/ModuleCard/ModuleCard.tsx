import React from 'react';
import styles from './ModuleCard.module.css';

interface ModuleCardProps {
  title: string;
  image: string;
  color: string;
}

const ModuleCard: React.FC<ModuleCardProps> = ({ title, image, color }) => {
  return (
    <div className={styles.card} style={{ borderColor: color }}>
      <div className={styles.imageContainer}>
        <img src={image} alt={title} />
      </div>
      <div className={styles.cardContent}>
        <span className={styles.category}>MATERI KOMPETENSI</span>
        <h4 className={styles.title}>{title}</h4>
      </div>
    </div>
  );
};

export default ModuleCard;