import React, {Component} from 'react';
import {connect} from 'react-redux';
import apiQuery from './../Api';
import m from './../support/messages';

class HomePage extends Component {
    constructor(props) {
        super(props);

        this.serverResponse = this.serverResponse.bind(this);
    }

    serverResponse(response) {
        const message = response.status === "success"
            ? m.emailConfirmationSuccess()
            : m.emailConfirmationFailure();
        console.log(message);
    }

    componentDidMount() {
        apiQuery({
            path: '/email-confirmation',
            data: {hash: this.props.match.params.hash},
            callback: this.serverResponse
        });

    }
    render() {

        return (
            <div>
                <h2>Email confirmation...</h2>
            </div>
        );
    }
}

export default connect(
    state => ({
        name: state.user.name
    })
)(HomePage)