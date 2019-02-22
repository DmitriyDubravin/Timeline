import * as actions from 'store/actions';
import { gatherEventsList } from 'support/functions';

export default [
    state => ({
        user: state.user,
        eventsList: gatherEventsList(
            state.date.format,
            state.eventsData.ranges,
            state.eventsData.events
        ),
        range: state.date.format
    }),
    dispatch => ({
        getEvents(payload) {
            dispatch(actions.eventsAddTask(payload));
        },
        openPopupEventAdd() {
            dispatch(actions.togglePopupEventAdd({ show: true }))
        }
    })
];
