import * as action from './../../store/actions';

export default [
    state => ({
        user: state.user,
        events: state.eventsData.events,
        ranges: state.eventsData.ranges
    }),
    dispatch => ({
        search1(payload) {
            dispatch(action.search(payload));
        },
        openPopupEditEvent(id) {
            dispatch(action.togglePopupEventEdit({ show: true, id }))
        },
        openPopupDeleteEvent(id) {
            dispatch(action.togglePopupEventDelete({ show: true, id }))
        },
    })
];
