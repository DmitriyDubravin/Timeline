import { compose } from 'redux';
// import { event as scheme } from './../schemes';
import { timestampToTimeObj } from './time.service';
import {
    timestampToMS,
    timestampMSToDateObj,
    extendDateObjWithHour,
    extendDateObjWithMinute,
    extendObjWithDate
} from './time.service';

// const getEventId = event => event.id;
// const getEventAuthor = event => event.author;
const getEventStart = event => event.start;
const getEventFinish = event => event.finish;
// const getEventType = event => event.type;
// const getEventCategory = event => event.category;
// const getEventSubcategory = event => event.subcategory;
// const getEventComment = event => event.comment;

export const log = value => {
    console.log('log',value);
    return value;
}

export const extendWithDateByKey = byKeyTimestamp => extendObjWithDate(byKeyTimestamp);

export const removeObjKey = key => obj => {
    const {[key]: any, ...rest} = obj;
    return {...rest}
}
export const changeKeyName = (from, to) => obj => {
    const {[from]: any, ...rest} = obj;
    return {...rest, [to]: obj[from]}
}

const extendWithDateByStart = extendWithDateByKey('start');
const extendWithDateByFinish = extendWithDateByKey('finish');
const removeObjKeyDate = removeObjKey('date');
const changeHourToStartHour = changeKeyName('hour', 'startHour');
const changeMinuteToStartMinute = changeKeyName('minute', 'startMinute');
const changeHourToFinishHour = changeKeyName('hour', 'finishHour');
const changeMinuteToFinishMinute = changeKeyName('minute', 'finishMinute');

export const extendEventWithHoursMinutes = compose(
    log,
    removeObjKeyDate,
    changeMinuteToFinishMinute,
    changeHourToFinishHour,
    extendDateObjWithMinute,
    extendDateObjWithHour,
    extendWithDateByFinish,
    changeMinuteToStartMinute,
    changeHourToStartHour,
    extendDateObjWithMinute,
    extendDateObjWithHour,
    extendWithDateByStart,
    log
);


// export const extendEventWithHoursMinutes = event => {
//     const {
//         hour: startHour,
//         minute: startMinute
//     } = timestampToTimeObj(getEventStart(event));
//     const {
//         hour: finishHour,
//         minute: finishMinute
//     } = timestampToTimeObj(getEventFinish(event));
//     const s = {
//         ...event,
//         startHour,
//         startMinute,
//         finishHour,
//         finishMinute
//     };

    // console.log('s', s);
    // return s;
// }
