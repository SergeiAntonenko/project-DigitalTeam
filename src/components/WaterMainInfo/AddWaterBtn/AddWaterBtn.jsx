import { useState } from 'react';
import css from './AddWaterBtn.module.css';
import { FiPlus } from 'react-icons/fi';
import ModalAddWater from '../../Modals/ModalAdd/ModalAddWater.jsx';


const AddWaterBtn = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleModalOpen = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    return (
        <div className={css.container}>
            <button className={css.addWaterBtn} onClick={handleModalOpen}>
                <span className={css.iconCircle}>
                    <FiPlus className={css.addWaterIcon} />
                </span>
                Add water
            </button>
            
            {isModalOpen && <ModalAddWater handleCloseModal={handleCloseModal} />}
        </div>
    );
};

export default AddWaterBtn;