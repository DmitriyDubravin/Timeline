import actions from 'store/actions';

export default [
    state => ({
        usersList: state.usersList
    }),
    dispatch => ({
        getUsers(payload) {
            dispatch(actions.usersAddTask(payload))
        }
    })
];
