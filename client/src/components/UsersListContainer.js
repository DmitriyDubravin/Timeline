import React from 'react';
import {connect} from 'react-redux';
import * as action from './../store/actions';
import paths from './../paths';
import { withData, withQuery } from '../support/functions';
import UsersList from './UsersList';



const con = connect(
    state => ({
        name: state.user.name,
        usersList: state.usersList
    }),
    dispatch => ({
        addUsersList: function(usersList) {
            dispatch(action.addUsersList(usersList))
        }
    })
);

const myCondition = props => !!props.usersList;
const myQuery = props => {
    return {
        path: paths.getUsersList,
        data: {},
        sendConditions: [
            props => !props.usersList
        ],
        callback: data => props.addUsersList(data)
    }
};

const withMyData = withData(myCondition);
const withMyQuery = withQuery(myQuery);

const UsersListContainer = ({usersList}) => <UsersList usersListData={usersList} />

export default con(withMyQuery(withMyData(UsersListContainer)));


