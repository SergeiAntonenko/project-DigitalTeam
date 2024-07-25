import React, { useState, useEffect } from 'react';
import css from '../WaterForm/WaterForm.module.css';
import useWaterState from '../WaterState.jsx';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import Iconsvg from '../MyIcons/MyIcons.jsx';

import useModal from '../../Modals/WaterForm/OpenCloseModal.jsx';


const schema = yup.object().shape({
  waterAmount: yup.number().required('Water amount is required').positive('Water amount must be positive').integer('Water amount must be an integer'),
  recordingTime: yup.string().required('Recording time is required'),
});

const ModalEditWater = ({ id }) => {
  const { waterAmount, increaseWaterAmount, decreaseWaterAmount, setWaterAmount } = useWaterState();
  const { isModalOpen, handleCloseModal } = useModal();
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  const [recordingTime, setRecordingTime] = useState(new Date().toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'}));

  const handleSave = handleSubmit((data) => {
    fetch('https://project-digital-team.vercel.app' + id, {
        method: 'PATCH',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => {
        if (response.ok) {
            handleCloseModal();
        } else {
            throw new Error('Error sending data to server');
        }
    })
    .catch(error => {console.error('Error:', error)});
  });

  useEffect(() => {
    const timer = setInterval(() => {
      const newTime = new Date().toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'});
      setRecordingTime(newTime);
    }, 60000); 
    return () => clearInterval(timer);
  }, []);

  const handleRecordingTimeChange = (e) => {
    setRecordingTime(e.target.value);
  };

  return (
    <div className={isModalOpen ? `${css.modalwrapper} ${css.active}` : css.modalwrapper}>
      <button className={css.close_button} onClick={handleCloseModal}>
        <Iconsvg width="28px" height="28px" iconName="modal-close" />
      </button>
      <h1 className={css.title}>Edit the entered amount of water</h1>
      <h2 className={css.subtitle}>Correct entered data:</h2>
      <div className={css.waterwrapper}>
        <h3 className={css.amount_water}>Amount of water: {waterAmount}ml</h3>
        <div className={css.minplus_wrapper}>
          <button className={css.button_water} onClick={decreaseWaterAmount}><span className={css.pl_min}>-</span></button>
          <button className={css.button_ml}>{waterAmount}ml</button>
          <button className={css.button_water} onClick={increaseWaterAmount}><span className={css.pl_min}>+</span></button>
        </div>
      </div>
      <div className={css.button_wrapper}>
        <h3 className={css.time_water}>Recording time: {recordingTime}</h3>
        <input type="text" value={recordingTime} onChange={handleRecordingTimeChange} />
        <h2 className={css.subtitle}>Enter the value of the water used:</h2>
        <input type="number" value={waterAmount} onChange={(e) => setWaterAmount(e.target.value)} />
      </div>
      <button className={css.button_save} onClick={handleSave}>Save</button>
    </div>
  );
};

export default ModalEditWater;

  