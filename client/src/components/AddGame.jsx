import React from 'react';
import Drawer from 'material-ui/Drawer';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import SearchIcon from 'material-ui/svg-icons/action/youtube-searched-for';
import API from '../utils/API.js';
import Chip from 'material-ui/Chip';
import AppBar from 'material-ui/AppBar';
import HelpDialogue from './HelpDialogue.jsx';


export default class AddGame extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            open: false,
            fieldValue: "",
            gamesResult: []
        };
    }

    helpMessage = (
    <div>
    <p>1. Type a game title into the input field.</p>
    <p>2. Click Search button.</p>
    <p>3. Click on the desired result to add the game to your list.</p>
    <p> MOBILE: Swipe to close </p>
    </div>
    )

    // Handles toggle for AddGame Drawer
    handleToggle = () => this.setState({ open: !this.state.open });

    // Handle close for AddGame Drawer
    handleClose = () => this.setState({ open: false });

    // Calls API to search games collection for state.fieldValue
    searchGame = (event) => {
        event.preventDefault();
        API.searchGames(this.state.fieldValue)
            .then(res => {
                this.setState({ gamesResult: res.data.body });
                if (res.data.length < 1) {
                    alert("Game not found");
                }
            })
            .catch(err => console.log(err));
    }

    addGame = (id) => {
        let data = {
            userID: this.props.userId,
            gameID: id
        }
        API.addGame(data)
            .then((res) => {
                this.handleClose();
                this.props.onGameAdd(res.data.body[0]);
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
            <span className="drawer-button">
                <RaisedButton
                    label="Add Game"
                    onClick={this.handleToggle}
                    backgroundColor="#13c631"
                    labelColor="#ffffff"
                    style={{float: 'left', marginRight: '20px'}}
                />
                <Drawer
                    docked={false}
                    width={350}
                    open={this.state.open}
                    onRequestChange={(open) => this.setState({ open })}
                >
                    <AppBar
                        title={<span>ADD GAME</span>}
                        iconElementRight={<HelpDialogue title="Add Game Help" message={this.helpMessage}/>}
                        showMenuIconButton={false}
                        style={{backgroundColor: "#13c631"}}
                    />
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
                            onClick={() => this.addGame(game.id)}
                            style={{ padding: "10px", margin: "5px" }}
                        >
                            {game.name}
                        </Chip>
                    ))}
                </div>
                </Drawer>
            </span>
        );
    }
}