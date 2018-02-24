import React from 'react';
import API from '../utils/API.js';
import UserListItem from '../components/UserListItem.jsx';

class UserList extends React.Component {

    // Class constructor
    constructor(props) {
        super(props);

        this.state = {
            users: []
        }
    }

    getUsers = () => {
        API.userList()
        .then((res) => {
            this.setState({ users: res.data});
        })
        .catch(err => console.log(err));
    }

    componentWillMount() {
        this.getUsers();
    }

    render() {
        return (
            <div>
                {this.state.users.map(user => (
                    <UserListItem 
                    name={user.name}
                    id={user._id}
                    key={user._id}/>
                ))}
            </div>
        )
    }
}

export default UserList;