import React, { Fragment, useEffect } from 'react';
import UsersList from 'components/users-list';

const PageUsers = ({
    user,
    getUsers,
    usersList
}) => {

    useEffect(() => {
        if (!usersList.length) {
            getUsers();
        }
    }, [usersList]);

    return (
        <Fragment>
            <h2>All users page</h2>
            <UsersList usersList={usersList} />
        </Fragment>
    )
}

export default PageUsers;
