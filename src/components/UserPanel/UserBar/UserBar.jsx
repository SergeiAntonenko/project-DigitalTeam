import UserPanelAvatar from '../UserPanelAvatar/UserPanelAvatar';

import css from './UserBar.module.css';

export const UserBar = () => {
  return (
    <div className={css.dropdown}>
      <div className={css.button}>
        <span className={css.userName}> Nadia </span>
        <UserPanelAvatar />
      </div>
    </div>
  );
};
