import * as actions from './../../store/actions';

export default [
    state => ({
        user: state.user,
        events: state.eventsData.events,
        ranges: state.eventsData.ranges
    }),
    dispatch => ({
        search(payload) {
            dispatch(actions.eventsSearchTask(payload));
        },
        openPopupEventEdit(id) {
            dispatch(actions.togglePopupEventEdit({ show: true, id }))
        },
        openPopupEventRemove(id) {
            dispatch(actions.togglePopupEventRemove({ show: true, id }))
        },
    })
];
