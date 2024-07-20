import { lazy } from "react";
import { Route, Routes } from "react-router-dom";

const HomePage = lazy(() => import("../src/pages/HomePage/HomePage.jsx"));

export const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<HomePage />} />
      </Routes>
    </div>
  );
};
