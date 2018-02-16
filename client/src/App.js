import React, { Component } from 'react';
// eslint-disable-next-line
import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import UserCreate from "./components/UserCreate";
import Login from "./components/Login"
import './App.css';
import {
  BrowseRouter as Router,
  Route,
  Switch
} from 'react-router-dom'

class App extends Component {
  render() {
    return (
      <MuiThemeProvider>
        <h1>Welcome to GameHub</h1>
        <UserCreate />
      </ MuiThemeProvider>
    );
  }
}

export default App;
