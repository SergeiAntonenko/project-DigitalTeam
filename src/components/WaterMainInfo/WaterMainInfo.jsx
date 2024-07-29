import AddWaterBtn from './AddWaterBtn/AddWaterBtn';
import WaterDailyNorma from './WaterDailyNorma/WaterDailyNorma';
import css from './WaterMainInfo.module.css';
import WaterProgressBar from './WaterProgressBar/WaterProgressBar';
import Logo from '../Logo/Logo.jsx';
import LanguageToggle from '../LanguageToggle/LanguageToggle.jsx';
import { useState } from 'react';

const WaterMainInfo = () => {
  const [totalWater, setTotalWater] = useState(0);

  const handleWaterUpdate = (amount) => {
    setTotalWater(prev => prev + amount);
  };

  const dailyNorm = 1500;
  const progress = (totalWater / dailyNorm) * 100;

  return (
    <div className={css.waterMainInfo}>
      <div className={css.logo}>
        <Logo />
        <LanguageToggle />
      </div>

      <WaterDailyNorma />
      <AddWaterBtn onWaterUpdate={handleWaterUpdate} />
      <WaterProgressBar progress={progress} />
    </div>
  );
};

export default WaterMainInfo;
