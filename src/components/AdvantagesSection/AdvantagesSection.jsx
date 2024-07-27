import css from './AdvantagesSection.module.css';
import CustomersPhoto from '../CustomersPhoto/CustomersPhoto.jsx';
import { useTranslation, Trans } from 'react-i18next';

const AdvantagesSection = () => {
  const { t } = useTranslation();
  return (
    <div className={css.advantages}>
      <div className={css.Customers}>
        <CustomersPhoto />
        <p className={css.happydescr}>
          <Trans i18nKey="advantages-section.our-happy-customers">
            Our<span className={css.colorHappy}> happy </span>customers
          </Trans>
        </p>
      </div>
      <div className={css.benefits}>
        <div className={css.habitDrive}>
          <div className={css.habbitCircle}></div>
          <p className={css.habbitParag}>{t('advantages-section.habit-drive')}</p>
        </div>
        <p className={css.statistics}>{t('advantages-section.view-statistics')}</p>
        <p className={css.rate}>{t('advantages-section.personal-rate-setting')}</p>
      </div>
    </div>
  );
};

export default AdvantagesSection;
