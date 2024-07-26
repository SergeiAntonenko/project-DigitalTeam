import React from 'react';
import { useDispatch } from 'react-redux';
import css from './DeleteWaterModal.module.css';
import Iconsvg from '../MyIcons/MyIcons.jsx';
import { deleteWater } from "../../../redux/water/operations.js";
import Modal from '../../../shared/components/Modal/Modal.jsx';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const DeleteModal = ({ closeDeleteModal, waterId }) => {
  const dispatch = useDispatch();
  
  const handleDelete = async () => {
    try {
      await dispatch(deleteWater(waterId));
      toast.success('Entry deleted successfully');
      closeDeleteModal();
    } catch (error) {
      toast.error('Failed to delete entry');
    }
  };

  const handleClose = () => {
    closeDeleteModal();
  };

  return (
    <Modal>
      <div className={css.modalwrapper}>
        <div className={css.modal_background} onClick={handleClose}></div>
        <div className={css.modal_content}>
          <button className={css.close_button} onClick={handleClose}>
            <Iconsvg width="28px" height="28px" iconName="modal-close" />
          </button>
          <h1 className={css.delete_entry}>Delete Entry</h1>
          <h2 className={css.text}>Are you sure you want to delete the entry?</h2>
          <div className={css.button_container}>
            <button onClick={handleDelete} className={css.delete_button}>Delete</button>
            <button onClick={handleClose} className={css.cancel_button}>Cancel</button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default DeleteModal;