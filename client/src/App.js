import React, { Component } from 'react';

// Material UI
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';

// Router
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  // eslint-disable-next-line
  withRouter
} from 'react-router-dom'

// Components
import HomePage from './components/HomePage.jsx';
import LoginPage from './containers/LoginPage.jsx';
import LogoutFunction from './containers/LogoutFunction.jsx';
import SignUpPage from './containers/SignUpPage.jsx';
import DashboardPage from './containers/DashboardPage.jsx';
import Auth from './modules/Auth';
import UserList from './containers/UserList.jsx';
import UserProfile from './containers/UserProfile.jsx';

// Other imports
import './App.css';

// Customizing Theme
const muiTheme = getMuiTheme({
  palette: {
    textColor: '#ffffff',
    canvasColor: '#303030',
    secondaryTextColor: '#ffffff',
    disabledColor: '#ffffff',
  },

});

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={props => (
    Auth.isUserAuthenticated() ? (
      <Component {...props} {...rest} />
    ) : (
        <Redirect to={{
          pathname: '/',
          state: { from: props.location }
        }} />
      )
  )} />
)

const LoggedOutRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={props => (
    <Component {...props} {...rest} />
  )} />
)

const PropsRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={props => (
    <Component {...props} {...rest} />
  )} />
)

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      authenticated: false
    }
  };

  componentDidMount() {
    // Check if User is logged in on refresh
    this.toggleAuthenticateStatus()
  }

  toggleAuthenticateStatus() {
    // Check authenticated status and toggle state based on that
    this.setState({ authenticated: Auth.isUserAuthenticated() })
  }



  render() {
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <Router>
          <div>
            <div className="top-bar">
              <div className="top-bar-left">
                <Link to="/">GameHUB</Link>
              </div>

              {this.state.authenticated ? (
                <div className="top-bar-right">
                  <Link to="/userslist"><FlatButton className="nav-button" label="User List"  style={{ margin: 0 }} /></Link>
                  <Link to="/dashboard"><FlatButton className="nav-button" label="Dashboard"  style={{ margin: 0 }} /></Link>
                  <Link to="/logout"><RaisedButton className="nav-button" label="Logout" secondary={true} style={{ margin: 0 }} /></Link>
                </div>
              ) : (
                  <div className="top-bar-right">
                    <Link to="/login"><FlatButton className="nav-button" label="Login"  style={{ margin: 0 }} /></Link>
                    <Link to="/signup"><RaisedButton className="nav-button" label="Sign up" style={{ margin: 0 }} backgroundColor="#13c631" labelColor="#ffffff" /></Link>
                  </div>
                )}
            </div>

            <PropsRoute exact path="/" component={HomePage} toggleAuthenticateStatus={() => this.toggleAuthenticateStatus()} />
            <PrivateRoute path="/dashboard" component={DashboardPage} />
            <LoggedOutRoute path="/login" component={LoginPage} toggleAuthenticateStatus={() => this.toggleAuthenticateStatus()} />
            <LoggedOutRoute path="/signup" component={SignUpPage} />
            <Route path="/logout" component={LogoutFunction} />
            <Route path="/userslist" component={UserList} />
            <Route path="/users/:id" component={UserProfile} />
          </div>


        </Router>
      </MuiThemeProvider>
    );
  }
}

export default App;
