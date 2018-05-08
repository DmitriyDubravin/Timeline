import React, {Component} from 'react';
import {Link} from 'react-router-dom';

export default class extends Component {
    render() {
        return (
            <div>
                <ul>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/user">User</Link>
                    </li>
                    <li>
                        <Link to="/register">Register</Link>
                    </li>
                    <li>
                        <Link to="/login">Login</Link>
                    </li>
                    <li>
                        <Link to="/user-edit">Edit</Link>
                    </li>
                    <li>
                        <Link to="/user-remove">Remove</Link>
                    </li>
                </ul>
            </div>
        )
    }
}