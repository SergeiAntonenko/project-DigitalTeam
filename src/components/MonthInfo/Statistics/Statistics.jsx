import { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { AreaChart, Area, XAxis, Tooltip, YAxis } from 'recharts';
import { curveCardinal } from 'd3-shape';
import moment from 'moment';
import styles from './Statistics.module.css';
import CustomTooltip from '../CustomTooltip/CustomTooltip';
import { selectTotalForAllDays } from '../../../redux/water/selectors';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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

const getData = (allDaysData, selectedDate) => {
  const data = [];
  const selected = moment(selectedDate, 'YYYY-MM-DD');
  const startDate = selected.clone().startOf('month');

  let date = selected;
  while (date.isSameOrAfter(startDate)) {
    const formattedDate = date.format('DD.MM.YYYY');
    const water = allDaysData[formattedDate] || 0;

    data.push({
      date: date.format('DD'),
      water,
    });
    date = date.clone().subtract(1, 'day');
  }

  return data.reverse();
};

// Function to format Y-axis values
const formatYAxisValue = value => {
  if (value === 0) return '0%';
  const liters = value / 1000; // Convert ml to L
  return `${liters.toFixed(1)}L`; // Format to one decimal place
};

const Statistics = ({ selectedDate }) => {
  const allDaysData = useSelector(selectTotalForAllDays);
  const scrollContainerRef = useRef(null);
  const isMobile = useMediaQuery('(max-width: 767px)');

  useEffect(() => {
    if (!selectedDate) {
      toast.error('Choose any date');
    }
  }, [selectedDate]);

  const data = selectedDate ? getData(allDaysData, selectedDate) : [];
  const cardinal = curveCardinal.tension(0.2);
  const chartWidth = isMobile ? data.length * 35 : data.length * 84;

  useEffect(() => {
    if (scrollContainerRef.current && data.length > 0) {
      const container = scrollContainerRef.current;
      const scrollToEnd = () => {
        container.scrollTo({
          left: container.scrollWidth,
          behavior: 'smooth',
        });
      };

      if (window.innerWidth > 767) {
        scrollToEnd();
      } else {
        container.scrollLeft = container.scrollWidth;
      }
    }
  }, [data]);

  if (!selectedDate) {
    return (
      <>
        <ToastContainer />
      </>
    );
  }

  // Calculate max value for Y-axis domain
  const maxYValue = Math.max(...data.map(item => item.water), 0);

  return (
    <div className={styles.container}>
      <ToastContainer className={styles.toastContainer} />
      <div className={styles.yAxisContainer}>
        <AreaChart
          width={60}
          height={215}
          data={data}
          margin={{
            top: 50,
            right: 0,
            left: -15,
            bottom: 0,
          }}
          className={styles.chartWrapper}
        >
          <YAxis
            type="number"
            domain={[0, maxYValue]} // Automatically adjust the domain based on data
            ticks={[0, maxYValue / 4, maxYValue / 2, (3 * maxYValue) / 4, maxYValue]}
            // ticks={[0, 0.5, 1, 1.5, 2, 2.5]}
            // tickFormatter={value => (value === 0 ? '0%' : `${value / 1000}L`)}
            tickFormatter={formatYAxisValue} // Correctly apply the custom formatter
            axisLine={false}
            tickLine={false}
            className={styles.ySymbol}
            padding={{ bottom: 13 }}
          />
        </AreaChart>
      </div>
      <div className={styles.scrollContainer} ref={scrollContainerRef}>
        <AreaChart
          width={chartWidth}
          height={215}
          data={data}
          margin={{
            top: 40,
            right: 0,
            left: 40,
            bottom: 10,
          }}
          className={styles.chartWrapper}
        >
          <defs>
            <linearGradient id="colorWater" x1="0" y1="0" x2="0" y2="1">
              <stop offset="1.54%" className={styles.gradientStopTop} />
              <stop offset="93.64%" className={styles.gradientStopBottom} />
            </linearGradient>
          </defs>

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
        <div className={styles.xAxisContainer}>
          <AreaChart
            width={chartWidth}
            height={50}
            data={data}
            margin={{
              top: 0,
              right: 0,
              left: 40,
              bottom: 0,
            }}
            className={styles.chartWrapper}
          >
            <XAxis
              dataKey="date"
              axisLine={false}
              tickLine={false}
              className={styles.xSymbol}
              padding={{ bottom: 0 }}
            />
          </AreaChart>
        </div>
      </div>
    </div>
  );
};

export default Statistics;
