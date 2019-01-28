import * as action from '../../store/actions';

export default [
    state => ({
        event: state.eventsData.events[state.popups.deleteEvent.id]
    }),
    dispatch => ({
        dispatch,
        closePopup() {
            dispatch(action.togglePopupDeleteEvent(false))
        },
        deleteEvent(eventId) {
            dispatch(action.deleteEvent(eventId))
        }
    })
];