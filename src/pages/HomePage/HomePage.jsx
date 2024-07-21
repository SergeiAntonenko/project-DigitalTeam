import { DocumentTitle } from '../../components/DocumentTitle';
import Navigation from '../../components/Navigation/Navigation';
import css from './HomePage.module.css';

const HomePage = () => {
  return (
    <div className={css.container}>
      <DocumentTitle>Home Page</DocumentTitle>
      <div className={css.welcomeSection}>
        <h3 className={css.logo}>AquaTrack</h3>
        <div className={css.tabletWrapper}>
          <p className={css.descr}>Record daily water intake and track</p>
          <h1 className={css.water}>Water consumption tracker</h1>
          <Navigation />
        </div>
      </div>
      <div className={css.advantages}>
        <div>
          <p className={css.Customers}>
            <span className={css.happySpan}></span>Our <span className={css.colorHappy}>happy</span>
            customers
          </p>
        </div>
        <div className={css.benefits}>
          <div className={css.habitWrapper}>
            <p className={css.habitDrive}>
              <span className={css.habbitSpan}></span>Habit drive
            </p>
            <p className={css.statistics}>View statistics</p>
          </div>
          <p className={css.rate}>Personal rate setting</p>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
