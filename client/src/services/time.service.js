import { convertNumToTwoDigits } from './math.service';
import { extendObj } from './object.service';

export const timestampToMS = value => value * 1000;

export const getDate = timestamp => new Date(timestampToMS(timestamp));
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

export const extendObjWithDate = extendObj(getDate)('date');
