import css from './loader.module.css';

export const WaterLoader = () => {
  return (
    <div className={css.box}>
      <div className={css.tile01}>
        <div className={css.mask}>Loading</div>
      </div>
    </div>
  );
};
