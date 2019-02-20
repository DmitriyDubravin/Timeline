import * as actions from './../../store/actions';

export default [
    state => ({
        user: state.user,
        usersList: state.usersList
    }),
    dispatch => ({
        getUsers(payload) {
            dispatch(actions.usersAddTask(payload))
        }
    })
];
