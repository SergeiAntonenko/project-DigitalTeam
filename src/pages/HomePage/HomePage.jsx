import { DocumentTitle } from '../../components/DocumentTitle.jsx';
import css from './HomePage.module.css';
import WelcomeSection from '../../components/WelcomeSection/WelcomeSection.jsx';
import AdvantagesSection from '../../components/AdvantagesSection/AdvantagesSection.jsx';

const HomePage = () => {
  return (
    <>
      <DocumentTitle>Home Page</DocumentTitle>
      <div className={css.container}>
        <WelcomeSection />
        <AdvantagesSection />
      </div>
    </>
  );
};

export default HomePage;
