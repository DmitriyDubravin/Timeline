import React, {Component, Fragment} from 'react';
import { FaBars } from 'react-icons/fa';

export default class MainNav extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false
        }
        this.toggleMenu = this.toggleMenu.bind(this);
    }
    toggleMenu() {
        this.setState({isOpen: !this.state.isOpen});
    }
    render() {
        return (
            <Fragment>
                <button className="tile" onClick={this.toggleMenu}><FaBars /></button>
                {/* <nav>
                    {
                        this.state.isOpen &&
                    }
                </nav> */}
            </Fragment>
        )
    }
}