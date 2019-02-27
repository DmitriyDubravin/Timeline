import actions from 'store/actions';

export default [
    state => ({
        events: state.eventsData.events,
        ranges: state.eventsData.ranges
    }),
    dispatch => ({
        search(payload) {
            dispatch(actions.eventsSearchTask(payload));
        }
    })
];
