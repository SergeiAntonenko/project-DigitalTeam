import css from './WaterItem.module.css';
import { IconGlass } from '../../shared/icons/IconGlass';
import { FiTrash } from 'react-icons/fi';
import { FiEdit2 } from 'react-icons/fi';

const WaterItem = () => {
  return (
    <div className={css.general}>
      <div className={css.center}>
        <div className={css.div1}>
          <IconGlass className={css.div1} />
        </div>
        <div className={css.div2}>
          <p className={css.text_value}>250 ml</p>
          <p className={css.text_time}>7:00 AM</p>
        </div>
        <div className={css.buttonContainer}>
          <button type="button" className={css.button1}>
            <FiEdit2 className={css.edit} />
          </button>
          <button type="button" className={css.button2}>
            <FiTrash className={css.edit} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default WaterItem;
