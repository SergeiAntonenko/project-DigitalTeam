import { DocumentTitle } from '../../components/DocumentTitle.jsx';
import css from './SignInPage.module.css';
import SignInForm from '../../components/SignInForm/SignInForm.jsx';
import AdvantagesSection from '../../components/AdvantagesSection/AdvantagesSection.jsx';

const SignInPage = () => {
  return (
    <>
      <DocumentTitle>Home Page</DocumentTitle>
      <div className={css.container}>
        <SignInForm />
        <div className={css.advantagesSection}><AdvantagesSection /></div>
      </div>
    </>
  );
};

export default SignInPage;
