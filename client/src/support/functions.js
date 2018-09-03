

export const convertNumToTwoDigits = n => ('0' + n).slice(-2);

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
export const getRange = (start, finish) => {
    let {day: sDay, month: sMonth, year: sYear} = start;
    let {day: fDay, month: fMonth, year: fYear} = finish;
    return {
        start: Math.floor(+new Date(Date.UTC(sYear, sMonth, sDay)) / 1000),
        finish: Math.floor(+new Date(Date.UTC(fYear, fMonth, fDay, 23, 59, 59)) / 1000)
    }
}