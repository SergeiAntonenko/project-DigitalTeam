// AdvantagesSection.jsx
import { useEffect } from 'react';
import css from './AdvantagesSection.module.css';
import CustomersPhoto from '../CustomersPhoto/CustomersPhoto.jsx';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsersCount } from '../../redux/users/operations.js';
import { selectUsersCount, selectIsLoading } from '../../redux/users/selectors.js';

const AdvantagesSection = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const usersCount = useSelector(selectUsersCount);
  const isLoading = useSelector(selectIsLoading);

  useEffect(() => {
    dispatch(fetchUsersCount());
  }, [dispatch]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div className={css.advantages}>
      <div className={css.Customers}>
        <CustomersPhoto />
        <p className={css.happydescr}>
          <div className={css.nowrap}>
            {usersCount} <span className={css.colorHappy}>{t('advantages-section.happy')}</span>
          </div>
          {t('advantages-section.customers')}
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
