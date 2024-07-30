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
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';

const WaterModal = ({ onCloseModal, operationType, onWaterUpdate }) => {
  const { t } = useTranslation();
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

  // const title = operationType === 'add' ? 'Add water' : 'Edit the entered amount of water';
  const title = operationType === 'add' ? t('modal-water.add-water') : t('modal-water.edit-water');

  const dispatch = useDispatch();
  const [isUpdating] = useState(false);
  const user = useSelector(selectUser);

  const id = user ? user.id : null;
  const updatedWaterData = user ? user.updatedWaterData : null;

  const currentDate = new Date();
  const localDate = currentDate.toLocaleDateString('en-GB');
  const localTime = recordingTime;

  const handleSaveAndUpdate = () => {
    if (isUpdating) {
      dispatch(updateWater({ recordId: id, water: updatedWaterData }))
        .then(() => {
          toast.success('Water updated successfully');
        })
        .finally(() => onCloseModal())
        .catch(err => {
          toast.error('Something wrong');
        });
    } else {
      dispatch(addWater({ waterValue: waterAmount, localDate, localTime }))
        .finally(() => {
          onCloseModal();
        })
        .then(() => {
          toast.success('Water added successfully');
          //  onWaterUpdate(waterAmount);
        })
        .catch(err => {
          toast.error('Something wrong');
        });
      // .catch(err => {
      //   console.error(err.message);
      // });
    }
  };

  return (
    <>
      <h1 className={css.title}>{title}</h1>
      <h2 className={css.subtitle}>{t('modal-water.choose-value')}:</h2>

      <div className={css.waterwrapper}>
        <h3 className={css.amount_water}>
          {t('modal-water.amount-water')}: {waterAmount} ml
        </h3>
        <div className={css.minplus_wrapper}>
          <button
            className={css.button_water}
            onClick={decreaseWaterAmount}
            disabled={waterAmount === 0}
          >
            <Iconsvg className={css.pl_min} iconName="icon-minus-round" />
          </button>
          <span className={css.button_ml}>{waterAmount} ml</span>
          <button className={css.button_water} onClick={increaseWaterAmount}>
            <Iconsvg className={css.pl_min} iconName="icon-plus-round" />
          </button>
        </div>
      </div>
      <div className={css.button_wrapper}>
        <h3 className={css.time_water}>
          {t('modal-water.rec-time')}: {recordingTime}
        </h3>
        <input
          type="text"
          value={recordingTime}
          onChange={handleChangeRecordingTime}
          placeholder="first (:) after (numbers)"
        />
        <h2 className={css.subtitle}>{t('modal-water.enter-value')}:</h2>
        <input type="text" value={waterAmount} onChange={handleWaterAmountChange} />
      </div>
      <button className={css.button_save} onClick={handleSaveAndUpdate}>
        {t('modal-water.save')}
      </button>
    </>
  );
};

export default WaterModal;
