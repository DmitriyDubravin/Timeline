import React, { Component } from 'react';
import { connect } from 'react-redux';

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
        dispatch,
        setDate: function(date) {
            dispatch(action.setDate(date))
        },
    })
);
const condition = props => props.user.isAuthorized !== undefined;
const ConditionalApp = withData(condition)(App);

class AppContainer extends Component {

    componentDidMount() {
        this.setDate();
        this.checkUser();
    }

    setDate = () => {
        const date = new Date();
        const day = date.getDate();
        const month = date.getMonth();
        const year = date.getFullYear();
        this.props.setDate({day, month, year});
    }

    checkUser = async () => {

        const {dispatch} = this.props;
        const isToken = UM.checkToken();

        if (isToken) {

            const token = UM.getToken();
            const {success, name} = await QM.verifyToken(token);

            if (success) {

                UM.setUser(dispatch, name, token);
                MM.tokenAcknowledgeSuccess().log();

            } else {

                UM.unsetUser(dispatch);
                UM.deleteToken();
                MM.tokenAcknowledgeFailure().log();

            }

        } else {

            UM.unsetUser(dispatch);
            MM.userIsGuest().log();

        }
    }

    render() {
        return <ConditionalApp {...this.props} />
    }

}

export default withStore(AppContainer);
