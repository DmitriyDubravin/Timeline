import {
    togglePopupEventEdit,
    togglePopupEventDelete,
    getEvents
} from './../../store/actions';
import {extendEventWithHoursMinutes} from './../../support/functions';

// TODO reselect
function gatherEventsList(range, ranges, events) {
    const rangeData = ranges[range];
    if (rangeData !== undefined) {
        // TODO: remove to connector
        return rangeData.map(id => extendEventWithHoursMinutes(events[id]));
    }
    return [];
}

export default [
    state => ({
        eventsList: gatherEventsList(state.date.dateStr, state.eventsData.ranges, state.eventsData.events),
        range: state.date.dateStr
    }),
    dispatch => ({
        getEvents(data) {
            dispatch(getEvents(data));
        },
        openPopupEditEvent(id) {
            dispatch(togglePopupEventEdit({ show: true, id }))
        },
        openPopupDeleteEvent(id) {
            dispatch(togglePopupEventDelete({ show: true, id }))
        }
    })
];
