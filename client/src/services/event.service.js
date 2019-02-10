
import { event as scheme } from './../schemes';
import { timestampToTimeObj } from './time.service';

const getEventId = event => event.id;
const getEventAuthor = event => event.author;
const getEventStart = event => event.start;
const getEventFinish = event => event.finish;
const getEventType = event => event.type;
const getEventCategory = event => event.category;
const getEventSubcategory = event => event.subcategory;
const getEventComment = event => event.comment;

const extendEventWithHours = event => {
}

export const extendEventWithHoursMinutes = event => {
    const {hour: startHour, minute: startMinute} = timestampToTimeObj(event.start);
    const {hour: finishHour, minute: finishMinute} = timestampToTimeObj(event.finish);
    return {...event, startHour, startMinute, finishHour, finishMinute};
}
