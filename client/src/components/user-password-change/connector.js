import actions from 'store/actions';

export default [
    null,
    dispatch => ({
        change(payload) {
            dispatch(actions.userPasswordChangeTask(payload))
        }
    })
];
