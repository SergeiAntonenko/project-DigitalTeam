import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { verifyGoogleOAuth } from '../../redux/auth/operations.js';
import { WaterLoader } from '../../loader/loader.jsx';
import { selectIsLoggedIn } from '../../redux/auth/selectors.js';

const GoogleOAuthCallback = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const { isLoggeIn } = useSelector(selectIsLoggedIn);

  useEffect(() => {
    const handleGoogleOAuth = async () => {
      const params = new URLSearchParams(location.search);
      const code = params.get('code');

      if (code) {
        try {
          const resultAction = await dispatch(verifyGoogleOAuth(code));
          console.log(resultAction);
          if (verifyGoogleOAuth.fulfilled.match(resultAction)) {
            // isLoggeIn = true;
            //https://project-digital-team.vercel.app/
            navigate('/tracker');
          }
        } catch (err) {
          console.error(err);
        }
      } else {
        console.error('No code found in URL');
      }
    };

    handleGoogleOAuth();
  }, [dispatch, location.search, navigate, isLoggeIn]);

  // useEffect(() => {
  //   if (isLoggeIn) {
  //     navigate('/tracker');
  //   }
  // }, [isLoggeIn, navigate]);

  return (
    <>
      <WaterLoader />
    </>
  );
};

export default GoogleOAuthCallback;
