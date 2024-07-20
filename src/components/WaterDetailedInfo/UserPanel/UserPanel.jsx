import { UserBar } from '../../UserPanel/UserBar/UserBar';
import css from '../UserPanel/UserPanel.module.css';

export const UserPanel = () => {
  return (
    <div className={css.userPanel}>
      <p className={css.text}>
        Hello, <strong> Nadia!</strong>
      </p>
      <UserBar />
    </div>
  );
};
