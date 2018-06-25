import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import queryServer from './../queryServer';

class UsersList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            usersList: [],
            isUsersListHasItems: false
        }
        this.handleServerResponse = this.handleServerResponse.bind(this);
    }

    componentDidMount() {
        queryServer({
            path: '/users-list',
            callback: this.handleServerResponse
        });
    }

    handleServerResponse(response) {
        this.setState({
            usersList: response.usersList,
            isUsersListHasItems: response.usersList.length > 0
        })
    }

    render() {

        const {usersList, isUsersListHasItems} = this.state;

        let usersDOMList = isUsersListHasItems && usersList.map(user => {
            let url = `/users/${user}`;
            return <li key={user}><Link to={url}>{user}</Link></li>
        })

        return (
            <div>
                {
                    isUsersListHasItems &&
                    <ul>
                        {usersDOMList}
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
