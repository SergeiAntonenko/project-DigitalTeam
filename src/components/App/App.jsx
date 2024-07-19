import { lazy } from "react";
import { Route, Routes } from "react-router-dom";
import css from "../App/App.module.css";

const HomePage = lazy(() => import("../../pages/HomePage/HomePage.jsx"));

export const App = () => {
  return (
    <div className={css.container}>
      <Routes>
        <Route path="/" element={<HomePage />} />
      </Routes>
    </div>
  );
};
