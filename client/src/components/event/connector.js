import * as actions from './../../store/actions';

export default [
    state => ({
        isDeleting: state.popups.eventRemove.show
    }),
    dispatch => ({
        openPopupEventEdit(id) {
            dispatch(actions.togglePopupEventEdit({ show: true, id }))
        },
        openPopupEventRemove(id) {
            dispatch(actions.togglePopupEventRemove({ show: true, id }))
        }
    })
];
