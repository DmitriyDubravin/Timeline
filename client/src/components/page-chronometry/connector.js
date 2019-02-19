import * as actions from './../../store/actions';

// TODO reselect
function gatherEventsList(range, ranges, events) {
    const rangeData = ranges[range];
    return (rangeData === undefined) 
        ? []
        : rangeData.map(id => events[id]);
}

export default [
    state => ({
        user: state.user,
        eventsList: gatherEventsList(
            state.date.format,
            state.eventsData.ranges,
            state.eventsData.events
        ),
        range: state.date.format
    }),
    dispatch => ({
        getEvents(payload) {
            dispatch(actions.eventsAddTask(payload));
        },
        openPopupEventAdd() {
            dispatch(actions.togglePopupEventAdd({ show: true }))
        }
    })
];
