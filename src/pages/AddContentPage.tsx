import React, { useState } from 'react';
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
  IonToast
} from '@ionic/react';
import { useHistory } from 'react-router-dom';
import { createContent } from '../services/api';

const AddContentPage: React.FC = () => {
  const history = useHistory();
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const handleSave = async () => {
    if (!title) {
      setToastMessage('Judul tidak boleh kosong.');
      setShowToast(true);
      return;
    }
    try {
      await createContent({ title, body });
      // Kembali ke dashboard setelah berhasil menyimpan
      history.goBack(); 
    } catch (error) {
      setToastMessage('Gagal menyimpan modul. Coba lagi.');
      setShowToast(true);
      console.error('Create content error:', error);
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/tabs/dashboard" />
          </IonButtons>
          <IonTitle>Tambah Modul Baru</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
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
        <IonButton expand="block" onClick={handleSave}>
          Simpan
        </IonButton>
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

export default AddContentPage;