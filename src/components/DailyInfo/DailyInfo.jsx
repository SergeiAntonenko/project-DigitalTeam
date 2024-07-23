import ChooseDate from '../ChooseDate/ChooseDate';
import AddWaterBtn from '../AddWaterBtn/AddWaterBtn';
import WaterList from '../WaterList/WaterList';
import s from './DailyInfo.module.css';

const DailyInfo = () => {
  return (
    <>
      <div className={s.waterListBlock}>
        <ChooseDate />
        <AddWaterBtn />
      </div>
      <WaterList />
    </>
  );
};

export default DailyInfo;
