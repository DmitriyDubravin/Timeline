import React, {Component} from 'react';
import {Link} from 'react-router-dom';

import LoginAccountForm from './forms/LoginAccountForm';
import {connect} from 'react-redux';
import * as action from './../store/actions';
import { deleteCookie } from './../support/cookies';

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showLogin: false
        }

        this.login = this.login.bind(this);
        this.logout = this.logout.bind(this);
    }
    login(e) {
        e.preventDefault();
        this.setState({showLogin: !this.state.showLogin});
    }
    logout() {
        deleteCookie();
        this.props.setUserName(false);
    }
    componentDidUpdate(prevProps) {
        if (prevProps.name !== this.props.name && !!this.props.name) {
            this.setState({showLogin: false});
        }
    }
    render() {
        const {name} = this.props;

        return (
            <div>
                <div className="user-box">
                    {
                        !name &&
                        <div>
                            <a href="/" onClick={this.login}>Login</a> | <Link to="/register">Register</Link>
                        </div>
                    }
                    {
                        !!name &&
                        <div>
                            <Link to={`/users/${name}`}>{name}</Link> <button onClick={this.logout}>Logout</button>
                        </div>
                    }
                </div>
                {
                    this.state.showLogin &&
                    !name &&
                    (
                        <div className="popup">
                            <LoginAccountForm />
                            <button onClick={this.login} className="close">X</button>
                        </div>
                    )
                }
                <ul>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/chronometry">Chronometry</Link>
                    </li>
                    <li>
                        <Link to="/users">Users</Link>
                    </li>
                </ul>
            </div>
        )
    }
}



export default connect(
    state => ({
        name: state.user.name
    }),
    dispatch => ({
        setUserName: function(name) {
            dispatch(action.setUserName(name))
        }
    })
)(Header)
