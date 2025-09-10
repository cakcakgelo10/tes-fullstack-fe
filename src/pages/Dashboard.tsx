import React from 'react';
import { IonPage, IonContent } from '@ionic/react';
import styles from './Dashboard.module.css';
import Sidebar from '../components/Sidebar/Sidebar';
import ModuleCard from '../components/ModuleCard/ModuleCard';

// Data dummy 
const dummyModules = [
  { title: 'PEMROGRAMAN', image: 'https://via.placeholder.com/150', color: '#4a47a3' },
  { title: 'CREATIVE MARKETING', image: 'https://via.placeholder.com/150', color: '#ff7f50' },
  { title: 'MANAGEMENT SDM', image: 'https://via.placeholder.com/150', color: '#f7d794' },
];

const Dashboard: React.FC = () => {
  return (
    <IonPage>
      <IonContent fullscreen>
        <div className={styles.dashboardContainer}>
          <div className={styles.sidebar}>
            <Sidebar />
          </div>

          <div className={styles.mainContent}>
            <h2>Modul Kompetensi</h2>
            <div className={styles.modulesGrid}>
              {dummyModules.map((mod) => (
                <ModuleCard
                  key={mod.title}
                  title={mod.title}
                  image={mod.image}
                  color={mod.color}
                />
              ))}
            </div>
          </div>

          <div className={styles.rightPanel}>
            <p>Right Panel Area</p>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Dashboard;