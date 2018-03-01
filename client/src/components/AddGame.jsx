import React from 'react';
import Drawer from 'material-ui/Drawer';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import SearchIcon from 'material-ui/svg-icons/action/youtube-searched-for';
import API from '../utils/API.js';
import Chip from 'material-ui/Chip';

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
    searchGame = (event) => {
        event.preventDefault();
        API.searchGames(this.state.fieldValue)
            .then(res => {
                this.setState({ gamesResult: res.data });
                if (res.data.length < 1) {
                    alert("Game not found");
                }
            })
            .catch(err => console.log(err));
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
                this.setState({ gamesResult: [] });
                this.setState({ fieldValue: "" });
            })
            .catch(err => console.log(err));
    }

    // Updates state when TextField value changes
    handleInputChange = (event) => {
        let value = event.target.value;
        this.setState({ fieldValue: value });
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
                    width={350}
                    open={this.state.open}
                    onRequestChange={(open) => this.setState({ open })}
                    style={{ padding: '5px' }}
                >
                <div className="drawer-contents">
                    <TextField
                        id="add-game-input"
                        floatingLabelText="Search by Game Title"
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
                        <Chip
                            id={game.id}
                            key={game.id}
                            onClick={this.addGame}
                            style={{ padding: "10px" }}
                        >
                            {game.name}
                        </Chip>
                    ))}
                </div>
                </Drawer>
            </div>
        );
    }
}