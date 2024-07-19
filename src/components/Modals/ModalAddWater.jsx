import React from 'react';
import css from './ModalAddWater.module.css';
import useWaterState from './WaterState.jsx';
import Iconsvg from './MyIcons/MyIcons.jsx';
import useModal from '../OpenCloseModal.jsx';

const ModalAddWater = () => {
  const { waterAmount, increaseWaterAmount, decreaseWaterAmount, setWaterAmount } = useWaterState();
  const { isModalOpen, handleCloseModal } = useModal();

  return (
    <div className={css.modalwrapper} style={{ display: isModalOpen ? 'block' : 'none' }}>
      <button className={css.close_button} onClick={handleCloseModal}>
         <Iconsvg width="28px" height="28px" iconName="modal-close"/>
      </button>
      <h1 className={css.title}>Add water</h1>
      <h2 className={css.subtitle}>Choose a value:</h2>

      <div className={css.waterwrapper}>
        <h3 className={css.amount_water}>Amount of water: {waterAmount}</h3>
        <div>
          <button className={css.button_water} onClick={decreaseWaterAmount}><span className={css.pl_min}>-</span></button>
          <button className={css.button_ml}>{waterAmount}ml</button>
          <button className={css.button_water} onClick={increaseWaterAmount}><span className={css.pl_min}>+</span></button>
        </div>
      </div>
      <div className={css.button_wrapper}>
        <h3 className={css.amount_water}>Recording time:</h3>
        <input type="text" />
        <h2 className={css.subtitle}>Enter the value of the water used:</h2>
        <input type="number" value={waterAmount} onChange={(e) => setWaterAmount(e.target.value)} />
      </div>
      <button className={css.button_save}>Save</button>
    </div>
  );
};

export default ModalAddWater;