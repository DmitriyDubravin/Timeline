import * as action from '../../store/actions';

export default [
    null,
    dispatch => ({
        close() {
            dispatch(action.togglePopupMainNav({ show: false }))
        }
    })
];
