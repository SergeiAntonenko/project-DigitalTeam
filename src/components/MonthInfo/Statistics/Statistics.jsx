import { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { AreaChart, Area, XAxis, Tooltip, YAxis } from 'recharts';
import { curveCardinal } from 'd3-shape';
import moment from 'moment';
import styles from './Statistics.module.css';
import CustomTooltip from '../CustomTooltip/CustomTooltip';
import { selectTotalForAllDays } from '../../../redux/water/selectors';

const useMediaQuery = query => {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const mediaQueryList = window.matchMedia(query);
    const documentChangeHandler = () => setMatches(mediaQueryList.matches);

    mediaQueryList.addEventListener('change', documentChangeHandler);
    documentChangeHandler(); // Initialization value

    return () => mediaQueryList.removeEventListener('change', documentChangeHandler);
  }, [query]);

  return matches;
};

const getData = allDaysData => {
  const data = [];
  const today = moment();
  const startOfMonth = today.clone().startOf('month');

  let date = today;
  while (date >= startOfMonth) {
    const formattedDate = date.format('DD.MM.YYYY');
    const water = allDaysData[formattedDate] || 0;

    data.push({
      date: date.format('DD'),
      water,
    });
    date = date.clone().subtract(1, 'day');
  }
  // Add start`s point at 0%
  data.push({
    date: startOfMonth.subtract(1, 'day').format('DD'),
    water: 0,
  });

  return data.reverse();
};

const Statistics = () => {
  const allDaysData = useSelector(selectTotalForAllDays);
  const data = getData(allDaysData);
  const cardinal = curveCardinal.tension(0.2);
  const scrollContainerRef = useRef(null);

  const isMobile = useMediaQuery('(max-width: 767px)');
  const chartWidth = isMobile ? data.length * 35 : data.length * 84;

  useEffect(() => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const scrollToEnd = () => {
        container.scrollTo({
          left: container.scrollWidth,
          behavior: 'smooth', // smooth scroll
        });
      };

      // Check, if wight > 767px, else scrolling to end
      if (window.innerWidth > 767) {
        scrollToEnd();
      } else {
        // For mobile simple scroll to end
        container.scrollLeft = container.scrollWidth;
      }
    }
  }, [data]);

  return (
    <div className={styles.container}>
      <div className={styles.yAxisContainer}>
        <AreaChart
          width={60}
          height={215}
          data={data}
          margin={{
            top: 45,
            right: 0,
            left: -15,
            bottom: 0,
          }}
          className={styles.chartWrapper}
        >
          <YAxis
            type="number"
            ticks={[0, 0.5, 1, 1.5, 2, 2.5]}
            tickFormatter={value => (value === 0 ? '0%' : `${value}L`)}
            axisLine={false}
            tickLine={false}
            className={styles.ySymbol}
            padding={{ bottom: 30 }}
          />
        </AreaChart>
      </div>
      <div className={styles.scrollContainer} ref={scrollContainerRef}>
        <AreaChart
          width={chartWidth}
          height={215}
          data={data}
          margin={{
            top: 50,
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
            padding={{ bottom: 30 }}
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
