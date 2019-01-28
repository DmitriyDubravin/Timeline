import React from 'react';
import {Link} from 'react-router-dom';
import { FaTimes, FaSignInAlt, FaSignOutAlt, FaUserPlus } from 'react-icons/fa';
import UM from '../../modules/UserModule';

const PopupUserNav = ({user: {isAuthorized, name}, closePopup, openPopupUserLogin, dispatch}) => {

    function handleLogout() {
        closePopup();
        UM.unsetUser(dispatch); //TODO remove dispatch
        UM.deleteToken();
    }
    function handleLogin() {
        closePopup();
        openPopupUserLogin();
    }

    // TODO simplify structure
    return (
        <div className="popup">
            <button className="tile btn-close" onClick={closePopup}><FaTimes /></button>
            <div className="inner">
                {
                    isAuthorized &&
                    <div className="user-nav">
                        <Link className="tile" onClick={closePopup} to={`/users/${name}`}>
                            {name}
                        </Link>
                        <button
                            className="tile"
                            onClick={handleLogout}
                        >
                            <FaSignOutAlt />
                        </button>
                    </div>
                }
                {
                    !isAuthorized &&
                    <div className="user-nav">
                        <Link
                            className="tile"
                            to="/register"
                            onClick={closePopup}
                        >
                            <FaUserPlus />
                        </Link>
                        <button
                            className="tile"
                            onClick={handleLogin}
                        >
                            <FaSignInAlt />
                        </button>
                    </div>
                }
            </div>
        </div>
    )
}

export default PopupUserNav;
