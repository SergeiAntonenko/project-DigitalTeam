import WaterItem from '../WaterItem/WaterItem';
import css from './WaterList.module.css';
import { selectDailyWater } from '../../redux/water/selectors';
import { useSelector } from 'react-redux';

const WaterList = () => {
  const waterItems = useSelector(selectDailyWater);
  console.log(waterItems);

  return (
    <>
      {!waterItems?.length ? (
        <div className={css.noWater}>
          <p className={css.water}>You have not added the water yet.</p>
        </div>
      ) : (
        <ul className={css.waterListWrap}>
          {waterItems.map(item => (
            <li key={item.waterCount._id} className={css.general}>
              <WaterItem item={item.waterCount} />
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default WaterList;
