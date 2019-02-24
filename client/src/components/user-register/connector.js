import actions from 'store/actions';


export default [
    null,
    dispatch => ({
        register(payload) {
            dispatch(actions.userRegisterTask(payload))
        }
    })
]