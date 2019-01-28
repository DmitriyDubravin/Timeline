import React, { Fragment } from 'react';
import {Link} from 'react-router-dom';
import { FaSignInAlt, FaSignOutAlt, FaUserPlus } from 'react-icons/fa';

const UserNav = ({
    isAuthorized,
    name,
    redirect,
    login,
    logout
}) => (
    <div className="user-nav">
        {
            isAuthorized ? (
                <Fragment>
                    <Link
                        className="tile"
                        onClick={redirect}
                        to={`/users/${name}`}
                    >
                        {name}
                    </Link>
                    <button
                        className="tile"
                        onClick={logout}
                    >
                        <FaSignOutAlt />
                    </button>
                </Fragment>
            ):(
                <Fragment>
                    <Link
                        className="tile"
                        onClick={redirect}
                        to="/register"
                    >
                        <FaUserPlus />
                    </Link>
                    <button
                        className="tile"
                        onClick={login}
                    >
                        <FaSignInAlt />
                    </button>
                </Fragment>
            )
        }
    </div>
);

export default UserNav;
