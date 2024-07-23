import Navigation from '../Navigation/Navigation.jsx';
import css from './WelcomeSection.module.css';

const WelcomeSection = () => {
  return (
    <div className={css.welcomeSection}>
      <h3 className={css.logo}>AquaTrack</h3>
      <div className={css.tabletWrapper}>
        <p className={css.descr}>Record daily water intake and track</p>
        <h1 className={css.water}>Water consumption tracker</h1>
        <Navigation />
      </div>
    </div>
  );
};

export default WelcomeSection;
