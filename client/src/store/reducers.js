
export const user = (state = {}, {type, data}) => {
    switch (type) {
        case "SET_USER_NAME":
            return {...state, name: data}
        case "SET_USER_TOKEN":
            return {...state, token: data}
        case "SET_USER_IS_AUTHORIZED":
            return {...state, isAuthorized: data}
        default:
            return state;
    }
}

export const date = (state = {}, {type, data}) => {
    switch (type) {
        case "SET_DATE":
            return {...state, date: data}
        default:
            return state;
    }
}