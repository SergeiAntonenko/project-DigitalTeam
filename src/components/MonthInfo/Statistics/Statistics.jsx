import { AreaChart, Area, XAxis, YAxis, Tooltip } from 'recharts';
import { curveCardinal } from 'd3-shape';
import moment from 'moment';
import styles from './Statistics.module.css';

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
      width={500}
      height={400}
      data={data}
      margin={{
        top: 10,
        right: 30,
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
      <XAxis dataKey="date" axisLine={false} tickLine={false} />
      <YAxis
        domain={[0, 2.5]}
        ticks={[0, 0.5, 1, 1.5, 2, 2.5]}
        tickFormatter={value => `${value}L`}
        label={{ angle: -90, position: 'insideLeft' }}
        axisLine={false}
        tickLine={false}
      />
      <Tooltip />
      <Area
        className={styles.area}
        type={cardinal}
        stroke="#87d28d" /* Зеленый цвет обводки графика */
        dataKey="water"
        fill="url(#colorWater)"
        dot={{ className: styles.dot }}
      />
    </AreaChart>
  );
};

export default Statistics;
