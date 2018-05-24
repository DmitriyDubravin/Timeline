import React, {Component} from 'react';
import {connect} from 'react-redux';
import UsersList from './../components/UsersList';

class UserPage extends Component {
    render() {

        return (
            <div>
                <h2>All users page</h2>
                <UsersList />
            </div>
        )
    }
}


export default connect(
    state => ({
        name: state.user.name
    })
)(UserPage)
