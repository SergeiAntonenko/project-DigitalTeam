import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import css from './LogOut.module.css';
import Iconsvg from '../MyIcons/MyIcons.jsx';
import Modal from '../../../shared/components/Modal/Modal.jsx';
import { logout } from '../../../redux/auth/operations.js';
import { toast } from 'react-hot-toast';

const LogOutModal = ({ handleCloseModal }) => {
  const dispatch = useDispatch();


  const onLogOut = async () => {
    try {
      await dispatch(logout());

      toast.success('Successfully logged out!', {
        style: {
          background: '#28a745',
          color: '#ffffff',
        },
      });

      handleCloseModal();
    } catch (error) {
      toast.error('Something went wrong. Please try again.', {
        style: {
          background: '#dc3545',
          color: '#ffffff',
        },
      });
    }
  };

 

  useEffect(() => {
    const handleEscapeKey = e => {
      if (e.key === 'Escape') {
        handleCloseModal();
      }
    };

    document.addEventListener('keydown', handleEscapeKey);

    return () => {
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, []);

  return (
    <>
    
      <Modal handleCloseModal={handleCloseModal}>
        <div className={css.modal_content}>
          <button className={css.close_button} onClick={handleCloseModal}>
            <Iconsvg width="28px" height="28px" iconName="modal-close" />
          </button>
          <h1 className={css.log_out}>Log out</h1>
          <h2 className={css.text}>Do you really want to leave?</h2>
          <div className={css.button_container}>
            <button onClick={onLogOut} className={css.logout_button}>
              Log out
            </button>
            <button onClick={handleCloseModal} className={css.cancel_button}>
              Cancel
            </button>
          </div>
        </div>
      </Modal>
      {/* )} */}
    </>
  );
};

export default LogOutModal;
