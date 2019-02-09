import * as action from '../../store/actions';
import {extendEventWithHoursMinutes} from '../../support/functions';

export default [
    state => ({
        event: extendEventWithHoursMinutes(state.eventsData.events[state.popups.eventDelete.id])
    }),
    (dispatch, { closePopup }) => ({
        deleteEvent() {
            closePopup();
            dispatch(action.deleteEvent())
        }
    })
];
