import { format, subMonths, addMonths } from 'date-fns';
import styles from './CalendarPagination.module.css';
import leftChevron from '../../../images/AdvantagesSection/chevron-left.svg';
import rightChevron from '../../../images/AdvantagesSection/chevron-right.svg';

const CalendarPagination = ({ currentDate, onDateChange }) => {
  const handlePreviousMonth = () => {
    const newDate = subMonths(currentDate, 1);
    onDateChange(newDate);
  };

  const handleNextMonth = () => {
    const newDate = addMonths(currentDate, 1);
    onDateChange(newDate);
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
