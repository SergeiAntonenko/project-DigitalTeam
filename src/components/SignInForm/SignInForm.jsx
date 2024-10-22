import { useState } from 'react';
import css from './SignInForm.module.css';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Link } from 'react-router-dom';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import Logo from '../Logo/Logo.jsx';
import { useDispatch } from 'react-redux';
import { login } from '../../redux/auth/operations';
import { useTranslation } from 'react-i18next';
import GoogleAuthButton from '../GoogleAuth/GoogleAuthButton.jsx';

const SignInForm = () => {
  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const dispatch = useDispatch();

  const handleSubmit = (values, actions) => {
    dispatch(login(values));
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
        }}
        validationSchema={contactScheme}
        onSubmit={handleSubmit}
      >
        {({ errors, touched }) => (
          <Form className={css.form}>
            <div className={css.formTitle}>{t('signup-signin-sections.signin')}</div>

            <div className={css.signinFormGroupEmail}>
              <label className={css.signInLabel} htmlFor="email">
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

            <div className={css.signinFormGroupPassword}>
              <label className={css.signInLabel} htmlFor="password">
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

            <button className={css.button} type="submit">
              {t('signup-signin-sections.signin')}
            </button>

            <GoogleAuthButton />

            <div className={css.reminder}>
              {t('signup-signin-sections.dont-have-account')}{' '}
              <Link className={css.link} to="/signup">
                {t('signup-signin-sections.signup')}
              </Link>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default SignInForm;
