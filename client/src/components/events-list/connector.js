import * as actions from './../../store/actions';
import {extendEventWithHoursMinutes} from './../../services/event.service';

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
        eventsList: gatherEventsList(
            state.date.dateStr,
            state.eventsData.ranges,
            state.eventsData.events
        ),
        range: state.date.dateStr
    }),
    dispatch => ({
        getEvents(payload) {
            dispatch(actions.eventsAddTask(payload));
        },
        openPopupEventEdit(id) {
            dispatch(actions.togglePopupEventEdit({ show: true, id }))
        },
        openPopupEventRemove(id) {
            dispatch(actions.togglePopupEventRemove({ show: true, id }))
        }
    })
];
