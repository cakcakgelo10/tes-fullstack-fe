import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { IonRouterOutlet, IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel } from '@ionic/react';
import { gridOutline, personCircleOutline } from 'ionicons/icons'; 
import Dashboard from './Dashboard';
import ProfilePage from './ProfilePage';
import styles from './Tabs.module.css';
import AddContentPage from './AddContentPage';
import EditContentPage from './EditContentPage';

const Tabs: React.FC = () => {
  return (
    <IonTabs>
      <IonRouterOutlet>
        <Route path="/tabs/dashboard" component={Dashboard} exact={true} />
        <Route path="/tabs/dashboard/new" component={AddContentPage} exact={true} />
        <Route path="/tabs/dashboard/edit/:id" component={EditContentPage} exact={true} />
        <Route path="/tabs/profil" component={ProfilePage} exact={true} />
        
        <Route path="/tabs" exact={true}>
          <Redirect to="/tabs/dashboard" />
        </Route>
      </IonRouterOutlet>

      <IonTabBar slot="bottom" className={styles.tabBar}>
        <IonTabButton tab="dashboard" href="/tabs/dashboard">
          <IonIcon icon={gridOutline} />
          <IonLabel>Dashboard</IonLabel>
        </IonTabButton>

        {/* Modul & Peserta halamannya belum ada */}
        {/* <IonTabButton tab="modul" href="/tabs/modul">
          <IonIcon icon={readerOutline} />
          <IonLabel>Modul</IonLabel>
        </IonTabButton>
        <IonTabButton tab="peserta" href="/tabs/peserta">
          <IonIcon icon={peopleOutline} />
          <IonLabel>Peserta</IonLabel>
        </IonTabButton> */}

        <IonTabButton tab="profil" href="/tabs/profil">
          <IonIcon icon={personCircleOutline} />
          <IonLabel>Profil</IonLabel>
        </IonTabButton>
      </IonTabBar>
    </IonTabs>
  );
};

export default Tabs;