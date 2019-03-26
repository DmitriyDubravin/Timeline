import actions from 'store/actions';

export default [
    state => ({
        date: state.date,
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
        addEvent(payload) {
            dispatch(actions.eventCreateTask(payload))
        }
    })
];