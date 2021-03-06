import React from 'react';
import { Card, CardHeader } from 'material-ui/Card';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import API from '../utils/API.js';

export default class UserListItem extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            
        };
    }

    followClicked = () => {
        let data = {
            userID: this.props.loggedUser,
            friendID: this.props.id
        }
        API.followUser(data)
            .then((res) => {
                console.log("User Followed")
            })
            .catch(err => console.log(err));
    }

    render() {
        return (
            <Card className="userListItem-container">
                <CardHeader
                title={this.props.name}
                subtitle={'Now playing: ' + this.props.active}
                textStyle={{ paddingRight: "0px" }}
                >
                <IconMenu
                    iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
                    anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                    targetOrigin={{ horizontal: 'left', vertical: 'top' }}
                    style={{ float: 'right', width: "50px"}}
                    >
                    <a href={'/users/' + this.props.id}><MenuItem primaryText="View Profile" /></a>
                    <MenuItem onClick={this.followClicked} primaryText="Follow" />
                </IconMenu>
                    </CardHeader>
            </Card>
        );
    }
}