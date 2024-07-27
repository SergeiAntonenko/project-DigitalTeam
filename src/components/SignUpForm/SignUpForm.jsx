import { useState } from 'react';
import css from './SignUpForm.module.css';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Link } from 'react-router-dom';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import Logo from '../Logo/Logo.jsx';
import { useDispatch } from 'react-redux';
import { register } from '../../redux/auth/operations';
import { useTranslation } from 'react-i18next';

const SignUpPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordRepeat, setShowPasswordRepeat] = useState(false);

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleTogglePasswordRepeatVisibility = () => {
    setShowPasswordRepeat(!showPasswordRepeat);
  };

  const dispatch = useDispatch();

  const handleSubmit = (values, actions) => {
    const namePart = values.email.split('@')[0];
    let name = namePart.charAt(0).toUpperCase() + namePart.slice(1);
    if (name.length > 10) {
      name = 'User';
    }
    const updValues = {
      name: name,
      email: values.email,
      password: values.password,
    };
    dispatch(register(updValues));
    actions.resetForm();
  };

  const { t } = useTranslation();

  const contactScheme = Yup.object().shape({
    email: Yup.string()
      .email(t('signup-signin-sections.invalid-email'))
      .required(t('signup-signin-sections.email-required')),
    password: Yup.string()
      .min(6, t('signup-signin-sections.password-short'))
      .max(50, t('signup-signin-sections.password-long'))
      .required(t('signup-signin-sections.password-required')),
    passwordRepeat: Yup.string()
      .oneOf([Yup.ref('password'), null], t('signup-signin-sections.password-match'))
      .required(t('signup-signin-sections.password-repeat-required')),
  });

  return (
    <div className={css.formContainer}>
      <div className={css.logo}>
        <Logo />
      </div>
      <Formik
        initialValues={{
          email: '',
          password: '',
          passwordRepeat: '',
        }}
        validationSchema={contactScheme}
        onSubmit={handleSubmit}
      >
        {({ errors, touched }) => (
          <Form className={css.form}>
            <div className={css.formTitle}>{t('signup-signin-sections.signup')}</div>
            <div className={css.signupFormGroupEmail}>
              <label className={css.signUpLabel} htmlFor="email">
                {t('signup-signin-sections.email')}
              </label>
              <Field
                className={`${css.field} ${errors.email && touched.email ? css.fieldError : ''}`}
                type="email"
                name="email"
                placeholder={t('signup-signin-sections.enter-email')}
              />
            </div>
            <ErrorMessage name="email" className={css.error} component="span" />

            <div className={css.signupFormGroupPassword}>
              <label className={css.signUpLabel} htmlFor="password">
                {t('signup-signin-sections.password')}
              </label>
              <Field
                className={`${css.field} ${
                  errors.password && touched.password ? css.fieldError : ''
                }`}
                type={showPassword ? 'text' : 'password'}
                name="password"
                placeholder={t('signup-signin-sections.enter-password')}
              />
              <div className={css.eyeIcon} onClick={handleTogglePasswordVisibility}>
                {showPassword ? <FiEye size={20} /> : <FiEyeOff size={20} />}
              </div>
            </div>
            <ErrorMessage name="password" className={css.error} component="span" />

            <div className={css.signupFormGroupPassword}>
              <label className={css.signUpLabel} htmlFor="passwordRepeat">
                {t('signup-signin-sections.repeat-password')}
              </label>
              <Field
                className={`${css.field} ${
                  errors.passwordRepeat && touched.passwordRepeat ? css.fieldError : ''
                }`}
                type={showPasswordRepeat ? 'text' : 'password'}
                name="passwordRepeat"
                placeholder={t('signup-signin-sections.enter-repeat-password')}
              />
              <div className={css.eyeIcon} onClick={handleTogglePasswordRepeatVisibility}>
                {showPasswordRepeat ? <FiEye size={20} /> : <FiEyeOff size={20} />}
              </div>
            </div>
            <ErrorMessage name="passwordRepeat" className={css.error} component="span" />

            <button className={css.button} type="submit">
              {t('signup-signin-sections.signup')}
            </button>

            <div className={css.reminder}>
              {t('signup-signin-sections.already-have-account')}{' '}
              <Link className={css.link} to="/signin">
                {t('signup-signin-sections.signin')}
              </Link>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default SignUpPage;
