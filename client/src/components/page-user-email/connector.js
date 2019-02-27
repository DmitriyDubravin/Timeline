import A from 'store/actions';

export default [
    null,
    dispatch => ({
        confirmUserEmail() {
            dispatch(A.userEmailConfirm())
        }
    })
];