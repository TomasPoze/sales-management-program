import React from 'react';
import { Switch, Redirect, Route } from 'react-router-dom';
import Login from '../../pages/Login/Login';
import PrivateRoute from '../PrivateRoute/PrivateRoute'
import UserInfo from '../../pages/UserInfo/UserInfo'
import UsersList from '../../pages/UsersList/UsersList'
import NewUser from '../../pages/NewUser/NewUser'
import EditUser from '../../pages/EditUser/EditUser'

export default () => (
  <Switch>
    <Redirect exact from="/" to="/login" />

    <Route path="/login">
      <Login />
    </Route>

    <PrivateRoute path="/users">
      <UsersList />
    </PrivateRoute>

    <PrivateRoute path="/user/info">
      <UserInfo />
    </PrivateRoute>

    <PrivateRoute path="/user/new">
      <NewUser />
    </PrivateRoute>

    <PrivateRoute path="/user/:id">
      <EditUser/>
    </PrivateRoute>
  </Switch>
)