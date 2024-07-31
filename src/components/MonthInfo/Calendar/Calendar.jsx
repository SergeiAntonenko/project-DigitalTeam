import { useState, useEffect } from 'react';
import styles from './Calendar.module.css';
import CalendarItem from '../CalendarItem/CalendarItem';

const Calendar = ({ currentDate }) => {
  const [days, setDays] = useState([]);
  const [waterData, setWaterData] = useState({});
  const [selectedDate, setSelectedDate] = useState(null); // Состояние для хранения выбранной даты

  useEffect(() => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const daysArray = Array.from({ length: daysInMonth }, (_, i) => i + 1);
    setDays(daysArray);
  }, [currentDate]);

  useEffect(() => {
    const fetchWaterData = async day => {
      try {
        const date = `${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-${
          day < 10 ? `0${day}` : day
        }`;
        const response = await fetch(`/api/water-data?date=${date}`);

        if (!response.ok) {
          const errorText = await response.text();
          console.error('Server error:', errorText);
          throw new Error('Network response was not ok');
        }

        const contentType = response.headers.get('content-type');

        if (contentType && contentType.includes('application/json')) {
          const data = await response.json();
          setWaterData(prevData => ({ ...prevData, [day]: data }));
        } else {
          throw new Error('Unexpected content type: ' + contentType);
        }
      } catch (error) {
        console.error('Error fetching water data:', error);
      }
    };

    days.forEach(day => fetchWaterData(day));
  }, [currentDate, days]);

  const handleButtonClick = day => {
    const date =
      day < 10 ? `0${day}-${currentDate.getMonth() + 1}` : `${day}-${currentDate.getMonth() + 1}`;
    setSelectedDate(date);
  };

  const today = new Date();
  const todayDay = today.getDate();
  const todayMonth = today.getMonth() + 1;
  const todayYear = today.getFullYear();

  return (
    <div className={styles.calendarGrid}>
      {days.map(day => (
        <CalendarItem
          key={day}
          day={day}
          waterData={waterData[day]}
          onClick={() => handleButtonClick(day)}
          isCurrentDate={
            day === todayDay &&
            currentDate.getMonth() + 1 === todayMonth &&
            currentDate.getFullYear() === todayYear
          }
          isSelected={
            selectedDate ===
            (day < 10
              ? `0${day}-${currentDate.getMonth() + 1}`
              : `${day}-${currentDate.getMonth() + 1}`)
          }
        />
      ))}
    </div>
  );
};

export default Calendar;
