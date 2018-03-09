import React from 'react';
import Auth from '../modules/Auth';
import Dashboard from '../components/Dashboard.jsx';
import ListItem from '../components/ListItem.jsx';
import AddGame from '../components/AddGame.jsx';
import EmptyListMessage from '../components/EmptyListMessage.jsx';
import FollowingPanel from '../components/FollowingPanel.jsx';
import API from '../utils/API.js';


class DashboardPage extends React.Component {

  // Class constructor.
  constructor(props) {
    super(props);

    this.state = {
      secretData: '',
      following: [],
      user: {
        active: "",
        games: []
      }
    };
    this.onGameAdd = this.onGameAdd.bind(this);
    this.onDelete = this.onDelete.bind(this);
    this.onActive = this.onActive.bind(this);
  }


  // This method will be executed after initial rendering.
  componentDidMount() {
    const xhr = new XMLHttpRequest();
    xhr.open('get', '/api/dashboard');
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    // set the authorization HTTP header
    xhr.setRequestHeader('Authorization', `bearer ${Auth.getToken()}`);
    xhr.responseType = 'json';
    xhr.addEventListener('load', () => {
      if (xhr.status === 200) {
        this.setState({
          secretData: xhr.response.message,
          user: xhr.response.user
        },
      this.getFriends(xhr.response.user._id)
    );
      }
    });
    xhr.send();
    
  }

  getFriends (data) {
      API.getFollowing(data)
      .then(res => {
        this.setState({ following: res.data })
      })
      .catch( err => console.log(err))
  }

  onGameAdd (game) {
    let newUserState = Object.assign({}, this.state.user);
    let newGamesArray = this.state.user.games.slice();
    newGamesArray.push(game);
    newUserState.games = newGamesArray;
    this.setState({ user: newUserState });
  }

  // Function to handle Delete Entry button
  onDelete = (game) => {
    let newUserState = Object.assign({}, this.state.user);
    let array = this.state.user.games;
    let index = array.findIndex(i => i.id === game);
    if (index > -1) {
      array.splice(index, 1);
    }
    newUserState.games = array;
    this.setState({ user: newUserState });
  }

  onActive = (game) => {
    let newUserState = Object.assign({}, this.state.user);
    newUserState.active = game;
    this.setState({ user: newUserState });
  }

  // Render the component
  render() {
    return (
      <div>
        <Dashboard secretData={this.state.secretData} user={this.state.user} />
        <br />
        <div className="addGame-container">
        <AddGame userId={this.state.user._id} onGameAdd={this.onGameAdd} />
        <FollowingPanel friends={this.state.following}/>
        </div>
        {/* Handler for empty list message */}
        {(this.state.user.games.length === 0)
          ? <EmptyListMessage />
          : <span></span> 
      }

        {this.state.user.games.map(games => (
          <ListItem
            name={games.name}
            id={games.id}
            key={games.id}
            url={games.url}
            cover={games.cover.url}
            platforms={games.platforms}
            onDelete={this.onDelete}
            onActive={this.onActive}
            userId={this.state.user._id}
          />
        ))}
      </div>
    );
  }

}

export default DashboardPage;
