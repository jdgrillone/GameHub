import React from 'react';
import { Card, CardHeader, CardText } from 'material-ui/Card';
import Toggle from 'material-ui/Toggle';
import IconButton from 'material-ui/IconButton';
import ClearIcon from 'material-ui/svg-icons/content/clear';
import API from '../utils/API.js';
import FlatButton from 'material-ui/FlatButton';

export default class ListItem extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            expanded: false,
            id: this.props.id
        };
    }

    // ** Functions to handle Toggle feature **
    handleExpandChange = (expanded) => {
        this.setState({ expanded: expanded });
    };

    handleToggle = (event, toggle) => {
        this.setState({ expanded: toggle });
    };

    handleExpand = () => {
        this.setState({ expanded: true });
    };

    handleReduce = () => {
        this.setState({ expanded: false });
    };
    // ** --------------- **

    gameDelete = () => {
        let data = {
            userID: this.props.userId,
            gameID: this.state.id
        }
        API.deleteGame(data)
        .then((res) => {
            this.props.onDelete(this.state.id);
        })
        .catch(err => console.log(err));
    }

    toggleActive = () => {
        let data = {
            userID: this.props.userId,
            game: this.props.name
        }
        API.setActive(data)
        .then((res) => {
            this.props.onActive(this.props.name);
        })
        .catch(err => console.log(err));
    }

    render() {
        return (
            <Card className="listItem-container" expanded={this.state.expanded} onExpandChange={this.handleExpandChange}>
                <CardHeader
                    title={this.props.name}
                    subtitle={this.props.platform.join(", ")}
                    actAsExpander={false}
                    showExpandableButton={false}
                    >
                    <Toggle
                        toggled={this.state.expanded}
                        onToggle={this.handleToggle}
                        labelPosition="left"
                        label={false}
                        style={{width: "60px", float: "right"}}
                    />
                </CardHeader>
                <CardText expandable={true}>
                    <h3><strong>Summary: </strong></h3>
                    <p>{this.props.summary}</p>
                    <FlatButton label="Set to Active" onClick={this.toggleActive}/>
                    <IconButton tooltip="Delete Entry" onClick={this.gameDelete} touch={true} tooltipPosition="bottom-right" iconStyle={{backgroundColor: "red", borderRadius: "20px"}}>
                    <ClearIcon />
                    </IconButton>
                
                </CardText>
            </Card>
        );
    }
}