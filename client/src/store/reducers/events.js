import AT from 'store/actions-types';

import { extendEventWithHoursMinutes } from 'services/event.service';

const initialState = {
    ranges: {},
    events: {}
};

export default (state = initialState, {type, payload}) => {
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
                    [eventId]: extendEventWithHoursMinutes(event)
                }
            }
        }

        case AT.EVENT_EDIT: {
            const { event } = payload;
            const eventId = event._id;
            return {
                ...state,
                events: {
                    ...state.events,
                    [eventId]: extendEventWithHoursMinutes(event)
                }
            }
        }

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
        }

        case AT.EVENTS_ADD: {
            const { range, events } = payload;
            const newEvents = Object.assign({},...events.map(event => ({[event._id]: extendEventWithHoursMinutes(event)})));
            const newEventsIds = Object.keys(newEvents);
            return {
                ...state,
                ranges: {
                    ...state.ranges,
                    [range]: newEventsIds
                },
                events: {
                    ...state.events,
                    ...newEvents
                }
            };
        }

        case "SET_TYPES":
            return {
                ...state,
                types: payload
            };
        case "SET_CATEGORIES":
            return {
                ...state,
                categories: payload
            };
        default:
            return state;
    }
}