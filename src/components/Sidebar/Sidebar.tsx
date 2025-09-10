import React from 'react';
import { IonList, IonItem, IonLabel, IonIcon } from '@ionic/react';
import { gridOutline, readerOutline, peopleOutline, chatbubblesOutline, personCircleOutline, settingsOutline, calendarOutline, logOutOutline } from 'ionicons/icons';
import styles from './Sidebar.module.css';

// array menu items
const menuItems = [
  { text: 'Dashboard', icon: gridOutline, active: true },
  { text: 'Modul', icon: readerOutline },
  { text: 'Peserta', icon: peopleOutline },
  { text: 'Group Chat', icon: chatbubblesOutline },
  { text: 'Pemateri', icon: personCircleOutline },
];

const profileItems = [
  { text: 'Settings', icon: settingsOutline },
  { text: 'Kalender', icon: calendarOutline },
]

const Sidebar = () => {
  return (
    <div className={styles.sidebarContainer}>
      <div>
        <div className={styles.logo}>
          {/* You can place your logo image here */}
          Adhivasindo
        </div>
        <IonList className={styles.menuList}>
          {menuItems.map((item) => (
            <IonItem key={item.text} className={item.active ? styles.activeItem : ''} lines="none">
              <IonIcon slot="start" icon={item.icon} />
              <IonLabel>{item.text}</IonLabel>
            </IonItem>
          ))}
        </IonList>
        <h3 className={styles.profileHeader}>PROFILE</h3>
        <IonList className={styles.menuList}>
          {profileItems.map((item) => (
            <IonItem key={item.text} lines="none">
              <IonIcon slot="start" icon={item.icon} />
              <IonLabel>{item.text}</IonLabel>
            </IonItem>
          ))}
        </IonList>
      </div>
      <div className={styles.logoutSection}>
        <IonItem lines="none" button>
          <IonIcon slot="start" icon={logOutOutline} color="danger" />
          <IonLabel color="danger">Log Out</IonLabel>
        </IonItem>
      </div>
    </div>
  );
};

export default Sidebar;