import { useState } from 'react'; // Импорт useState
import css from './SignInPage.module.css';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Link } from 'react-router-dom';
import eyeOffIcon from '../../photos/eye-off.png';
import eyeOnIcon from '../../photos/eye-on.png'; // Иконка для видимого пароля

const contactScheme = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string().min(8, 'Password is too short').max(50, 'Password is too long').required('Password is required'),
});

const SignInPage = () => {
  const [showPassword, setShowPassword] = useState(false); 

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className={css.container}>
      <div className={css.SignInSection}>
        <h3 className={css.logo}>AquaTrack</h3>
        <Formik
          initialValues={{
            email: '',
            password: '',
          }}
          validationSchema={contactScheme}
          onSubmit={(values, actions) => {
            actions.resetForm();
          }}
        >
          {({ errors, touched }) => (
            <Form className={css.form}>
              <div className={css.formTitle}>Sign In</div>
              <div className={css.formGroup}>
                <label htmlFor="email">Email</label>
                <Field
                  className={`${css.field} ${errors.email && touched.email ? css.fieldError : ''}`}
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                />
                <ErrorMessage name="email" className={css.error} component="span" />
              </div>

              <div className={css.formGroup}>
                <label htmlFor="password">Password</label>
                <div className={css.passwordWrapper}>
                  <Field
                    className={`${css.field} ${errors.password && touched.password ? css.fieldError : ''}`}
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Enter your password"
                  />
                  <img
                    src={showPassword ? eyeOnIcon : eyeOffIcon}
                    alt="Toggle password visibility"
                    className={css.eyeIcon}
                    onClick={handleTogglePasswordVisibility}
                  />
                </div>
                <ErrorMessage name="password" className={css.error} component="span" />
              </div>

              <button className={css.button} type="submit">
                Sign In
              </button>

              <div className={css.reminder}>
                Don't have an account? <Link className={css.link} to="/signup">Sign Up</Link>
              </div>
            </Form>
          )}
        </Formik>
      </div>
      <div className={css.advantages}>
        <div>
          <p className={css.Customers}>
            <span className={css.happySpan}></span>Our <span className={css.colorHappy}>happy</span> customers
          </p>
        </div>
        <div className={css.benefits}>
          <div className={css.habitWrapper}>
            <p className={css.habitDrive}>
              <span className={css.habbitSpan}></span>Habit drive
            </p>
            <p className={css.statistics}>View statistics</p>
          </div>
          <p className={css.rate}>Personal rate setting</p>
        </div>
      </div>
    </div>
  );
};

export default SignInPage;
