import * as action from 'store/actions';

export default [
    state => ({
        user: state.user,
        login: state.popups.login
    }),
    dispatch => ({
        openPopupNavMain() {
            dispatch(action.togglePopupNavMain({ show: true }))
        },
        openPopupNavUser() {
            dispatch(action.togglePopupNavUser({ show: true}))
        },
    })
];
