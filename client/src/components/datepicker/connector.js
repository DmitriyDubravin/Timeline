import * as action from 'store/actions';

export default [
    state => ({
        date: state.date
    }),
    dispatch => ({
        closePopup() {
            dispatch(action.togglePopupDatePicker({ show: false }))
        },
        setDate(date) {
            dispatch(action.setDate(date))
        }
    })
];