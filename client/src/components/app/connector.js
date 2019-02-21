import * as action from 'store/actions';

//TODO: remove this example
const customProps = customProps => (stateProps, dispatchProps, ownProps) => ({ ...ownProps, ...stateProps, ...dispatchProps, ...customProps });

export default [
    state => ({
        user: state.user
    }),
    dispatch => ({
        dispatch,
        setDate(date) {
            dispatch(action.setDate(date))
        }
    }),
    customProps({myCustomProps: 'myCustomProps'})
];
