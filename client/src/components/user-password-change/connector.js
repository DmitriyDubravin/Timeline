import * as actions from 'store/actions';

export default [
    null,
    dispatch => ({
        change(payload) {
            dispatch(actions.userPasswordChange(payload))
        }
    })
];
