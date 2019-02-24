import actions from 'store/actions';

export default [
    null,
    dispatch => ({
        login(payload) {
            dispatch(actions.userLoginTask(payload))
        }
    })
];
