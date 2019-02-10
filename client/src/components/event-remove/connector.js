import * as action from '../../store/actions';
import {extendEventWithHoursMinutes} from './../../services/event.service';

export default [
    state => ({
        event: extendEventWithHoursMinutes(state.eventsData.events[state.popups.eventRemove.id])
    }),
    (dispatch, { closePopup }) => ({
        removeEvent(payload) {
            closePopup();
            dispatch(action.eventRemoveTask(payload));
        }
    })
];
