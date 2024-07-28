// import { useState } from 'react';
// import { useDispatch } from 'react-redux';
// import { useSelector } from 'react-redux';
// import { selectUser } from '../../../redux/users/selectors';
// import { addWater, updateWater } from '../../../redux/water/operations';
// import useWaterState from '../WaterState';
// import Modal from '../../../shared/components/Modal/Modal';
// // import WaterForm from '../WaterForm/WaterForm';
// import css from './WaterModal.module.css';
// import Iconsvg from '../MyIcons/MyIcons';

// const WaterModal = ({ isModalOpen, onCloseModal, operationType }) => {
//   const { waterAmount, increaseWaterAmount, decreaseWaterAmount, setWaterAmount } = useWaterState();
//   const [recordingTime, setRecordingTime] = useState(
//     new Date().toLocaleString([], { hour: '2-digit', minute: '2-digit' })
//   );

//   const handleRecordingTimeChange = e => {
//     setRecordingTime(e.target.value);
//   };

//   const handleWaterAmountChange = e => {
//     const newValue = parseInt(e.target.value) || 0;
//     if (newValue >= 0) {
//       setWaterAmount(newValue);
//     }
//   };

//   const title = operationType === 'add' ? 'Add water' : 'Edit the entered amount of water';

//   const handleCloseModal = () => {
//     onCloseModal();
//   };

//   const dispatch = useDispatch();
//   const [isUpdating] = useState(false);
//   const user = useSelector(selectUser);

//   const id = user.id;
//   const updatedWaterData = user.updatedWaterData;

//   const currentDate = new Date();
//   const localDate = currentDate.toLocaleDateString('en-GB');
//   const localTime = currentDate.toLocaleTimeString('en-GB', {
//     hour: '2-digit',
//     minute: '2-digit',
//   });

//   const waterData = {
//     waterValue: waterAmount,
//     localDate,
//     localTime,
//   };

//   const handleSaveAndUpdate = () => {
//     if (isUpdating) {
//       dispatch(updateWater({ recordId: id, water: updatedWaterData }))
//         .then(() => {
//           console.log('Update success');
//           onCloseModal();
//         })
//         .catch(err => {
//           console.error(err.message);
//         });
//     } else {
//       dispatch(addWater({ waterValue: waterAmount, localDate, localTime }))
//         .then(() => {
//           onCloseModal();
//         })
//         .catch(err => {
//           console.error(err.message);
//         });
//     }
//   };

//   return isModalOpen ? (
//     <Modal handleCloseModal={handleCloseModal}>
//       <div className={css.modalwrapper}>
//         <button className={css.close_button} onClick={onCloseModal}>
//           <Iconsvg width="28px" height="28px" iconName="modal-close" />
//         </button>
//         <h1 className={css.title}>{title}</h1>
//         <h2 className={css.subtitle}>Choose a value:</h2>

//         <div className={css.waterwrapper}>
//           <h3 className={css.amount_water}>Amount of water: {waterAmount} ml</h3>
//           <div className={css.minplus_wrapper}>
//             <button
//               className={css.button_water}
//               onClick={decreaseWaterAmount}
//               disabled={waterAmount === 0}
//             >
//               <span className={css.pl_min}>-</span>
//             </button>
//             <button className={css.button_ml}>{waterAmount} ml</button>
//             <button className={css.button_water} onClick={increaseWaterAmount}>
//               <span className={css.pl_min}>+</span>
//             </button>
//           </div>
//         </div>
//         <div className={css.button_wrapper}>
//           <h3 className={css.time_water}>Recording time: {recordingTime}</h3>
//           <input type="text" value={recordingTime} onChange={handleRecordingTimeChange} />
//           <h2 className={css.subtitle}>Enter the value of the water used:</h2>
//           <input type="text" value={waterAmount} onChange={handleWaterAmountChange} />
//         </div>
//         <button className={css.button_save} onClick={handleSaveAndUpdate}>
//           Save
//         </button>
//       </div>
//     </Modal>
//   ) : null;
// };

