import css from './WaterItem.module.css';
import { IconGlass } from '../../shared/icons/IconGlass';
import { FiTrash } from 'react-icons/fi';
import { FiEdit2 } from 'react-icons/fi';
import { useState } from 'react';
import ModalDelete from '../Modals/DeleteWaterModal/DeleteWaterModal';
import ModalEditWater from '../Modals/EditWater/EditWater';
import Modal from '../../shared/components/Modal/Modal';
import { useSelector } from 'react-redux';
import { selectDate } from '../../redux/date/dateSlice';

const WaterItem = ({ item: { _id: id, amount, time } }) => {
  const [isModaDeleteOpen, setIsModaDeleteOpen] = useState(false);
  const [isModalEditWaterOpen, setIsModalEditWaterOpen] = useState(false);

  const date = useSelector(selectDate);

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

  const formattedAmount =
    amount >= 1000 ? `${(amount / 1000).toFixed(1).replace('.0', '')}${'L'}` : `${amount}${'Ml'}`;
  return (
    <>
      <li>
        <div className={css.center}>
          <div className={css.div1}>
            <IconGlass className={css.div1} />
          </div>
          <div className={css.div2}>
            <p className={css.text_value}>{formattedAmount}</p>
            <p className={css.text_time}>{time}</p>
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
              <ModalDelete handleCloseModal={handleCloseModalDelete} entry={{ id, date }} />
            </Modal>
          )}
          {isModalEditWaterOpen && (
            <Modal handleCloseModal={handleCloseModalEditWater}>
              <ModalEditWater handleCloseModal={handleCloseModalEditWater} entry={{ id, amount }} />
            </Modal>
          )}
        </div>
      </li>
    </>
  );
};

export default WaterItem;
