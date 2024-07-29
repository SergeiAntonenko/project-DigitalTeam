import css from './AddWaterBtn.module.css';
import { FiPlus } from 'react-icons/fi';
import { useState } from 'react';
import WaterModal from '../Modals/WaterModal/WaterModal';
import { useTranslation } from 'react-i18next';
import Modal from '../../shared/components/Modal/Modal';

const AddWaterBtn = () => {
  const { t } = useTranslation();
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
        {t('shared.add-water-btn')}
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
