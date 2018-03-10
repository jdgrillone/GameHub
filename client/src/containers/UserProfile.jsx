import React from 'react';
import ProfileItem from '../components/ProfileItem.jsx';
import API from '../utils/API.js';
import Auth from '../modules/Auth';
import { Card, CardTitle} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';



class UserProfile extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            user: {
                games: []
            },
            loggedUser: ""
        };
    }

    componentWillMount() {
        API.getUser(this.props.match.params.id)
            .then(res => this.setState({ user: res.data }))
            .catch(err => console.log(err));
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
                    loggedUser: xhr.response.user._id
                });
            }
        });
        xhr.send();
    }

    followClicked = () => {
        let data = {
            userID: this.state.loggedUser,
            friendID: this.state.user._id
        }
        API.followUser(data)
            .then((res) => {
                console.log("User Followed")
            })
            .catch(err => console.log(err));
    }

    render() {
        console.log(this.state.loggedUser);
        return (
            <div>
                {/* <p>Welcome to {this.state.user.name}'s List</p> */}
                <Card className="container" >
                    <CardTitle
                        title={this.state.user.name + "'s Profile"}
                        subtitle={'Now Playing: ' + this.state.user.active}
                    />
                    <FlatButton label="Follow" onClick={this.followClicked}/>
                </Card>
                <br />
                {this.state.user.games.map(games => (
                    <ProfileItem
                        name={games.name}
                        url={games.url}
                        platforms={games.platforms}
                        cover={games.cover.url}
                        key={games.id}
                    />
                ))}
            </div>
        );
    }
}

export default UserProfile;