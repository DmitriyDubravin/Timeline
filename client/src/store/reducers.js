
export const user = (state = {}, {type, data}) => {
    switch (type) {
        case "SET_USER_NAME":
            return {...state, name: data}
        default:
            return state;
    }
}