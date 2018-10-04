
// user
export const setUser = data => ({type: "SET_USER", data: data});

export const setUserName = name => ({type: "SET_USER_NAME", data: name});
export const setUserToken = token => ({type: "SET_USER_TOKEN", data: token});
export const setUserAuthorization = boolean => ({type: "SET_USER_AUTHORIZATION", data: boolean});

// date
export const setDate = date => ({type: "SET_DATE", data: date});

// popup
export const toggleLoginPopup = boolean => ({type: "TOGGLE_LOGIN_POPUP", data: boolean});
export const toggleEventAddPopup = boolean => ({type: "TOGGLE_EVENT_ADD_POPUP", data: boolean});

// eventsListings
export const addEventsList = (date, eventsList) => ({type: "ADD_EVENTS_LIST", data: {date, eventsList}});
export const removeEventsList = date => ({type: "REMOVE_EVENTS_LIST", data: date});
export const updateEventsList = (date, updatedEvent) => ({type: "UPDATE_EVENTS_LIST", data: {date, updatedEvent}});

// export const addEvent = (date, event) => ({type: "ADD_EVENT", data: {date, event}});
export const removeEvent = (date, eventId) => ({type: "REMOVE_EVENT", data: {date, eventId}});

// usersList

export const addUsersList = usersList => ({type: "ADD_USERS_LIST", data: usersList});


// events
export const addEvent = event => ({type: 'ADD_EVENT', data: event});
export const addEvents = events => ({type: 'ADD_EVENTS', data: events});