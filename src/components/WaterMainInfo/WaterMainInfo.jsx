import AddWaterBtn from './AddWaterBtn/AddWaterBtn';
import WaterDailyNorma from './WaterDailyNorma/WaterDailyNorma';
import css from './WaterMainInfo.module.css';
import WaterProgressBar from './WaterProgressBar/WaterProgressBar';
import Logo from '../Logo/Logo.jsx';

const WaterMainInfo = () => {
  return (
    <div className={css.waterMainInfo}>
      <div className={css.logo}>
        <Logo />
      </div>

      <WaterDailyNorma />
      <AddWaterBtn />
      <WaterProgressBar />
    </div>
  );
};

export default WaterMainInfo;
