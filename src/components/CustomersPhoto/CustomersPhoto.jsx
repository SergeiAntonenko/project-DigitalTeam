import css from '../CustomersPhoto/CustomersPhoto.module.css';
import firstFemale from '../../photos/HomePage-images/First-Female-min.jpg';
import male from '../../photos/HomePage-images/Male-min.jpg';
import lastFemale from '../../photos/HomePage-images/Last-Female-min.jpg';

const CustomersPhoto = () => {
  return (
    <div className={css.customers}>
      <div className={css.img1}></div>
      <div className={css.img2}></div>
      <div className={css.img3}></div>
    </div>
  );
};

export default CustomersPhoto;
