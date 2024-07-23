import { useState } from 'react';
import Calendar from './Calendar/Calendar';
import CalendarPagination from './CalendarPagination/CalendarPagination';
import styles from './MonthInfo.module.css';
import pieChart from '../../photos/pie-chart-02.png';

const MonthInfo = () => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const handleDateChange = newDate => {
    setCurrentDate(newDate);
  };

  return (
    <div className={styles.monthInfoContainer}>
      <div className={styles.topContainer}>
        <h3>Month</h3>
        <div className={styles.rightContainer}>
          <CalendarPagination currentDate={currentDate} onDateChange={handleDateChange} />
          <img src={pieChart} alt="Plus Icon" className={styles.icon} />
        </div>
      </div>
      <Calendar currentDate={currentDate} />
    </div>
  );
};

export default MonthInfo;
//============================================================================
// import styles from './MonthInfo.module.css';
// import Calendar from './Calendar/Calendar';
// import CalendarPagination from './CalendarPagination/CalendarPagination';

// const MonthInfo = () => {
//   return (
//     <div className={styles.monthInfoContainer}>
//       <div className={styles.topContainer}>
//         <h1>Month</h1>
//         <div className={styles.rightContainer}>
//           <div className={styles.calendarControls}>
//             <CalendarPagination />
//           </div>
//           {/* <CalendarPagination /> */}
//           <img src="../../photos/pie-chart-02.svg" alt="Plus Icon" className={styles.icon} />
//         </div>
//       </div>
//       <div>
//         <Calendar />
//       </div>
//     </div>
//   );
// };

// export default MonthInfo;
