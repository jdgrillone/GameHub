import React from 'react';
// eslint-disable-next-line
import PropTypes from 'prop-types';
import { Card, CardTitle, CardText } from 'material-ui/Card';

const Dashboard = ({ secretData, user }) => (
  <Card className="container" >
    <CardTitle 
      title={user.name + "'s Dashboard"}
      subtitle={"Now Playing: " + user.active} 
    />
  </Card>
);


export default Dashboard;
