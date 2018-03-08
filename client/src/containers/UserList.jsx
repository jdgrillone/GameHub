import React from 'react';
import API from '../utils/API.js';
import UserListItem from '../components/UserListItem.jsx';
import Auth from '../modules/Auth';
import TextField from 'material-ui/TextField';
import Card from 'material-ui/Card';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import SearchIcon from 'material-ui/svg-icons/action/youtube-searched-for';

class UserList extends React.Component {

    // Class constructor
    constructor(props) {
        super(props);

        this.state = {
            users: [],
            fieldValue: "",
        }
    }

    handleInputChange = (event) => {
        let value = event.target.value;
        this.setState({ fieldValue: value });
    }

    searchUser = (event) => {
        event.preventDefault();
        API.searchUser(this.state.fieldValue)
            .then(res => {
                this.setState({ users: res.data });
                if (res.data.length < 1) {
                    alert("User Not Found");
                }
            })
            .catch(err => console.log(err));
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
                <Card
                    style={{ width: "400px", margin: "0 auto" , paddingBottom: "10px"}}
                >
                <TextField
                    hintText="User Name"
                    floatingLabelText="Search Users"
                    onChange={this.handleInputChange}                    
                    style={{ paddingLeft: "45px" }}
                />
                    <FloatingActionButton
                        mini={true}
                        onClick={this.searchUser}>
                        <SearchIcon />
                    </ FloatingActionButton>
                </Card>
                <br />
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