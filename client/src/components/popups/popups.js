import React, { Fragment } from 'react';

import Popup from 'components/popup';
import NavMain from 'components/nav-main';
import NavUser from 'components/nav-user';
import EventAdd from 'components/event-add';
import EventEdit from 'components/event-edit';
import EventRemove from 'components/event-remove';
import UserRegister from 'components/user-register';
import UserLogin from 'components/user-login';
import DatePicker from 'components/datepicker';

const Popups = ({
    navMain,
    navUser,
    eventAdd,
    eventEdit,
    eventRemove,
    userRegister,
    userLogin,
    datePicker,
    closePopupNavMain,
    closePopupNavUser,
    closePopupEventAdd,
    closePopupEventEdit,
    closePopupEventRemove,
    closePopupUserRegister,
    closePopupUserLogin,
    closePopupDatePicker,
}) => (
    <Fragment>
        {navMain.show && <Popup close={closePopupNavMain}><NavMain closePopup={closePopupNavMain} /></Popup>}
        {navUser.show && <Popup close={closePopupNavUser}><NavUser closePopup={closePopupNavUser} /></Popup>}
        {eventAdd.show && <Popup close={closePopupEventAdd}><EventAdd closePopup={closePopupEventAdd} /></Popup>}
        {eventEdit.show && <Popup close={closePopupEventEdit}><EventEdit closePopup={closePopupEventEdit} /></Popup>}
        {eventRemove.show && <Popup close={closePopupEventRemove}><EventRemove closePopup={closePopupEventRemove} /></Popup>}
        {userRegister.show && <Popup close={closePopupUserRegister}><UserRegister closePopup={closePopupUserRegister} /></Popup>}
        {userLogin.show && <Popup close={closePopupUserLogin}><UserLogin closePopup={closePopupUserLogin} /></Popup>}
        {datePicker.show && <Popup close={closePopupDatePicker}><DatePicker closePopup={closePopupDatePicker} /></Popup>}
    </Fragment>
);

export default Popups;