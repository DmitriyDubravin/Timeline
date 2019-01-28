
export const user = (state = {}, {type, data}) => {
    switch (type) {
        case "SET_USER":
            return {...state, ...data}
        // case "SET_USER_NAME":
        //     return {...state, name: data}
        // case "SET_USER_TOKEN":
        //     return {...state, token: data}
        // case "SET_USER_AUTHORIZATION":
        //     return {...state, isAuthorized: data}
        default:
            return state;
    }
}

export const date = (state = {}, {type, data}) => {
    switch (type) {
        case "SET_DATE":

            let day = ('0' + data.day).slice(-2);
            let month = ('0' + (data.month + 1)).slice(-2);
            let dateStr = `${day}.${month}.${data.year}`;
            let rangeStart = Math.floor(+new Date(Date.UTC(data.year, data.month, data.day)) / 1000);
            let rangeFinish = Math.floor(+new Date(Date.UTC(data.year, data.month, data.day, 23, 59, 59)) / 1000);

            return {...state, ...data, dateStr, rangeStart, rangeFinish}
        default:
            return state;
    }
}



export const popups = (state = {}, {payload, type, data}) => {
    switch (type) {
        case "TOGGLE_POPUP_MAIN_NAV":
            return {
                ...state,
                mainNav: {...state.mainNav, show: payload.show}
            };
        case "TOGGLE_POPUP_EVENT_ADD":
            return {
                ...state,
                eventAdd: {...state.eventAdd, show: payload.show}
            };
        case "TOGGLE_POPUP_EVENT_EDIT":
            return {
                ...state,
                eventEdit: {...state.eventEdit, show: payload.show, id: payload.id}
            };
        case "TOGGLE_POPUP_LOGIN":
            return {
                ...state,
                login: {...state.login, show: data}
            };
        case "TOGGLE_POPUP_DELETE_EVENT":
            return {
                ...state,
                deleteEvent: {...state.deleteEvent, show: data.boolean, id: data.id}
            };
        case "TOGGLE_POPUP_USER_NAV":
            return {
                ...state,
                userNav: {...state.userNav, show: data}
            };
        case "TOGGLE_POPUP_DATE_PICKER":
            return {
                ...state,
                datePicker: {...state.datePicker, show: data}
            };
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

export const eventsData = (state = {}, {type, data, payload}) => {
    switch(type) {
        case "OLD_ADD_EVENT": // TODO: remove
        {
            const oldEventsIds = state.ranges[data.range];
            const eventId = Object.keys(data.event)[0];
            const newEventsIds = oldEventsIds === undefined ? eventId : [...oldEventsIds, eventId];

            return {
                ...state,
                ranges: {
                    ...state.ranges,
                    [data.range]: newEventsIds
                },
                events: {
                    ...state.events,
                    ...data.event
                }
            };
        }
        case "EVENT_ADDED":
        {
            const oldEventsIds = state.ranges[payload.range];
            const eventId = Object.keys(payload.event)[0];
            const newEventsIds = oldEventsIds === undefined ? eventId : [...oldEventsIds, eventId];

            return {
                ...state,
                ranges: {
                    ...state.ranges,
                    [payload.range]: newEventsIds
                },
                events: {
                    ...state.events,
                    ...payload.event
                }
            };
        }
        case "OLD_EDIT_EVENT": // TODO: remove
            return {
                ...state,
                events: {
                    ...state.events,
                    ...data
                }
            };
        case "EVENT_EDITED":
            return {
                ...state,
                events: {
                    ...state.events,
                    ...payload
                }
            };
        case "REMOVE_EVENT":
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
            return {
                ...state,
                events: {
                    ...state.events,
                    ...data.events
                }
            };
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