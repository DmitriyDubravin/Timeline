import * as actions from 'store/actions';

export default [
    state => ({
        date: state.date
    }),
    dispatch => ({
        closePopup() {
            dispatch(actions.togglePopupDatePicker({ show: false }))
        },
        setDate(date) {
            dispatch(actions.setDate(date))
        }
    })
];