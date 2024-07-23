import styles from './CalendarItem.module.css';

const CalendarItem = ({ day, waterData, onClick, isCurrentDate }) => {
  const percentage = waterData ? waterData.percentage : 0;
  return (
    <div className={styles.calendarDayInfo}>
      <button
        className={`${styles.calendarDay} ${isCurrentDate ? styles.currentDate : ''}`}
        onClick={onClick}
      >
        <div className={styles.dayNumber}>{day}</div>
      </button>
      <div className={styles.percentage}>{percentage}%</div>
    </div>
  );
};

export default CalendarItem;
