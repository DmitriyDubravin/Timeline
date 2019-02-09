import * as action from '../../store/actions';

export default [
    state => ({
        event: state.eventsData.events[state.popups.eventDelete.id]
    }),
    (dispatch, { closePopup }) => ({
        deleteEvent() {
            closePopup();
            dispatch(action.deleteEvent())
        }
    })
];
