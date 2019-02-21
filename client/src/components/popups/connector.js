import * as action from 'store/actions';

export default [
    state => ({
        navMain: state.popups.navMain,
        navUser: state.popups.navUser,
        eventAdd: state.popups.eventAdd,
        eventEdit: state.popups.eventEdit,
        eventRemove: state.popups.eventRemove,
        userRegister: state.popups.userRegister,
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
        closePopupEventRemove(id = null) {
            dispatch(action.togglePopupEventRemove({ show: false, id }))
        },
        closePopupUserRegister() {
            dispatch(action.togglePopupUserRegister({ show: false }))
        },
        closePopupUserLogin() {
            dispatch(action.togglePopupUserLogin({ show: false }))
        },
        closePopupDatePicker() {
            dispatch(action.togglePopupDatePicker({ show: false }))
        }
    })
];
