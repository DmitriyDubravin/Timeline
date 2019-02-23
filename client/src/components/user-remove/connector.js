import * as actions from 'store/actions';

export default [
    null,
    dispatch => ({
        remove(payload) {
            dispatch(actions.userRemove(payload))
        }
    })
];
