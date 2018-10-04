import React, { Component } from 'react';
import { connect } from 'react-redux';

import queryServer from './queryServer';
import * as action from './store/actions';
import { getCookie, deleteCookie } from './support/cookies';
import m from "./support/messages";
import App from './App';
import {withData} from './support/functions';



const withStore = connect(
    state => ({
        user: state.user
    }),
    dispatch => ({
        setUser: function(data) {
            dispatch(action.setUser(data))
        },
        setDate: function(date) {
            dispatch(action.setDate(date))
        }
    })
);
const condition = props => props.user.isAuthorized !== undefined;
const ConditionalApp = withData(condition)(App);

class AppContainer extends Component {

    componentDidMount() {
        this.setDate();
        this.setUser();
    }

    setDate() {
        const date = new Date();
        const day = date.getDate();
        const month = date.getMonth();
        const year = date.getFullYear();
        this.props.setDate({day, month, year});
    }

    setUser = () => {
        const cookie = getCookie('token');
        if (cookie) {
            queryServer({
                path: '/token-acknowledge',
                data: {token: cookie.token},
                callback: this.handleServerResponse(cookie.token)
            });
        } else {
            this.props.setUser({
                name: false,
                token: false,
                isAuthorized: false
            });
            console.log(m.userIsGuest());
        }
    }

    handleServerResponse = token => response => {
        const {status} = response;
        if (status === "success") {
            this.props.setUser({
                name: response.name,
                token: token,
                isAuthorized: true
            });
            console.log(m.tokenAcknowledgeSuccess());
        }
        if (status === "error") {
            this.props.setUser({
                name: false,
                token: false,
                isAuthorized: false
            });
            deleteCookie();
            console.log(m.tokenAcknowledgeFailure());
        }
    }

    render() {
        return <ConditionalApp {...this.props} />
    }

}

export default withStore(AppContainer);
