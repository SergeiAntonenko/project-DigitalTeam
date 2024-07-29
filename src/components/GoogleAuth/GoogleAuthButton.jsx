import { useDispatch } from 'react-redux';
import { getGoogleUrl } from '../../redux/auth/operations';
import css from './GoogleAuthButton.module.css';
import { useEffect, useState } from 'react';

const GoogleAuthButton = () => {
  const dispatch = useDispatch();
  const [authUrl, setAuthUrl] = useState('');

  const handleGoogleOAuth = async () => {
    try {
      const resultAction = await dispatch(getGoogleUrl());
      if (getGoogleUrl.fulfilled.match(resultAction)) {
        const url = resultAction.payload;
        console.log(url);
        if (url) {
          setAuthUrl(url);
        }
      } else {
        console.error('Failed to get Google OAuth URL');
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (authUrl) {
      window.location.replace(authUrl);
    }
  }, [authUrl]);

  return (
    <div>
      <button className={css.googleButton} type="button" onClick={handleGoogleOAuth}>
        Continue with Google
      </button>
    </div>
  );
};

export default GoogleAuthButton;
