import React, { useEffect } from 'react';
import s from './Modal.module.css';
import Iconsvg from '../../../components/Modals/MyIcons/MyIcons';

const Modal = ({ children, handleCloseModal }) => {
  const handleEscapeKey = e => {
    if (e.key === 'Escape') {
      handleCloseModal();
    }
  }; 

  useEffect(() => {
    document.addEventListener('keydown', handleEscapeKey);
    return () => {
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, []);

  return (
    <section onClick={handleCloseModal} className={s.backdrop}>
      <div className={s.container} onClick={e => e.stopPropagation()}>
        <button className={s.closeButton} onClick={handleCloseModal}>
          <Iconsvg width="28px" height="28px" iconName="modal-close" />
        </button>
        {children}
      </div>
    </section>
  );
};

export default Modal;
