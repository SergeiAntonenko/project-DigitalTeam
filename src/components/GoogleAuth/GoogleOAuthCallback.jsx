import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { verifyGoogleOAuth } from '../../redux/auth/operations.js';
import { WaterLoader } from '../../loader/loader.jsx';

const GoogleOAuthCallback = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleGoogleOAuth = async () => {
      const params = new URLSearchParams(location.search);
      const code = params.get('code');

      if (code) {
        try {
          const resultAction = await dispatch(verifyGoogleOAuth({ code }));
          if (verifyGoogleOAuth.fulfilled.match(resultAction)) {
            navigate.push('/');
          }
        } catch (err) {
          console.log(err);
        }
      }
    };

    handleGoogleOAuth();
  }, [dispatch, location.search, navigate]);

  return <WaterLoader />;
};

export default GoogleOAuthCallback;
