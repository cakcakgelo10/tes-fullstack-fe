import React, { useState } from 'react';
import styles from './CalendarWidget.module.css';

const daysOfWeek = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

const CalendarWidget: React.FC = () => {
  const [currentDate] = useState(new Date());

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth(); 
  const today = currentDate.getDate();

  const monthNames = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];

  const firstDayOfMonth = new Date(year, month, 1).getDay(); 
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const calendarDays = [];
  for (let i = 0; i < firstDayOfMonth; i++) {
    calendarDays.push(<div key={`empty-${i}`} className={styles.emptyDate}></div>);
  }
  for (let day = 1; day <= daysInMonth; day++) {
    calendarDays.push(
      <div key={day} className={`${styles.date} ${day === today ? styles.active : ''}`}>
        {day}
      </div>
    );
  }

  return (
    <div className={styles.widget}>
      <div className={styles.header}>
        <span>{'<'}</span>
        <strong>{monthNames[month]} {year}</strong>
        <span>{'>'}</span>
      </div>
      <div className={styles.days}>
        {daysOfWeek.map(day => <div key={day} className={styles.dayName}>{day}</div>)}
      </div>
      <div className={styles.dates}>
        {calendarDays}
      </div>
    </div>
  );
};

export default CalendarWidget;