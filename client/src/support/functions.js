

export const convertNumToTwoDigits = n => ('0' + n).slice(-2);

export const timestampToTimeObj = timestamp => {
    let time = timestamp.toString();
    if (time.length < 11) time += '000';
    const date = new Date(+time);
    const year = date.getUTCFullYear();
    const month = date.getUTCMonth() + 1;
    const day = date.getUTCDate();
    const hours = convertNumToTwoDigits(date.getUTCHours());
    const minutes = convertNumToTwoDigits(date.getUTCMinutes());
    return {year, month, day, hours, minutes}
}