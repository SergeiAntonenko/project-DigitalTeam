import css from './AddWaterBtn.module.css';
import { FiPlus } from 'react-icons/fi';
import { useState } from 'react';
import Modal from '../../../shared/components/Modal/Modal.jsx';
import WaterModal from '../../Modals/WaterModal/WaterModal.jsx';

const AddWaterBtn = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <button className={css.addWaterBtn} onClick={handleOpenModal}>
        <span className={css.iconCircle}>
          <FiPlus className={css.addWaterIcon} />
        </span>
        Add water
      </button>

      {isModalOpen && (
        <Modal handleCloseModal={handleCloseModal}>
          <WaterModal
            isModalOpen={isModalOpen} 
            onCloseModal={handleCloseModal} 
            operationType={'add'}
          />
        </Modal>
      )}
    </>
  );
};

export default AddWaterBtn;