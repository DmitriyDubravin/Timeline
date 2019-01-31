import * as action from '../../store/actions';

export default [
    state => ({
        event: state.eventsData.events[state.popups.deleteEvent.id]
    }),
    (dispatch, { closePopup }) => ({
        redirect() {
            closePopup();
        },
        deleteEvent(eventId) {
            dispatch(action.deleteEvent(eventId))
        }
    })
];