import React, { Component } from 'react';
import {connect} from 'react-redux';
import {renderRoutes} from 'react-router-config';

import apiQuery from './Api';
import Header from './components/Header';
import * as action from './store/actions';



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
        this.props.setUserName(this.state.x);
    }
    checkCookie() {
        
    }
    componentDidMount() {

        this.checkCookie();

        apiQuery({
            path: '/',
            data: {txt: 'guest'},
            callback: this.updateX
        });
    }
    render() {
        // console.log(this.props.name);
        return (
            <div className="App">
                <Header />
                {renderRoutes(this.props.route.routes)}
            </div>
        );
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
)(App)
