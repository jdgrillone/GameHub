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

    // Handles toggle for AddGame Drawer
    handleToggle = () => this.setState({ open: !this.state.open });

    // Handle close for AddGame Drawer
    handleClose = () => this.setState({ open: false });

    // Calls API to search games collection for state.fieldValue
    searchGame = () => {
        API.searchGames(this.state.fieldValue)
            .then(res => this.setState({ gamesResult: res.data }))
            .catch(err => console.log(err));

        if (this.state.gamesResult.length > 1) {
            this.setState({ gamesResult: { name: "No Result" } });
        }
    }

    addGame = () => {
        let data = {
            userID: this.props.userId,
            gameID: this.state.gamesResult[0]._id
        }
        API.addGame(data)
        .then((res) => {
            this.handleClose();
            this.props.onGameAdd(res.data);
            this.setState({ gamesResult: []});
            this.setState({ fieldValue: "" });
        })
        .catch(err => console.log(err));
    }

    // Updates state when TextField value changes
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
                        id="add-game-input"
                        hintText="Game Title"
                        onChange={this.handleInputChange}
                        value={this.state.fieldValue}
                    />
                    <FloatingActionButton 
                    mini={true}
                    onClick={this.searchGame}>
                        <SearchIcon />
                    </ FloatingActionButton>
                    <br />
                    {this.state.gamesResult.map(game => (
                        <p id={game.id}>{game.name}</p>
                    ))}
                    <FloatingActionButton 
                        mini={true}
                        onClick={this.addGame}>
                    </ FloatingActionButton>
                </Drawer>
            </div>
        );
    }
}