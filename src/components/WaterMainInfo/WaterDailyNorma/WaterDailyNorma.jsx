import { useTranslation } from 'react-i18next';
import css from './WaterDailyNorma.module.css';

const WaterDailyNorma = () => {
  const { t } = useTranslation();
  return (
    <div className={css.waterDailyNorma}>
      <div className={css.textNorma}>
        <p className={css.liter}>1.5 {t('water-daily-norma.liter')}</p>
        <p className={css.literNorma}>{t('water-daily-norma.my-daily-norma')}</p>
      </div>
    </div>
  );
};

export default WaterDailyNorma;
