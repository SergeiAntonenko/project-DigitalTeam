import { AreaChart, Area, XAxis, YAxis, Tooltip } from 'recharts';
import { curveCardinal } from 'd3-shape';
import moment from 'moment';
import styles from './Statistics.module.css';
import CustomTooltip from '../CustomTooltip/CustomTooltip';
// import CustomTooltip from '../CustomTooltip/CustomTooltip';

const getData = () => {
  const data = [];
  const today = moment();

  for (let i = 6; i >= 0; i--) {
    data.push({
      date: today.clone().subtract(i, 'days').format('DD'),
      water: Math.random() * 2.5, // Примерные данные от 0 до 2.5 литров
    });
  }

  return data;
};

const data = getData();
const cardinal = curveCardinal.tension(0.2);

const Statistics = () => {
  return (
    <AreaChart
      width={300}
      height={215}
      data={data}
      margin={{
        top: 47,
        right: 0,
        left: 0,
        bottom: 0,
      }}
      className={styles.chartContainer}
    >
      <defs>
        <linearGradient id="colorWater" x1="0" y1="0" x2="0" y2="1">
          <stop offset="1.54%" className={styles.gradientStopTop} />
          <stop offset="93.64%" className={styles.gradientStopBottom} />
        </linearGradient>
      </defs>
      <XAxis dataKey="date" axisLine={false} tickLine={false} className={styles.xSymbol} />
      <YAxis
        domain={[0, 2.5]}
        ticks={[0, 0.5, 1, 1.5, 2, 2.5]}
        tickFormatter={value => (value === 0 ? '0%' : `${value}L`)}
        label={{ angle: -90, position: 'insideLeft' }}
        axisLine={false}
        tickLine={false}
        tick={{ fill: '#323F47', fontSize: 15 }}
        // padding={{ left: 100 }} // Добавление отступа слева на оси Y
        className={styles.ySymbol}
      />
      {/* <Tooltip content={<CustomTooltip />} /> */}
      <Tooltip content={<CustomTooltip />} />
      {/* <ResponsiveContainer width="100%" height="100%"></ResponsiveContainer> */}

      <Area
        className={styles.area}
        type={cardinal}
        stroke="#87d28d" /* Зеленый цвет обводки графика */
        dataKey="water"
        fill="url(#colorWater)"
        // margin={{ left: 100, bottom: 40 }} // Добавление отступа слева на оси Y
        dot={{ className: styles.dot }}
        // margin={{
        //   top: 0,
        //   right: 0,
        //   left: 20,
        //   bottom: 60,
        // }}
      />
    </AreaChart>
  );
};

export default Statistics;
