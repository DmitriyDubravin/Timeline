import React, { Fragment } from 'react';
import UserPasswordUpdate from 'components/user-password-update';
import UserRemove from 'components/user-remove';

const PageUser = ({
    match,
    name
}) => {

    const pathName = match.params.user;
    const owner = name === pathName;

    return (
        <Fragment>
            <h2>{pathName}'s page</h2>
            {!owner && <h4>{pathName}'s public data</h4>}
            {owner && <h4>{name}'s secured data</h4>}
            {owner && <UserPasswordUpdate x={333} />}
            {owner && <UserRemove />}
        </Fragment>
    )
};

export default PageUser;
