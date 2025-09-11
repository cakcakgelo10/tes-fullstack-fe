import React from 'react';
import { IonButton, IonIcon } from '@ionic/react';
import { trashBinOutline, createOutline } from 'ionicons/icons';
import styles from './ModuleCard.module.css';

interface ModuleCardProps {
  id: number;
  title: string;
  image: string;
  color: string;
  onDelete: (id: number) => void;
}

const ModuleCard: React.FC<ModuleCardProps> = ({ id, title, image, color, onDelete }) => {
  return (
    <div className={styles.card} style={{borderColor: color}}>
      
      <div className={styles.imageContainer}>
          <img src={image} alt={title} />
      </div>
      <div className={styles.cardContent}>
        <span className={styles.category}>MATERI KOMPETENSI</span>
        <h4 className={styles.title}>{title}</h4>
      </div>
      
      <div className={styles.actions}>
        <IonButton 
          fill="clear" 
          size="small" 
          color="medium"
          routerLink={`/tabs/dashboard/edit/${id}`}
        >
            <IonIcon slot="icon-only" icon={createOutline} />
        </IonButton>
        <IonButton fill="clear" size="small" color="danger" onClick={() => onDelete(id)}>
            <IonIcon slot="icon-only" icon={trashBinOutline} />
        </IonButton>
      </div>
    </div>
  );
};

export default ModuleCard;