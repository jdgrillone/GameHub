import React from 'react';
import Drawer from 'material-ui/Drawer';
import RaisedButton from 'material-ui/RaisedButton';
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';
import {Card, CardHeader} from 'material-ui/Card';
import Avatar from 'material-ui/Avatar';
import HelpDialogue from './HelpDialogue.jsx';



export default class FollowingPanel extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            open: false,
        };
    }

    helpMessage = (
    <div>
        <p>This is where your people you are following are listed!</p>
        <p>To add someone to your friends list:</p>
        <p>  -  Go to the <a href="/userslist">User List</a> page to search for a friends name.</p>
        <p>  -  Click on the three dots next to their name to open a menu.</p>
        <p>  -  Then click follow.  It's that easy! </p>
        <p>  MOBILE: Swipe to close </p>
    </div>
    )

    // Handles toggle for Following Drawer
    handleToggle = () => this.setState({ open: !this.state.open });

    // Handle close for AddGame Drawer
    handleClose = () => this.setState({ open: false });

    render() {
        return (
            <span className="drawer-button">
            <RaisedButton
                label="Friends"
                onClick={this.handleToggle}
                backgroundColor="#622d9b"
                labelColor="#ffffff"
                style={{width: "102px"}}
            />
                <Drawer
                    docked={false}
                    width={350}
                    open={this.state.open}
                    onRequestChange={(open) => this.setState({ open })}
                    openSecondary={true}
                >
                    <AppBar
                        title={<span>FRIENDS</span>}
                        iconElementRight={<HelpDialogue title="Friends List Help" message={this.helpMessage}/>}
                        showMenuIconButton={false}
                        style={{backgroundColor: "#622d9b"}}
                    />
                    <br />

                    {this.props.friends ? this.props.friends.map(friend => (
                        <Card key={friend._id}>
                        <hr className="gradient" />
                            <CardHeader 
                                title={friend.name}
                                subtitle={'Now playing: ' + friend.active}
                                avatar={<Avatar>{friend.name[0]}</Avatar>}

                            />
                            <a href={"/users/" + friend._id}><FlatButton label="View Profile" /></a>
                            
                        </Card>
                    )): null}
                </ Drawer>
            </span>
        )
    }
}