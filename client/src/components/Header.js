import React, {Component} from 'react';
import {Link} from 'react-router-dom';

import Login from './forms/Login';
import {connect} from 'react-redux';
import * as action from './../store/actions';

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showLogin: false
        }

        this.login = this.login.bind(this);
        this.logout = this.logout.bind(this);
    }
    login() {
        this.setState({showLogin: !this.state.showLogin});
    }
    logout() {
        this.props.setUserName('guest');
    }
    componentDidUpdate(prevProps) {
        if (prevProps.name !== this.props.name && this.props.name !== 'guest') {
            this.setState({showLogin: false});
        }
    }
    render() {
        if (this.props.name === undefined) return null;
        const {name} = this.props;

        return (
            <div>
                <div className="user-box">
                    {name === 'guest' && <button onClick={this.login}>Login</button>}
                    {name !== 'guest' && <div><Link to={`/${name}`}>{name}</Link> <button onClick={this.logout}>Logout</button></div>}
                </div>
                {
                    this.state.showLogin &&
                    name === 'guest' &&
                    (
                        <div className="popup">
                            <Login />
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
                        <Link to="/register">Register</Link>
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
