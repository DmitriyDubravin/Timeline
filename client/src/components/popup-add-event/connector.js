import * as action from '../../store/actions';

export default [
    null,
    dispatch => ({
        closePopup(boolean) {
            dispatch(action.togglePopupEventAdd({ show: false }))
        },
    })
];