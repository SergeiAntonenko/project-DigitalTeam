import { useState } from 'react';
import Calendar from './Calendar/Calendar';
import CalendarPagination from './CalendarPagination/CalendarPagination';
import styles from './MonthInfo.module.css';
import pieChart from '../../images/AdvantagesSection/pie-chart-02.svg';
import { useTranslation } from 'react-i18next';

const MonthInfo = () => {
  const { t } = useTranslation();
  const [currentDate, setCurrentDate] = useState(new Date());

  const handleDateChange = newDate => {
    setCurrentDate(newDate);
  };

  return (
    <div className={styles.monthInfoContainer}>
      <div className={styles.topContainer}>
        <h3>{t('mouth-info.month')}</h3>
        <div className={styles.rightContainer}>
          <CalendarPagination currentDate={currentDate} onDateChange={handleDateChange} />
          <button className={styles.pieChart}>
            <img src={pieChart} alt="Plus Icon" className={styles.icon} />
          </button>
        </div>
      </div>
      <Calendar currentDate={currentDate} />
    </div>
  );
};

export default MonthInfo;
