import { IonApp, IonRouterOutlet, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { Redirect, Route } from 'react-router-dom';

import LoginPage from './pages/LoginPage';
import ProtectedRoute from './components/ProtectedRoute';
import Tabs from './pages/Tabs';

import '@ionic/react/css/core.css';

import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

import './theme/variables.css';

setupIonicReact();

const App: React.FC = () => {
  return (
    <IonApp>
      <IonReactRouter>
        <IonRouterOutlet>
          
          {/* Rute 1: Halaman Login (Publik) */}
          <Route path="/login" component={LoginPage} exact={true} />
          
          {/* Rute 2: Mengarahkan semua path di bawah /tabs ke komponen Tabs (Dilindungi) */}
          <ProtectedRoute path="/tabs" component={Tabs} />

          {/* Rute 3: Halaman utama (root) akan selalu diarahkan ke /login */}
          <Route path="/" exact={true}>
            <Redirect to="/login" />
          </Route>

        </IonRouterOutlet>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;