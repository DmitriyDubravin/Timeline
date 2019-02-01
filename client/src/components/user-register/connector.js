import * as action from './../../store/actions';


export default [
    null,
    dispatch => ({
        register(payload) {
            dispatch(action.userRegister(payload))
        }
    })
]