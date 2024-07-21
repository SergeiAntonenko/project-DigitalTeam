import Section from '../../shared/components/Section/Section';
import { DocumentTitle } from '../../components/DocumentTitle';
import WaterDetailedInfo from '../../components/WaterDetailedInfo/WaterDetailedInfo';
import WaterMainInfo from '../../components/WaterMainInfo/WaterMainInfo';

const TrackerPage = () => {
  return (
    <>
      <DocumentTitle>Tracker Page</DocumentTitle>
      <Section>
        <WaterMainInfo />
        <WaterDetailedInfo />
      </Section>
    </>
  );
};

export default TrackerPage;
