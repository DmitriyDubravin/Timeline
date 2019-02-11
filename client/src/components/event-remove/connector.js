import * as action from '../../store/actions';

export default [
    state => ({
        event: state.eventsData.events[state.popups.eventRemove.id]
    }),
    (dispatch, { closePopup }) => ({
        removeEvent(payload) {
            closePopup();
            dispatch(action.eventRemoveTask(payload));
        }
    })
];
