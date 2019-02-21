import * as action from 'store/actions';

export default [
    state => ({
        isAuthorized: state.user.isAuthorized,
        name: state.user.name,
    }),
    (dispatch, { closePopup }) => ({
        redirect() {
            closePopup();
        },
        register() {
            closePopup();
            dispatch(action.togglePopupUserRegister({ show: true }))
        },
        login() {
            closePopup();
            dispatch(action.togglePopupUserLogin({ show: true }))
        },
        logout() {
            closePopup();
            dispatch(action.userLogout());
        },
    })
];
