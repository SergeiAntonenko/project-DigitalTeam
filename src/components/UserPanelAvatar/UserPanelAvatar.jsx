import s from './UserPanelAvatar.module.css';
import defaultAvatar from './Rectangle22x-min.png';
import { useSelector } from 'react-redux';
import { selectUser } from '../../redux/users/selectors';
import { useEffect, useState } from 'react';

const UserPanelAvatar = () => {
  const user = useSelector(selectUser);
  const avatarURL = user.avatar || '';
  const [preview, setPreview] = useState(avatarURL || defaultAvatar);

  useEffect(() => {
    setPreview(avatarURL || defaultAvatar);
  }, [avatarURL]);

  return (
    <div className={s.thumb}>
      <img src={preview} alt="User avatar" className={s.img} />
    </div>
  );
};

export default UserPanelAvatar;
