import React from 'react';
import Auth from '../modules/Auth';
import Dashboard from '../components/Dashboard.jsx';
import ListItem from '../components/ListItem.jsx';
import AddGame from '../components/AddGame.jsx';


class DashboardPage extends React.Component {

  // Class constructor.
  constructor(props) {
    super(props);

    this.state = {
      secretData: '',
      user: {
        games: []
      }
    };
    this.onGameAdd = this.onGameAdd.bind(this);
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
        });
      }
    });
    xhr.send();
  }

  onGameAdd (game) {
    console.log("Added Game:", game);
    const newUserState = Object.assign({}, this.state.user);
    const newGamesArray = this.state.user.games.slice();
    newGamesArray.push(game);
    newUserState.games = newGamesArray;
    console.log("New user state:", newUserState);
    this.setState({ user: newUserState});
  }

  // Render the component
  render() {
    console.log(this.state.user._id);
    return (
      <div>
        <Dashboard secretData={this.state.secretData} user={this.state.user} />
        <br />
        <AddGame userId={this.state.user._id} onGameAdd={this.onGameAdd}/>
        {this.state.user.games.map(games => (
          <ListItem
            name={games.name}
            notes={games.notes}
            platform={games.platform}
            summary={games.summary}
            key={games.id}
          />
        ))}
      </div>
    );
  }

}

export default DashboardPage;
