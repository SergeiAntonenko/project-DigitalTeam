import { DocumentTitle } from '../../components/DocumentTitle.jsx';
import css from './ResetPwdPage.module.css';
import ResetPwdForm from '../../components/ResetPwdForm/ResetPwdForm.jsx';
import AdvantagesSection from '../../components/AdvantagesSection/AdvantagesSection.jsx';

const ResetPwdPage = () => {
  return (
    <>
      <DocumentTitle>Reset Password Page</DocumentTitle>
      <div className={css.container}>
        <ResetPwdForm />
        <div className={css.advantagesSection}>
          <AdvantagesSection />
        </div>
      </div>
    </>
  );
};

export default ResetPwdPage;
