import React, { Component } from 'react';
import { connect } from 'react-redux';
import { renderRoutes } from 'react-router-config';

import queryServer from './queryServer';
import Header from './components/Header';
import * as action from './store/actions';
import { getCookie, deleteCookie } from './support/cookies';
import m from "./support/messages";
// import {server} from "./support/constants";

// import axios from 'axios';


class App extends Component {
    constructor(props) {
        super(props);
        this.handleServerResponse = this.handleServerResponse.bind(this)
    }

    componentDidMount() {

        const cookie = getCookie('token');
        if (cookie) {
            queryServer({
                path: '/token-acknowledge',
                data: {token: cookie.token},
                callback: this.handleServerResponse
            });
            this.props.setUserToken(cookie.token);
        } else {
            this.props.setUserName(false);
        }
        this.setDate();

    }

    handleServerResponse(response) {

        const {status} = response;
        if (status === "success") {
            this.props.setUserName(response.name);
            this.props.setUserIsAuthorized(true);
            console.log(m.tokenAcknowledgeSuccess());
        }
        if (status === "error") {
            this.props.setUserName(false);
            this.props.setUserIsAuthorized(false);
            deleteCookie();
            console.log(m.tokenAcknowledgeFailure());
        }

    }

    setDate() {

        const date = new Date();
        const day = date.getDate();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();
        this.props.setDate(`${day}.${month}.${year}`);

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
        },
        setUserToken: function(token) {
            dispatch(action.setUserToken(token))
        },
        setUserIsAuthorized: function(boolean) {
            dispatch(action.setUserIsAuthorized(boolean))
        },
        setDate: function(date) {
            dispatch(action.setDate(date))
        }
    })
)(App)
