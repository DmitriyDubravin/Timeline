import AT from './../actions-types';

const initialState = {
    ranges: {},
    events: {}
};

export default (state = initialState, {type, data, payload}) => {
    switch(type) {

        case AT.EVENT_ADD:
            const { range, event } = payload;
            const eventId = event._id;
            const currentRangeIds = state.ranges[range] || [];
            return {
                ...state,
                ranges: {
                    ...state.ranges,
                    [range]: [...currentRangeIds, eventId]
                },
                events: {
                    ...state.events,
                    [eventId]: event
                }
            };

        case "OLD_EDIT_EVENT": // TODO: remove
        console.log(3);
            return {
                ...state,
                events: {
                    ...state.events,
                    ...data
                }
            };
        case "EVENT_EDITED":
        console.log(4);
            return {
                ...state,
                events: {
                    ...state.events,
                    ...payload
                }
            };
        case "REMOVE_EVENT":
        console.log(5);
            delete state.events[data.eventId];

            let ranges = {};
            for (let key in state.ranges) {
                ranges[key] = state.ranges[key].filter(id => id === data.eventId);
            }

            return {
                ...state,
                ranges: ranges,
                events: {
                    ...state.events
                }
            };
        case "ADD_RANGE_EVENTS":
        console.log(6);
            return {
                ...state,
                ranges: {
                    ...state.ranges,
                    [data.range]: Object.keys(data.events)
                },
                events: {
                    ...state.events,
                    ...data.events
                }
            };
        case "ADD_EVENTS":
        console.log(7);
            return {
                ...state,
                events: {
                    ...state.events,
                    ...data.events
                }
            };
        case "SET_TYPES":
        console.log(8);
            return {
                ...state,
                types: payload
            };
        case "SET_CATEGORIES":
        console.log(9);
            return {
                ...state,
                categories: payload
            };
        default:
            return state;
    }
}