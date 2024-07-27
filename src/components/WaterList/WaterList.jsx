import WaterItemStub from '../WaterItem/WaterItemStub';
import WaterItem from '../WaterItem/WaterItem';
import css from './WaterList.module.css';

const WaterList = ({ array }) => {
  return (
    <>
      {array.length > 0 ? (
        <ul className={css.waterListWrap}>
          {array.map(item => (
            <WaterItem key={item._id} item={item} />
          ))}
        </ul>
      ) : (
        <div className={css.general}>
          <WaterItemStub />
        </div>
      )}
    </>
  );
};

export default WaterList;
