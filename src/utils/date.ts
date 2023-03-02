import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

dayjs.extend(utc);
dayjs.extend(timezone);

/**
 * 旧サイトでの日付表記を踏襲
 */
export const formatDate = (dateString: string) => {
  const formattedDate = dayjs
    .utc(dateString)
    .tz('Asia/Tokyo')
    .format('YYYY/MM/DD');
  return formattedDate;
};
