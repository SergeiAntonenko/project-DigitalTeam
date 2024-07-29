import AddWaterBtn from './AddWaterBtn/AddWaterBtn';
import WaterDailyNorma from './WaterDailyNorma/WaterDailyNorma';
import css from './WaterMainInfo.module.css';
import WaterProgressBar from './WaterProgressBar/WaterProgressBar';
import Logo from '../Logo/Logo.jsx';
import LanguageToggle from '../LanguageToggle/LanguageToggle.jsx';

const WaterMainInfo = () => {
  return (
    <div className={css.waterMainInfo}>
      <div className={css.logo}>
        <Logo />
        <LanguageToggle />
      </div>

      <WaterDailyNorma />
      <AddWaterBtn />
      <WaterProgressBar />
    </div>
  );
};

export default WaterMainInfo;
