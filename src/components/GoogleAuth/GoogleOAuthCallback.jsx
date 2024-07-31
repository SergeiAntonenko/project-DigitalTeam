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
  const isLoggedIn = useSelector(selectIsLoggedIn);

  useEffect(() => {
    const handleGoogleOAuth = async () => {
      const params = new URLSearchParams(location.search);
      const code = params.get('code');

      if (code) {
        try {
          const resultAction = await dispatch(verifyGoogleOAuth(code));
          if (verifyGoogleOAuth.fulfilled.match(resultAction)) {
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
  }, [dispatch, location.search, navigate]);

  useEffect(() => {
    if (isLoggedIn) {
      navigate('/tracker');
    }
  }, [isLoggedIn, navigate]);

  return (
    <>
      <WaterLoader />
    </>
  );
};

export default GoogleOAuthCallback;
