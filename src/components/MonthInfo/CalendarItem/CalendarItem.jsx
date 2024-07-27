// import styles from './CalendarItem.module.css';

// const CalendarItem = ({ day, waterData, onClick, isCurrentDate }) => {
//   const percentage = waterData ? waterData.percentage : 0;
//   const isBelow100 = percentage < 100;

//   return (
//     <div className={styles.calendarDayInfo}>
//       <button
//         className={`${styles.calendarDay} ${isCurrentDate ? styles.currentDate : ''} ${
//           !isCurrentDate && isBelow100 ? styles.below100 : ''
//         }`}
//         onClick={onClick}
//       >
//         <div className={styles.dayNumber}>{day}</div>
//       </button>
//       <div className={styles.percentage}>{percentage}%</div>
//     </div>
//   );
// };

// export default CalendarItem;
// ========================================================================
import styles from './CalendarItem.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { selectMonth, setDate } from '../../../redux/date/dateSlice';

const CalendarItem = ({ day, waterData, isCurrentDate }) => {
  const percentage = waterData ? waterData.percentage : 0;
  const isBelow100 = percentage < 100;

  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(setDate(date));
  };

  const month = useSelector(selectMonth);
  const date = day < 10 ? `0${day}-${month}` : `${day}-${month}`;

  return (
    <div className={styles.calendarDayInfo}>
      <button
        className={`${styles.calendarDay} ${isCurrentDate ? styles.currentDate : ''} ${
          !isCurrentDate && isBelow100 ? styles.below100 : ''
        }`}
        onClick={handleClick}
      >
        <div className={styles.dayNumber}>{day}</div>
      </button>
      <div className={styles.percentage}>{percentage}%</div>
    </div>
  );
};

export default CalendarItem;
