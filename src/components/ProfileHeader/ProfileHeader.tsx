import React from 'react';
import styles from './ProfileHeader.module.css';

const ProfileHeader: React.FC = () => {
  return (
    <div className={styles.container}>
      <img 
        src="https://i.pravatar.cc/150?u=juliana" 
        alt="User Avatar" 
        className={styles.avatar} 
      />
      <div className={styles.userInfo}>
        <h4>SELAMAT DATANG, JULIANA</h4>
        <p>Di LMS By Adhivasindo</p>
      </div>
    </div>
  );
};

export default ProfileHeader;