// import { format, subMonths, addMonths } from 'date-fns';
// import styles from './CalendarPagination.module.css';
// import leftChevron from '../../../images/AdvantagesSection/chevron-left.svg';
// import rightChevron from '../../../images/AdvantagesSection/chevron-right.svg';

// const CalendarPagination = ({ currentDate, onDateChange }) => {
//   const handlePreviousMonth = () => {
//     const newDate = subMonths(currentDate, 1);
//     onDateChange(newDate);
//   };

//   const handleNextMonth = () => {
//     const newDate = addMonths(currentDate, 1);
//     onDateChange(newDate);
//   };

//   return (
//     <div className={styles.container}>
//       <button onClick={handlePreviousMonth} className={styles.navButton}>
//         <img src={leftChevron} alt="Next Month" />
//       </button>
//       <span className={styles.month}>
//         {currentDate ? format(currentDate, 'MMMM, yyyy') : 'Invalid Date'}
//       </span>
//       <button onClick={handleNextMonth} className={styles.navButton}>
//         <img src={rightChevron} alt="Next Month" />
//       </button>
//     </div>
//   );
// };

// export default CalendarPagination;
// ================================================================
import { format, subMonths, addMonths, parse, startOfMonth } from 'date-fns';
import styles from './CalendarPagination.module.css';
import leftChevron from '../../../images/AdvantagesSection/chevron-left.svg';
import rightChevron from '../../../images/AdvantagesSection/chevron-right.svg';
import { useDispatch, useSelector } from 'react-redux';
import { selectMonth, setMonth } from '../../../redux/date/dateSlice';

const CalendarPagination = ({ currentDate, onDateChange }) => {
  const dispatch = useDispatch();
  const date = useSelector(selectMonth);
  const parsedDate = parse(date, 'MM-yyyy', new Date());

  const handlePreviousMonth = () => {
    const newDate = subMonths(currentDate, 1);
    onDateChange(newDate);
    const prevoiusMonth = startOfMonth(
      new Date(parsedDate.getFullYear(), parsedDate.getMonth() - 1, 1)
    );
    const month = format(prevoiusMonth, 'MM-yyyy');
    dispatch(setMonth(month));
  };

  const handleNextMonth = () => {
    const newDate = addMonths(currentDate, 1);
    onDateChange(newDate);
    const nextMonth = new Date(parsedDate.getFullYear(), parsedDate.getMonth() + 1, 1);
    const month = format(nextMonth, 'MM-yyyy');
    dispatch(setMonth(month));
  };

  return (
    <div className={styles.container}>
      <button onClick={handlePreviousMonth} className={styles.navButton}>
        <img src={leftChevron} alt="Next Month" />
      </button>
      <span className={styles.month}>
        {currentDate ? format(currentDate, 'MMMM, yyyy') : 'Invalid Date'}
      </span>
      <button onClick={handleNextMonth} className={styles.navButton}>
        <img src={rightChevron} alt="Next Month" />
      </button>
    </div>
  );
};

export default CalendarPagination;
