import { NavLink } from "react-router-dom";
import css from "../Navigation/Navigation.module.css";

const Navigation = () => {
  return (
    <>
      <NavLink className={css.tryTracker} to="/SignUp">
        Try tracker
      </NavLink>
      <NavLink className={css.signIn} to="/SignIn">
        Sign In
      </NavLink>
    </>
  );
};

export default Navigation;
