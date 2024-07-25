<<<<<<< HEAD
import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
=======
// import React from 'react';
// import css from './LogOut.module.css';
// import Iconsvg from '../MyIcons/MyIcons.jsx';
// import useModal from '../ModalAdd/OpenCloseModal.jsx';

// const Logout = ({ handleDelete }) => {
//   const { isModalOpen, handleCloseModal, handleDeleteConfirm } = useModal(handleDelete);

//   return (
//     <div className={css.modalwrapper} style={{ display: isModalOpen ? 'block' : 'none' }}>
//       <div className={css.modal_background} onClick={handleCloseModal}></div>
//       <div className={css.modal_content}>
//         <button className={css.close_button} onClick={handleCloseModal}>
//           <Iconsvg width="28px" height="28px" iconName="modal-close" />
//         </button>
//         <h1 className={css.log_out}>Log out</h1>
//         <h2 className={css.text}>Do you really want to leave?</h2>
//         <div className={css.button_container}>
//           <button onClick={handleDeleteConfirm} className={css.logout_button}>
//             Log out
//           </button>
//           <button onClick={handleCloseModal} className={css.cancel_button}>
//             Cancel
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Logout;
// ================================================
>>>>>>> main
import css from './LogOut.module.css';
import Iconsvg from '../MyIcons/MyIcons.jsx';
import Modal from '../../../shared/components/Modal/Modal.jsx';
import { logout } from "../../../redux/auth/operations.js";

<<<<<<< HEAD
const LogOutModal = () => {
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(true);

  const onLogOut = async () => {
    try {
      await dispatch(logout());
      alert("Successfully logged out!");
      handleCloseModal();
    } catch (error) {
      alert("Something went wrong. Please try again.");
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    const handleEscapeKey = (e) => {
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
      {isModalOpen && (
        <Modal handleCloseModal={handleCloseModal}>
          <div className={css.modal_content}>
            <button className={css.close_button} onClick={handleCloseModal}>
              <Iconsvg width="28px" height="28px" iconName="modal-close" />
            </button>
            <h1 className={css.log_out}>Log out</h1>
            <h2 className={css.text}>Do you really want to leave?</h2>
            <div className={css.button_container}>
              <button onClick={onLogOut} className={css.logout_button}>Log out</button>
              <button onClick={handleCloseModal} className={css.cancel_button}>Cancel</button>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
};

export default LogOutModal;
=======
const Logout = ({ handleDelete, handleCloseModal }) => {
  const { isModalOpen, handleDeleteConfirm } = useModal(handleDelete);

  return (
    <div className={css.modalwrapper} style={{ display: isModalOpen ? 'block' : 'none' }}>
      <div className={css.modal_background} onClick={handleCloseModal}></div>
      <div className={css.modal_content}>
        <button className={css.close_button} onClick={handleCloseModal}>
          <Iconsvg width="28px" height="28px" iconName="modal-close" />
        </button>
        <h1 className={css.log_out}>Log out</h1>
        <h2 className={css.text}>Do you really want to leave?</h2>
        <div className={css.button_container}>
          <button onClick={handleDeleteConfirm} className={css.logout_button}>
            Log out
          </button>
          <button onClick={handleCloseModal} className={css.cancel_button}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default Logout;
>>>>>>> main
