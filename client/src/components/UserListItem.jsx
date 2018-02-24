import React from 'react';
import { Card, CardHeader, CardText } from 'material-ui/Card';

export default class UserListItem extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            
        };
    }

    render() {
        return (
            <Card className="listItem-container">
                <CardHeader
                title={this.props.name}
                >
                <CardText>
                    <a href={'/users/' + this.props.id}>Link</a>
                </CardText>
                </CardHeader>
            </Card>
        );
    }
}