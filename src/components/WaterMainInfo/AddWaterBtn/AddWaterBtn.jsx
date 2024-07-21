import css from './AddWaterBtn.module.css';
import photos from '../../../photos/plus-mob.svg';

const AddWaterBtn = () => {
    return (
        <div>
            <button className={css.addWaterBtn}>
                <img src={photos} className={css.addWaterIcon} width="16" height="16" alt="Add water" />
                Add water
            </button>
        </div>
    );
};

export default AddWaterBtn;