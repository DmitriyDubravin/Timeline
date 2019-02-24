import AT from 'store/actions-types';

const initialState = {
    navMain: {
        show: false
    },
    navUser: {
        show: false
    },
    eventAdd: {
        show: false
    },
    eventEdit: {
        show: false,
        id: null
    },
    eventRemove: {
        show: false,
        id: null
    },
    userRegister: {
        show: false
    },
    userLogin: {
        show: false
    },
    datePicker: {
        show: false
    },
};

export default (state = initialState, {type, payload}) => {
    switch (type) {
        case AT.TOGGLE_POPUP_NAV_MAIN:
            return {
                ...state,
                navMain: {...state.navMain, show: payload.show}
            };
        case AT.TOGGLE_POPUP_NAV_USER:
            return {
                ...state,
                navUser: {...state.navUser, show: payload.show}
            };
        case AT.TOGGLE_POPUP_EVENT_ADD:
            return {
                ...state,
                eventAdd: {...state.eventAdd, show: payload.show}
            };
        case AT.TOGGLE_POPUP_EVENT_EDIT:
            return {
                ...state,
                eventEdit: {...state.eventEdit, show: payload.show, id: payload.id}
            };
        case AT.TOGGLE_POPUP_EVENT_REMOVE:
            return {
                ...state,
                eventRemove: {...state.eventRemove, show: payload.show, id: payload.id}
            };
        case AT.TOGGLE_POPUP_USER_REGISTER:
            return {
                ...state,
                userRegister: {...state.userRegister, show: payload.show}
            };
        case AT.TOGGLE_POPUP_USER_LOGIN:
            return {
                ...state,
                userLogin: {...state.userLogin, show: payload.show}
            };
        case AT.TOGGLE_POPUP_DATE_PICKER:
            return {
                ...state,
                datePicker: {...state.datePicker, show: payload.show}
            };
        default:
            return state;
    }
}
