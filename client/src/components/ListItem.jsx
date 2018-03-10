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

    // Parser for API's platform ID's
    parsePlatforms = (array) => {
        let data = "";

        for (let i = 0; i < array.length; i++) {
            if (array[i] === 6) {
                data = data + "-PC- ";
            }
            if (array[i] === 48) {
                data = data + "-PS4- ";
            }
            if (array[i] === 49) {
                data = data + "-Xbox One- ";
            }
            if (array[i] === 41) {
                data = data + "-Wii U- ";
            }
            if (array[i] === 130) {
                data = data + "-Switch- ";
            }
        }
        return data;
    }

    render() {
        return (
            <Card className="listItem-container" expanded={this.state.expanded} onExpandChange={this.handleExpandChange}>
                <hr className="pg-gradient" />
            
                <CardHeader
                    title={this.props.name}
                    subtitle={this.parsePlatforms(this.props.platforms)}
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
                    <a href={this.props.url}><img src={this.props.cover} alt={this.props.name}  height="90" width="90"></img></a>
                    <FlatButton  label="Set to Active" onClick={this.toggleActive}/>
                    <IconButton style={{float: 'right'}} tooltip="Delete Entry" onClick={this.gameDelete} touch={true} tooltipPosition="bottom-right" iconStyle={{backgroundColor: "red", borderRadius: "20px"}}>
                    <ClearIcon />
                    </IconButton>
                
                </CardText>
            </Card>
        );
    }
}