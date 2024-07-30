import { useEffect, useState } from 'react';
import Calendar from './Calendar/Calendar';
import CalendarPagination from './CalendarPagination/CalendarPagination';
import Statistics from './Statistics/Statistics'; // Добавлено из ветки featcher/schedule
import styles from './MonthInfo.module.css';
import pieChart from '../../images/AdvantagesSection/pie-chart-02.svg';
import { useTranslation } from 'react-i18next'; // Добавлено из HEAD
import pieChartActive from '../../images/AdvantagesSection/pie-chart-02-active.svg';
import { fetchWaterMonthly } from '../../redux/water/operations';
import { useDispatch, useSelector } from 'react-redux';
import { selectMonth } from '../../redux/date/dateSlice';

const MonthInfo = () => {
  const { t } = useTranslation(); // Добавлено из HEAD
  const [currentDate, setCurrentDate] = useState(new Date());
  const [view, setView] = useState('calendar');

  const handleDateChange = newDate => {
    setCurrentDate(newDate);
  };

  const handleStatistics = () => {
    setView(prevView => (prevView === 'calendar' ? 'statistics' : 'calendar'));
  };

  const icon = view === 'calendar' ? pieChart : pieChartActive;

  const dispatch = useDispatch();
  const month = useSelector(selectMonth);

  useEffect(() => {
    if (month) {
      const formattedMonth = month.split('-').join('.');
      dispatch(fetchWaterMonthly(formattedMonth));
    }
  }, [dispatch, month]);

  return (
    <div className={styles.monthInfoContainer}>
      <div className={styles.topContainer}>
        <h3>{view === 'calendar' ? t('mouth-info.month') : 'Statistics'}</h3>{' '}
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
