import { useState } from 'react';
import { UserBar } from '../UserBar/UserBar';
import css from './UserPanel.module.css';
import { useSelector } from 'react-redux';
import { selectUser } from '../../redux/users/selectors';

export const UserPanel = () => {
  const userState = useSelector(selectUser);
  const userName = userState.name;

  return (
    <div className={css.userPanel}>
      <p className={css.text}>
        Hello, <strong>{userName}!</strong>
      </p>
      <UserBar userName={userName} />
    </div>
  );
};
