import s from './ChooseDate.module.css';
import { useSelector } from 'react-redux';
import { selectDate } from '../../redux/date/dateSlice';
import { getCurrentDate } from '../../shared/helpers/dateServices';
import { formatDate } from '../../shared/helpers/formatDate';

const ChooseDate = () => {
  const date = useSelector(selectDate);
  const today = getCurrentDate();
  const { formattedDate } = formatDate(date);

  const [day, month] = formattedDate.split(',');
  const months = {
    january: 'January',
    february: 'February',
    march: 'March',
    april: 'April',
    may: 'May',
    june: 'June',
    july: 'July',
    august: 'August',
    september: 'September',
    october: 'October',
    november: 'November',
    december: 'December',
  };

  const monthKey = month.trim().toLowerCase();

  return (
    <p className={s.date}>{date === today ? 'Today' : `${day.trim()}, ${months[monthKey]}`}</p>
  );
};

export default ChooseDate;
