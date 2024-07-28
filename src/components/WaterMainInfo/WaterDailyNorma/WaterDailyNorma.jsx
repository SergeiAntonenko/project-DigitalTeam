import { useSelector } from 'react-redux';
import css from './WaterDailyNorma.module.css';
import { selectUser } from '../../../redux/users/selectors';

const WaterDailyNorma = () => {
    const user = useSelector(selectUser);

    let dailyNorma = 1.5;
    if (user.waterDailyIntake) {
        dailyNorma = user.waterDailyIntake;
    }

    return (
        <div className={css.waterDailyNorma}>
            <div className={css.textNorma}>
                <p className={css.liter}>{dailyNorma}</p>
                <p className={css.literNorma}>My daily norma</p>
            </div>
        </div>
    );
};

export default WaterDailyNorma;