import * as action from '../../store/actions';

export default [
    state => ({
        isAuthorized: state.user.isAuthorized,
        name: state.user.name,
    }),
    (dispatch, { closePopup }) => ({
        redirect() {
            closePopup();
        },
        logout() {
            closePopup();
            action.userLogout();
        },
        login() {
            closePopup();
            dispatch(action.togglePopupLogin(true))
        }
    })
];
