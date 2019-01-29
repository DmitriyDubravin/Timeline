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
            dispatch(action.userLogout());
        },
        login() {
            closePopup();
            dispatch(action.togglePopupUserLogin({ show: true }))
        }
    })
];
