import * as action from 'store/actions';

export default [
    null,
    dispatch => ({
        login(payload) {
            dispatch(action.userLogin(payload))
        }
    })
];
