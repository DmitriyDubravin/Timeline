import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import { FaBars } from 'react-icons/fa';

export default class MainNav extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false
        }
        this.toggleMenu = this.toggleMenu.bind(this);
        this.closeMenu = this.closeMenu.bind(this);
    }
    toggleMenu() {
        this.setState({isOpen: !this.state.isOpen});
    }
    closeMenu() {
        this.setState({isOpen: !this.state.isOpen});
    }
    render() {
        return (
            <nav>
                <button className="main-nav-opener icon" onClick={this.toggleMenu}><FaBars /></button>
                {
                    this.state.isOpen &&
                    <ul className="main-nav">
                        <li><Link onClick={this.closeMenu} to="/">Home</Link></li>
                        <li><Link onClick={this.closeMenu} to="/chronometry">Chronometry</Link></li>
                        <li><Link onClick={this.closeMenu} to="/users">Users</Link></li>
                        <li><Link onClick={this.closeMenu} to="/search">Search</Link></li>
                    </ul>
                }
            </nav>
        )
    }
}