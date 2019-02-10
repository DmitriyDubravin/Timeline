import * as action from './../../store/actions';

export default [
    state => ({
        date: state.date,
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
        addEvent(payload) {
            dispatch(action.eventAddTask(payload))
        }
    })
];