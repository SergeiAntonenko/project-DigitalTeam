import LanguageToggle from '../LanguageToggle/LanguageToggle.jsx';
import Logo from '../Logo/Logo.jsx';
import Navigation from '../Navigation/Navigation.jsx';
import css from './WelcomeSection.module.css';
import { useTranslation } from 'react-i18next';

const WelcomeSection = () => {
  const { t } = useTranslation();
  return (
    <div className={css.welcomeSection}>
      <div className={css.container}>
        <Logo />
        <LanguageToggle />
      </div>
      <div className={css.tabletWrapper}>
        <p className={css.descr}>{t('welcome-section.description')}</p>
        <h1 className={css.water}>{t('welcome-section.title')}</h1>
        <Navigation />
      </div>
    </div>
  );
};

export default WelcomeSection;
