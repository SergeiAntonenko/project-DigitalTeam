import { useState } from 'react';
import Calendar from './Calendar/Calendar';
import CalendarPagination from './CalendarPagination/CalendarPagination';
import styles from './MonthInfo.module.css';
import pieChart from '../../images/AdvantagesSection/pie-chart-02.svg';
import pieChartActive from '../../images/AdvantagesSection/pie-chart-02-active.svg';

import Statistics from './Statistics/Statistics';
import { useTranslation } from 'react-i18next';

const MonthInfo = () => {
  const { t } = useTranslation();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [view, setView] = useState('calendar');

  const handleDateChange = newDate => {
    setCurrentDate(newDate);
  };

  const handleStatistics = () => {
    setView(prevView => (prevView === 'calendar' ? 'statistics' : 'calendar'));
  };

  const icon = view === 'calendar' ? pieChart : pieChartActive;

  return (
    <div className={styles.monthInfoContainer}>
      <div className={styles.topContainer}>
        <h3>{view === 'calendar' ? t('mouth-info.month') : 'Statistics'}</h3>
        <div className={styles.rightContainer}>
          <CalendarPagination currentDate={currentDate} onDateChange={handleDateChange} />
          <button className={styles.pieChart} onClick={handleStatistics}>
            <img src={icon} alt="Pie Chart Icon" className={styles.icon} />
          </button>
        </div>
      </div>
      {view === 'calendar' ? <Calendar currentDate={currentDate} /> : <Statistics />}
    </div>
  );
};

export default MonthInfo;
