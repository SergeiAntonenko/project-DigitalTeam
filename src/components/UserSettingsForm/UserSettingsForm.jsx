import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import css from './UserSettingsForm.module.css';
import { FormValidateError } from '../FormValidateError/FormValidateError';
import { calcRequiredWater } from '../../calculation/calcRequiredWater';
import { selectUser } from '../../redux/users/selectors';
import Iconsvg from '../../images/Icons/Icons.jsx';
import { updateAvatar, updateUser } from '../../redux/users/operations';
import { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { useTranslation } from 'react-i18next'; // Импортируем useTranslation

const schema = yup.object().shape({
  gender: yup.string().nullable().oneOf(['Woman', 'Man'], 'settings.please-select-gender'),

  name: yup
    .string()
    .min(2, 'settings.name-min-length')
    .max(40, 'settings.name-max-length'),

  email: yup.string().email('settings.enter-valid-email'),

  weight: yup
    .number()
    .typeError('settings.weight-type-error')
    .min(1, 'settings.weight-min')
    .max(600, 'settings.weight-max'),

  activeTime: yup
    .number()
    .typeError('settings.time-type-error')
    .min(0)
    .max(12, 'settings.time-max'),

  dailyWaterGoal: yup
    .number()
    .typeError('settings.daily-water-type-error')
    .min(0, 'settings.daily-water-min')
    .max(1000, 'settings.daily-water-max'),
});

export const UserSettingsForm = ({ handleCloseModal2 }) => {
  const { t } = useTranslation(); // Используем useTranslation
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const userId = user._id;
  const avatarURL = user.avatar;
  const [preview, setPreview] = useState(avatarURL || '');

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      gender: user?.gender || '',
      name: user?.name || '',
      email: user?.email || '',
      weight: user.weight || 1,
      activeTime: user.activeTime,
      dailyWaterGoal: user.dailyWaterGoal,
    },
  });

  useEffect(() => {
    if (user) {
      setValue('name', user.name || '');
      setValue('email', user.email || '');
      setValue('weight', user.weight || 1);
      setValue('activeTime', user.activeTime || 0);
      setValue('dailyWaterGoal', user.dailyWaterGoal || 0);
      setValue('gender', user.gender || '');
      setPreview(user.avatar || '');
    }
  }, [user, setValue]);

  const onFileChange = e => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      const objectUrl = URL.createObjectURL(selectedFile);
      setPreview(objectUrl);
      dispatch(updateAvatar({ file: selectedFile, userId }))
        .unwrap()
        .then(res => {
          setPreview(res.avatar);
        });
    }
  };

  const onSubmit = data => {
    if (Object.keys(errors).length > 0) {
      return;
    }

    const formData = new FormData();

    for (const key in data) {
      if (key === 'avatar') {
        if (data[key].length > 0 && data[key][0] !== undefined) {
          formData.append(key, data[key][0]);
        }
        continue;
      }

      if (data[key] === '' || data[key] === undefined || data[key] === null) {
        continue;
      }

      formData.append(key, data[key]);
    }

    const res = dispatch(updateUser(data));

    res.then(
      value => {
        if (value.meta.requestStatus === 'fulfilled') {
          handleCloseModal2();
          toast.success(t('settings.update-success'));
        } else {
          toast.error(t('settings.update-error'));
        }
      },
      reason => toast.error(t('settings.update-error'))
    );
  };

  const { avatar, gender, name, email, weight, activeTime, dailyWaterGoal } = watch();

  const isAnyFieldFilled =
    avatar || gender || name || email || weight || activeTime || dailyWaterGoal;

  const requiredWater = calcRequiredWater(gender, weight, activeTime);
  return (
    <>
      <form className={css.wrapper} onSubmit={handleSubmit(onSubmit)}>
        <div className={css.avatarWrapper}>
          {preview ? (
            <img className={css.avatar} src={preview} alt={t('settings.avatar-alt')} />
          ) : (
            <Iconsvg className={css.avatar} iconName="avatar" />
          )}

          <input
            {...register('avatar')}
            className={css.hiddenFileInput}
            accept="image/*"
            type="file"
            name="avatar"
            id="avatar"
            onChange={onFileChange}
            placeholder={t('settings.upload-photo')}
          />
          <label htmlFor="avatar" className={css.fileLabel}>
            {t('settings.upload-photo')}
          </label>

          {errors.avatar && <FormValidateError message={errors.avatar.message} />}
        </div>

        <div className={css.settingsWrapper}>
          <div className={css.leftDesktopWrapper}>
            <div className={css.genderWrapper}>
              <p className={css.subtitle}>{t('settings.gender-identity')}</p>
              <input
                {...register('gender')}
                className={css.hiddenRadioInput}
                type="radio"
                name="gender"
                id="woman"
                value="Woman"
                defaultChecked
              />
              <label className={`${css.text} ${css.genderLabel}`} htmlFor="woman">
                {t('settings.woman')}
              </label>

              <input
                {...register('gender')}
                className={css.hiddenRadioInput}
                type="radio"
                name="gender"
                id="man"
                value="Man"
              />
              <label className={`${css.text} ${css.genderLabel}`} htmlFor="man">
                {t('settings.man')}
              </label>

              {errors.gender && <FormValidateError message={errors.gender.message} />}
            </div>

            <div className={css.infoWrapper}>
              <label className={css.subtitle} htmlFor="name">
                {t('settings.your-name')}
              </label>
              <input
                {...register('name')}
                className={css.input}
                type="text"
                name="name"
                id="name"
              />
              {errors.name && <FormValidateError message={errors.name.message} />}

              <label className={css.subtitle} htmlFor="email">
                {t('settings.email')}
              </label>
              <input
                {...register('email')}
                className={css.input}
                type="text"
                name="email"
                id="email"
              />
              {errors.email && <FormValidateError message={errors.email.message} />}
            </div>

            <div className={css.normaWrapper}>
              <p className={css.subtitle}>{t('settings.daily-norma')}</p>

              <div className={css.formulaWrapper}>
                <div className={css.formulaSubwrapper}>
                  <p className={css.text}>{t('settings.for-woman')}:</p>
                  <span className={`${css.text} ${css.normaFormula}`}>V=(M*0,03) + (T*0,4)</span>
                </div>

                <div className={css.formulaSubwrapper}>
                  <p className={css.text}>{t('settings.for-man')}:</p>
                  <span className={`${css.text} ${css.normaFormula}`}>V=(M*0,04) + (T*0,6)</span>
                </div>
              </div>

              <p className={css.normaTextArea}>
                <span className={css.normaAsterisk}>*</span> {t('settings.water-norm-formula')}
              </p>

              <span className={`${css.text} ${css.footnote}`}>{t('settings.active-time-hours')}</span>
            </div>
          </div>

          <div className={css.rightDesktopWrapper}>
            <div className={css.metricsWrapper}>
              <label className={css.text} htmlFor="weight">
                {t('settings.weight-kg')}:
              </label>
              <input
                {...register('weight')}
                className={css.input}
                type="number"
                name="weight"
                id="weight"
              />
              {errors.weight && <FormValidateError message={errors.weight.message} />}

              <label className={css.text} htmlFor="activeTime">
                {t('settings.active-sports-time')}:
              </label>
              <input
                {...register('activeTime')}
                className={css.input}
                type="number"
                name="activeTime"
                id="activeTime"
              />
              {errors.activeTime && <FormValidateError message={errors.activeTime.message} />}
            </div>

            <div className={css.waterAmountWrapper}>
              <div className={css.amountField}>
                <p className={css.text}>{t('settings.required-water-amount')}</p>

                <span className={css.amount}>
                  {!gender || !weight ? t('settings.waiting-metrics') : requiredWater + ' L'}
                </span>
              </div>

              <label className={css.subtitle} htmlFor="dailyWaterGoal">
                {t('settings.record-water-intake')}:
              </label>
              <input
                {...register('dailyWaterGoal')}
                className={css.input}
                type="text"
                name="dailyWaterGoal"
                id="dailyWaterGoal"
              />
              {errors.dailyWaterGoal && (
                <FormValidateError message={errors.dailyWaterGoal.message} />
              )}
            </div>
          </div>
        </div>

        <button className={css.submitButton} type="submit" disabled={!isAnyFieldFilled}>
          {t('settings.save')}
        </button>
      </form>
    </>
  );
};
