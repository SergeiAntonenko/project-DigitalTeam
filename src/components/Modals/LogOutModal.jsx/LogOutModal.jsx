import { useDispatch } from 'react-redux';
import css from './LogOut.module.css';
import { logout } from '../../../redux/auth/operations.js';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';

const LogOutModal = ({ handleCloseModal }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const onLogOut = async () => {
    try {
      await dispatch(logout());

      toast.success('Successfully logged out!');

      handleCloseModal();
    } catch (error) {
      toast.error('Something went wrong. Please try again.');
    }
  };

  return (
    <>
      <h2 className={css.log_out}>{t('log-out-modal.log-out')}</h2>
      <div className={css.text}>{t('log-out-modal.want-to-leave')}</div>
      <div className={css.button_container}>
        <button onClick={onLogOut} className={css.logout_button}>
          {t('log-out-modal.log-out')}
        </button>
        <button onClick={handleCloseModal} className={css.cancel_button}>
          {t('log-out-modal.cancel')}
        </button>
      </div>
    </>
  );
};

export default LogOutModal;
