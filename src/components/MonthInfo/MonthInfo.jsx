import CalendarPagination from './CalendarPagination/CalendarPagination';
import styles from './MonthInfo.module.css';
import Calendar from './Calendar/Calendar';

const MonthInfo = () => {
  return (
    <div className={styles.monthInfoContainer}>
      <div className={styles.topContainer}>
        <h1>Month</h1>
        <div className={styles.rightContainer}>
          <CalendarPagination />
          <img src="../../photos/pie-chart-02.svg" alt="Plus Icon" className={styles.icon} />
        </div>
      </div>
      <div>
        <Calendar />
      </div>
    </div>
  );
};

export default MonthInfo;
