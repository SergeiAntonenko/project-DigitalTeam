import { Route, Routes } from 'react-router-dom';
import { lazy, useEffect } from 'react';
import Layout from './components/Layout/Layout.jsx';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import RestrictedRoute from './components/RestrictedRoute/RestrictedRoute';
<<<<<<< HEAD
import WaterForm from './components/Modals/WaterForm/WaterForm.jsx';
import Logout from './components/Modals/LogOutModal.jsx/LogOutModal.jsx';
import ModalDelete from './components/Modals/ModalDelete/ModalDelete.jsx'
// import WaterModal from './components/Modals/WaterModal/WaterModal.jsx';

=======
import { useDispatch, useSelector } from 'react-redux';
import { selectIsRefreshing } from './redux/auth/selectors.js';
import { refreshUser } from './redux/auth/operations.js';
import { WaterLoader } from './loader/loader.jsx';
>>>>>>> main
const HomePage = lazy(() => import('./pages/HomePage/HomePage.jsx'));
const SignInPage = lazy(() => import('./pages/SignInPage/SignInPage.jsx'));
const SignUpPage = lazy(() => import('./pages/SignUpPage/SignUpPage.jsx'));
const TrackerPage = lazy(() => import('./pages/TrackerPage/TrackerPage.jsx'));

export const App = () => {
  const isRefreshing = useSelector(selectIsRefreshing);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(refreshUser());
  }, [dispatch]);

  return isRefreshing ? (
    <WaterLoader />
  ) : (
    <div>
<<<<<<< HEAD
      <WaterForm />
      {/* <WaterModal /> */}
      <Logout />
      <ModalDelete />


        <Layout>
=======
      <Layout>
>>>>>>> main
        <Routes>
          <Route path="/" element={<HomePage />} />
          {/* <Route path="/" element={<RestrictedRoute redirectTo="/tracker" component={<HomePage />} />} /> */}
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
