// import { useDispatch } from 'react-redux';
// import css from './DeleteWaterModal.module.css';
// import { deleteWater } from '../../../redux/water/operations.js';
// import toast from 'react-hot-toast';
// import { useTranslation } from 'react-i18next';

// const DeleteModal = ({ handleCloseModal, water }) => {
//   const { t } = useTranslation();
//   const dispatch = useDispatch();

//   const handleDeleteConfirm = () => {
//     try {
//       dispatch(deleteWater(water._id));
//       toast.success('The amount of water consumed has been successfully deleted.');
//     } catch (error) {
//       toast.error('Something went wrong. Please try again.');
//     }
//     handleCloseModal();
//   };

//   return (
//     <>
//       <h1 className={css.delete_entry}>{t('delete-water-modal.delete-entry')}</h1>
//       <h2 className={css.text}>{t('delete-water-modal.are-you-sure')}</h2>
//       <div className={css.button_container}>
//         <button onClick={handleDeleteConfirm} className={css.delete_button}>
//           {t('delete-water-modal.delete')}
//         </button>
//         <button onClick={handleCloseModal} className={css.cancel_button}>
//           {t('log-out-modal.cancel')}
//         </button>
//       </div>
//     </>
//   );
// };

// export default DeleteModal;
// =====================================================
import { useDispatch } from 'react-redux';
import css from './DeleteWaterModal.module.css';
import { deleteWater } from '../../../redux/water/operations.js';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';

const DeleteModal = ({ handleCloseModal, water }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const handleDeleteConfirm = () => {
    try {
      dispatch(deleteWater(water));
      toast.success('The amount of water consumed has been successfully deleted.');
    } catch (error) {
      toast.error('Something went wrong. Please try again.');
    }
    handleCloseModal();
  };

  return (
    <>
      <h1 className={css.delete_entry}>{t('delete-water-modal.delete-entry')}</h1>
      <h2 className={css.text}>{t('delete-water-modal.are-you-sure')}</h2>
      <div className={css.button_container}>
        <button onClick={handleDeleteConfirm} className={css.delete_button}>
          {t('delete-water-modal.delete')}
        </button>
        <button onClick={handleCloseModal} className={css.cancel_button}>
          {t('log-out-modal.cancel')}
        </button>
      </div>
    </>
  );
};

export default DeleteModal;
