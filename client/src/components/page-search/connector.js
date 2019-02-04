import * as action from './../../store/actions';

export default [
    state => ({
        name: state.user.name,
        events: state.eventsData.events,
        ranges: state.eventsData.ranges
    }),
    dispatch => ({
        addRangeEvents(range, events) {
            dispatch(action.addRangeEvents(range, events));
        },
        openPopupEditEvent(id) {
            dispatch(action.togglePopupEventEdit({ show: true, id }))
        },
        openPopupDeleteEvent(id) {
            dispatch(action.togglePopupEventDelete({ show: true, id }))
        },
    })
];
