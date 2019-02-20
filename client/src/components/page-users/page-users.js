import React, { Fragment, useEffect } from 'react';
import UsersList from './../users-list';

const PageUsers = ({
    user,
    getUsers,
    usersList
}) => {

    useEffect(() => {
        // TODO: remove user
        if (user.isAuthorized && !usersList.length) {
            getUsers();
        }
    }, [usersList, user]);

    return (
        <Fragment>
            <h2>All users page</h2>
            <UsersList usersList={usersList} />
        </Fragment>
    )
}

export default PageUsers;
