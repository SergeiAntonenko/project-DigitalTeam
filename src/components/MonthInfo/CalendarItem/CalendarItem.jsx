// import styles from './CalendarItem.module.css';
// import { useDispatch, useSelector } from 'react-redux';
// import { selectMonth, setDate } from '../../../redux/date/dateSlice';

// const CalendarItem = ({ day, waterData, isCurrentDate, isSelected, onClick }) => {
//   const percentage = waterData ? waterData.percentage : 0;
//   const isBelow100 = percentage < 100;

//   const dispatch = useDispatch();

//   const month = useSelector(selectMonth);

//   // Получаем текущую дату
//   const today = new Date();
//   const todayMonth = today.getMonth() + 1; // Месяцы в JavaScript считаются с 0
//   const todayDate = today.getDate();

//   // Проверяем, является ли текущий месяц будущим относительно месяца элемента
//   const isFutureMonth = parseInt(month, 10) > todayMonth;
//   const isCurrentMonth = parseInt(month, 10) === todayMonth;
//   const isFutureDate = isFutureMonth || (isCurrentMonth && day > todayDate);

//   const handleClick = () => {
//     dispatch(setDate(date));
//     onClick(); // Уведомить родительский компонент о выборе даты
//   };

//   const date = day < 10 ? `0${day}-${month}` : `${day}-${month}`;

//   return (
//     <div className={styles.calendarDayInfo}>
//       <button
//         className={`${styles.calendarDay} ${isCurrentDate ? styles.currentDate : ''} ${
//           !isCurrentDate && isBelow100 ? styles.below100 : ''
//         } ${isSelected ? styles.clicked : ''}`}
//         onClick={handleClick}
//         disabled={isFutureDate}
//       >
//         <div className={styles.dayNumber}>{day}</div>
//       </button>
//       <div className={styles.percentage}>{percentage}%</div>
//     </div>
//   );
// };

// export default CalendarItem;

import styles from './CalendarItem.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { selectMonth, setDate } from '../../../redux/date/dateSlice';

const CalendarItem = ({ day, waterData, isCurrentDate, isSelected, onClick }) => {
  const percentage = waterData ? waterData.percentage : 0;
  const isBelow100 = percentage < 100;

  const dispatch = useDispatch();

  const month = useSelector(selectMonth);

  // Получаем текущую дату
  const today = new Date();
  const todayMonth = today.getMonth() + 1; // Месяцы в JavaScript считаются с 0
  const todayDate = today.getDate();

  // Проверяем, является ли текущий месяц будущим относительно месяца элемента
  const isFutureMonth = parseInt(month, 10) > todayMonth;
  const isCurrentMonth = parseInt(month, 10) === todayMonth;
  const isFutureDate = isFutureMonth || (isCurrentMonth && day > todayDate);

  const handleClick = () => {
    dispatch(setDate(date));
    onClick(); // Уведомить родительский компонент о выборе даты
  };

  const date = day < 10 ? `0${day}-${month}` : `${day}-${month}`;

  return (
    <div className={styles.calendarDayInfo}>
      <button
        className={`${styles.calendarDay} ${isCurrentDate ? styles.currentDate : ''} ${
          !isCurrentDate && isBelow100 ? styles.below100 : ''
        } ${isSelected ? styles.clicked : ''}`}
        onClick={handleClick}
        disabled={isFutureDate}
      >
        <div className={styles.dayNumber}>{day}</div>
      </button>
      <div className={styles.percentage}>{percentage}%</div>
    </div>
  );
};

export default CalendarItem;
