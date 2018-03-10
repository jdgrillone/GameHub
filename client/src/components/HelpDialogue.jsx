import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

export default class HelpDialogue extends React.Component {
    state = {
        open: false,
    };

    handleOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    render() {
        const actions = 
            <FlatButton
                label="Close"
                primary={true}
                onClick={this.handleClose}
            />
        ;

        return (
            <div>
                <FlatButton label="Help" onClick={this.handleOpen} />
                <Dialog
                    title={this.props.title}
                    actions={actions}
                    modal={false}
                    open={this.state.open}
                    onRequestClose={this.handleClose}
                >
                    {this.props.message}
        </Dialog>
            </div>
        );
    }
}