import React, {Component} from 'react';
import {connect} from 'react-redux';
import apiQuery from './../Api';
import {Redirect} from 'react-router-dom';

class HomePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            redirect: false
        }

        this.serverResponse = this.serverResponse.bind(this);
    }

    serverResponse(response) {
        setTimeout(() => {
            this.setState({redirect: true})
        }, 250)
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
                {this.state.redirect && <Redirect to="/" />}
                <h2>Email Confirmed</h2>
            </div>
        );
    }
}

export default connect(
    state => ({
        name: state.user.name
    })
)(HomePage)