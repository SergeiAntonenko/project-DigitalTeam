import { Helmet } from 'react-helmet';
import Section from '../../shared/components/Section/Section';
import WaterDetailedInfo from '../../components/WaterDetailedInfo/WaterDetailedInfo';

const TrackerPage = () => {
  return (
    <>
      <Helmet>
        <title>Tracker Page</title>
      </Helmet>
      <Section>
        {/* <WaterMainInfo /> */}
        <WaterDetailedInfo />
      </Section>
    </>
  );
};

export default TrackerPage;
