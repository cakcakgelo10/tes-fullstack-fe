import React, { useState, useEffect } from 'react';
import { IonPage, IonContent, IonSpinner, IonButton, IonIcon } from '@ionic/react';
import { menuOutline } from 'ionicons/icons';
import { getAllContents } from '../services/api';
import styles from './Dashboard.module.css';
import Sidebar from '../components/Sidebar/Sidebar';
import CourseHighlight from '../components/CourseHighlight/CourseHighlight';
import ModuleCard from '../components/ModuleCard/ModuleCard';
import ProfileHeader from '../components/ProfileHeader/ProfileHeader';
import CalendarWidget from '../components/CalendarWidget/CalendarWidget';
import ScheduleList from '../components/ScheduleList/ScheduleList';

interface Module {
  id: number;
  title: string;
  body: string;
}

const Dashboard: React.FC = () => {
  const [modules, setModules] = useState<Module[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

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
          <div className={`${styles.sidebar} ${isMenuOpen ? styles.sidebarOpen : ''}`}>
            <Sidebar />
          </div>

          <div 
            className={`${styles.backdrop} ${isMenuOpen ? styles.backdropOpen : ''}`}
            onClick={toggleMenu} 
          />

          <div className={styles.mainContent}>
            <header className={styles.mobileHeader}>
              <IonButton fill="clear" className={styles.hamburgerButton} onClick={toggleMenu}>
                <IonIcon slot="icon-only" icon={menuOutline} />
              </IonButton>
              <h1 className={styles.mobileTitle}>Adhivasindo</h1>
            </header>

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
                    image={'https://placehold.co/150x150'}
                    color="#4a47a3"
                  />
                ))}
              </div>
            )}
          </div>

          <div className={styles.rightPanel}>
            <ProfileHeader />
            <CalendarWidget />
            <ScheduleList />
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Dashboard;