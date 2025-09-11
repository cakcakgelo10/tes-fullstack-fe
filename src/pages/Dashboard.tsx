import React, { useState, useEffect, useCallback } from 'react';
import { 
  IonPage, 
  IonContent, 
  IonSpinner, 
  IonButton, 
  IonIcon, 
  IonSearchbar, 
  IonFooter, 
  IonToolbar,
  useIonViewWillEnter, 
  IonAlert
} from '@ionic/react';
import { addCircleOutline, menuOutline } from 'ionicons/icons';
import { getAllContents, deleteContent } from '../services/api'; 
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
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);
  const [selectedModuleId, setSelectedModuleId] = useState<number | null>(null);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleDeleteClick = (id: number) => {
    setSelectedModuleId(id);
    setShowDeleteAlert(true);
  };

  const fetchModules = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await getAllContents({ search: searchTerm, page: currentPage, limit: 6 });
      setModules(response.data.data);
      setTotalPages(response.data.pagination.totalPages);
    } catch (error) {
      console.error("Gagal mengambil data modul:", error);
    } finally {
      setIsLoading(false);
    }
  }, [currentPage, searchTerm]);

  useIonViewWillEnter(() => {
    fetchModules();
  });

  useEffect(() => {
    fetchModules();
  }, [fetchModules]);

  const confirmDelete = async () => {
    if (selectedModuleId) {
      try {
        await deleteContent(selectedModuleId);
        // Panggil fetchModules lagi untuk refresh daftar
        fetchModules(); 
      } catch (error) {
        console.error("Gagal menghapus modul:", error);
      }
    }
    // Tutup alert setelah selesai
    setShowDeleteAlert(false);
  };

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
            
            <div className={styles.sectionHeader}>
              <h2>Modul Kompetensi</h2>
              <IonButton routerLink="/tabs/dashboard/new" size="small">
                <IonIcon slot="start" icon={addCircleOutline} />
                Tambah Modul
              </IonButton>
            </div>

            <IonSearchbar 
              value={searchTerm}
              onIonInput={(e) => {
                setSearchTerm(e.detail.value!);
                setCurrentPage(1);
              }}
              debounce={500}
              placeholder="Cari modul..."
            />

            {isLoading ? (
              <div className={styles.spinnerContainer}>
                <IonSpinner name="crescent" />
              </div>
            ) : (
              <div className={styles.modulesGrid}>
                {modules.map((mod) => (
                  <ModuleCard
                    key={mod.id}
                    id={mod.id} 
                    title={mod.title}
                    image={'https://placehold.co/150x150'}
                    color="#4a47a3"
                    onDelete={handleDeleteClick} 
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

      <IonFooter>
        <IonToolbar>
          <div className={styles.paginationControls}>
            <IonButton onClick={() => setCurrentPage(p => Math.max(1, p - 1))} disabled={currentPage === 1}>
              Sebelumnya
            </IonButton>
            <span>Halaman {currentPage} dari {totalPages}</span>
            <IonButton onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages}>
              Selanjutnya
            </IonButton>
          </div>
        </IonToolbar>
      </IonFooter>

      <IonAlert
        isOpen={showDeleteAlert}
        onDidDismiss={() => setShowDeleteAlert(false)}
        header={'Konfirmasi Hapus'}
        message={'Apakah Anda yakin ingin menghapus modul ini?'}
        buttons={[
          {
            text: 'Batal',
            role: 'cancel',
          },
          {
            text: 'Hapus',
            handler: confirmDelete,
          },
        ]}
      />
    </IonPage>
  );
};

export default Dashboard;