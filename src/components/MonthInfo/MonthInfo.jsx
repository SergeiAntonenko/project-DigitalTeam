import CalendarPagination from './CalendarPagination/CalendarPagination';
import styles from './MonthInfo.module.css';

const MonthInfo = () => {
  return (
    <div className={styles.monthInfoContainer}>
      <h1>Month</h1>
      <div className={styles.rightContainer}>
        <CalendarPagination />
        <img src="../../photos/pie-chart-02.svg" alt="Plus Icon" className={styles.icon} />{' '}
      </div>
    </div>
  );
};

export default MonthInfo;
