import React from 'react';
import { Card, CardHeader, CardTitle, CardText } from 'material-ui/Card';
import Toggle from 'material-ui/Toggle';

export default class ListItem extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            expanded: false,
        };
    }

    handleExpandChange = (expanded) => {
        this.setState({ expanded: expanded });
    };

    handleToggle = (event, toggle) => {
        this.setState({ expanded: toggle });
        console.log(this.props.platform);
    };

    handleExpand = () => {
        this.setState({ expanded: true });
    };

    handleReduce = () => {
        this.setState({ expanded: false });
    };

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
                        labelPosition="right"
                        label="Expand"
                        style={{width: "25%", float: "right"}}
                    />
                </CardHeader>
                <CardText expandable={true}>
                    <h3><strong>Summary: </strong></h3>
                    <p>{this.props.summary}</p>
                    <p>List of URL's</p>
                    <ul>
                        <li><a href="www.google.com" target="" className="listItem-link">Link</a></li>
                    </ul>
                </CardText>
            </Card>
        );
    }
}