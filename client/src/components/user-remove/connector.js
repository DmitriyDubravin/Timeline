import actions from 'store/actions';

export default [
    null,
    dispatch => ({
        remove(payload) {
            dispatch(actions.userRemoveTask(payload))
        }
    })
];
