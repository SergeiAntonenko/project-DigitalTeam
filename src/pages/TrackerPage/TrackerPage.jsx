import Section from '../../shared/components/Section/Section';
import { DocumentTitle } from '../../components/DocumentTitle';
import WaterDetailedInfo from '../../components/WaterDetailedInfo/WaterDetailedInfo';
import WaterMainInfo from '../../components/WaterMainInfo/WaterMainInfo';
import { useDispatch, useSelector } from 'react-redux';
import { selectIsLoading } from '../../redux/auth/selectors';
import { useEffect } from 'react';
import { getCurrentUser } from '../../redux/users/operations.js';

const TrackerPage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCurrentUser());
  }, [dispatch]);

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
