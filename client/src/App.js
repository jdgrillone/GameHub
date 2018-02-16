import React, { Component } from 'react';
// eslint-disable-next-line
import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import UserCreate from "./components/UserCreate";
import Login from "./components/Login"
import Title from "./components/Title";
import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom'

class App extends Component {
  render() {
    return (
      <Router>
        <MuiThemeProvider>
          <Title />
          <Switch>
            <Route exact path="/" component={UserCreate} />
            <Route exact path="/login" component={Login} />
          </Switch>
        </ MuiThemeProvider>
      </Router>
    );
  }
}

export default App;
