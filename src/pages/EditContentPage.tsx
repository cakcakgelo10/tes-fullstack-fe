import React, { useState, useEffect } from 'react';
import { 
  IonPage, 
  IonHeader, 
  IonToolbar, 
  IonTitle, 
  IonContent, 
  IonInput, 
  IonTextarea, 
  IonButton, 
  IonButtons, 
  IonBackButton,
  IonToast,
  IonSpinner
} from '@ionic/react';
import { useHistory, useParams } from 'react-router-dom';
import { getContentById, updateContent } from '../services/api';

// Interface untuk mencocokkan parameter URL
interface EditPageParams {
  id: string;
}

const EditContentPage: React.FC = () => {
  const history = useHistory();
  const { id } = useParams<EditPageParams>();
  const moduleId = parseInt(id, 10);

  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  // Mengambil data saat halaman dimuat
  useEffect(() => {
    const fetchContent = async () => {
      try {
        const response = await getContentById(moduleId);
        setTitle(response.data.title);
        setBody(response.data.body);
      } catch (error) {
        console.error("Gagal mengambil data konten:", error);
        setToastMessage("Gagal memuat data.");
        setShowToast(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchContent();
  }, [moduleId]);

  const handleUpdate = async () => {
    if (!title) {
      setToastMessage('Judul tidak boleh kosong.');
      setShowToast(true);
      return;
    }
    try {
      await updateContent(moduleId, { title, body });
      history.goBack(); // Kembali ke dashboard
    } catch (error) {
      setToastMessage('Gagal memperbarui modul. Coba lagi.');
      setShowToast(true);
      console.error('Update content error:', error);
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/tabs/dashboard" />
          </IonButtons>
          <IonTitle>Edit Modul</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        {isLoading ? (
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
            <IonSpinner />
          </div>
        ) : (
          <>
            <IonInput
              label="Judul Modul"
              labelPlacement="floating"
              fill="outline"
              value={title}
              onIonInput={(e) => setTitle(e.detail.value!)}
              style={{ marginBottom: '1rem' }}
            />
            <IonTextarea
              label="Isi Modul (Opsional)"
              labelPlacement="floating"
              fill="outline"
              value={body}
              onIonInput={(e) => setBody(e.detail.value!)}
              rows={10}
              style={{ marginBottom: '1rem' }}
            />
            <IonButton expand="block" onClick={handleUpdate}>
              Simpan Perubahan
            </IonButton>
          </>
        )}
        <IonToast
          isOpen={showToast}
          onDidDismiss={() => setShowToast(false)}
          message={toastMessage}
          duration={3000}
        />
      </IonContent>
    </IonPage>
  );
};

export default EditContentPage;