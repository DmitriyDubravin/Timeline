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
        closePopupMainNav() {
            dispatch(action.togglePopupMainNav({ show: false }))
        },
        closePopupEventAdd() {
            dispatch(action.togglePopupEventAdd({ show: false }))
        },
        closePopupEventEdit(id = null) {
            dispatch(action.togglePopupEventAdd({ show: false, id }))
        },
        closePopupUserNav() {
            dispatch(action.togglePopupUserNav({ show: false }))
        },
        closePopupUserLogin() {
            dispatch(action.togglePopupUserLogin({ show: false }))
        },
        closePopupDatePicker() {
            dispatch(action.togglePopupDatePicker({ show: false }))
        }
    })
];