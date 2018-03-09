import React from 'react';
import { Card, CardHeader, CardText } from 'material-ui/Card';
import Toggle from 'material-ui/Toggle';

export default class ListItem extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            expanded: false,
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
                        style={{ width: "60px", float: "right" }}
                    />
                </CardHeader>
                <CardText expandable={true}>
                    <a href={this.props.url}><img src={this.props.cover} alt={this.props.name} height="90" width="90"></img></a>
                </CardText>
            </Card>
        );
    }
}