import React, { Component } from 'react';
import { connect } from 'react-redux';
import { renderRoutes } from 'react-router-config';

import apiQuery from './Api';
import Header from './components/Header';
import * as action from './store/actions';
import { getCookie, deleteCookie } from './support/cookies';

// import axios from 'axios';


class App extends Component {
    constructor(props) {
        super(props);
        this.serverResponse = this.serverResponse.bind(this)
    }
    serverResponse(response) {
        const { name } = response.data;
        if (!name) {
            deleteCookie();
        }
        this.props.setUserName(name);
    }
    componentDidMount() {

        // axios.get('http://localhost:8081/email-confirmation/testcode').then(response => {
        //     console.log(response.data);
        // });

        const cookie = getCookie('token');

        if (cookie) {
            apiQuery({
                path: '/token-acknowledge',
                data: {token: cookie.token},
                callback: this.serverResponse
            });
        } else {
            this.props.setUserName(false);
        }

    }
    render() {
        if (this.props.name === undefined) return null;
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
