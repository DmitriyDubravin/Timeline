import React, { Fragment, useEffect } from 'react';
import MM from 'modules/MessageModule';
import QM from 'modules/QueryModule';

const PageUserEmail = () => {

    useEffect(() => {
        confirmEmail();
    }, []);

    async function confirmEmail() {

        const queryData = {
            hash: this.props.match.params.hash
        };
        const {success} = await QM.confirmEmail(queryData);
        const message = success
            ? MM.emailConfirmationSuccess().text
            : MM.emailConfirmationFailure().text;
        console.log(message);

    }

    return (
        <Fragment>
            <h2>Email confirmation...</h2>
        </Fragment>
    );
}

export default PageUserEmail;