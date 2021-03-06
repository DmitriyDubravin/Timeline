import React, { Fragment } from 'react';
import {Link} from 'react-router-dom';
import { FaSignInAlt, FaSignOutAlt, FaUserPlus } from 'react-icons/fa';

const NavUser = ({
    isAuthorized,
    name,
    redirect,
    register,
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
                    <button
                        className="tile"
                        onClick={register}
                    >
                        <FaUserPlus />
                    </button>
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

export default NavUser;
