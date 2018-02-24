import React from 'react';
import Drawer from 'material-ui/Drawer';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import SearchIcon from 'material-ui/svg-icons/action/youtube-searched-for';
import API from '../utils/API.js';

export default class AddGame extends React.Component {

    constructor(props) {
        super(props);
        this.state = { 
            open: false,
            fieldValue: "",
            gamesResult: [],   
        };
    }

    handleToggle = () => this.setState({ open: !this.state.open });

    handleClose = () => this.setState({ open: false });

    searchGame = () => {
        API.searchGames(this.state.fieldValue)
            .then(res => this.setState({ gamesResult: res.data }))
            .catch(err => console.log(err));
    }

    handleInputChange = (event) => {
        let value = event.target.value;
        this.setState({ fieldValue: value});
    }

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
                    style={{ padding: '5px'}}
                >
                    <p>Search for a game!</p>
                    <TextField
                        hintText="Game Title"
                        onChange={this.handleInputChange}
                    />
                    <FloatingActionButton 
                    mini={true}
                    onClick={this.searchGame}>
                        <SearchIcon />
                    </ FloatingActionButton>
                    <br />
                    {this.state.gamesResult.map(game => (
                        <p>{game.name}</p>
                    ))}
                </Drawer>
            </div>
        );
    }
}