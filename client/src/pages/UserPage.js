import React, {Component} from 'react';
import {connect} from 'react-redux';
import queryServer from './../queryServer';
import ChangePasswordForm from './../components/forms/ChangePasswordForm';
import RemoveAccountForm from './../components/forms/RemoveAccountForm';
import paths from './../paths';

class UserPage extends Component {
    constructor(props) {
        super(props);
        this.handleServerResponse = this.handleServerResponse.bind(this)
    }
    handleServerResponse(response) {

    }
    componentDidMount() {
        queryServer({
            path: paths.getUserData,
            data: {name: this.props.match.params.user},
            callback: this.handleServerResponse
        });
        // queryServer to get user's data
    }
    render() {

        let pathName = this.props.match.params.user;
        let username = this.props.name;
        let owner = username === pathName;

        return (
            <div>
                <h2>{pathName}'s page</h2>
                {!owner && <h4>{pathName}'s public data</h4>}
                {owner && <h4>{username}'s secured data</h4>}
                {owner && <ChangePasswordForm x={333} />}
                {owner && <RemoveAccountForm />}
            </div>
        )
    }
}


export default connect(
    state => ({
        name: state.user.name
    })
)(UserPage)
