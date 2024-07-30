import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
// import { useDispatch } from 'react-redux';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import css from './UserSettingsForm.module.css';
import { FormValidateError } from '../FormValidateError/FormValidateError';
import { calcRequiredWater } from '../../calculation/calcRequiredWater';
import { selectUser } from '../../redux/users/selectors';
import { useTranslation } from 'react-i18next';

const UserSettingsForm = () => {
  const { t } = useTranslation();

  const schema = yup.object().shape({
    avatar: yup.mixed(),

    gender: yup.string().nullable().oneOf(['Woman', 'Man'], t('settings.please-select-gender')),

    name: yup
      .string()
      .min(2, t('settings.name-min-length'))
      .max(40, t('settings.name-max-length')),

    email: yup.string().email(t('settings.enter-valid-email')),

    weight: yup
      .number()
      .nullable()
      .min(20, t('settings.weight-min'))
      .max(600, t('settings.weight-max'))
      .transform((value, originalValue) => {
        if (originalValue === '') return null;
        return value;
      }),

    activityTime: yup
      .number()
      .nullable()
      .min(0)
      .max(12, t('settings.time-max'))
      .transform((value, originalValue) => {
        if (originalValue === '') return null;
        return value;
      }),

    desiredVolume: yup
      .string()
      .nullable()
      .transform((value, originalValue) => {
        if (originalValue === '') return null;
        return value;
      })
      .test('is-decimal', t('settings.enter-valid-number'), value => {
        if (value === undefined || value === null || value === '') return true;
        return !isNaN(parseFloat(value)) && isFinite(value);
      })
      .test('min-value', t('settings.value-min'), value => {
        if (value === undefined || value === null || value === '') return true;
        return parseFloat(value) >= 0.1;
      })
      .test('max-value', t('settings.value-max'), value => {
        if (value === undefined || value === null || value === '') return true;
        return parseFloat(value) <= 31.2;
      }),
  });

  const user = useSelector(selectUser);
  //   const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      gender: user.gender,
      name: user.name,
      email: user.email,
      weight: user.weight,
      activityTime: user.activityTime,
      desiredVolume: user.desiredVolume / 1000,
    },
  });

  const onSubmit = async data => {
    if (Object.keys(errors).length > 0) {
      return;
    }

    data.desiredVolume = data.desiredVolume * 1000;

    const formData = new FormData();

    for (const key in data) {
      if (key === 'avatar') {
        if (data[key][0] !== undefined) {
          formData.append(key, data[key][0]);
        }
        continue;
      }

      if (data[key] === '' || data[key] === undefined || data[key] === null) {
        continue;
      }
      formData.append(key, data[key]);
    }

    // const response = await dispatch(updateUser(formData));
    // response.meta.requestStatus === 'fulfilled' && handleCloseModal();
  };

  const { avatar, gender, name, email, weight, activityTime, desiredVolume } = watch();

  const isAnyFieldFilled =
    avatar || gender || name || email || weight || activityTime || desiredVolume;

  const requiredWater = calcRequiredWater(gender, weight, activityTime);

  return (
    <>
      <form className={css.wrapper} onSubmit={handleSubmit(onSubmit)}>
        <div className={css.avatarWrapper}>
          <img className={css.avatar} src={user.avatarURL} alt="Avatar" />

          {!avatar || avatar.length === 0 ? (
            <>
              <input
                {...register('avatar')}
                className={css.hiddenFileInput}
                type="file"
                name="avatar"
                id="avatar"
                placeholder={t('settings.upload-photo')}
              />
              <label htmlFor="avatar" className={css.fileLabel}>
                {t('settings.upload-photo')}
              </label>
            </>
          ) : (
            <strong className={css.avatarName}>{avatar[0].name}</strong>
          )}
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
                value="Woman" defaultChecked              
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
                  <p className={css.text}>{t('settings.for-woman')}</p>
                  <span className={`${css.text} ${css.normaFormula}`}>V=(M*0,03) + (T*0,4)</span>
                </div>

                <div className={css.formulaSubwrapper}>
                  <p className={css.text}>{t('settings.for-man')}</p>
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
                {t('settings.weight-kg')}
              </label>
              <input
                {...register('weight')}
                className={css.input}
                type="number"
                name="weight"
                id="weight"
              />
              {errors.weight && <FormValidateError message={errors.weight.message} />}

              <label className={css.text} htmlFor="activityTime">
                {t('settings.active-sports-time')}
              </label>
              <input
                {...register('activityTime')}
                className={css.input}
                type="number"
                name="activityTime"
                id="activityTime"
              />
              {errors.activityTime && <FormValidateError message={errors.activityTime.message} />}
            </div>

            <div className={css.waterAmountWrapper}>
              <div className={css.amountField}>
                <p className={css.text}>{t('settings.required-water-amount')}</p>

                <span className={css.amount}>
                  {!gender || !weight ? t('settings.waiting-for-metrics') : requiredWater + ' L'}
                </span>
              </div>

              <label className={css.subtitle} htmlFor="desiredVolume">
                {t('settings.record-water-intake')}
              </label>
              <input
                {...register('desiredVolume')}
                className={css.input}
                type="text"
                name="desiredVolume"
                id="desiredVolume"
              />
              {errors.desiredVolume && <FormValidateError message={errors.desiredVolume.message} />}
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

export { UserSettingsForm };
