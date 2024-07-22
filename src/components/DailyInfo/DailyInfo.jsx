import ChooseDate from '../ChooseDate/ChooseDate';
import AddWaterBtn from '../AddWaterBtn/AddWaterBtn';
// import WaterList from './AddWaterBtn/AddWaterBtn';
import s from './DailyInfo.module.css';

const DailyInfo = () => {
  return (
    <div className={s.waterListBlock}>
      <div className={s.waterListBlockHead}>
        <ChooseDate />
        <AddWaterBtn />
        {/* <WaterList /> */}
      </div>
    </div>
  );
};

export default DailyInfo;
