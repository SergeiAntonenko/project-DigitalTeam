import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import css from './WaterForm.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { addWater, updateWater, fetchWaterDaily, fetchWaterMonthly } from '../../../redux/water/operations.js';
import { FaPlus, FaMinus } from 'react-icons/fa';
import toast from 'react-hot-toast';
import { selectWaterLoading, selectMonthlyWater, selectDailyWater } from '../../../redux/water/selectors.js';
import Modal from '../../../shared/components/Modal/Modal.jsx';
import  { WaterLoader }  from '../../../loader/loader.jsx';

const schemaWater = yup.object().shape({
  waterAmount: yup
    .number()
    .required('Please enter the amount of water.')
    .min(0, 'The minimum allowed amount of water is 0 ml.')
    .max(500, 'The maximum allowed amount of water is 500 ml.'),
  time: yup.string().required('Please select recording time.'),
  keyboardAmount: yup
    .number()
    .required('Please enter the value of water used.')
    .min(0, 'The minimum allowed amount of water is 0 ml.')
    .max(500, 'The maximum allowed amount of water is 500 ml.'),
});

const WaterForm = ({ operationType, initialData, waterId, initialWaterAmount, closeModal, onWaterAddOrUpdate, props }) => {
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [progress, setProgress] = useState(0);
  const [waterAmount, setValue] = useState(initialWaterAmount);
  const loading = useSelector(selectWaterLoading);
  const selectedDate = useSelector(selectDailyWater);
  const currentMonth = useSelector(selectMonthlyWater);


  const defaultTime = () => {
    const currentTime = new Date();
    const hours = String(currentTime.getHours()).padStart(2, '0');
    const minutes = String(currentTime.getMinutes()).padStart(2, '0');
    return `${hours}:${minutes}`;
  };

  const formatTime = (date) => {
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  };

  const mlToDecimal = (ml) => {
    return parseFloat((ml / 1000).toFixed(3));
  };

  const {
    handleSubmit,
    formState: { errors, isValid },
    getValues,

    register,
  } = useForm({
    resolver: yupResolver(schemaWater),
    defaultValues: {
      waterAmount: initialData ? initialData.amount * 1000 : 50,
      time: (operationType === 'edit' && initialData) ? formatTime(initialData.date) : defaultTime(),
      keyboardAmount: initialData ? initialData.amount * 1000 : 50,
    },
  });

  const onSubmit = async (data) => {
    try {
      await schemaWater.validate(data, { abortEarly: false });

      const [hours, minutes] = data.time.split(':');
      const fullDateTime = `${selectedDate} ${hours}:${minutes}:00.000Z`;

      const newEntry = {
        amount: mlToDecimal(data.waterAmount),
        date: new Date(fullDateTime),
      };

      if (operationType === 'add') {
        try {
          dispatch(addWater(newEntry));
          onWaterAddOrUpdate();
          setProgress(progress + newEntry.amount); // Обновление прогресса
          closeModal();
          toast.success('Added successfully.');
        } catch (error) {
          // Обработка ошибок при добавлении
          toast.error('Failed to add water.');
        }
      } else if (operationType === 'edit' && waterId) {
        try {
          dispatch(
            updateWater({
              id: waterId,
              amount: mlToDecimal(data.waterAmount),
              date: new Date(fullDateTime),
            })
          );
          onWaterAddOrUpdate();
          setProgress(progress + data.waterAmount - initialWaterAmount); // Обновление прогресса
          closeModal();
          toast.success('Edited successfully.');
        } catch (error) {
          // Обработка ошибок при редактировании
          toast.error('Failed to edit water.');
        }
      }
      

      dispatch(fetchWaterDaily(selectedDate));

      if (Number(selectedDate.split('-')[0]) === currentMonth.year && Number(selectedDate.split('-')[1]) === currentMonth.month) {
        dispatch(fetchWaterMonthly(currentMonth));
      }
    } catch (error) {
      toast.error(('modals.addEdit.error'));
    }
  };

  const handleWaterChange = (newValue) => {
    setValue('waterAmount', newValue);
    setValue('keyboardAmount', newValue);
  };

  const incrementWater = () => {
    const currentAmount = Number(getValues('waterAmount'));
    const newValue = currentAmount + 50;
    if (newValue <= 500) {
      handleWaterChange(newValue);
      setValue('waterAmount', newValue);
    }
  };

  const decrementWater = () => {
    const currentAmount = Number(getValues('waterAmount'));
    if (currentAmount >= 50) {
      const newValue = currentAmount - 50;
      handleWaterChange(newValue);
      setValue('waterAmount', newValue);
    }
  };

  const handleKeyboardAmountChange = (e) => {
    const newValue = Number(e.target.value);
    if (e.target.value.length <= 3 && newValue >= 0 && newValue <= 500) {
      handleWaterChange(newValue);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    const handleEscapeKey = (e) => {
      if (e.key === 'Escape') {
        handleCloseModal();
      }
    };

    document.addEventListener('keydown', handleEscapeKey);
    
    return () => {
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, []);

  return (
    <>
     {loading && <WaterLoader/>}
      {isModalOpen && (
        <Modal handleCloseModal={handleCloseModal}>
          <div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div>
                <label>
                  <span>{('modals.addEdit.amount')}</span>
                  <div>
                    <div>
                      <FaMinus onClick={decrementWater} />
                    </div>
                    <div>
                      <input
                        type="number"
                        {...register('waterAmount', { required: true })}
                        value={waterAmount}
                        readOnly
                      />
                    </div>
                    <div>
                      <FaPlus onClick={incrementWater} />
                    </div>
                  </div>
                </label>
                <p>{errors.waterAmount?.message}</p>
              </div>

              <div>
                <label>
                  <span>{('modals.addEdit.time')}</span>
                  <input
                    type="time"
                    {...register('time', { required: true })}
                    defaultValue={defaultTime()}
                    onChange={(e) => setValue('time', e.target.value)}
                  />
                </label>
                <p>{errors.time?.message}</p>
              </div>

              <div>
                <label>
                  <span>{('modals.addEdit.value')}</span>
                  <input
                    type="number"
                    {...register('keyboardAmount', { required: true })}
                    onChange={handleKeyboardAmountChange}
                  />
                </label>
                <p>{errors.keyboardAmount?.message}</p>
              </div>
              <button
        className={css.button_save}
        type="submit"
        disabled={!isValid}
    
      >
        Save
      </button>
            </form>
          </div>
        </Modal>
      )}
    </>
  );
};

export default WaterForm;