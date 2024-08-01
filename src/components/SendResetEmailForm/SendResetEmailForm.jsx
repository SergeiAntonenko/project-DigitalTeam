import { ErrorMessage, Field, Formik, Form } from 'formik';
import * as Yup from 'yup';
// import { useTranslation } from 'react-i18next';
import Logo from '../Logo/Logo.jsx';
import css from './SendResetEmailForm.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { sendResetEmail } from '../../redux/auth/operations';

const SendResetEmailForm = () => {
  const dispatch = useDispatch();
  const { isSend, successMessage } = useSelector(state => state.auth);
  //   const { t } = useTranslation();

  const SendResetEmailSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required(),
  });

  const handleSubmit = (values, { setSubmitting }) => {
    dispatch(sendResetEmail(values.email))
      .then(response => {
        console.log('Success:', response);
      })
      .catch(error => {
        console.error('Error:', error);
      })
      .finally(() => {
        setSubmitting(false);
      });
  };

  return (
    <div className={css.formContainer}>
      <div className={css.logo}>
        <Logo />
      </div>
      <Formik
        initialValues={{ email: '' }}
        validationSchema={SendResetEmailSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched }) => (
          <Form className={css.form}>
            <div className={css.formTitle}>Forgot your password?</div>
            <div className={css.sendResetEmail}>
              <label className={css.signUpLabel} htmlFor="email">
                Enter email
              </label>
              <Field
                className={`${css.field} ${errors.email && touched.email ? css.fieldError : ''}`}
                type="email"
                name="email"
                placeholder="enter Email"
              />
            </div>
            <ErrorMessage name="email" className={css.error} component="span" />

            <button className={css.button} type="submit">
              Send email
            </button>
            {isSend && (
              <div name="isSend" className={css.isSend}>
                {successMessage}
              </div>
            )}
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default SendResetEmailForm;
