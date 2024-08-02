import { DocumentTitle } from '../../components/DocumentTitle.jsx';
import css from './SendResetEmailPage.module.css';
import SendResetEmailForm from '../../components/SendResetEmailForm/SendResetEmailForm.jsx';
import AdvantagesSection from '../../components/AdvantagesSection/AdvantagesSection.jsx';

const SendResetEmailPage = () => {
  return (
    <>
      <DocumentTitle>Send Reset Email Page</DocumentTitle>
      <div className={css.container}>
        <SendResetEmailForm />
        <div className={css.advantagesSection}>
          <AdvantagesSection />
        </div>
      </div>
    </>
  );
};

export default SendResetEmailPage;
