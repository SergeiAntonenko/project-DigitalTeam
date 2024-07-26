import css from './WaterItemStub.module.css';
import { IconGlass } from '../../shared/icons/IconGlass';
import { FiTrash } from 'react-icons/fi';
import { FiEdit2 } from 'react-icons/fi';
import { useState } from 'react';
import ModalDelete from '../Modals/DeleteWaterModal/DeleteWaterModal';
import ModalEditWater from '../Modals/EditWater/EditWater';
import Modal from '../../shared/components/Modal/Modal';

const WaterItemStub = () => {
  const [isModaDeleteOpen, setIsModaDeleteOpen] = useState(false);
  const [isModalEditWaterOpen, setIsModalEditWaterOpen] = useState(false);

  const handleCloseModalDelete = () => {
    setIsModaDeleteOpen(false);
  };

  const handleOpenModalDelete = () => {
    setIsModaDeleteOpen(true);
  };
  const handleCloseModalEditWater = () => {
    setIsModalEditWaterOpen(false);
  };

  const handleOpenModalEditWater = () => {
    setIsModalEditWaterOpen(true);
  };

  return (
    <div className={css.center}>
      <div className={css.div1}>
        <IconGlass className={css.div1} />
      </div>
      <div className={css.div2}>
        <p className={css.text_value}>250 ml</p>
        <p className={css.text_time}>7:00 AM</p>
      </div>
      <div className={css.buttonContainer}>
        <button type="button" className={css.button1} onClick={handleOpenModalEditWater}>
          <FiEdit2 className={css.edit} />
        </button>
        <button type="button" className={css.button2} onClick={handleOpenModalDelete}>
          <FiTrash className={css.edit} />
        </button>
      </div>
      {isModaDeleteOpen && (
        <Modal handleCloseModal={handleCloseModalDelete}>
          <ModalDelete handleCloseModal={handleCloseModalDelete} />
        </Modal>
      )}
      {isModalEditWaterOpen && (
        <Modal handleCloseModal={handleCloseModalEditWater}>
          <ModalEditWater handleCloseModal={handleCloseModalEditWater} />
        </Modal>
      )}
    </div>
  );
};

export default WaterItemStub;
