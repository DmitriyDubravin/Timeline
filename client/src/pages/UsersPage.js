import React, {Component} from 'react';
import {connect} from 'react-redux';
import UsersListContainer from './../components/UsersListContainer';

class UserPage extends Component {
    render() {

        return (
            <div>
                <h2>All users page</h2>
                <UsersListContainer />
            </div>
        )
    }
}


export default connect(
    state => ({
        name: state.user.name
    })
)(UserPage)
