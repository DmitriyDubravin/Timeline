import * as actions from './../../store/actions';

// TODO reselect
function gatherEventsList(range, ranges, events) {
    const rangeData = ranges[range];
    return (rangeData !== undefined) 
        ? rangeData.map(id => events[id])
        : [];
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
