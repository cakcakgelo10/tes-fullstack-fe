import React, { useState, useEffect } from 'react';
import { IonPage, IonContent, IonSpinner } from '@ionic/react';
import { getAllContents } from '../services/api';
import styles from './Dashboard.module.css';
import Sidebar from '../components/Sidebar/Sidebar';
import ModuleCard from '../components/ModuleCard/ModuleCard';
import CourseHighlight from '../components/CourseHighlight/CourseHighlight';

interface Module {
  id: number;
  title: string;
  body: string;
}

const Dashboard: React.FC = () => {
  const [modules, setModules] = useState<Module[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchModules = async () => {
      try {
        setIsLoading(true);
        const response = await getAllContents();
        setModules(response.data.data);
      } catch (error) {
        console.error("Gagal mengambil data modul:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchModules();
  }, []);

  return (
    <IonPage>
      <IonContent fullscreen>
        <div className={styles.dashboardContainer}>
          <div className={styles.sidebar}>
            <Sidebar />
          </div>
          <div className={styles.mainContent}>
            <CourseHighlight />
            
            <h2>Modul Kompetensi</h2>
            {isLoading ? (
              <div className={styles.spinnerContainer}>
                <IonSpinner name="crescent" />
              </div>
            ) : (
              <div className={styles.modulesGrid}>
                {modules.map((mod) => (
                  <ModuleCard
                    key={mod.id}
                    title={mod.title}
                    image={'https://via.placeholder.com/150'}
                    color="#4a47a3"
                  />
                ))}
              </div>
            )}
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