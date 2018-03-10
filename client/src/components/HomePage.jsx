import React from 'react';
import { Card, CardTitle, CardText } from 'material-ui/Card';
import Auth from '../modules/Auth';

class HomePage extends React.Component {

  componentDidMount() {
    // update authenticated state on logout
    this.props.toggleAuthenticateStatus()
  }

  render() {
    return (
      <Card className="container">
        <CardTitle title="Welcome to GameHUB" subtitle="This is exciting...are you excited?" />
          {Auth.isUserAuthenticated() ? (
            <CardText style={{ fontSize: '16px', color: 'green' }}>You are logged in.</CardText>
          ) : (
            <CardText style={{ fontSize: '16px', color: 'red' }}>You are not logged in. <a href="/login">Log in here!</a></CardText>
          )}
      </Card>
    )
  }
};

export default HomePage;
