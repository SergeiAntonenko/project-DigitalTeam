import { DocumentTitle } from '../../components/DocumentTitle.jsx';
import css from './SignUpPage.module.css';
import SignUpForm from '../../components/SignUpForm/SignUpForm.jsx';
import AdvantagesSection from '../../components/AdvantagesSection/AdvantagesSection.jsx';

const SignUpPage = () => {
  return (
    <>
      <DocumentTitle>Home Page</DocumentTitle>
      <div className={css.container}>
        <SignUpForm />
        <div className={css.advantagesSection}><AdvantagesSection /></div>
        </div>
    </>
  );
};

export default SignUpPage;