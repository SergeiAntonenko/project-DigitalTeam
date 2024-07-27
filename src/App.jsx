import { Route, Routes } from 'react-router-dom';
import { lazy, useEffect } from 'react';
import Layout from './components/Layout/Layout.jsx';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import RestrictedRoute from './components/RestrictedRoute/RestrictedRoute';
import { useDispatch, useSelector } from 'react-redux';
import { selectIsLoading, selectIsRefreshing } from './redux/auth/selectors.js';
import { refreshUser } from './redux/auth/operations.js';
import { WaterLoader } from './loader/loader.jsx';
const HomePage = lazy(() => import('./pages/HomePage/HomePage.jsx'));
const SignInPage = lazy(() => import('./pages/SignInPage/SignInPage.jsx'));
const SignUpPage = lazy(() => import('./pages/SignUpPage/SignUpPage.jsx'));
const TrackerPage = lazy(() => import('./pages/TrackerPage/TrackerPage.jsx'));
// import WaterForm from './components/Modals/WaterForm/WaterForm.jsx';

export const App = () => {
  const isRefreshing = useSelector(selectIsRefreshing);
  const isLoading = useSelector(selectIsLoading);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(refreshUser());
  }, [dispatch]);

  return isRefreshing || isLoading ? (
    <WaterLoader />
  ) : (
    <div>
      {/* <WaterForm/> */}

      <Layout>
        <Routes>
          {/* <Route path="/" element={<HomePage />} /> */}
          <Route
            path="/"
            element={<RestrictedRoute redirectTo="/tracker" component={<HomePage />} />}
          />
          {/* <Route path="/signup" element={<SignUpPage />} />
          <Route path="/signin" element={<SignInPage />} /> */}

          <Route
            path="/signup"
            redirectTo="/tracker"
            element={<RestrictedRoute component={<SignUpPage />} />}
          />
          <Route
            path="/signin"
            element={<RestrictedRoute redirectTo="/tracker" component={<SignInPage />} />}
          />
          <Route
            path="/tracker"
            element={<PrivateRoute redirectTo="/signin" component={<TrackerPage />} />}
          />
        </Routes>
      </Layout>
    </div>
  );
};
