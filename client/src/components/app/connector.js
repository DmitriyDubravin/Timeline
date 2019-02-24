import actions from 'store/actions';
import { createTodayDateObj } from 'services/time.service';

export default [
    state => ({
        user: state.user
    }),
    dispatch => ({
        setDate() {
            dispatch(actions.dateAdd(createTodayDateObj()))
        },
        setUser() {
            dispatch(actions.userAddTask());
        }
    })
];
