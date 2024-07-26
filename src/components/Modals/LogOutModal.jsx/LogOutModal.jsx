// import React, { useState, useEffect } from 'react';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import css from './LogOut.module.css';
import Iconsvg from '../MyIcons/MyIcons.jsx';
import Modal from '../../../shared/components/Modal/Modal.jsx';
import { logout } from '../../../redux/auth/operations.js';
import { toast } from 'react-hot-toast';
import { useTranslation } from 'react-i18next';

const LogOutModal = ({ handleCloseModal }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  // const [isModalOpen, setIsModalOpen] = useState(true);

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

  // const handleCloseModal = () => {
  //   setIsModalOpen(false);
  // };

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
      {/* {isModalOpen && ( */}
      <Modal handleCloseModal={handleCloseModal}>
        <div className={css.modal_content}>
          <button className={css.close_button} onClick={handleCloseModal}>
            <Iconsvg width="28px" height="28px" iconName="modal-close" />
          </button>
          <h1 className={css.log_out}>{t('log-out-modal.log-out')}</h1>
          <h2 className={css.text}>{t('log-out-modal.want-to-leave')}</h2>
          <div className={css.button_container}>
            <button onClick={onLogOut} className={css.logout_button}>
              {t('log-out-modal.log-out')}
            </button>
            <button onClick={handleCloseModal} className={css.cancel_button}>
              {t('log-out-modal.cancel')}
            </button>
          </div>
        </div>
      </Modal>
      {/* )} */}
    </>
  );
};

export default LogOutModal;
