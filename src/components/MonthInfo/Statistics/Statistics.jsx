import { AreaChart, Area, XAxis, YAxis, Tooltip } from 'recharts';
import { curveCardinal } from 'd3-shape';
import moment from 'moment';

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
    >
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
        type={cardinal}
        dataKey="water"
        stroke="#8884d8"
        fill="#8884d8"
        fillOpacity={0.3}
        dot={{ stroke: '#8884d8', strokeWidth: 2, r: 4 }}
      />
    </AreaChart>
  );
};

export default Statistics;
