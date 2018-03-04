import React from 'react';
import Drawer from 'material-ui/Drawer';
import RaisedButton from 'material-ui/RaisedButton';
import Chip from 'material-ui/Chip';

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
                    <p>Friends!!</p>
                    {this.props.friends.map(friend => (
                        <Chip
                            key={friend.id}
                            style={{ padding: "10px" }}
                        >
                            {friend.name}
                        </Chip>
                    ))}
                </ Drawer>
            </div>
        )
    }
}