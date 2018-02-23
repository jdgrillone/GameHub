import React from 'react';
import Drawer from 'material-ui/Drawer';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import SearchIcon from 'material-ui/svg-icons/action/youtube-searched-for';

export default class AddGame extends React.Component {

    constructor(props) {
        super(props);
        this.state = { open: false };
    }

    handleToggle = () => this.setState({ open: !this.state.open });

    handleClose = () => this.setState({ open: false });

    render() {
        return (
            <div className="addGame-container">
                <RaisedButton
                    label="Add Game"
                    onClick={this.handleToggle}
                    backgroundColor="#13c631"
                    labelColor="#ffffff"
                />
                <Drawer
                    docked={false}
                    width={300}
                    open={this.state.open}
                    onRequestChange={(open) => this.setState({ open })}
                >
                    <p>Search for a game!</p>
                    <TextField
                        hintText="Game Title"
                    />
                    <FloatingActionButton mini={true}>
                        <SearchIcon />
                    </ FloatingActionButton>
                </Drawer>
            </div>
        );
    }
}