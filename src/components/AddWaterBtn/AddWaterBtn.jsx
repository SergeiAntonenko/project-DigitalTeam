import css from './AddWaterBtn.module.css';
import { FiPlus } from 'react-icons/fi';

const AddWaterBtn = () => {
  return (
    <div className={css.container}>
      <button className={css.addWaterBtn}>
        <span className={css.iconCircle}>
          <FiPlus className={css.addWaterIcon} />
        </span>
        Add water
      </button>
    </div>
  );
};

export default AddWaterBtn;
