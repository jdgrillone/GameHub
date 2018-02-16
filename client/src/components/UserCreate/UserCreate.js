import React from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import API from "../../utils/API";
import "./UserCreate.css";

export default class TextFieldExampleControlled extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            username: "",
            email: "",
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
            API.saveUser({
                username: this.state.username,
                email: this.state.email,
                password: this.state.password
            })
                .then(res => console.log("User Saved"))
                .catch(err => console.log(err));
        }
    };

    render() {
        return (
            <div>
                <TextField
                    value={this.state.username}
                    hintText="Username"
                    onChange={this.handleChange}
                    name="username"
                />
                <br />
                <TextField
                    hintText="Email"
                    onChange={this.handleChange}
                    name="email"
                />
                <br />
                <TextField
                    hintText="Password"
                    onChange={this.handleChange}
                    name="password"
                />
                <br />
                <RaisedButton
                    label="Submit"
                    primary={true}
                    style={{ margin: 12, }}
                    onClick={this.handleFormSubmit}
                />
            </div>
        );
    }
}