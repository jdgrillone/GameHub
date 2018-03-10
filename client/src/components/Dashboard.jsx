import React from 'react';
// eslint-disable-next-line
import PropTypes from 'prop-types';
import { Card, CardTitle} from 'material-ui/Card';

const Dashboard = ({ secretData, user }) => (
  // <Card className="header-container" >
  //   <CardTitle 
  //     title={user.name + "'s Dashboard"}
  //     subtitle={"Now Playing: " + user.active} 
  //   />
  // </Card>
<div className="header-container">
  <strong><span className="test">{user.name}</span></strong>
  <br /> 
  <span className="test-sub">{'Now Playing: ' + user.active}</span>

</div>
);


export default Dashboard;
