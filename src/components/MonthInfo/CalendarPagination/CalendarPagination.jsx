import { format, subMonths, addMonths } from 'date-fns';
import { useState } from 'react';
import styles from './CalendarPagination.module.css';

const CalendarPagination = () => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const handlePreviousMonth = () => {
    setCurrentDate(subMonths(currentDate, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(addMonths(currentDate, 1));
  };

  return (
    <h3 className={styles.container}>
      <button onClick={handlePreviousMonth}>&lt;</button>
      <span className={styles.month}>{format(currentDate, 'MMMM, yyyy')}</span>
      <button onClick={handleNextMonth}>&gt;</button>
    </h3>
  );
};

export default CalendarPagination;
