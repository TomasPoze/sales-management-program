import React from 'react';
import { Switch, Redirect, Route } from 'react-router-dom';
import Login from '../../pages/Login/Login';
import PrivateRoute from '../PrivateRoute/PrivateRoute'
import UserInfo from '../../pages/UserInfo/UserInfo'
import UsersList from '../../pages/UsersList/UsersList'
import NewUser from '../../pages/NewUser/NewUser'
import EditUser from '../../pages/EditUser/EditUser'
import ProductList from '../../pages/ProductList/ProductList';
import NewProduct from '../../pages/NewProduct/NewProduct';
import EditProduct from '../../pages/EditProduct/EditProduct';
import CategoryList from '../../pages/CategoryList/CategoryList';
import NewCategory from '../../pages/NewCategory/NewCategory';
import EditCategory from '../../pages/EditCategory/EditCategory';

export default () => (
  <Switch>
    <Redirect exact from="/" to="/login" />

    <Route path="/login">
      <Login />
    </Route>

    <Route path="/products">
      <ProductList />
    </Route>

    <Route path="/categories">
      <CategoryList/>
    </Route>

    <PrivateRoute path="/category/:id">
      <EditCategory/>
    </PrivateRoute>

    <PrivateRoute path="/category/new">
      <NewCategory/>
    </PrivateRoute>

    <PrivateRoute path="/product/new">
      <NewProduct />
    </PrivateRoute>

    <PrivateRoute path="/product/:id">
      <EditProduct />
    </PrivateRoute>

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
      <EditUser />
    </PrivateRoute>
  </Switch>
)