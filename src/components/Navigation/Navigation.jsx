import { NavLink } from 'react-router-dom';
import css from '../Navigation/Navigation.module.css';
import { useTranslation } from 'react-i18next';

const Navigation = () => {
  const { t } = useTranslation();
  return (
    <div className={css.container}>
      <NavLink className={css.tryTracker} to="/signup">
        {t('welcome-section.try-tracker')}
      </NavLink>
      <NavLink className={css.signIn} to="/signin">
        {t('welcome-section.sign-in')}
      </NavLink>
    </div>
  );
};

export default Navigation;
