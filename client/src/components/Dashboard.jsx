import React from 'react';
// eslint-disable-next-line
import PropTypes from 'prop-types';
import { Card, CardTitle, CardText } from 'material-ui/Card';

const Dashboard = ({ secretData, user }) => (
  <Card className="container" >
    <CardTitle 
      title="Dashboard"
      subtitle=""
    />
    <CardText style={{ fontSize: '16px', color: 'green'}}>Welcome {user.name}!</CardText>
  </Card>
);


export default Dashboard;
