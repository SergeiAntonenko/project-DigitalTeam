import { useState, useEffect } from 'react';
import { AreaChart, Area, XAxis, Tooltip, YAxis } from 'recharts';
import { curveCardinal } from 'd3-shape';
import moment from 'moment';
import styles from './Statistics.module.css';
import CustomTooltip from '../CustomTooltip/CustomTooltip';

const useMediaQuery = query => {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const mediaQueryList = window.matchMedia(query);
    const documentChangeHandler = () => setMatches(mediaQueryList.matches);

    mediaQueryList.addListener(documentChangeHandler);
    documentChangeHandler(); // Инициализируем значение

    return () => mediaQueryList.removeListener(documentChangeHandler);
  }, [query]);

  return matches;
};

const getData = () => {
  const data = [];
  const today = moment();
  const startOfMonth = today.clone().startOf('month');

  let date = today;
  while (date >= startOfMonth) {
    data.push({
      date: date.format('DD'),
      water: Math.random() * 2.5,
    });
    date = date.clone().subtract(1, 'day');
  }

  return data.reverse();
};

const data = getData();
const cardinal = curveCardinal.tension(0.2);

const Statistics = () => {
  // Получаем текущую дату
  const today = moment();
  // Ищем индекс данных для текущей даты
  const startIndex = data.findIndex(entry => entry.date === today.format('DD'));

  // Отображаем 7 последних записей, начиная с текущей даты или выбранной даты
  const visibleData = data.slice(Math.max(startIndex - 6, 0), startIndex + 1);

  // Проверка медиа-запросов
  const isMobile = useMediaQuery('(max-width: 767px)');
  const chartWidth = isMobile ? visibleData.length * 40 : visibleData.length * 100;

  return (
    <div className={styles.container}>
      <div className={styles.scrollContainer}>
        <AreaChart
          width={chartWidth} // Динамическая ширина диаграммы
          height={215}
          data={visibleData}
          margin={{
            top: 47,
            right: 0,
            left: 0,
            bottom: 0,
          }}
          className={styles.chartWrapper}
        >
          <defs>
            <linearGradient id="colorWater" x1="0" y1="0" x2="0" y2="1">
              <stop offset="1.54%" className={styles.gradientStopTop} />
              <stop offset="93.64%" className={styles.gradientStopBottom} />
            </linearGradient>
          </defs>
          <XAxis dataKey="date" axisLine={false} tickLine={false} className={styles.xSymbol} />
          <YAxis
            type="number"
            domain={[0, 2.5]}
            ticks={[0, 0.5, 1, 1.5, 2, 2.5]} // Задаем метки
            tickFormatter={tick => `${tick === 0 ? '0%' : `${tick}L`}`} // Формат меток
            axisLine={false}
            tickLine={false}
            className={styles.ySymbol}
          />
          <Tooltip content={<CustomTooltip />} />
          <Area
            className={styles.area}
            type={cardinal}
            stroke="#87d28d"
            dataKey="water"
            fill="url(#colorWater)"
            dot={{ className: styles.dot }}
          />
        </AreaChart>
      </div>
    </div>
  );
};

export default Statistics;
