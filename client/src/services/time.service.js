import { convertNumToTwoDigits } from './math.service';
import { extendObj, extendObjFromProp } from './object.service';
import { compose } from './functional.service';
import { forward } from './common.service';

export const getDateYear = date => date.getFullYear();
export const getDateMonth = date => date.getMonth();
export const getDateMonthTwoDigits = date => convertNumToTwoDigits(getDateMonth(date) + 1);
export const getDateDay = date => date.getDate();
export const getDateDayTwoDigits = date => convertNumToTwoDigits(getDateDay(date));
export const getDateHour = date => date.getHours();
export const getDateHourTwoDigits = date => convertNumToTwoDigits(getDateHour(date));
export const getDateMinute = date => date.getMinutes();
export const getDateMinuteTwoDigits = date => convertNumToTwoDigits(getDateMinute(date));
export const getDateSecond = date => date.getSeconds();
export const getDateMillisecond = date => date.getMilliseconds();
export const formatDate = date => `${getDateDayTwoDigits(date)}.${getDateMonthTwoDigits(date)}.${getDateYear(date)}`;

export const setDateHour = (...args) => date => {
    date.setHours(...args);
    return date;
}
export const setDateDayStart = setDateHour(0,0,0,0);
export const setDateDayFinish = setDateHour(23,59,59,999);


export const TSMSToTS = TSMS => Math.floor(TSMS / 1000);
export const TSToTSMS = TS => TS * 1000;
export const TSMSToDate = TSMS => new Date(TSMS);
export const TSToDate = TS => new Date(TSToTSMS(TS));
export const dateToTSMS = date => +date;
export const getDate = () => new Date();
export const propsToDate = (...args) => new Date(...args);
export const objToDate = ({
    year = 1970,
    month = 0,
    day = 1,
    hour = 0,
    minute = 0,
    second = 0,
    millisecond = 0
}) => new Date(year, month, day, hour, minute, second, millisecond);
export const cloneDate = date => TSMSToDate(+date);

export const getDateStart = compose(
    setDateDayStart,
    getDate
);
export const getDateDayStartTSMS = compose(
    TSMSToTS,
    dateToTSMS,
    // setDateDayStart,
    cloneDate
);
export const getDateDayFinishTSMS = compose(
    TSMSToTS,
    dateToTSMS,
    setDateDayFinish,
    cloneDate
);

export const createObjWithTodayDate = extendObjFromProp('date')(getDateStart)();

export const createObjWithPropsDate = extendObj('date')(forward)();

export const extendDateObjWithDayStartTSMS = extendObjFromProp('start')(getDateDayStartTSMS)('date');
export const extendDateObjWithDayFinishTSMS = extendObjFromProp('finish')(getDateDayFinishTSMS)('date');

export const extendDateObjWithYear = extendObjFromProp('year')(getDateYear)('date');
export const extendDateObjWithMonth = extendObjFromProp('month')(getDateMonth)('date');
export const extendDateObjWithDay = extendObjFromProp('day')(getDateDay)('date');
export const extendDateObjWithHour = extendObjFromProp('hour')(getDateHourTwoDigits)('date');
export const extendDateObjWithMinute = extendObjFromProp('minute')(getDateMinuteTwoDigits)('date');
export const extendDateObjWithSecond = extendObjFromProp('second')(getDateSecond)('date');
export const extendDateObjWithMillisecond = extendObjFromProp('millisecond')(getDateMillisecond)('date');
export const extendDateObjWithFormat = extendObjFromProp('format')(formatDate)('date');

export const extendObjWithDate = extendObjFromProp('date')(TSToDate);

export const getTS = compose(
    TSMSToTS,
    dateToTSMS,
    objToDate,
);

export const createDateObj = compose(
    extendDateObjWithDayFinishTSMS,
    extendDateObjWithDayStartTSMS,
    extendDateObjWithFormat,
    extendDateObjWithDay,
    extendDateObjWithMonth,
    extendDateObjWithYear
);

export const createTodayDateObj = compose(
    createDateObj,
    createObjWithTodayDate
);
export const createPropsDateObj = compose(
    createDateObj,
    createObjWithPropsDate
);
