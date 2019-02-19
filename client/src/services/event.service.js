import { compose } from './functional.service';
import { changeObjKey, removeObjKey } from './object.service';
import { log } from './common.service';
import {
    extendDateObjWithHour,
    extendDateObjWithMinute,
    extendObjWithDate
} from './time.service';

const extendWithDateByStart = extendObjWithDate('start');
const extendWithDateByFinish = extendObjWithDate('finish');
const removeObjKeyDate = removeObjKey('date');
const changeHourToStartHour = changeObjKey('hour', 'startHour');
const changeMinuteToStartMinute = changeObjKey('minute', 'startMinute');
const changeHourToFinishHour = changeObjKey('hour', 'finishHour');
const changeMinuteToFinishMinute = changeObjKey('minute', 'finishMinute');

export const extendEventWithHoursMinutes = compose(
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
);
