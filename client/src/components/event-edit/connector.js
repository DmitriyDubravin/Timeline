import * as actions from './../../store/actions';

export default [
    state => ({
        date: state.date,
        event: state.eventsData.events[state.popups.eventEdit.id],
        types: state.eventsData.types,
        categories: state.eventsData.categories,
        subCategories: state.eventsData.subCategories
    }),
    dispatch => ({
        getTypes() {
            dispatch(actions.getTypes());
        },
        getCategories(type) {
            dispatch(actions.getCategories(type));
        },
        getSubcategories(category) {
            dispatch(actions.getSubcategories(category));
        },
        editEvent(payload) {
            dispatch(actions.eventEditTask(payload))
        }
    })
];