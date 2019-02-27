import React, { Fragment, useEffect } from 'react';

const PageUserEmail = ({
    match: { params: { hash } },
    confirmUserEmail
}) => {

    useEffect(() => {
        confirmUserEmail(hash);
    }, []);

    return (
        <Fragment>
            <h2>Email confirmation...</h2>
        </Fragment>
    );
}

export default PageUserEmail;