
import { convertNumToTwoDigits } from './math.service';

export const getDateYear = date => date.getUTCFullYear();
export const getDateMonth = date => date.getUTCMonth() + 1; // TODO: remove "+1"
export const getDateDay = date => date.getUTCDate();
export const getDateHour = date => date.getUTCHours();
export const getDateMinute = date => date.getUTCMinutes();
export const getDateSecond = date => date.getUTCSeconds();
export const getDateMillisecond = date => date.getUTCMilliseconds();

export const timestampToTimeObj = timestamp => {
    let time = timestamp.toString();
    if (time.length < 11) time += '000';
    const date = new Date(+time);

    console.log(0, date);

    const year = getDateYear(date);
    const month = getDateMonth(date);
    const day = getDateDay(date);
    const hour = convertNumToTwoDigits(getDateHour(date));
    const minute = convertNumToTwoDigits(getDateMinute(date));

    return {year, month, day, hour, minute}
}
