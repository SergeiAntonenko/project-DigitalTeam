import { useState } from 'react';
import css from './SignUpForm.module.css';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Link } from 'react-router-dom';
import { FiEye } from 'react-icons/fi';
import { FiEyeOff } from 'react-icons/fi';
import Logo from '../Logo/Logo.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../../redux/auth/operations.js';

const contactScheme = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string().min(6, 'Password is too short').max(50, 'Password is too long').required('Password is required'),
  passwordRepeat: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match').required('Password repeat is required'),
});

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

  return (
    <div className={css.formContainer}>
        <div className={css.logo}><Logo /></div>
      <Formik
        initialValues={{
          email: '',
          password: '',
          passwordRepeat: '',
        }}
        validationSchema={contactScheme}
        onSubmit={(values, actions) => {
          dispatch(register(values));
          actions.resetForm();
        }}
      >
        {({ errors, touched }) => (
          <Form className={css.form}>
            <div className={css.formTitle}>Sign Up</div>
            <div className={css.signupFormGroupEmail}>
              <label className={css.signUpLabel} htmlFor="email">Email</label>
              <Field
                className={`${css.field} ${errors.email && touched.email ? css.fieldError : ''}`}
                type="email"
                name="email"
                placeholder="Enter your email"
              />
            </div>
            <ErrorMessage name="email" className={css.error} component="span" />

            <div className={css.signupFormGroupPassword}>
              <label className={css.signUpLabel} htmlFor="password">Password</label>
                <Field
                  className={`${css.field} ${
                    errors.password && touched.password ? css.fieldError : ''
                  }`}
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  placeholder="Enter your password"
                />
                <div className={css.eyeIcon} onClick={handleTogglePasswordVisibility}>
                  {showPassword ? <FiEye size={20} /> : <FiEyeOff size={20} />}
              </div>
            </div>
            <ErrorMessage name="password" className={css.error} component="span" />

            <div className={css.signupFormGroupPassword}>
              <label className={css.signUpLabel} htmlFor="passwordRepeat">Repeat password</label>
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
              Sign Up
            </button>

            <div className={css.reminder}>
              Already have an account?{' '}
              <Link className={css.link} to="/signin">
                Sign In
              </Link>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default SignUpPage;

