import React, { useState, useEffect } from 'react';
import { IonPage, IonContent, IonSpinner } from '@ionic/react';
import { getAllContents } from '../services/api'; // Import fungsi API
import styles from './Dashboard.module.css';
import Sidebar from '../components/Sidebar/Sidebar';
import ModuleCard from '../components/ModuleCard/ModuleCard';

interface Module {
  id: number;
  title: string;
  body: string;
}

const Dashboard: React.FC = () => {
  // State untuk menyimpan daftar modul dari API
  const [modules, setModules] = useState<Module[]>([]);
  // State untuk menunjukkan status loading
  const [isLoading, setIsLoading] = useState(true);

  // useEffect akan berjalan satu kali saat komponen pertama kali di-render
  useEffect(() => {
    const fetchModules = async () => {
      try {
        setIsLoading(true);
        const response = await getAllContents();
        // Asumsi data ada di response.data.data sesuai kode backend kita
        setModules(response.data.data); 
      } catch (error) {
        console.error("Gagal mengambil data modul:", error);
      } finally {
        setIsLoading(false); // Hentikan loading setelah selesai
      }
    };

    fetchModules();
  }, []); // Array kosong [] memastikan ini hanya berjalan sekali

  return (
    <IonPage>
      <IonContent fullscreen>
        <div className={styles.dashboardContainer}>
          <div className={styles.sidebar}>
            <Sidebar />
          </div>

          <div className={styles.mainContent}>
            {/* ... bagian lain dari konten utama ... */}
            <h2>Modul Kompetensi</h2>
            
            {isLoading ? (
              <div className={styles.spinnerContainer}>
                <IonSpinner name="crescent" />
              </div>
            ) : (
              <div className={styles.modulesGrid}>
                {/* Kita map dari state 'modules', bukan lagi dari dummy data */}
                {modules.map((mod) => (
                  <ModuleCard
                    key={mod.id}
                    title={mod.title}
                    image={'https://via.placeholder.com/150'} // Masih pakai gambar dummy
                    color="#4a47a3" // Warna bisa dibuat dinamis jika perlu
                  />
                ))}
              </div>
            )}
          </div>

          <div className={styles.rightPanel}>
            {/* ... komponen panel kanan ... */}
            <p>Right Panel Area</p>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Dashboard;