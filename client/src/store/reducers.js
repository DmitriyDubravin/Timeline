
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
            return {...state, ...data}
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
            return {...state, [data.date]: null}
        default:
            return state;
    }
}