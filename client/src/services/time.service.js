
import { convertNumToTwoDigits } from './math.service';

export const timestampToTimeObj = timestamp => {
    let time = timestamp.toString();
    if (time.length < 11) time += '000';
    const date = new Date(+time);
    const year = date.getUTCFullYear();
    const month = date.getUTCMonth() + 1;
    const day = date.getUTCDate();
    const hour = convertNumToTwoDigits(date.getUTCHours());
    const minute = convertNumToTwoDigits(date.getUTCMinutes());
    return {year, month, day, hour, minute}
}

export const getDateYear = date => date.getUTCFullYear();
export const getDateMonth = date => date.getUTCMonth() + 1; // TODO: remove "+1"
export const getDateDay = date => date.getUTCDate();
export const getDateHour = date => date.getUTCHours();
export const getDateMinute = date => date.getUTCMinutes();
export const getDateSecond = date => date.getUTCSeconds();
export const getDateMillisecond = date => date.getUTCMilliseconds();
