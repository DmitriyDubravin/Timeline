import * as action from './../../store/actions';

export default [
    state => ({
        name: state.user.name,
        events: state.eventsData.events,
        ranges: state.eventsData.ranges
    }),
    dispatch => ({
        search1(search, queryObj) {
            dispatch(action.search(search, queryObj));
        },
        openPopupEditEvent(id) {
            dispatch(action.togglePopupEventEdit({ show: true, id }))
        },
        openPopupDeleteEvent(id) {
            dispatch(action.togglePopupEventDelete({ show: true, id }))
        },
    })
];
