import { NavLink } from 'react-router-dom';
import css from '../Navigation/Navigation.module.css';

const Navigation = () => {
  return (
    <div className={css.container}>
      <NavLink className={css.tryTracker} to="/signup">
        Try tracker
      </NavLink>
      <NavLink className={css.signIn} to="/signin">
        Sign In
      </NavLink>
    </div>
  );
};

export default Navigation;
