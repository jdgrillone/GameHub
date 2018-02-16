import React from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import "./Login.css";
import { Link } from "react-router-dom";

export default class Login extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            username: "",
            password: "",
        };
    }

    handleChange = (event) => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
    };

    handleFormSubmit = event => {
        event.preventDefault();
        if (this.state.username && this.state.email && this.state.password) {
            console.log("Login Button Clicked");
        }
    };

    render() {
        return (
            <div className="login-container">
                <h2> Login! </h2>
                <TextField
                    value={this.state.username}
                    hintText="Username"
                    onChange={this.handleChange}
                    name="username"
                />
                <br />
                <TextField
                    hintText="Password"
                    onChange={this.handleChange}
                    name="password"
                    type="password"
                />
                <br />
                <RaisedButton
                    label="Login"
                    primary={true}
                    style={{ margin: 12, }}
                    onClick={this.handleFormSubmit}
                />
                <br />
                <Link to={"/"}>
                    <strong>
                        Not a user?  Sign up here!
                    </strong>
                </Link>
            </div>
        );
    }
}