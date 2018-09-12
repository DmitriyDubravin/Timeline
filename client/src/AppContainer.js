import { Component } from 'react';
import { connect } from 'react-redux';

import queryServer from './queryServer';
import * as action from './store/actions';
import { getCookie, deleteCookie } from './support/cookies';
import m from "./support/messages";
import App from './App';
import {withData} from './support/functions';


const con = connect(
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
        setUserAuthorization: function(boolean) {
            dispatch(action.setUserAuthorization(boolean))
        },
        setDate: function(date) {
            dispatch(action.setDate(date))
        }
    })
);
const myCondition = props => props.name !== undefined;
const ConditionalApp = withData(myCondition)(App);



class AppContainer extends Component {

    componentDidMount() {

        this.setDate();

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
            this.props.setUserToken(false);
            this.props.setUserAuthorization(false);
            console.log(m.userIsGuest());
        }

    }

    handleServerResponse = response => {

        const {status} = response;
        if (status === "success") {
            this.props.setUserName(response.name);
            this.props.setUserAuthorization(true);
            console.log(m.tokenAcknowledgeSuccess());
        }
        if (status === "error") {
            this.props.setUserName(false);
            this.props.setUserToken(false);
            this.props.setUserAuthorization(false);
            deleteCookie();
            console.log(m.tokenAcknowledgeFailure());
        }

    }

    setDate() {

        const date = new Date();
        const day = date.getDate();
        const month = date.getMonth();
        const year = date.getFullYear();
        this.props.setDate({day, month, year});

    }

    render() {

        return ConditionalApp(this.props);

    }
}

export default con(AppContainer);
