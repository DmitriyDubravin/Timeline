import React, {Component} from 'react';
import {connect} from 'react-redux';
import UserPasswordChange from './../components/user-password-change';
import UserRemove from './../components/user-remove';

class UserPage extends Component {

    render() {

        let pathName = this.props.match.params.user;
        let username = this.props.name;
        let owner = username === pathName;

        return (
            <div>
                <h2>{pathName}'s page</h2>
                {!owner && <h4>{pathName}'s public data</h4>}
                {owner && <h4>{username}'s secured data</h4>}
                {owner && <UserPasswordChange x={333} />}
                {owner && <UserRemove />}
            </div>
        )
    }
}

export default connect(
    state => ({
        name: state.user.name
    })
)(UserPage)
