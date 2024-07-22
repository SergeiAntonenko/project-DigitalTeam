import { useState, useEffect } from 'react';
import './Calendar.module.css'; // Файл для стилів

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [days, setDays] = useState([]);
  const [waterData, setWaterData] = useState({});

  useEffect(() => {
    // Отримати дні місяця
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const daysArray = Array.from({ length: daysInMonth }, (_, i) => i + 1);
    setDays(daysArray);
  }, [currentDate]);

  const handleButtonClick = day => {
    // Запит на бекенд
    fetch(`/api/water-data?date=${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-${day}`)
      .then(response => response.json())
      .then(data => {
        setWaterData(data);
        // Оновити ChooseDate та WaterList, якщо потрібно
      })
      .catch(error => console.error('Error fetching water data:', error));
  };

  const goToPreviousMonth = () => {
    setCurrentDate(prevDate => {
      const newDate = new Date(prevDate.getFullYear(), prevDate.getMonth() - 1, 1);
      return newDate;
    });
  };

  const goToNextMonth = () => {
    setCurrentDate(prevDate => {
      const newDate = new Date(prevDate.getFullYear(), prevDate.getMonth() + 1, 1);
      return newDate;
    });
  };

  return (
    <div className="calendar-container">
      <div className="calendar-controls">
        <button onClick={goToPreviousMonth} className="calendar-nav-button">
          &lt;
        </button>
        <span className="calendar-month">
          {currentDate.toLocaleString('default', { month: 'long' })} {currentDate.getFullYear()}
        </span>
        <button onClick={goToNextMonth} className="calendar-nav-button">
          &gt;
        </button>
      </div>
      <div className="calendar-grid">
        {days.map(day => (
          <button key={day} className="calendar-day" onClick={() => handleButtonClick(day)}>
            <div className="day-number">{day}</div>
            <div className="percentage">
              {waterData[day] ? `${waterData[day].percentage}%` : '0%'}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default Calendar;
