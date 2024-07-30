import WaterItem from '../WaterItem/WaterItem';
import css from './WaterList.module.css';
import { selectDailyWater, selectWaterLoading } from '../../redux/water/selectors';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchWaterDaily } from '../../redux/water/operations';
import { selectDate } from '../../redux/date/dateSlice.js';
import LoaderWaterItem from '../../loader/LoaderWaterItem.jsx';

const WaterList = () => {
  const date = useSelector(selectDate);
  const waterItems = useSelector(selectDailyWater);
  const isWaterLoading = useSelector(selectWaterLoading);
  const dispatch = useDispatch();
  useEffect(() => {
    if (date) {
      const formattedDate = date.split('-').join('.');
      dispatch(fetchWaterDaily(formattedDate));
    }
  }, [dispatch, date]);

  return (
    <>
      {isWaterLoading && !waterItems?.length && <LoaderWaterItem />}
      {!isWaterLoading && !waterItems?.length ? (
        <div className={css.noWater}>
          <p className={css.water}>You have not added the water yet.</p>
        </div>
      ) : (
        <ul className={css.waterListWrap}>
          {waterItems.map(item => (
            <li key={item._id} className={css.general}>
              <WaterItem item={item} />
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default WaterList;
