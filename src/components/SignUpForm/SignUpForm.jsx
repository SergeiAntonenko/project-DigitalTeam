import { useState, useId } from 'react';
import css from './SignUpForm.module.css';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Link } from 'react-router-dom';
import { FiEye } from 'react-icons/fi';
import { FiEyeOff } from 'react-icons/fi';
import { useDispatch } from 'react-redux';
import { register } from '../../redux/auth/operations';

const contactScheme = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string()
    .min(6, 'Password is too short')
    .max(50, 'Password is too long')
    .required('Password is required'),
  passwordRepeat: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Password repeat is required'),
});

const SignUpPage = () => {
  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const emailId = useId();
  const pwdId = useId();
  const pwdRepeat = useId();

  const dispatch = useDispatch();

  const handleSubmit = (values, actions) => {
    dispatch(register(values));
    actions.resetForm();
  };

  return (
    <div className={css.signupBack}>
      <h3 className={css.logo}>AquaTrack</h3>
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
          <Form className={css.signupForm}>
            <div className={css.formTitle}>Sign Up</div>
            <div className={css.signupFormGroupEmail}>
              <label className={css.signUpLabel} htmlFor="email">
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

            <div className={css.signupFormGroupPassword}>
              <label className={css.signUpLabel} htmlFor="password">
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

            <div className={css.signupFormGroupPassword}>
              <label className={css.signUpLabel} htmlFor="passwordRepeat">
                Repeat password
              </label>
              <Field
                className={`${css.field} ${
                  errors.passwordRepeat && touched.passwordRepeat ? css.fieldError : ''
                }`}
                type={showPassword ? 'text' : 'password'}
                name="passwordRepeat"
                id={pwdRepeat}
                placeholder="Repeat password"
              />
              <div className={css.eyeIcon} onClick={handleTogglePasswordVisibility}>
                {showPassword ? <FiEye size={20} /> : <FiEyeOff size={20} />}
              </div>
              <ErrorMessage name="passwordRepeat" className={css.error} component="span" />
            </div>

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
