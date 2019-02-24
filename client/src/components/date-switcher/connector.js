import actions from 'store/actions';

export default [
    state => ({
        date: state.date
    }),
    dispatch => ({
        setDate(date) {
            dispatch(actions.dateAdd(date))
        },
        openPopupDatePicker() {
            dispatch(actions.togglePopupDatePicker({ show: true }))
        }
    })
];
