import actions from 'store/actions';

export default [
    null,
    dispatch => ({
        update(payload) {
            dispatch(actions.userPasswordUpdateTask(payload))
        }
    })
];
