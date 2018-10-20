import React, { Component } from 'react';
import { connect } from 'react-redux';

// import queryServer from './queryServer';
import * as action from './store/actions';
import App from './App';
import {withData} from './support/functions';
// import paths from './paths';
import UM from './modules/UserModule';
import QM from './modules/QueryModule';
import MM from './modules/MessageModule';



const withStore = connect(
    state => ({
        user: state.user
    }),
    dispatch => ({
        setUser: function(name, token) {
            dispatch(action.setUser({
                name: name,
                token: token,
                isAuthorized: true
            }))
        },
        removeUser: function() {
            dispatch(action.setUser({
                name: false,
                token: false,
                isAuthorized: false
            }));
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

    setDate = () => {
        const date = new Date();
        const day = date.getDate();
        const month = date.getMonth();
        const year = date.getFullYear();
        this.props.setDate({day, month, year});
    }

    setUser = async () => {

        const {setUser, removeUser} = this.props;
        const isToken = UM.checkToken();

        if (isToken) {

            const token = UM.getToken();
            const response = await QM.verifyToken(token);
            const {success, name} = response;

            if (success) {

                setUser(name, token);
                MM.tokenAcknowledgeSuccess().log();

            } else {

                removeUser();
                UM.deleteToken();
                MM.tokenAcknowledgeFailure().log();

            }

        } else {

            removeUser();
            MM.userIsGuest().log();

        }
    }

    render() {
        return <ConditionalApp {...this.props} />
    }

}

export default withStore(AppContainer);
