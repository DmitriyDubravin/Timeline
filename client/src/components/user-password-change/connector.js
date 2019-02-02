import * as action from './../../store/actions';

export default [
    null,
    dispatch => ({
        change(payload) {
            dispatch(action.userPasswordChange(payload))
        }
    })
];
