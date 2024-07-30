import { UserPanel } from '../UserPanel/UserPanel';
import DailyInfo from '../DailyInfo/DailyInfo';
import s from './WaterDetailedInfo.module.css';
import MonthInfo from '../MonthInfo/MonthInfo';

const WaterDetailedInfo = () => {
  return (
    <div className={s.waterDetailedInfo}>
      <UserPanel />
      <DailyInfo className={s.main} />
      <MonthInfo />
    </div>
  );
};

export default WaterDetailedInfo;
