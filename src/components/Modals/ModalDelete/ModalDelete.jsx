// import React from 'react';
// import css from './ModalDelete.module.css';
// import Iconsvg from '../MyIcons/MyIcons.jsx';
// import useModal from '../ModalAdd/OpenCloseModal.jsx';

// const ModalDelete = ({ handleDelete }) => {
//   const { isModalOpen, handleCloseModal, handleDeleteConfirm } = useModal(handleDelete);

//   return (
//     <div className={css.modalwrapper} style={{ display: isModalOpen ? 'block' : 'none' }}>
//       <div className={css.modal_background} onClick={handleCloseModal}></div>
//       <div className={css.modal_content}>
//         <button className={css.close_button} onClick={handleCloseModal}>
//           <Iconsvg width="28px" height="28px" iconName="modal-close" />
//         </button>
//         <h1 className={css.delete_entry}>Delete Entry</h1>
//         <h2 className={css.text}>Are you sure you want to delete the entry?</h2>
//         <div className={css.button_container}>
//           <button onClick={handleDeleteConfirm} className={css.delete_button}>
//             Delete
//           </button>
//           <button onClick={handleCloseModal} className={css.cancel_button}>
//             Cancel
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ModalDelete;
// =====================================================================
import css from './ModalDelete.module.css';
import Iconsvg from '../MyIcons/MyIcons.jsx';
import useModal from '../ModalAdd/OpenCloseModal.jsx';

const ModalDelete = ({ handleDelete, handleCloseModal }) => {
  const { isModalOpen, handleDeleteConfirm } = useModal(handleDelete);

  return (
    <div className={css.modalwrapper} style={{ display: isModalOpen ? 'block' : 'none' }}>
      <div className={css.modal_background} onClick={handleCloseModal}></div>
      <div className={css.modal_content}>
        <button className={css.close_button} onClick={handleCloseModal}>
          <Iconsvg width="28px" height="28px" iconName="modal-close" />
        </button>
        <h1 className={css.delete_entry}>Delete Entry</h1>
        <h2 className={css.text}>Are you sure you want to delete the entry?</h2>
        <div className={css.button_container}>
          <button onClick={handleDeleteConfirm} className={css.delete_button}>
            Delete
          </button>
          <button onClick={handleCloseModal} className={css.cancel_button}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalDelete;
