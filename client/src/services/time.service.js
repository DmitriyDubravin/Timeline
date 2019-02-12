import { convertNumToTwoDigits } from './math.service';
import { compose } from 'redux';

export const getDateYear = date => date.getUTCFullYear();
export const getDateMonth = date => date.getUTCMonth() + 1; // TODO: remove "+1"
export const getDateDay = date => date.getUTCDate();
export const getDateHour = date => date.getUTCHours();
export const getDateMinute = date => date.getUTCMinutes();
export const getDateSecond = date => date.getUTCSeconds();
export const getDateMillisecond = date => date.getUTCMilliseconds();

export const extendDateWithYear = obj => ({...obj, year: getDateYear(obj.date)});
export const extendDateWithMonth = obj => ({...obj, month: getDateMonth(obj.date)});
export const extendDateWithDay = obj => ({...obj, day: getDateDay(obj.date)});
export const extendDateWithHour = obj => ({...obj, hour: convertNumToTwoDigits(getDateHour(obj.date))});
export const extendDateWithMinute = obj => ({...obj, minute: convertNumToTwoDigits(getDateMinute(obj.date))});
export const extendDateWithSecond = obj => ({...obj, second: getDateSecond(obj.date)});
export const extendDateWithMillisecond = obj => ({...obj, millisecond: getDateMillisecond(obj.date)});

export const stringify = value => value.toString();
export const timestampToMS = value => value * 1000;
export const timestampMSToDateObj = value => ({date: new Date(value)});

export const timestampToTimeObj = compose(
    extendDateWithMinute,
    extendDateWithHour,
    extendDateWithDay,
    extendDateWithMonth,
    extendDateWithYear,
    timestampMSToDateObj,
    timestampToMS
);
