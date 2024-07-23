import { format, subMonths, addMonths } from 'date-fns';
import styles from './CalendarPagination.module.css';

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
        &lt;
      </button>
      <span className={styles.month}>
        {currentDate ? format(currentDate, 'MMMM, yyyy') : 'Invalid Date'}
      </span>
      <button onClick={handleNextMonth} className={styles.navButton}>
        &gt;
      </button>
    </div>
  );
};

export default CalendarPagination;

//=============================================================================

// import { useState, useEffect } from 'react';
// import { format, subMonths, addMonths } from 'date-fns';
// import styles from './CalendarPagination.module.css';

// const CalendarPagination = ({ onDateChange }) => {
//   const [currentDate, setCurrentDate] = useState(new Date());

//   useEffect(() => {
//     if (onDateChange) {
//       onDateChange(currentDate);
//     }
//   }, [currentDate, onDateChange]);

//   const handlePreviousMonth = () => {
//     const newDate = subMonths(currentDate, 1);
//     setCurrentDate(newDate);
//   };

//   const handleNextMonth = () => {
//     const newDate = addMonths(currentDate, 1);
//     setCurrentDate(newDate);
//   };

//   return (
//     <div className={styles.container}>
//       <button onClick={handlePreviousMonth} className={styles.navButton}>
//         &lt;
//       </button>
//       <span className={styles.month}>
//         {currentDate ? format(currentDate, 'MMMM, yyyy') : 'Invalid Date'}
//       </span>
//       <button onClick={handleNextMonth} className={styles.navButton}>
//         &gt;
//       </button>
//     </div>
//   );
// };

// export default CalendarPagination;

//======================================================================================
// import { format, subMonths, addMonths } from 'date-fns';
// import { useState } from 'react';
// import styles from './CalendarPagination.module.css';

// const CalendarPagination = () => {
//   const [currentDate, setCurrentDate] = useState(new Date());

//   const handlePreviousMonth = () => {
//     setCurrentDate(subMonths(currentDate, 1));
//   };

//   const handleNextMonth = () => {
//     setCurrentDate(addMonths(currentDate, 1));
//   };

//   return (
//     <h3 className={styles.container}>
//       <button onClick={handlePreviousMonth}>&lt;</button>
//       <span className={styles.month}>{currentDate ? format(currentDate, 'MMMM, yyyy') : 'Invalid Date'}</span>
//       <button onClick={handleNextMonth}>&gt;</button>
//     </h3>
//   );
// };

// export default CalendarPagination;
