import { ErrorMessage, Field, Formik, Form } from 'formik';
import * as Yup from 'yup';
// import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { useState } from 'react';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import Logo from '../Logo/Logo.jsx';
import css from './ResetPwdForm.module.css';
import { resetPassword } from '../../redux/auth/operations';

const ResetPwdForm = () => {
  //   const { t } = useTranslation();
  const dispatch = useDispatch();
  const location = useLocation();
  const [isSuccess, setIsSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(true);
  const [showPasswordRepeat, setShowPasswordRepeat] = useState(true);

  const SendResetEmailSchema = Yup.object().shape({
    password: Yup.string().min(8).required(),
    passwordRepeat: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .required(),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const userData = { ...values };
      //   delete userData.passwordRepeat;

      const queryParams = new URLSearchParams(location.search);
      const resetToken = queryParams.get('resetToken');

      const response = await dispatch(
        resetPassword({ password: userData.password, token: resetToken })
      );
      if (response.meta.requestStatus === 'fulfilled') {
        setIsSuccess(true);
      } else {
        console.error('Password reset failed:', response.error.message);
      }
    } catch (error) {
      console.error('Error during password reset:', error);
    } finally {
      setSubmitting(false);
    }
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleTogglePasswordRepeatVisibility = () => {
    setShowPasswordRepeat(!showPasswordRepeat);
  };

  return (
    <div className={css.formContainer}>
      <div className={css.logo}>
        <Logo />
      </div>
      {isSuccess ? (
        <div>The operation was successful!</div>
      ) : (
        <Formik
          initialValues={{
            password: '',
            passwordRepeat: '',
          }}
          validationSchema={SendResetEmailSchema}
          onSubmit={handleSubmit}
        >
          {({ errors, touched }) => (
            <Form className={css.form}>
              <div className={css.formTitle}>Restore password</div>

              <div className={css.passwordResetForm}>
                <label className={css.passwordRepeat} htmlFor="password">
                  Enter password
                </label>
                <Field
                  className={`${css.field} ${
                    errors.password && touched.password ? css.fieldError : ''
                  }`}
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  placeholder="Enter password"
                />
                <div className={css.eyeIcon} onClick={handleTogglePasswordVisibility}>
                  {showPassword ? <FiEye size={20} /> : <FiEyeOff size={20} />}
                </div>
              </div>
              <ErrorMessage name="password" className={css.error} component="span" />

              <div className={css.passwordResetForm}>
                <label className={css.passwordRepeat} htmlFor="passwordRepeat">
                  Repeat password
                </label>
                <Field
                  className={`${css.field} ${
                    errors.passwordRepeat && touched.passwordRepeat ? css.fieldError : ''
                  }`}
                  type={showPasswordRepeat ? 'text' : 'password'}
                  name="passwordRepeat"
                  placeholder="Repeat password"
                />
                <div className={css.eyeIcon} onClick={handleTogglePasswordRepeatVisibility}>
                  {showPasswordRepeat ? <FiEye size={20} /> : <FiEyeOff size={20} />}
                </div>
              </div>
              <ErrorMessage name="passwordRepeat" className={css.error} component="span" />

              <button className={css.button} type="submit">
                Continue
              </button>
            </Form>
          )}
        </Formik>
      )}
    </div>
  );
};

export default ResetPwdForm;
