
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
            let date = `${day}.${month}.${data.year}`;
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
        case "TOGGLE_POPUP_MAIN_NAV":
            return {
                ...state,
                mainNav: {...state.mainNav, show: data}
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

export const eventsData = (state = {}, {type, data}) => {
    switch(type) {
        case "ADD_EVENT": 
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
        case "EDIT_EVENT":
            return {
                ...state,
                events: {
                    ...state.events,
                    ...data
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
        default:
            return state;
    }
}