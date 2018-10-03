import React, {Component} from 'react';
import {Link} from 'react-router-dom';

export default class MainNav extends Component {
    render() {
        return (
            <nav>
                <ul className="main-nav">
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/chronometry">Chronometry</Link>
                    </li>
                    <li>
                        <Link to="/users">Users</Link>
                    </li>
                    <li>
                        <Link to="/search">Search</Link>
                    </li>
                </ul>
            </nav>
        )
    }
}