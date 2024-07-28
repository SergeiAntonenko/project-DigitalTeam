import { useDispatch } from 'react-redux';
import { getGoogleUrl } from '../../redux/auth/operations';
import css from './GoogleAuth.module.css';
import { useEffect, useState } from 'react';

const GoogleAuthButton = () => {
  const dispatch = useDispatch();
  const [authUrl, setAuthUrl] = useState('');

  const handleGoogleOAuth = async () => {
    // console.log('work');
    try {
      const resultAction = await dispatch(getGoogleUrl());
      if (getGoogleUrl.fulfilled.match(resultAction)) {
        const url = resultAction.payload;
        if (url) {
          setAuthUrl(url);
        }
      }
      console.log('work', resultAction);
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
      {authUrl && <p>Redirecting to: {authUrl}</p>}
    </div>
  );
};

export default GoogleAuthButton;
