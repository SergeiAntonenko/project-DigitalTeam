// import React, { useEffect } from 'react';
// import s from './Modal.module.css';
// import Iconsvg from '../../../images/Icons/Icons';

// const Modal = ({ children, handleCloseModal }) => {
//   const handleEscapeKey = e => {
//     if (e.key === 'Escape') {
//       handleCloseModal();
//     }
//   };

//   useEffect(() => {
//     document.addEventListener('keydown', handleEscapeKey);
//     document.body.style.overflow = 'hidden';
//     return () => {
//       document.removeEventListener('keydown', handleEscapeKey);
//       document.body.style.overflow = 'auto';
//     };
//   }, []);

//   return (
//     <section onClick={handleCloseModal} className={s.backdrop}>
//       <div className={s.container} onClick={e => e.stopPropagation()}>
//         <button className={s.closeButton} onClick={handleCloseModal}>
//           <Iconsvg className={s.closeIcon} iconName="icon-close" />
//         </button>
//         {children}
//       </div>
//     </section>
//   );
// };

// export default Modal;

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
    document.addEventListener('keydown', handleEscapeKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleEscapeKey);
      document.body.style.overflow = 'auto';
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
