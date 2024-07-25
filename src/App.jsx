import { Route, Routes } from 'react-router-dom';
import { lazy } from 'react';
import Layout from './components/Layout/Layout.jsx';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
// import RestrictedRoute from './components/RestrictedRoute/RestrictedRoute';
import WaterForm from './components/Modals/WaterModal/WaterModal.jsx';
import Logout from './components/Modals/LogOutModal.jsx/LogOutModal.jsx';
import ModalDelete from './components/Modals/ModalDelete/ModalDelete.jsx'
import WaterModal from './components/Modals/WaterModal/WaterModal.jsx';

const HomePage = lazy(() => import('./pages/HomePage/HomePage.jsx'));
const SignInPage = lazy(() => import('./pages/SignInPage/SignInPage.jsx'));
const SignUpPage = lazy(() => import('./pages/SignUpPage/SignUpPage.jsx'));
const TrackerPage = lazy(() => import('./pages/TrackerPage/TrackerPage.jsx'));

export const App = () => {
  return (
    <div>
      <WaterForm />
      <WaterModal />
      <Logout />
      <ModalDelete />


        <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          {/* <Route path="/" element={<RestrictedRoute redirectTo="/tracker" component={<HomePage />} />} /> */}
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/signin" element={<SignInPage />} />

          {/* <Route
            path="/signup"
            element={<RestrictedRoute redirectTo="/" component={<SignUpPage />} />}
          />
          <Route
            path="/signin"
            element={<RestrictedRoute redirectTo="/" component={<SignInPage />} />}
          /> */}
          <Route
            path="/tracker"
            element={<PrivateRoute redirectTo="/signin" component={<TrackerPage />} />}
          />
        </Routes>
      </Layout>
    </div>
  );
};
