import * as action from '../../store/actions';

export default [
    null,
    dispatch => ({
        closePopup() {
            dispatch(action.togglePopupLogin(false))
        }
    })
];
