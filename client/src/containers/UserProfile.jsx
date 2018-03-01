import React from 'react';
import ProfileItem from '../components/ProfileItem.jsx';
import API from '../utils/API.js';
import { Card, CardTitle} from 'material-ui/Card';


class UserProfile extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            user: {
                games: []
            }
        };
    }

    componentWillMount() {
        API.getUser(this.props.match.params.id)
            .then(res => this.setState({ user: res.data }))
            .catch(err => console.log(err));
    }

    render() {
        return (
            <div>
                {/* <p>Welcome to {this.state.user.name}'s List</p> */}
                <Card className="container" >
                    <CardTitle
                        title={this.state.user.name + "'s Profile"}
                        subtitle=""
                    />
                </Card>
                <br />
                {this.state.user.games.map(games => (
                    <ProfileItem
                        name={games.name}
                        notes={games.notes}
                        platform={games.platform}
                        summary={games.summary}
                        key={games.id}
                    />
                ))}
            </div>
        );
    }
}

export default UserProfile;