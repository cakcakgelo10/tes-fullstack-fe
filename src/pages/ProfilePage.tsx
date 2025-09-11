import React from 'react';
import { useHistory } from 'react-router-dom';
import { 
  IonPage, 
  IonHeader, 
  IonToolbar, 
  IonTitle, 
  IonContent, 
  IonList, 
  IonItem, 
  IonLabel, 
  IonIcon 
} from '@ionic/react';
import { settingsOutline, calendarOutline, logOutOutline } from 'ionicons/icons';

const ProfilePage: React.FC = () => {
  const history = useHistory();

  const handleLogout = () => {
    localStorage.removeItem('jwt_token');
    history.push('/login');
    window.location.reload();
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Profil & Pengaturan</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonList>
          <IonItem button>
            <IonIcon slot="start" icon={settingsOutline} />
            <IonLabel>Settings</IonLabel>
          </IonItem>
          <IonItem button>
            <IonIcon slot="start" icon={calendarOutline} />
            <IonLabel>Kalender</IonLabel>
          </IonItem>
          <IonItem button onClick={handleLogout} lines="none">
            <IonIcon slot="start" icon={logOutOutline} color="danger" />
            <IonLabel color="danger">Log Out</IonLabel>
          </IonItem>
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default ProfilePage;