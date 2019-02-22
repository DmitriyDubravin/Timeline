import * as action from 'store/actions';

export default [
    state => ({
        user: state.user
    }),
    dispatch => ({
        dispatch,
        setDate(date) {
            dispatch(action.setDate(date))
        }
    })
];
