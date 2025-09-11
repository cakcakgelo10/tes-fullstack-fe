import React,  { useState } from 'react';
import { IonPage, IonContent, IonInput, IonButton, IonToast } from '@ionic/react';
import { useHistory } from 'react-router-dom';
import { loginUser } from '../services/api';
import styles from './LoginPage.module.css';

const LoginPage: React.FC = () => {
    const history = useHistory();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState('');

    const handleLogin = async () => {
        try {
            const response = await loginUser({ email, password });
            const token = response.data.token;

            // Simpan token ke localStorage
            localStorage.setItem('jwt_token', token);

            // Mengarahkan ke halaman dashboard
            history.push('/tabs/dashboard');

        } catch (error) {
            setToastMessage('Login Gagal. Periksa kembali email dan password Anda.');
            setShowToast(true);
            console.error('Login error:', error);
        }
    };

    return (
        <IonPage>
            <IonContent fullscreen className={styles.container}>
                <div className={styles.loginBox}>
                    <h1>Login</h1>
                    <p>Silakan masuk untuk melanjutkan</p>
                    
                    <IonInput
                        label="Email"
                        labelPlacement="floating"
                        fill="outline"
                        type="email"
                        value={email}
                        onIonInput={(e) => setEmail(e.detail.value!)}
                        className={styles.input}
                    />
                    
                    <IonInput
                        label="Password"
                        labelPlacement="floating"
                        fill="outline"
                        type="password"
                        value={password}
                        onIonInput={(e) => setPassword(e.detail.value!)}
                        className={styles.input}
                    />

                    <IonButton expand="block" onClick={handleLogin} className={styles.loginButton}>
                        Login
                    </IonButton>
                </div>

                <IonToast
                    isOpen={showToast}
                    onDidDismiss={() => setShowToast(false)}
                    message={toastMessage}
                    duration={3000}
                    color="danger"
                />
            </IonContent>
        </IonPage>
    );
};

export default LoginPage;