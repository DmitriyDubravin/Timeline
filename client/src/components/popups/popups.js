import React, { Fragment } from 'react';

import Popup from './../popup';
import NavMain from './../nav-main';
import NavUser from './../nav-user';
import EventAdd from './../event-add';
import EventEdit from './../event-edit';
import EventDelete from './../event-delete';
import UserLogin from './../user-login';
import DatePicker from './../datepicker';

const Popups = ({
    navMain,
    navUser,
    eventAdd,
    eventEdit,
    eventDelete,
    userLogin,
    datePicker,
    closePopupNavMain,
    closePopupNavUser,
    closePopupEventAdd,
    closePopupEventEdit,
    closePopupEventDelete,
    closePopupUserLogin,
    closePopupDatePicker,
}) => (
    <Fragment>
        {navMain.show && <Popup close={closePopupNavMain}><NavMain closePopup={closePopupNavMain} /></Popup>}
        {navUser.show && <Popup close={closePopupNavUser}><NavUser closePopup={closePopupNavUser} /></Popup>}
        {eventAdd.show && <Popup close={closePopupEventAdd}><EventAdd closePopup={closePopupEventAdd} /></Popup>}
        {eventEdit.show && <Popup close={closePopupEventEdit}><EventEdit closePopup={closePopupEventEdit} /></Popup>}
        {eventDelete.show && <Popup close={closePopupEventDelete}><EventDelete closePopup={closePopupEventDelete} /></Popup>}
        {userLogin.show && <Popup close={closePopupUserLogin}><UserLogin closePopup={closePopupUserLogin} /></Popup>}
        {datePicker.show && <Popup close={closePopupDatePicker}><DatePicker closePopup={closePopupDatePicker} /></Popup>}
    </Fragment>
);

export default Popups;