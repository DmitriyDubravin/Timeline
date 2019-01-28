import React from 'react';
import LoginAccountForm from '../forms/LoginAccountForm';
import { FaTimes } from 'react-icons/fa';

const PopupUserLogin = ({closePopup}) => (
    <div className="popup">
        <button className="tile btn-close" onClick={closePopup}><FaTimes /></button>
        <div className="inner">
            <LoginAccountForm />
        </div>
    </div>
);

export default PopupUserLogin;
