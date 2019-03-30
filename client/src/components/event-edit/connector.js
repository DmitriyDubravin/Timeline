import actions from 'store/actions';

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
            dispatch(actions.typesAddTask());
        },
        getCategories(payload) {
            dispatch(actions.categoriesAddTask(payload));
        },
        getSubcategories(payload) {
            dispatch(actions.subcategoriesAddTask(payload));
        },
        editEvent(payload) {
            dispatch(actions.eventUpdateTask(payload))
        }
    })
];