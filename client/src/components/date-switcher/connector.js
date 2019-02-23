import * as actions from 'store/actions';

export default [
    state => ({
        date: state.date
    }),
    dispatch => ({
        setDate(date) {
            dispatch(actions.setDate(date))
        },
        openPopupDatePicker() {
            dispatch(actions.togglePopupDatePicker({ show: true }))
        }
    })
];
