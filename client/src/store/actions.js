
// user
export const setUserName = name => ({type: "SET_USER_NAME", data: name});
export const setUserToken = token => ({type: "SET_USER_TOKEN", data: token});
export const setUserAuthorization = boolean => ({type: "SET_USER_AUTHORIZATION", data: boolean});

// date
export const setDate = date => ({type: "SET_DATE", data: date});

// popup
export const toggleLoginPopup = boolean => ({type: "TOGGLE_LOGIN_POPUP", data: boolean});

// eventsListings
export const addEventsList = (date, eventsList) => ({type: "ADD_EVENTS_LIST", data: {date, eventsList}});
export const removeEventsList = date => ({type: "REMOVE_EVENTS_LIST", data: date});
export const updateEventsList = (date, updatedEvent) => ({type: "UPDATE_EVENTS_LIST", data: {date, updatedEvent}});

export const addEvent = (date, event) => ({type: "ADD_EVENT", data: {date, event}});