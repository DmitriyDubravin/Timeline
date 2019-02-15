import * as action from './../../store/actions';

export default [
    state => ({
        date: state.date
    }),
    dispatch => ({
        setDate: function(date) {
            dispatch(action.setDate(date))
        },
        openPopupDatePicker() {
            dispatch(action.togglePopupDatePicker({ show: true }))
        }
    })
];
