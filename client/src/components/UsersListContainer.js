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

const myCondition = props => {
    return !!props.usersList;
}
const myQuery = props => {
    return {
        path: paths.getUsersList,
        data: {},
        resendMarkers: [

        ],
        callback: props.addUsersList
    }
};

const withMyData = withData(myCondition);
const withMyQuery = withQuery(myQuery);

const UsersListContainer = ({usersList}) => {
    console.log(888, usersList);
    return <UsersList usersListData={usersList} />
}

export default con(withMyQuery(withMyData(UsersListContainer)));



// class UsersList extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             usersList: [],
//             isUsersListHasItems: false
//         }
//         this.handleServerResponse = this.handleServerResponse.bind(this);
//     }

//     componentDidMount() {
//         queryServer({
//             path: '/users-list',
//             callback: this.handleServerResponse
//         });
//     }

//     handleServerResponse(response) {
//         this.setState({
//             usersList: response.usersList,
//             isUsersListHasItems: response.usersList.length > 0
//         })
//     }

//     render() {

//         const {usersList, isUsersListHasItems} = this.state;

//         let usersDOMList = isUsersListHasItems && usersList.map(user => {
//             let url = `/users/${user}`;
//             return <li key={user}><Link to={url}>{user}</Link></li>
//         })

//         return (
//             <div>
//                 {
//                     isUsersListHasItems &&
//                     <ul>
//                         {usersDOMList}
//                     </ul>
//                 }
//             </div>
//         )
//     }
// }


// export default connect(
//     state => ({
//         name: state.user.name
//     })
// )(UsersList)
