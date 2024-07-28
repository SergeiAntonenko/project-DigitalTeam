import { DocumentTitle } from '../../components/DocumentTitle.jsx';
import css from './HomePage.module.css';
import WelcomeSection from '../../components/WelcomeSection/WelcomeSection.jsx';
import AdvantagesSection from '../../components/AdvantagesSection/AdvantagesSection.jsx';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { refreshUser } from '../../redux/auth/operations.js';
import { useTranslation } from 'react-i18next';

const HomePage = () => {
  const { t } = useTranslation();
  return (
    <>
      <DocumentTitle>{t('home-page.title')}</DocumentTitle>
      <div className={css.container}>
        <WelcomeSection />
        <AdvantagesSection />
      </div>
    </>
  );
};

export default HomePage;
