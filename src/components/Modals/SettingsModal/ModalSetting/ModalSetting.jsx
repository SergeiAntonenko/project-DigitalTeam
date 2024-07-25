import { ModalSettingForm } from '../ModalSettingForm/ModalSettingForm';
import css from './ModalSetting.module.css';

export const ModalSetting = ({ handleCloseModal }) => {
  return (
    <section className={css.wrapper}>
      <h2 className={css.title}>Setting</h2>
      <ModalSettingForm onClick={handleCloseModal} />
    </section>
  );
};

