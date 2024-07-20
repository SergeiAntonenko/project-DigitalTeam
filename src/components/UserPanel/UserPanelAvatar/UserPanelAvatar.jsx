import s from './UserPanelAvatar.module.css';
import defaultAvatar from './Rectangle22x-min.png';

const UserPanelAvatar = () => {
  return (
    <div className={s.thumb}>
      <img src={defaultAvatar} alt="User avatar" className={s.img} />
    </div>
  );
};

export default UserPanelAvatar;
