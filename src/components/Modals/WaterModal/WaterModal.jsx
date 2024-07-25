import  { useState } from 'react';
import css from './WaterModal.module.css';
import useWaterState from '../WaterState.jsx';
import Iconsvg from '../MyIcons/MyIcons.jsx';

const WaterModal = ({ isModalOpen, onCloseModal, operationType }) => {
  const { waterAmount, increaseWaterAmount, decreaseWaterAmount, setWaterAmount } = useWaterState();
  const [recordingTime, setRecordingTime] = useState(
    new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  );

  const handleRecordingTimeChange = e => {
    setRecordingTime(e.target.value);
  };

  const title = operationType === 'add' ? 'Add water' : 'Edit water';

  return (
    <div className={isModalOpen ? css.modalwrapper : css.modalwrapperHidden}>
      <button className={css.button_close} onClick={onCloseModal}>
        <Iconsvg width="28px" height="28px" iconName="modal-close" />
      </button>
      <h1 className={css.title}>{title}</h1>
      <h2 className={css.subtitle}>Choose a value:</h2>
  
      <div className={css.waterwrapper}>
        <h3 className={css.amount_water}>Amount of water: {waterAmount} ml</h3>
  
        <div className={css.minplus_wrapper}>
          <button className={css.button_water} onClick={decreaseWaterAmount}>
            <span className={css.pl_min}>-</span>
          </button>
          <button className={css.button_ml}>{waterAmount} ml</button>
          <button className={css.button_water} onClick={increaseWaterAmount}>
            <span className={css.pl_min}>+</span>
          </button>
          
        </div>
      </div>
      <div className={css.button_wrapper}>
        <h3 className={css.time_water}>Recording time: {recordingTime}</h3>
        <input type="text" value={recordingTime} onChange={handleRecordingTimeChange} />
        <h2 className={css.subtitle}>Enter the value of the water used:</h2>
        <input type="number" value={waterAmount} onChange={e => setWaterAmount(e.target.value)} />
      </div>
      <button className={css.button_save}>
        Save
      </button>
    </div>
   
  );
};

export default WaterModal;