import { useTranslation } from 'react-i18next';
import css from './WaterDailyNorma.module.css';
import { useSelector } from 'react-redux';
import { selectUser } from '../../../redux/users/selectors';

const WaterDailyNorma = () => {
  const { t } = useTranslation();
  const user = useSelector(selectUser);

  let dailyNorma = 1.5;
  if (user.dailyWaterGoal !== null) {
    dailyNorma = user.dailyWaterGoal;
  }

  return (
    <div className={css.waterDailyNorma}>
      <div className={css.textNorma}>
        <p className={css.liter}>
          {dailyNorma} {t('water-daily-norma.liter')}
        </p>
        <p className={css.literNorma}>{t('water-daily-norma.my-daily-norma')}</p>
      </div>
    </div>
  );
};

export default WaterDailyNorma;
