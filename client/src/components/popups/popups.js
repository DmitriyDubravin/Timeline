import React, { Fragment } from 'react';

import Popup from './../popup';

import MainNav from '../main-nav';
import EventAdd from './../event-add';
import EventEdit from './../event-edit';
import UserNav from './../user-nav';

// import PopupLogin from '../popup-user-login';
// import PopupDeleteEvent from '../popup-delete-event';
// import PopupDatePicker from '../popup-datepicker';

const Popups = ({

    mainNav,
    eventAdd,
    eventEdit,
    userNav,

    closePopupMainNav,
    closePopupEventAdd,
    closePopupEventEdit,
    closePopupUserNav,

    // login,
    // deleteEvent,
    // datePicker,
}) => (
    // TODO: get rid of Fragment
    <Fragment>
        {mainNav.show && <Popup close={closePopupMainNav}><MainNav closePopup={closePopupMainNav} /></Popup>}
        {eventAdd.show && <Popup close={closePopupEventAdd}><EventAdd /></Popup>}
        {eventEdit.show && <Popup close={closePopupEventEdit}><EventEdit /></Popup>}
        {/* {deleteEvent.show && <PopupDeleteEvent />} */}
        {userNav.show && <Popup close={closePopupUserNav}><UserNav closePopup={closePopupUserNav} /></Popup>}
        {/* {login.show && <PopupLogin />} */}
        {/* {datePicker.show && <PopupDatePicker />} */}
    </Fragment>
);

export default Popups;