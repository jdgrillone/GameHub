import React from 'react';
import { Card, CardHeader, CardText } from 'material-ui/Card';

export default class EmptyListMessage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            expanded: false,
        };
    }

    render() {
        return (
            <Card className="listItem-container">
                <CardHeader
                    title="Sorry, your list is empty!"
                    subtitle="Use the green button above to start adding games."
                >
                </CardHeader>
            </Card>
        )
    }
}