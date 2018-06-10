import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import apiQuery from './../Api';

class UsersList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            usersList: null
        }

        this.serverResponse = this.serverResponse.bind(this);
    }
    serverResponse(response) {

        let usersList = response.usersList.length > 0 
            ? response.usersList
            : null;
        this.setState({usersList: usersList})

    }
    componentDidMount() {
        apiQuery({
            path: '/users-list',
            callback: this.serverResponse
        });
    }
    render() {
        if (!this.state.usersList) return null;

        let usersList = this.state.usersList.map(user => {
            let url = `/users/${user}`;
            return <li key={user}><Link to={url}>{user}</Link></li>
        })

        return (
            <div>
                {
                    this.state.usersList &&
                    <ul>
                        {usersList}
                    </ul>
                }
            </div>
        )
    }
}


export default connect(
    state => ({
        name: state.user.name
    })
)(UsersList)
