import React from 'react';
import styles from './ScheduleList.module.css';

const scheduleItems = [
    { title: 'Storytelling dalam Pemasaran', time: '09:00 - 11:00 with mr. jam', color: '#8e44ad' },
    { title: 'Pemrograman Frontend Modern', time: '12:00 - 14:00 with mr. firman', color: '#e74c3c' },
    { title: 'Pengembangan API', time: '14:30 - 16:30 with mr. pandu', color: '#f39c12' },
];

const ScheduleList: React.FC = () => {
    return (
        <div>
            <h4>JADWAL PEMATERI</h4>
            <ul className={styles.list}>
                {scheduleItems.map(item => (
                    <li key={item.title} className={styles.listItem} style={{ borderLeftColor: item.color }}>
                        <div className={styles.itemContent}>
                            <strong>{item.title}</strong>
                            <span>{item.time}</span>
                        </div>
                        <span className={styles.arrow}>{'>'}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ScheduleList;