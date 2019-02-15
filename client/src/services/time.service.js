import { convertNumToTwoDigits } from './math.service';
import { extendObj } from './object.service';
import { compose } from 'redux';

export const TSToTSMS = value => value * 1000;

export const convertTSToDate = timestamp => new Date(TSToTSMS(timestamp));
export const getDate = ({
    year = 1970,
    month = 0,
    day = 1,
    hour = 0,
    minute = 0,
    second = 0,
    millisecond = 0
}) => new Date(Date.UTC(year, month, day, hour, minute, second, millisecond));
export const convertTSMSToTS = timestampMS => Math.floor(timestampMS / 1000);
export const convertDateToTSMS = date => +date;

export const getDateYear = date => date.getUTCFullYear();
export const getDateMonth = date => date.getUTCMonth() + 1; // TODO: remove "+1"
export const getDateDay = date => date.getUTCDate();
export const getDateHour = date => convertNumToTwoDigits(date.getUTCHours());
export const getDateMinute = date => convertNumToTwoDigits(date.getUTCMinutes());
export const getDateSecond = date => date.getUTCSeconds();
export const getDateMillisecond = date => date.getUTCMilliseconds();

export const extendDateObjWithYear = extendObj(getDateYear)('year')('date');
export const extendDateObjWithMonth = extendObj(getDateMonth)('month')('date');
export const extendDateObjWithDay = extendObj(getDateDay)('day')('date');
export const extendDateObjWithHour = extendObj(getDateHour)('hour')('date');
export const extendDateObjWithMinute = extendObj(getDateMinute)('minute')('date');
export const extendDateObjWithSecond = extendObj(getDateSecond)('second')('date');
export const extendDateObjWithMillisecond = extendObj(getDateMillisecond)('millisecond')('date');

export const extendObjWithDate = extendObj(convertTSToDate)('date');

export const convertHourMinuteToSecond = (date, hour, minute) => {
    let {day, month, year} = date;
    return Math.floor(+new Date(Date.UTC(year, month, day, hour, minute)) / 1000)
}

export const getTS = compose(
    convertTSMSToTS,
    convertDateToTSMS,
    getDate
);