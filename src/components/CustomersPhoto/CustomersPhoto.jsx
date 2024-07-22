import css from '../CustomersPhoto/CustomersPhoto.module.css';
import firstFemale from '../../photos/HomePage-images/First-Female-min.jpg';
import male from '../../photos/HomePage-images/Male-min.jpg';
import lastFemale from '../../photos/HomePage-images/Last-Female-min.jpg';

const CustomersPhoto = () => {
  return (
    <div className={css.customers}>
      <img src={firstFemale} alt="Happy customer" className={css.img1} />
      <img src={male} alt="Happy customer" className={css.img2} />
      <img src={lastFemale} alt="Happy customer" className={css.img3} />
    </div>
  );
};

export default CustomersPhoto;
