import css from './WaterItem.module.css';
import { IconGlass } from '../../shared/icons/IconGlass';
import { FiTrash } from 'react-icons/fi';
import { FiEdit2 } from 'react-icons/fi';
import { useState } from 'react';
import ModalDelete from '../Modals/DeleteWaterModal/DeleteWaterModal';
import WaterModal from '../Modals/WaterModal/WaterModal';
import Modal from '../../shared/components/Modal/Modal';
import { useSelector } from 'react-redux';
import { selectWaterLoading } from '../../redux/water/selectors';

const WaterItem = ({ item }) => {
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

  const isWaterLoading = useSelector(selectWaterLoading);

  const formattedAmount =
    item.waterValue >= 1000
      ? `${(item.waterValue / 1000).toFixed(1).replace('.0', '')}${' l'}`
      : `${item.waterValue}${' ml'}`;

  return (
    isWaterLoading && (
      <div className={css.center}>
        <div className={css.div1}>
          <IconGlass className={css.div1} />
        </div>
        <div className={css.div2}>
          <span className={css.value}>{formattedAmount}</span>
          <span className={css.time}>{item.localTime}</span>
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
          <WaterModal isModalOpen={isModalEditWaterOpen} onCloseModal={handleCloseModalEditWater} />
        )}
      </div>
    )
  );
};

export default WaterItem;
