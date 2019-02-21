import * as action from 'store/actions';

export default [
    null,
    dispatch => ({
        remove(payload) {
            dispatch(action.userRemove(payload))
        }
    })
];
