import React, { useState, useEffect } from 'react';
import css from './ModalAddWater.module.css';
import useWaterState from '../../Modals/WaterState.jsx';
import Iconsvg from '../../Modals/MyIcons/MyIcons.jsx';
import useModal from '../../Modals/ModalAdd/OpenCloseModal.jsx';

const ModalAddWater = ({ handleCloseModal }) => {
  const { waterAmount, increaseWaterAmount, decreaseWaterAmount, setWaterAmount } = useWaterState();
  const [recordingTime, setRecordingTime] = useState(
    new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  );

  const handleSave = () => {
    handleCloseModal();
  };

  const handleEscapeKey = e => {
    if (e.key === 'Escape') {
      handleCloseModal();
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleEscapeKey);
    return () => {
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, []);
  const handleRecordingTimeChange = e => {
    setRecordingTime(e.target.value);
  };

  // const handleSave = () => {
  //   fetch('http://example.com/saveWaterData', {
  //     method: 'POST',
  //     body: JSON.stringify({ waterAmount, recordingTime }),
  //     headers: {
  //       'Content-Type': 'application/json'
  //     }
  //   })
  //   .then(response => {
  //     if (response.ok) {
  //       handleCloseModal();
  //     } else {
  //       throw new Error('Error sending data to server');
  //     }
  //   })
  //   .catch(error => {
  //     console.error('Error:', error);
  //   });
  // };

  return (
    <div className={css.modalwrapper}>
      <button className={css.close_button} onClick={handleCloseModal}>
        <Iconsvg width="28px" height="28px" iconName="modal-close" />
      </button>
      <h1 className={css.title}>Add water</h1>
      <h2 className={css.subtitle}>Choose a value:</h2>

      <div className={css.waterwrapper}>
        <h3 className={css.amount_water}>Amount of water: {waterAmount}</h3>

        <div className={css.minplus_wrapper}>
          <button className={css.button_water} onClick={decreaseWaterAmount}>
            <span className={css.pl_min}>-</span>
          </button>
          <button className={css.button_ml}>{waterAmount}ml</button>
          <button className={css.button_water} onClick={increaseWaterAmount}>
            <span className={css.pl_min}>+</span>
          </button>
        </div>
      </div>
      <div className={css.button_wrapper}>
        <h3 className={css.amount_water}>Recording time: {recordingTime}</h3>
        <input type="text" value={recordingTime} onChange={handleRecordingTimeChange} />
        <h2 className={css.subtitle}>Enter the value of the water used:</h2>
        <input type="number" value={waterAmount} onChange={e => setWaterAmount(e.target.value)} />
      </div>
      <button className={css.button_save} onClick={handleSave}>
        Save
      </button>
    </div>
  );
};

export default ModalAddWater;