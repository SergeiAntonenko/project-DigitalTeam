import { useState, useEffect, useRef } from 'react';
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

    mediaQueryList.addEventListener('change', documentChangeHandler);
    documentChangeHandler(); // Инициализируем значение

    return () => mediaQueryList.removeEventListener('change', documentChangeHandler);
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
  // Добавляем начальную точку с 0%
  data.push({
    date: startOfMonth.subtract(1, 'day').format('DD'),
    water: 0,
  });

  return data.reverse();
};

const data = getData();
const cardinal = curveCardinal.tension(0.2);

const Statistics = () => {
  // Ссылка на контейнер прокрутки
  const scrollContainerRef = useRef(null);

  // Проверка медиа-запросов
  const isMobile = useMediaQuery('(max-width: 767px)');
  const chartWidth = isMobile ? data.length * 35 : data.length * 84;

  useEffect(() => {
    // Прокручиваем к текущей дате или крайней правой точке данных
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollLeft = scrollContainerRef.current.scrollWidth;
    }
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.yAxisContainer}>
        <AreaChart
          width={60} // Минимальная ширина для отображения Y оси
          height={215}
          data={data}
          margin={{
            top: 47,
            right: 0,
            left: -15,
            bottom: 0,
          }}
          className={styles.chartWrapper}
        >
          <YAxis
            type="number"
            // tickCount={6}
            // domain={[0, 2.5]}
            ticks={[0, 0.5, 1, 1.5, 2, 2.5]}
            tickFormatter={value => {
              console.log(value); // Для отладки
              return value === 0 ? '0%' : `${value}L`;
            }}
            axisLine={false}
            tickLine={false}
            className={styles.ySymbol}
            padding={{ bottom: 30 }} // Увеличение отступа снизу

            // allowDataOverflow={true} // Добавьте это свойство
          />
        </AreaChart>
      </div>
      <div className={styles.scrollContainer} ref={scrollContainerRef}>
        <AreaChart
          width={chartWidth} // Динамическая ширина диаграммы
          height={215}
          data={data}
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

          <XAxis
            dataKey="date"
            axisLine={false}
            tickLine={false}
            className={styles.xSymbol}
            padding={{ bottom: 30 }} // Увеличение отступа снизу
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
