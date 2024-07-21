import css from './WaterDailyNorma.module.css';

const WaterDailyNorma = () => {
    return (
        <div className={css.waterDailyNorma}>
            <div className={css.textNorma}>
                <p className={css.liter}>1.5 L</p>
                <p className={css.literNorma}>My daily norma</p>
            </div>
        </div>
    );
};

export default WaterDailyNorma;