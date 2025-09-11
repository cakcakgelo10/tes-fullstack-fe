import React, { useState } from 'react';
import { IonPage, IonContent, IonInput, IonButton, IonToast, IonHeader, IonToolbar, IonButtons, IonBackButton, IonTitle } from '@ionic/react';
import { useHistory } from 'react-router-dom';
import { registerUser } from '../services/api';
import { AxiosError } from 'axios'; 
import styles from './RegisterPage.module.css';

const RegisterPage: React.FC = () => {
    const history = useHistory();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState('');

    const handleRegister = async () => {
        if (!name || !email || !password) {
            setToastMessage('Nama, email, dan password wajib diisi.');
            setShowToast(true);
            return;
        }

        try {
            await registerUser({ name, email, password });
            setToastMessage('Registrasi berhasil! Silakan login.');
            setShowToast(true);
            history.push('/login');
        } catch (error) {
            const axiosError = error as AxiosError<{ message: string }>;
            const errorMessage = axiosError.response?.data?.message || 'Registrasi gagal. Coba lagi.';
            setToastMessage(errorMessage);
            setShowToast(true);
            console.error('Register error:', error);
        }
    };

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonBackButton defaultHref="/login" />
                    </IonButtons>
                    <IonTitle>Daftar Akun Baru</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen className={styles.container}>
                <div className={styles.registerBox}>
                    <IonInput
                        label="Nama Lengkap"
                        labelPlacement="floating"
                        fill="outline"
                        type="text"
                        value={name}
                        onIonInput={(e) => setName(e.detail.value!)}
                        className={styles.input}
                    />
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
                    <IonButton expand="block" onClick={handleRegister} className={styles.loginButton}>
                        Register
                    </IonButton>
                </div>
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

export default RegisterPage;