import React, {Component} from 'react';
import {connect} from 'react-redux';
import ChangePasswordForm from './../components/forms/ChangePasswordForm';
import RemoveAccountForm from './../components/forms/RemoveAccountForm';

class UserPage extends Component {
    render() {
        return (
            <div>
                <h2>{this.props.name}'s page</h2>
                <ChangePasswordForm x={333} />
                <RemoveAccountForm />
            </div>
        )
    }
}


export default connect(
    state => ({
        name: state.user.name
    })
)(UserPage)
