import { useState, useEffect } from 'react';
import styles from './Calendar.module.css';
import CalendarItem from '../CalendarItem/CalendarItem';

const Calendar = ({ currentDate }) => {
  const [days, setDays] = useState([]);
  const [waterData, setWaterData] = useState({});

  useEffect(() => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const daysArray = Array.from({ length: daysInMonth }, (_, i) => i + 1);
    setDays(daysArray);
  }, [currentDate]);

  const handleButtonClick = day => {
    fetch(`/api/water-data?date=${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-${day}`)
      .then(response => response.json())
      .then(data => {
        setWaterData(prevData => ({ ...prevData, [day]: data }));
      })
      .catch(error => console.error('Error fetching water data:', error));
  };

  return (
    <div className={styles.calendarGrid}>
      {days.map(day => (
        <CalendarItem
          key={day}
          day={day}
          waterData={waterData[day]}
          onClick={() => handleButtonClick(day)}
          isCurrentDate={
            day === new Date().getDate() &&
            currentDate.getMonth() === new Date().getMonth() &&
            currentDate.getFullYear() === new Date().getFullYear()
          }
        />
      ))}
    </div>
  );
};

export default Calendar;
