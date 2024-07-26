import css from './AddWaterBtn.module.css';
import { FiPlus } from 'react-icons/fi';
import { useState } from 'react';
import Modal from '../../../shared/components/Modal/Modal.jsx';
import WaterForm from '../../Modals/WaterForm/WaterForm.jsx';

const AddWaterBtn = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <button className={css.addWaterBtn} onClick={handleModalOpen}>
        <span className={css.iconCircle}>
          <FiPlus className={css.addWaterIcon} />
        </span>
        Add water
      </button>
      {isModalOpen && (
        <Modal handleCloseModal={handleCloseModal}>
          <WaterForm operationType="add" />
        </Modal>
      )}
    </>
  );
};

export default AddWaterBtn;