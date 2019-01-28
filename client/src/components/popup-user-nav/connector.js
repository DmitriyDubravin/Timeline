import * as action from '../../store/actions';

export default [
    state => ({
        user: state.user,
    }),
    dispatch => ({
        dispatch, // TODO remove
        closePopup() {
            dispatch(action.togglePopupUserNav(false))
        },
        openPopupUserLogin() {
            dispatch(action.togglePopupLogin(true))
        },
    })
];
