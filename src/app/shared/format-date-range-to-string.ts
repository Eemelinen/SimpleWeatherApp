import { HasDatetimeInterface } from './has-datetime.interface';

type DateObject = { year: string; month: string; day: string };
const months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];

export const formatDateRangeToString = (data: HasDatetimeInterface[]): string => {
  const dateRange = getDateRange(data);
  return formatDateRange(dateRange.firstDateObj, dateRange.lastDateObj);
}

const getMonthName = (month: number): string => {
  return months[month];
}

const removeFirstCharIfZero = (str: string): string => {
  return str && str[0] === '0' ? str.slice(1) : str;
}

const getDateRange = (forecasts: HasDatetimeInterface[]): { firstDateObj: DateObject; lastDateObj: DateObject } => {
  const [firstDateObj, lastDateObj] = [
    forecasts[0].datetime,
    forecasts[forecasts.length - 1].datetime
  ].map(dateString => {
    const [year, month, day] = dateString.split("-");
    return {
      year,
      month,
      day: removeFirstCharIfZero(day)
    };
  });

  return { firstDateObj, lastDateObj };
}

const formatDateRange = (firstDate: DateObject, lastDate: DateObject): string => {
  const firstMonth = getMonthName(Number(firstDate.month) - 1);
  const lastMonth = getMonthName(Number(lastDate.month) - 1);

  if (firstDate.year !== lastDate.year) {
    return `${firstMonth} ${firstDate.day}, ${firstDate.year} - ${lastMonth} ${lastDate.day} ${lastDate.year}`;
  }

  if (firstDate.month !== lastDate.month) {
    return `${firstMonth} ${firstDate.day} - ${lastMonth} ${lastDate.day} ${lastDate.year}`;
  }

  return `${firstMonth} ${firstDate.day} - ${lastDate.day} ${lastDate.year}`;
}

