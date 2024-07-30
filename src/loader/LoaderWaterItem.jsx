import css from './LoaderWaterItem.module.css';

const LoaderWaterItem = () => {
  return (
    <div className={css.centerDiv}>
      <ul className={css.ul}>
        <li className={`${css.li} ${css.li1}`}></li>
        <li className={`${css.li} ${css.li2}`}></li>
        <li className={`${css.li} ${css.li3}`}></li>
        <li className={`${css.li} ${css.li4}`}></li>
        <li className={`${css.li} ${css.li5}`}></li>
        <li className={`${css.li} ${css.li6}`}></li>
      </ul>
    </div>
  );
};

export default LoaderWaterItem;
