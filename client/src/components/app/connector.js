import * as actions from 'store/actions';
import { createTodayDateObj } from 'services/time.service';


console.log(actions);

export default [
    state => ({
        user: state.user
    }),
    dispatch => ({
        dispatch,
        setDate() {
            dispatch(actions.setDate(createTodayDateObj()))
        },
        setUser() {
            dispatch(actions.userAddTask());
        }
    })
];
