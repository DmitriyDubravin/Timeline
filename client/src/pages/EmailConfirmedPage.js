import React, {Component} from 'react';
import {connect} from 'react-redux';
import queryServer from './../queryServer';
import MM from './../modules/MessageModule';
import paths from './../paths';

class HomePage extends Component {
    constructor(props) {
        super(props);

        this.handleServerResponse = this.handleServerResponse.bind(this);
    }

    handleServerResponse(response) {
        const {success} = response;
        const message = success
            ? MM.emailConfirmationSuccess().text
            : MM.emailConfirmationFailure().text;
        console.log(message);
    }

    componentDidMount() {
        queryServer({
            path: paths.emailConfirmation,
            data: {hash: this.props.match.params.hash},
            callback: this.handleServerResponse
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