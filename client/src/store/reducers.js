
export const user = (state = {}, {type, data}) => {
    switch (type) {
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

export const popup = (state = {}, {type, data}) => {
    switch (type) {
        case "TOGGLE_LOGIN_POPUP":
            return {...state, isLoginShown: data}
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
        case "ADD_EVENT":
            let eventsList = state[data.date] !== undefined ? state[data.date] : [];
            console.log('oldEventsList', state[data.date], eventsList);
            return {
                ...state,
                [data.date]: eventsList.concat(data.event)
            }
        case "REMOVE_EVENT":
            let newList = state[data.date].filter(event => event._id !== data.eventId);
            return {
                ...state,
                [data.date]: newList
            }
        default:
            return state;
    }
}