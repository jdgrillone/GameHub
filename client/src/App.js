import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import UserCreate from "./components/UserCreate";
import './App.css';

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
