// import styles from './CalendarItem.module.css';
// import { useDispatch, useSelector } from 'react-redux';
// import { selectMonth, setDate } from '../../../redux/date/dateSlice';
// import { useState } from 'react';

// const CalendarItem = ({ day, waterData, isCurrentDate }) => {
//   const [isClicked, setIsClicked] = useState(false);

//   const percentage = waterData ? waterData.percentage : 0;
//   const isBelow100 = percentage < 100;

//   const dispatch = useDispatch();

//   const handleClick = () => {
//     setIsClicked(true); // Устанавливаем состояние, что кнопка была нажата
//     dispatch(setDate(date));
//   };

//   const month = useSelector(selectMonth);
//   const date = day < 10 ? `0${day}-${month}` : `${day}-${month}`;

//   return (
//     <div className={styles.calendarDayInfo}>
//       <button
//         className={`${styles.calendarDay} ${isCurrentDate ? styles.currentDate : ''} ${
//           !isCurrentDate && isBelow100 ? styles.below100 : ''
//         } ${isClicked ? styles.clicked : ''}`} // Добавляем класс для нажатой кнопки
//         onClick={handleClick}
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

  const handleClick = () => {
    dispatch(setDate(date));
    onClick(); // Уведомить родительский компонент о выборе даты
  };

  const month = useSelector(selectMonth);
  const date = day < 10 ? `0${day}-${month}` : `${day}-${month}`;

  return (
    <div className={styles.calendarDayInfo}>
      <button
        className={`${styles.calendarDay} ${isCurrentDate ? styles.currentDate : ''} ${
          !isCurrentDate && isBelow100 ? styles.below100 : ''
        } ${isSelected ? styles.clicked : ''}`}
        onClick={handleClick}
      >
        <div className={styles.dayNumber}>{day}</div>
      </button>
      <div className={styles.percentage}>{percentage}%</div>
    </div>
  );
};

export default CalendarItem;
