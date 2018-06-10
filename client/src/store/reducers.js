
export const user = (state = {}, {type, data}) => {
    switch (type) {
        case "SET_USER_NAME":
            return {...state, name: data}
        case "SET_USER_TOKEN":
            return {...state, token: data}
        default:
            return state;
    }
}