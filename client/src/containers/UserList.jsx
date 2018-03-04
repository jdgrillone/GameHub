import React from 'react';
import API from '../utils/API.js';
import UserListItem from '../components/UserListItem.jsx';
import Auth from '../modules/Auth';

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
                this.setState({ users: res.data });
            })
            .catch(err => console.log(err));
    }

    componentWillMount() {
        this.getUsers();
    }

    // This method will be executed after initial rendering.
    componentDidMount() {
        const xhr = new XMLHttpRequest();
        xhr.open('get', '/api/dashboard');
        xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        // set the authorization HTTP header
        xhr.setRequestHeader('Authorization', `bearer ${Auth.getToken()}`);
        xhr.responseType = 'json';
        xhr.addEventListener('load', () => {
            if (xhr.status === 200) {
                this.setState({
                    secretData: xhr.response.message,
                    user: xhr.response.user
                });
            }
        });
        xhr.send();
    }

    render() {
        return (
            <div>
                {this.state.users.map(user => (
                    <UserListItem
                        name={user.name}
                        id={user._id}
                        key={user._id}
                        loggedUser={this.state.user._id} />
                ))}
            </div>
        )
    }
}

export default UserList;