
export const user = (state = {}, {type, data}) => {
    switch (type) {
        case "SET_USER":
            return {...state, ...data}
        case "SET_USER_NAME":
            return {...state, name: data}
        case "SET_USER_TOKEN":
            return {...state, token: data}
        case "SET_USER_AUTHORIZATION":
            return {...state, isAuthorized: data}
        default:
            return state;
    }
}

export const date = (state = {}, {type, data}) => {
    switch (type) {
        case "SET_DATE":

            let date = `${data.day}.${data.month}.${data.year}`;
            let rangeStart = Math.floor(+new Date(Date.UTC(data.year, data.month, data.day)) / 1000);
            let rangeFinish = Math.floor(+new Date(Date.UTC(data.year, data.month, data.day, 23, 59, 59)) / 1000);

            return {...state, ...data, date, rangeStart, rangeFinish}
        default:
            return state;
    }
}

export const popups = (state = {}, {type, data}) => {
    switch (type) {
        case "TOGGLE_POPUP_LOGIN":
            return {
                ...state,
                login: {...state.login, show: data}
            };
        case "TOGGLE_POPUP_ADD_EVENT":
            return {
                ...state,
                addEvent: {...state.addEvent, show: data}
            };
        case "TOGGLE_POPUP_EDIT_EVENT":
            return {
                ...state,
                editEvent: {...state.editEvent, show: data.boolean, id: data.id}
            };
        case "TOGGLE_POPUP_DELETE_EVENT":
            return {
                ...state,
                deleteEvent: {...state.deleteEvent, show: data.boolean, id: data.id}
            };
        default:
            return state;
    }
}

export const eventsListings = (state = {}, {type, data}) => {
    switch (type) {
        case "ADD_EVENTS_LIST":
            return {...state, [data.date]: data.eventsList}
        case "REMOVE_EVENTS_LIST":
            return {...state, [data]: null}
        case "UPDATE_EVENTS_LIST":
            return {
                ...state,
                [data.date]: state[data.date].map(event => {
                    return event._id === data.updatedEvent._id
                    ? data.updatedEvent
                    : event;
                })
            }
        // case "ADD_EVENT":
        //     let eventsList = state[data.date] !== undefined ? state[data.date] : [];
        //     console.log('oldEventsList', state[data.date], eventsList);
        //     return {
        //         ...state,
        //         [data.date]: eventsList.concat(data.event)
        //     }
        // case "REMOVE_EVENT":
        //     let newList = state[data.date].filter(event => event._id !== data.eventId);
        //     return {
        //         ...state,
        //         [data.date]: newList
        //     }
        default:
            return state;
    }
}

export const usersList = (state = {}, {type, data}) => {
    switch (type) {
        case "ADD_USERS_LIST":
            return data;
        default:
            return state;
    }
}

export const eventsData = (state = {}, {type, data}) => {
    switch(type) {
        case "ADD_EVENT": 
        {
            const oldEventsIds = state.ranges.dates[data.date];
            const eventId = Object.keys(data.event);
            const newEventsIds = oldEventsIds === undefined ? eventId : [...oldEventsIds, eventId];

            return {
                ...state,
                ranges: {
                    ...state.ranges,
                    dates: {
                        ...state.ranges.dates, [data.date]: newEventsIds
                    }
                },
                events: {
                    ...state.events, ...data.event
                }
            };
        }
        case "EDIT_EVENT":
            return {
                ...state,
                events: {
                    ...state.events, ...data
                }
            };
        case "REMOVE_EVENT":
        {
            const {eventId, ...rest} = state.events;
            return {
                ...state,
                ranges: {
                    ...state.ranges,
                    dates: {
                        ...state.ranges.dates,
                        [data.date]: state.ranges.dates[data.date].filter(id => id !== data.eventId)
                    }
                },
                events: rest
            };
        }
        case "ADD_EVENTS":
            return {
                ...state,
                events: {
                    ...state.events, ...data
                }
            };
        case "ADD_DATE_EVENTS":
            const {date, events} = data;
            return {
                ...state,
                ranges: {
                    ...state.ranges,
                    dates: {
                        ...state.ranges.dates, [date]: Object.keys(events)
                    }
                },
                events: {
                    ...state.events, ...events
                }
            };
        default:
            return state;
    }
}