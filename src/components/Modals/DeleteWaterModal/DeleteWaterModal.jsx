import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import css from './DeleteWaterModal.module.css';
import Iconsvg from '../../../images/Icons/Icons.jsx';
import { deleteWater } from '../../../redux/water/operations.js';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';

const DeleteModal = ({ handleCloseModal, water, selectedWaterData }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const handleDeleteConfirm = async () => {
    try {
      await dispatch(deleteWater(water));
      console.log('Water deleted successfully');
      toast.success('The amount of water consumed has been successfully deleted.');
    } catch (error) {
      console.error('Error deleting water:', error);
      toast.error('Something went wrong. Please try again.');
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
      <div className={css.modalwrapper}>
        <div className={css.modal_background} onClick={handleCloseModal}></div>
        <div className={css.modal_content}>
          <button className={css.close_button} onClick={handleCloseModal}>
            <Iconsvg width="28px" height="28px" iconName="modal-close" />
          </button>
          <h1 className={css.delete_entry}>{t('delete-water-modal.delete-entry')}</h1>
          <h2 className={css.text}>{t('delete-water-modal.are-you-sure')}</h2>
          <div className={css.button_container}>
            <button onClick={handleDeleteConfirm} className={css.delete_button}>
              {t('delete-water-modal.delete')}
            </button>
            <button onClick={handleCloseModal} water={selectedWaterData} className={css.cancel_button}>
          {t('log-out-modal.cancel')}
              </button>
          
          </div>
        </div>
      </div>
    </>
  );
};

export default DeleteModal;
