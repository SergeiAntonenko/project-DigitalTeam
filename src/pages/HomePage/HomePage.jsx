import css from "./HomePage.module.css";

const HomePage = () => {
  return (
    <div className={css.container}>
      <div className={css.welcomeSection}>
        <h3 className={css.logo}>AquaTrack</h3>
        <div>
          <p className={css.descr}>Record daily water intake and track</p>
          <h1 className={css.water}>Water consumption tracker</h1>
          <button className={css.tryTracker}>Try tracker</button>
          <button className={css.signIn}>Sign In</button>
        </div>
      </div>
      <div>
        <div>
          <p>Our happy customers</p>
        </div>
        <div>
          <div>
            <p>Habit drive</p>
          </div>
          <div>
            <p>View statistics</p>
          </div>
          <div>
            <p>Personal rate setting</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
