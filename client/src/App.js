import React, { Component } from 'react';
import './App.css';
import {Link} from 'react-router-dom';
import { renderRoutes } from 'react-router-config';
import apiQuery from './Api';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            x: 1
        }
        this.updateX = this.updateX.bind(this)
    }
    updateX(data) {
        this.setState({x: data.message});
    }
    componentDidMount() {
        apiQuery({
            path: '/register',
            data: {txt: 'lolypop'},
            callback: this.updateX
        });
    }
    render() {
        return (
            <div className="App">
                <ul>
                    <li>
                        <Link to="/"> / </Link>
                    </li>
                    <li>
                        <Link to="/login">Login</Link>
                    </li>
                </ul>
                {renderRoutes(this.props.route.routes)}
            </div>
        );
    }
}

export default App;
