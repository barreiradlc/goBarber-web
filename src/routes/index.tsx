import React from 'react';
import { Switch } from 'react-router-dom';
import DashBoard from '../pages/DashBoard';
import Signin from '../pages/signin';
import SignUp from '../pages/signup';
import Route from './Route';

// import { Container } from './styles';

const Routes: React.FC = () => {
  return (
      <Switch>
          <Route path="/" exact component={Signin} />
          <Route path="/register" component={SignUp} />

          <Route path="/dashboard" component={DashBoard} isPrivate />
      </Switch>
  );
}

export default Routes;