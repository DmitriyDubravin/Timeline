import React, {Component} from 'react';
import MM from './../modules/MessageModule';
import QM from './../modules/QueryModule';

export default class extends Component {

    componentDidMount() {
        this.confirmEmail();
    }

    async confirmEmail() {

        const queryData = {
            hash: this.props.match.params.hash
        };
        const {success} = await QM.confirmEmail(queryData);
        const message = success
            ? MM.emailConfirmationSuccess().text
            : MM.emailConfirmationFailure().text;
        console.log(message);

    }

    render() {
        return (
            <div>
                <h2>Email confirmation...</h2>
            </div>
        );
    }
}
