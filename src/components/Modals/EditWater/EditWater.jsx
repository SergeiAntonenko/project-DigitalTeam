// import React, { useState, useEffect } from 'react';
// import css from './EditWater.module.css';
// import useWaterState from '../WaterState.jsx';
// import Iconsvg from '../MyIcons/MyIcons.jsx';
// import useModal from '../../Modals/ModalAdd/OpenCloseModal.jsx';

// const ModalEditWater = ({ id }) => {
//   const { waterAmount, increaseWaterAmount, decreaseWaterAmount, setWaterAmount } = useWaterState();
//   const { isModalOpen, handleCloseModal } = useModal();

//   const [recordingTime, setRecordingTime] = useState(
//     new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
//   );

//   const handleSave = () => {
//     fetch('project-digital-team.vercel.app' + id, {
//       method: 'PATCH',
//       body: JSON.stringify({ waterAmount, recordingTime }),
//       headers: {
//         'Content-Type': 'application/json',
//       },
//     })
//       .then(response => {
//         if (response.ok) {
//           handleCloseModal();
//         } else {
//           throw new Error('Error sending data to server');
//         }
//       })
//       .catch(error => {
//         console.error('Error:', error);
//       });
//   };

//   useEffect(() => {
//     const timer = setInterval(() => {
//       const newTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
//       setRecordingTime(newTime);
//     }, 60000);
//     return () => clearInterval(timer);
//   }, []);

//   const handleRecordingTimeChange = e => {
//     setRecordingTime(e.target.value);
//   };

//   return (
//     <div className={css.modalwrapper} style={{ display: isModalOpen ? 'block' : 'none' }}>
//       <button className={css.close_button} onClick={handleCloseModal}>
//         <Iconsvg width="28px" height="28px" iconName="modal-close" />
//       </button>
//       <h1 className={css.title}>Edit the entered amount of water</h1>
//       <h2 className={css.subtitle}>Correct entered data:</h2>
//       <div className={css.waterwrapper}>
//         <h3 className={css.amount_water}>Amount of water: {waterAmount}</h3>
//         <div className={css.minplus_wrapper}>
//           <button className={css.button_water} onClick={decreaseWaterAmount}>
//             <span className={css.pl_min}>-</span>
//           </button>
//           <button className={css.button_ml}>{waterAmount}ml</button>
//           <button className={css.button_water} onClick={increaseWaterAmount}>
//             <span className={css.pl_min}>+</span>
//           </button>
//         </div>
//       </div>
//       <div className={css.button_wrapper}>
//         <h3 className={css.time_water}>Recording time: {recordingTime}</h3>
//         <input type="text" value={recordingTime} onChange={handleRecordingTimeChange} />
//         <h2 className={css.subtitle}>Enter the value of the water used:</h2>
//         <input type="number" value={waterAmount} onChange={e => setWaterAmount(e.target.value)} />
//       </div>
//       <button className={css.button_save} onClick={handleSave}>
//         Save
//       </button>
//     </div>
//   );
// };

// export default ModalEditWater;
// ========================================================================
import React, { useState, useEffect } from 'react';
import css from './EditWater.module.css';
import useWaterState from '../WaterState.jsx';
import Iconsvg from '../MyIcons/MyIcons.jsx';
import useModal from '../../Modals/ModalAdd/OpenCloseModal.jsx';

const ModalEditWater = ({ id, handleCloseModal }) => {
  const { waterAmount, increaseWaterAmount, decreaseWaterAmount, setWaterAmount } = useWaterState();
  const { isModalOpen } = useModal();

  const [recordingTime, setRecordingTime] = useState(
    new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  );

  const handleSave = () => {
    fetch(`https://project-digital-team.vercel.app/${id}`, {
      method: 'PATCH',
      body: JSON.stringify({ waterAmount, recordingTime }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => {
        if (response.ok) {
          handleCloseModal();
        } else {
          throw new Error('Error sending data to server');
        }
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

  useEffect(() => {
    const timer = setInterval(() => {
      const newTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      setRecordingTime(newTime);
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  const handleRecordingTimeChange = e => {
    setRecordingTime(e.target.value);
  };

  return (
    <div className={css.modalwrapper} style={{ display: isModalOpen ? 'block' : 'none' }}>
      <div className={css.modal_background} onClick={handleCloseModal}></div>
      <div className={css.modal_content}>
        <button className={css.close_button} onClick={handleCloseModal}>
          <Iconsvg width="28px" height="28px" iconName="modal-close" />
        </button>
        <h1 className={css.title}>Edit the entered amount of water</h1>
        <h2 className={css.subtitle}>Correct entered data:</h2>
        <div className={css.waterwrapper}>
          <h3 className={css.amount_water}>Amount of water: {waterAmount}ml</h3>
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
          <h3 className={css.time_water}>Recording time: {recordingTime}</h3>
          <input type="text" value={recordingTime} onChange={handleRecordingTimeChange} />
          <h2 className={css.subtitle}>Enter the value of the water used:</h2>
          <input
            type="number"
            value={waterAmount}
            onChange={e => setWaterAmount(Number(e.target.value))}
          />
        </div>
        <button className={css.button_save} onClick={handleSave}>
          Save
        </button>
      </div>
    </div>
  );
};

export default ModalEditWater;
