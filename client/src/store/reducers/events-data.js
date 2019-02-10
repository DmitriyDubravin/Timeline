import AT from './../actions-types';

const initialState = {
    ranges: {},
    events: {}
};

export default (state = initialState, {type, data, payload}) => {
    switch(type) {

        case AT.EVENT_ADD: {
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
            }
        };

        case AT.EVENT_EDIT: {
            const { event } = payload;
            const eventId = event._id;
            return {
                ...state,
                events: {
                    ...state.events,
                    [eventId]: event
                }
            }
        };

        case AT.EVENT_REMOVE: {

            const { range, eventId } = payload;
            const { [eventId]: id, ...restEvents } = state.events;

            return {
                ...state,
                ranges: {
                    ...state.ranges,
                    [range]: state.ranges[range].filter(id => id !== eventId)
                },
                events: restEvents
            };
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