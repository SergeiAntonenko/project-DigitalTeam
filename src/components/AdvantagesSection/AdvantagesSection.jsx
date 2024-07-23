import css from './AdvantagesSection.module.css';
import CustomersPhoto from '../CustomersPhoto/CustomersPhoto.jsx';

const AdvantagesSection = () => {
  return (
    <div className={css.advantages}>
      <div className={css.Customers}>
        <CustomersPhoto />
        <p className={css.happydescr}>
          Our
          <span className={css.colorHappy}> happy </span>
          customers
        </p>
      </div>
      <div className={css.benefits}>
        <div className={css.habitWrapper}>
          <p className={css.habitDrive}>
            <span className={css.habbitSpan}></span>Habit drive
          </p>
          <p className={css.statistics}>View statistics</p>
        </div>
        <p className={css.rate}>Personal rate setting</p>
      </div>
    </div>
  );
};

export default AdvantagesSection;
