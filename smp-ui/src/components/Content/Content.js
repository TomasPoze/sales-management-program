import React from 'react';
import { Switch, Redirect, Route } from 'react-router-dom';
import Login from '../../pages/Login/Login';
import PrivateRoute from '../PrivateRoute/PrivateRoute'
import UserInfo from '../../pages/UserInfo/UserInfo'

export default () => (
  <Switch>
    <Redirect exact from="/" to="/login" />

    <Route path="/login">
      <Login />
    </Route>

    <PrivateRoute path="/user/info">
      <UserInfo />
    </PrivateRoute>
  </Switch>
)