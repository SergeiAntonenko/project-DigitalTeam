import WaterItem from '../WaterItem/WaterItem';
import css from './WaterList.module.css';
import { selectDailyWater, selectWaterLoading } from '../../redux/water/selectors';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchWaterDaily } from '../../redux/water/operations';
import { selectDate } from '../../redux/date/dateSlice.js';
// import WaterItemStub from '../WaterItem/WaterItemStub';

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

  return isWaterLoading ? (
    <>loading...</>
  ) : (
    <>
      {!waterItems?.length ? (
        <div className={css.noWater}>You have not added the water yet.</div>
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
