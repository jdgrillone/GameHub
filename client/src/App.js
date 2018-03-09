import React, { Component } from 'react';

// Material UI
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';

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

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={props => (
    Auth.isUserAuthenticated() ? (
      <Component {...props} {...rest} />
    ) : (
      <Redirect to={{
        pathname: '/',
        state: { from: props.location }
      }}/>
    )
  )}/>
)

const LoggedOutRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={props => (
    <Component {...props} {...rest} />
  )}/>
)

  const PropsRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={props => (
      <Component {...props} {...rest} />
    )}/>
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
      <MuiThemeProvider muiTheme={getMuiTheme()}>
        <Router>
        <div>
          <div className="top-bar">
            <div className="top-bar-left">
              <Link to="/">GameHUB</Link>
          </div>

          {this.state.authenticated ? (
            <div className="top-bar-right">
              <Link to="/userslist"><RaisedButton className="nav-button" label="User List" primary={true} style={{ margin: 0 }} /></Link>
              <Link to="/dashboard"><RaisedButton className="nav-button" label="Dashboard" primary={true} style={{margin: 0}} /></Link>
              <Link to="/logout"><RaisedButton className="nav-button" label="Logout" secondary={true} style={{margin: 0}} /></Link>
            </div>
          ) : (
            <div className="top-bar-right">
              <Link to="/login"><RaisedButton className="nav-button" label="Login" primary={true} style={{margin: 0}} /></Link>
              <Link to="/signup"><RaisedButton className="nav-button" label="Sign up"  style={{margin: 0}} backgroundColor="#13c631" labelColor="#ffffff" /></Link>
            </div>
          )}
              {/* <div className="top-bar-right">
                <Link to="/userslist"><RaisedButton label="User List" primary={true} style={{ margin: 0 }} /></Link>
              </div> */}
        </div>

            <PropsRoute exact path="/" component={HomePage} toggleAuthenticateStatus={() => this.toggleAuthenticateStatus()} />
            <PrivateRoute path="/dashboard" component={DashboardPage}/>
            <LoggedOutRoute path="/login" component={LoginPage} toggleAuthenticateStatus={() => this.toggleAuthenticateStatus()} />
            <LoggedOutRoute path="/signup" component={SignUpPage}/>
            <Route path="/logout" component={LogoutFunction}/>
            <Route path="/userslist" component={UserList}/>
            <Route path="/users/:id" component={UserProfile}/>
          </div>

        
        </Router>
      </MuiThemeProvider>
    );
  }
}

export default App;
