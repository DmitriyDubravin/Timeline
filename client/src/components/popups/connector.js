import * as action from '../../store/actions';

export default [
    state => ({
        navMain: state.popups.navMain,
        navUser: state.popups.navUser,
        eventAdd: state.popups.eventAdd,
        eventEdit: state.popups.eventEdit,
        eventDelete: state.popups.eventDelete,
        userLogin: state.popups.userLogin,
        datePicker: state.popups.datePicker,
    }),
    dispatch => ({
        closePopupNavMain() {
            dispatch(action.togglePopupNavMain({ show: false }))
        },
        closePopupNavUser() {
            dispatch(action.togglePopupNavUser({ show: false }))
        },
        closePopupEventAdd() {
            dispatch(action.togglePopupEventAdd({ show: false }))
        },
        closePopupEventEdit(id = null) {
            dispatch(action.togglePopupEventEdit({ show: false, id }))
        },
        closePopupEventDelete(id = null) {
            dispatch(action.togglePopupEventDelete({ show: false, id }))
        },
        closePopupUserLogin() {
            dispatch(action.togglePopupUserLogin({ show: false }))
        },
        closePopupDatePicker() {
            dispatch(action.togglePopupDatePicker({ show: false }))
        }
    })
];