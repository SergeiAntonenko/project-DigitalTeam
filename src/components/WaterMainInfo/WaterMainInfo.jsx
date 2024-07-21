import { Link } from 'react-router-dom';
import AddWaterBtn from './AddWaterBtn/AddWaterBtn';
import WaterDailyNorma from './WaterDailyNorma/WaterDailyNorma';
import css from './WaterMainInfo.module.css';

export const Logo = () => {
  return (
    <Link className={css.logo} to="/">
      AquaTrack
    </Link>
  );
};

const WaterMainInfo = () => {
  return (
    <div className={css.waterMainInfo}>
      <div className={css.logoAT}>
        <Logo />
      </div>

      <WaterDailyNorma />
      <AddWaterBtn />
    </div>
  );
};

export default WaterMainInfo;
