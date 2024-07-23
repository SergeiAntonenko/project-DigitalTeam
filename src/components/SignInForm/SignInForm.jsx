import { useState, useId } from 'react';
import css from './SignInForm.module.css';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Link } from 'react-router-dom';
import { FiEye } from 'react-icons/fi';
import { FiEyeOff } from 'react-icons/fi';
import { useDispatch } from 'react-redux';
import { login } from '../../redux/auth/operations';

const contactScheme = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string()
    .min(6, 'Password is too short')
    .max(50, 'Password is too long')
    .required('Password is required'),
});

const SignInForm = () => {
  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const emailId = useId();
  const pwdId = useId();
  const dispatch = useDispatch();

  const handleSubmit = (values, actions) => {
    dispatch(login(values));
    actions.resetForm();
  };

  return (
    <div className={css.signinForm}>
      <h3 className={css.logo}>AquaTrack</h3>
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
            <div className={css.formTitle}>Sign In</div>
            <div className={css.signinFormGroupEmail}>
              <label className={css.signInLabel} htmlFor="email">
                Email
              </label>
              <Field
                className={`${css.field} ${errors.email && touched.email ? css.fieldError : ''}`}
                type="email"
                name="email"
                id={emailId}
                placeholder="Enter your email"
              />
              <ErrorMessage name="email" className={css.error} component="span" />
            </div>

            <div className={css.signinFormGroupPassword}>
              <label className={css.signInLabel} htmlFor="password">
                Password
              </label>
              <Field
                className={`${css.field} ${
                  errors.password && touched.password ? css.fieldError : ''
                }`}
                type={showPassword ? 'text' : 'password'}
                name="password"
                id={pwdId}
                placeholder="Enter your password"
              />
              <div className={css.eyeIcon} onClick={handleTogglePasswordVisibility}>
                {showPassword ? <FiEye size={20} /> : <FiEyeOff size={20} />}
              </div>
              <ErrorMessage name="password" className={css.error} component="span" />
            </div>

            <button className={css.button} type="submit">
              Sign In
            </button>

            <div className={css.reminder}>
              Don't have an account?{' '}
              <Link className={css.link} to="/signup">
                Sign Up
              </Link>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default SignInForm;