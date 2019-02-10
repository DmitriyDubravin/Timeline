
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



export const popups = (state = {}, {type, payload}) => {
    switch (type) {
        case "TOGGLE_POPUP_NAV_MAIN":
            return {
                ...state,
                navMain: {...state.navMain, show: payload.show}
            };
        case "TOGGLE_POPUP_NAV_USER":
            return {
                ...state,
                navUser: {...state.navUser, show: payload.show}
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
        case "TOGGLE_POPUP_EVENT_DELETE":
            return {
                ...state,
                eventDelete: {...state.eventDelete, show: payload.show, id: payload.id}
            };
        case "TOGGLE_POPUP_USER_REGISTER":
            return {
                ...state,
                userRegister: {...state.userRegister, show: payload.show}
            };
        case "TOGGLE_POPUP_USER_LOGIN":
            return {
                ...state,
                userLogin: {...state.userLogin, show: payload.show}
            };
        case "TOGGLE_POPUP_DATE_PICKER":
            return {
                ...state,
                datePicker: {...state.datePicker, show: payload.show}
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
