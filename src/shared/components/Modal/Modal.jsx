import React, { useEffect } from 'react';
import s from './Modal.module.css';
import Iconsvg from '../../../images/Icons/Icons';

const Modal = ({ children, handleCloseModal }) => {
  const handleEscapeKey = e => {
    if (e.key === 'Escape') {
      handleCloseModal();
    }
  };

  useEffect(() => {
    const getScrollbarWidth = () => {
      return window.innerWidth - document.documentElement.clientWidth;
    };

    const scrollbarWidth = getScrollbarWidth();
    const originalStyle = window.getComputedStyle(document.body).overflow;
    const originalPaddingRight = window.getComputedStyle(document.body).paddingRight;
    const originalScrollPosition = window.scrollY;

    document.body.style.overflow = 'hidden';
    document.body.style.paddingRight = `${scrollbarWidth}px`;
    window.scrollTo(0, originalScrollPosition);

    document.addEventListener('keydown', handleEscapeKey);

    return () => {
      document.body.style.overflow = originalStyle;
      document.body.style.paddingRight = originalPaddingRight;
      window.scrollTo(0, originalScrollPosition);
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, []);

  return (
    <section onClick={handleCloseModal} className={s.backdrop}>
      <div className={s.container} onClick={e => e.stopPropagation()}>
        <button className={s.closeButton} onClick={handleCloseModal}>
          <Iconsvg className={s.closeIcon} iconName="icon-close" />
        </button>
        {children}
      </div>
    </section>
  );
};

export default Modal;
