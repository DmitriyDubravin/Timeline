import * as action from '../../store/actions';

export default [
    state => ({
        mainNav: state.popups.mainNav,
        eventAdd: state.popups.eventAdd,
        eventEdit: state.popups.eventEdit,
        login: state.popups.login,
        userNav: state.popups.userNav,
        deleteEvent: state.popups.deleteEvent,
        datePicker: state.popups.datePicker,
    }),
    dispatch => ({
        togglePopupMainNav() {
            dispatch(action.togglePopupMainNav({ show: false }))
        },
        togglePopupEventAdd() {
            dispatch(action.togglePopupEventAdd({ show: false }))
        },
        togglePopupEventEdit(id = null) {
            dispatch(action.togglePopupEventAdd({ show: false, id }))
        }
    })
];