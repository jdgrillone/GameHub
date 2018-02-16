import React from 'react';
import TextField from 'material-ui/TextField';
import "./UserCreate.css";

export default class TextFieldExampleControlled extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            username: '',
            email: '',
            password: '',
        };
    }

    handleChange = (event) => {
        this.setState({
            value: event.target.value,
        });
    };

    render() {
        return (
            <div>
                <TextField
                    hintText="Username"
                    onChange={this.handleChange}
                />
                <br />
                <TextField
                    hintText="Email"
                    onChange={this.handleChange}
                />
                <br />
                <TextField
                    hintText="Password"
                    onChange={this.handleChange}
                />
            </div>
        );
    }
}