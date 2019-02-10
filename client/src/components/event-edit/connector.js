import * as action from './../../store/actions';
import { extendEventWithHoursMinutes } from './../../services/event.service';

export default [
    state => ({
        date: state.date,
        event: extendEventWithHoursMinutes(state.eventsData.events[state.popups.editEvent.id]),
        types: state.eventsData.types,
        categories: state.eventsData.categories,
        subCategories: state.eventsData.subCategories
    }),
    dispatch => ({
        getTypes() {
            dispatch(action.getTypes());
        },
        getCategories(type) {
            dispatch(action.getCategories(type));
        },
        getSubcategories(category) {
            dispatch(action.getSubcategories(category));
        },
        editEvent(event) {
            dispatch(action.editEvent(event))
        }
    })
];