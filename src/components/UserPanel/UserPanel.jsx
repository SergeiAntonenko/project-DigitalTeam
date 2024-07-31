import { useState } from 'react';
import { UserBar } from '../UserBar/UserBar';
import css from './UserPanel.module.css';
import { useSelector } from 'react-redux';
import { selectUser } from '../../redux/users/selectors';
import { useTranslation } from 'react-i18next';

export const UserPanel = () => {
  const { t } = useTranslation();
  let userName = 'User';
  const userState = useSelector(selectUser);
  if (userState && userState.name) {
    userName = userState.name;
  }

  return (
    <div className={css.userPanel}>
      <p className={css.text}>
        {t('user-panel.hello')}, <strong>{userName}!</strong>
      </p>
      <UserBar userName={userName} />
    </div>
  );
};
