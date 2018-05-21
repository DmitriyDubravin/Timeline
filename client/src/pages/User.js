import React, {Component} from 'react';
import {connect} from 'react-redux';
import ChangePassword from './../components/forms/ChangePassword';
import Remove from './../components/forms/Remove';

class User extends Component {
    render() {
        return (
            <div>
                <h2>{this.props.name}'s page</h2>
                <ChangePassword x={333} />
                <Remove />
            </div>
        )
    }
}


export default connect(
    state => ({
        name: state.user.name
    })
)(User)
