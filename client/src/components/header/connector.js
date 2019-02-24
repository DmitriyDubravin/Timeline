import actions from 'store/actions';

export default [
    state => ({
        user: state.user,
        login: state.popups.login
    }),
    dispatch => ({
        openPopupNavMain() {
            dispatch(actions.togglePopupNavMain({ show: true }))
        },
        openPopupNavUser() {
            dispatch(actions.togglePopupNavUser({ show: true}))
        },
    })
];
