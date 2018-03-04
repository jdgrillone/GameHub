import React from 'react';
import Drawer from 'material-ui/Drawer';
import RaisedButton from 'material-ui/RaisedButton';
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';
import {Card, CardHeader, CardText} from 'material-ui/Card';
import Avatar from 'material-ui/Avatar';

export default class FollowingPanel extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            open: false,
        };
    }

    // Handles toggle for Following Drawer
    handleToggle = () => this.setState({ open: !this.state.open });

    // Handle close for AddGame Drawer
    handleClose = () => this.setState({ open: false });

    render() {
        return (
            <div className="drawer-button">
            <RaisedButton
                label="Friends"
                onClick={this.handleToggle}
                backgroundColor="#622d9b"
                labelColor="#ffffff"
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
                        iconElementRight={<FlatButton label="Help" />}
                        showMenuIconButton={false}
                        style={{backgroundColor: "#622d9b"}}
                    />
                    <br />

                    {this.props.friends.map(friend => (
                        <Card key={friend.id}>
                        <hr className="gradient" />
                            <CardHeader 
                                title={friend.name}
                                avatar={<Avatar>{friend.name[0]}</Avatar>}
                            />
                            <a href={"/users/" + friend.id}><FlatButton label="View Profile" /></a>
                            
                        </Card>
                    ))}
                </ Drawer>
            </div>
        )
    }
}