// export default WaterModal;
// ============================================================
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { selectUser } from '../../../redux/users/selectors';
import { addWater, updateWater } from '../../../redux/water/operations';
import useWaterState from '../WaterState';
import Modal from '../../../shared/components/Modal/Modal';
// import WaterForm from '../WaterForm/WaterForm';
import css from './WaterModal.module.css';
import Iconsvg from '../../../images/Icons/Icons.jsx';
import toast  from 'react-hot-toast';

const WaterModal = ({ isModalOpen, onCloseModal, operationType }) => {
  const { waterAmount, increaseWaterAmount, decreaseWaterAmount, setWaterAmount } = useWaterState();
  const [recordingTime, setRecordingTime] = useState(
    new Date().toLocaleString([], { hour: '2-digit', minute: '2-digit' })
  );

  const handleChangeRecordingTime = e => {
    const inputValue = e.target.value;
    
    if (/^[0-9]{0,2}:[0-9]{0,2}$/.test(inputValue) || inputValue === '') {
      setRecordingTime(inputValue);
    }
  };

  


  const handleWaterAmountChange = e => {
    const newValue = parseInt(e.target.value) || 0;
    if (newValue >= 0) {
      setWaterAmount(newValue);
    }
  };

  const title = operationType === 'add' ? 'Add water' : 'Edit the entered amount of water';

  const handleCloseModal = () => {
    onCloseModal();
  };

  const dispatch = useDispatch();
  const [isUpdating] = useState(false);
  const user = useSelector(selectUser);

  const id = user ? user.id : null;
  const updatedWaterData = user ? user.updatedWaterData : null;

  const currentDate = new Date();
  const localDate = currentDate.toLocaleDateString('en-GB');
  const localTime = recordingTime;

  const waterData = {
    waterValue: waterAmount,
    localDate,
    localTime,
  };

  const handleSaveAndUpdate = () => {
    if (isUpdating) {
      dispatch(updateWater({ recordId: id, water: updatedWaterData }))
        .then(() => {
         toast.success('Update Success');
          onCloseModal();
        })
        .catch(err => {
          toast.error('Something wrong');
        });
    } else {
      dispatch(addWater({ waterValue: waterAmount, localDate, localTime })).then(() => {
        onCloseModal();
      });
      // .catch(err => {
      //   console.error(err.message);
      // });
    }
  };

  return isModalOpen ? (
    <Modal handleCloseModal={handleCloseModal}>
      <div className={css.modalwrapper}>
        <button className={css.close_button} onClick={onCloseModal}>
          <Iconsvg className={css.close} iconName="icon-close" />
        </button>
        <h1 className={css.title}>{title}</h1>
        <h2 className={css.subtitle}>Choose a value:</h2>

        <div className={css.waterwrapper}>
          <h3 className={css.amount_water}>Amount of water: {waterAmount} ml</h3>
          <div className={css.minplus_wrapper}>
            <button
              className={css.button_water}
              onClick={decreaseWaterAmount}
              disabled={waterAmount === 0}
            >
           <Iconsvg className={css.pl_min} iconName="icon-minus-round"/>
            </button>
            <span className={css.button_ml}>{waterAmount} ml</span>
            <button className={css.button_water} onClick={increaseWaterAmount}>

            <Iconsvg className={css.pl_min} iconName="icon-plus-round" />
            </button>
          </div>
        </div>
        <div className={css.button_wrapper}>
          <h3 className={css.time_water}>Recording time: {recordingTime}</h3>
          <input type="text" value={recordingTime} onChange={handleChangeRecordingTime}  placeholder="first (:) after (numbers)" />
          <h2 className={css.subtitle}>Enter the value of the water used:</h2>
          <input type="text" value={waterAmount} onChange={handleWaterAmountChange} />
        </div>
        <button className={css.button_save} onClick={handleSaveAndUpdate}>
          Save
        </button>
      </div>
    </Modal>
  ) : null;
};

export default WaterModal;
