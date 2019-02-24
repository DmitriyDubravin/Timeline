import actions from 'store/actions';

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
            dispatch(actions.togglePopupNavMain({ show: false }))
        },
        closePopupNavUser() {
            dispatch(actions.togglePopupNavUser({ show: false }))
        },
        closePopupEventAdd() {
            dispatch(actions.togglePopupEventAdd({ show: false }))
        },
        closePopupEventEdit(id = null) {
            dispatch(actions.togglePopupEventEdit({ show: false, id }))
        },
        closePopupEventRemove(id = null) {
            dispatch(actions.togglePopupEventRemove({ show: false, id }))
        },
        closePopupUserRegister() {
            dispatch(actions.togglePopupUserRegister({ show: false }))
        },
        closePopupUserLogin() {
            dispatch(actions.togglePopupUserLogin({ show: false }))
        },
        closePopupDatePicker() {
            dispatch(actions.togglePopupDatePicker({ show: false }))
        }
    })
];
