import React, {Component} from 'react';
import apiQuery from './../Api';

export default class extends Component {
    constructor(props) {
        super(props);
        this.state = {
            login: ''
        }

        this.loginChangeHandler = this.loginChangeHandler.bind(this);
        this.submitHandler = this.submitHandler.bind(this);
        this.serverResponse = this.serverResponse.bind(this);
    }

    loginChangeHandler(event) {
        this.setState({login: event.target.value});
    }
    serverResponse(response) {
        console.log('server response:', response.message)
    }
    submitHandler(event) {
        event.preventDefault();
        apiQuery({
            path: '/user-remove',
            data: {
                login: this.state.login
            },
            callback: this.serverResponse
        });
    }

    render() {
        const {login, password} = this.state;
        return (
            <div>
                <h2>User remove page</h2>
                <form onSubmit={this.submitHandler}>
                    <input type="text" placeholder="login" value={login} onChange={this.loginChangeHandler} />
                    <input type="submit" value="Remove" />
                </form>
            </div>
        )
    }
}