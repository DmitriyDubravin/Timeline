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
                        <ul>
                            <li>
                                <Link to="/chronometry/add">Add</Link>
                            </li>
                        </ul>
                    </li>
                    <li>
                        <Link to="/users">Users</Link>
                    </li>
                </ul>
            </nav>
        )
    }
}