import * as action from './../../store/actions';

export default [
    state => ({
        user: state.user
    }),
    dispatch => ({
        openPopupEventAdd() {
            dispatch(action.togglePopupEventAdd({ show: true }))
        }
    })
];
