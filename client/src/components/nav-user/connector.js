import * as actions from 'store/actions';

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
            dispatch(actions.togglePopupUserRegister({ show: true }))
        },
        login() {
            closePopup();
            dispatch(actions.togglePopupUserLogin({ show: true }))
        },
        logout() {
            closePopup();
            dispatch(actions.userLogout());
        },
    })
];
