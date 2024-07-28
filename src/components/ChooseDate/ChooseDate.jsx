import s from './ChooseDate.module.css';
import { useSelector } from 'react-redux';
import { selectDate } from '../../redux/date/dateSlice';
import { getCurrentDate } from '../../shared/helpers/dateServices';
import { formatDate } from '../../shared/helpers/formatDate';
import { useTranslation } from 'react-i18next';

const ChooseDate = () => {
  const { t } = useTranslation();
  const date = useSelector(selectDate);
  const today = getCurrentDate();
  const { formattedDate } = formatDate(date);

  const [day, month] = formattedDate.split(',');
  const months = {
    january: 'month.january',
    february: 'month.february',
    march: 'month.march',
    april: 'month.april',
    may: 'month.may',
    june: 'month.june',
    july: 'month.july',
    august: 'month.august',
    september: 'month.september',
    october: 'month.october',
    november: 'month.november',
    december: 'month.december',
  };

  const monthKey = month.trim().toLowerCase();

  return (
    <p className={s.date}>
      {date === today ? t('daily-info.today') : `${day.trim()}, ${t(months[monthKey])}`}
    </p>
  );
};

export default ChooseDate;
