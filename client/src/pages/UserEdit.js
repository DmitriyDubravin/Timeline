import React, {Component} from 'react';
import apiQuery from './../Api';

export default class extends Component {
    constructor(props) {
        super(props);
        this.state = {
            login: 'test2',
            password: 'pass'
        }

        this.loginChangeHandler = this.loginChangeHandler.bind(this);
        this.passwordChangeHandler = this.passwordChangeHandler.bind(this);
        this.submitHandler = this.submitHandler.bind(this);
        this.serverResponse = this.serverResponse.bind(this);
    }

    loginChangeHandler(event) {
        this.setState({login: event.target.value});
    }
    passwordChangeHandler(event) {
        this.setState({password: event.target.value});
    }
    serverResponse(response) {
        console.log('server response:', response.message)
    }
    submitHandler(event) {
        event.preventDefault();
        apiQuery({
            path: '/user-edit',
            data: {
                login: this.state.login,
                password: this.state.password
            },
            callback: this.serverResponse
        });
    }

    render() {
        const {login, password} = this.state;
        return (
            <div>
                <h2>User edit page</h2>
                <form onSubmit={this.submitHandler}>
                    <input type="text" placeholder="login" value={login} onChange={this.loginChangeHandler} />
                    <input type="password" placeholder="password" value={password} onChange={this.passwordChangeHandler} />
                    <input type="submit" value="Edit" />
                </form>
            </div>
        )
    }
}