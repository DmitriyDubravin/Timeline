import React, { Component } from 'react';
import { connect } from 'react-redux';

// import queryServer from './queryServer';
import * as action from './store/actions';
import m from "./support/messages";
import App from './App';
import {withData} from './support/functions';
// import paths from './paths';
import UM from './UserModule';
import QM from './QueryModule';



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

    // constructor(props) {
    //    super(props);

    //    this.verifyTokenResponse = this.verifyTokenResponse.bind(this);
    // }

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
            console.log('isToken');

            const token = UM.getToken();
            const response = await QM.verifyToken(token);
            console.log(response);
            const {success, name} = response;

            if (success) {
                console.log('success');

                setUser(name, token);
                console.log(m.tokenAcknowledgeSuccess());

            } else {

                removeUser();
                UM.deleteToken();
                console.log(m.tokenAcknowledgeFailure());

            }

        } else {

            removeUser();
            console.log(m.userIsGuest());

        }
    }

    // verifyTokenResponse = response => {
    //     const {status, token} = response;
    //     if (status === "success") {
    //         this.props.setUser({
    //             name: response.name,
    //             token: token,
    //             isAuthorized: true
    //         });
    //         console.log(m.tokenAcknowledgeSuccess());
    //     }
    //     if (status === "error") {
    //         this.props.setUser({
    //             name: false,
    //             token: false,
    //             isAuthorized: false
    //         });
    //         UM.deleteToken();
    //         console.log(m.tokenAcknowledgeFailure());
    //     }
    // }

    render() {
        return <ConditionalApp {...this.props} />
    }

}

export default withStore(AppContainer);
