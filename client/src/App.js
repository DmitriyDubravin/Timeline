import React, { Component } from 'react';
import './App.css';
import {Link} from 'react-router-dom';
import { renderRoutes } from 'react-router-config';
import apiQuery from './Api';

class App extends Component {
    componentDidMount() {
        
        apiQuery('/register', {txt: 'lolypop'}).then(function(s) {
            console.log(s);
        });
        
    }
    render() {
        return (
            <div className="App">
                <ul>
                    <li>
                        <Link to="/"> Root </Link>
                    </li>
                    <li>
                        <Link to="/home"> Home </Link>
                    </li>
                    <li>
                        <Link to="/list"> List </Link>
                    </li>
                    <li>
                        <Link to="/list/sublist"> SubList </Link>
                    </li>
                </ul>
                {renderRoutes(this.props.route.routes)}
            </div>
        );
    }
}

export default App;
