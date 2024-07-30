import AddWaterBtn from './AddWaterBtn/AddWaterBtn';
import WaterDailyNorma from './WaterDailyNorma/WaterDailyNorma';
import css from './WaterMainInfo.module.css';
import WaterProgressBar from './WaterProgressBar/WaterProgressBar';
import Logo from '../Logo/Logo.jsx';
import LanguageToggle from '../LanguageToggle/LanguageToggle.jsx';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectTotalDay, selectTotalForAllDays } from '../../redux/water/selectors';

const WaterMainInfo = () => {
  const dailyWater = useSelector(selectTotalForAllDays);
  const [totalWater, setTotalWater] = useState(0);

  useEffect(() => {
    const today = new Date().toLocaleDateString('en-GB').split('/').join('.');
    const waterToday = dailyWater[today];
    if (waterToday) {
      setTotalWater(waterToday);
    } else {
      setTotalWater(0);
    }
  }, [dailyWater]);

  const handleWaterUpdate = amount => {
    setTotalWater(prev => prev + amount);
  };

  const dailyNorm = 1500;
  const progress = (totalWater / dailyNorm) * 100;

  return (
    <div className={css.waterMainInfo}>
      <div className={css.logo}>
        <Logo />
        <LanguageToggle contrast={true} />
      </div>

      <WaterDailyNorma />
      <AddWaterBtn onWaterUpdate={handleWaterUpdate} />
      <WaterProgressBar progress={progress} />
    </div>
  );
};

export default WaterMainInfo;
