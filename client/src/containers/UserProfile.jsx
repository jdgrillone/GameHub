import React from 'react';
import API from '../utils/API.js';

class UserProfile extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            user: {}
        };
    }

    componentWillMount() {
        API.getUser(this.props.match.params.id)
        .then(res => this.setState({ user: res.data}))
        .catch(err => console.log(err));
    }

    render() {
        return (
            <p>Welcome to {this.state.user.name}'s List</p>
        );
    }
}

export default UserProfile;