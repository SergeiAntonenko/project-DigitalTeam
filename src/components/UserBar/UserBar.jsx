import UserPanelAvatar from '../UserPanelAvatar/UserPanelAvatar';
import css from './UserBar.module.css';
import { IoChevronDown } from 'react-icons/io5';

export const UserBar = () => {
  return (
    <button type="button" className={css.dropdown}>
      <div className={css.button}>
        <span className={css.userName}> Nadia </span>
        <UserPanelAvatar />
        <IoChevronDown className={css.chevron} />
      </div>
    </button>
  );
};
