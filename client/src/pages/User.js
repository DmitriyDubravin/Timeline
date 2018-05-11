import React, {Component} from 'react';
import UserChangePasswordForm from './../components/UserChangePasswordForm';

export default class User extends Component {
    render() {
        return (
            <div>
                <h2>User page</h2>
                <UserChangePasswordForm x={333} />
            </div>
        )
    }
}