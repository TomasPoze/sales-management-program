import React from 'react';
import { Switch, Redirect, Route } from 'react-router-dom';
import Login from '../../pages/Login/Login';
import PrivateRoute from '../PrivateRoute/PrivateRoute';
import UserInfo from '../../pages/UserInfo/UserInfo';
import UsersList from '../../pages/UsersList/UsersList';
import NewUser from '../../pages/NewUser/NewUser';
import EditUser from '../../pages/EditUser/EditUser';
import ProductList from '../../pages/ProductList/ProductList';
import NewProduct from '../../pages/NewProduct/NewProduct';
import EditProduct from '../../pages/EditProduct/EditProduct';
import CategoryList from '../../pages/CategoryList/CategoryList';
import NewCategory from '../../pages/NewCategory/NewCategory';
import EditCategory from '../../pages/EditCategory/EditCategory';
import OrderProduct from '../../pages/OrderProduct/OrderProduct';
import OrderList from '../../pages/OrderList/OrderList';
import EditOrder from '../../pages/EditOrder/EditOrder';
import EditOrderProduct from '../../pages/EditOrderProduct/EditOrderProduct';
import ClientOrders from '../../pages/ClientOrders/ClientOrders';
import AddOrderProduct from '../../pages/AddOrderProduct/AddOrderProduct';
import InvoiceList from '../../pages/InvoiceList/InvoiceList';
import ProductsPaginated from '../../pages/ProductsByCategoryPaginated/ProductsPaginated'
import SalesReport from '../../pages/SalesReport/SalesReport';
import OrderInfo from '../../pages/OrderInfo/OrderInfo';

export default () => (
  <Switch>
    <Redirect exact from="/" to="/login" />

    <Route path="/login">
      <Login />
    </Route>

    <PrivateRoute exact path="/products/:id">
      <ProductsPaginated />
    </PrivateRoute>

    <PrivateRoute path="/products">
      <ProductList />
    </PrivateRoute>

    <PrivateRoute path="/sale/reports">
      <SalesReport/>
    </PrivateRoute>

    <PrivateRoute path="/categories">
      <CategoryList />
    </PrivateRoute>

    <PrivateRoute path="/invoices">
      <InvoiceList />
    </PrivateRoute>

    <PrivateRoute path="/cart">
      <OrderProduct />
    </PrivateRoute>

    <PrivateRoute path="/add/order/product/:id">
      <AddOrderProduct />
    </PrivateRoute>

    <PrivateRoute path="/client/orders">
      <ClientOrders />
    </PrivateRoute>

    <PrivateRoute path="/client/order/:id">
      <OrderInfo/>
    </PrivateRoute>

    <PrivateRoute path="/order/product/:id">
      <EditOrderProduct />
    </PrivateRoute>

    <PrivateRoute path="/orders">
      <OrderList />
    </PrivateRoute>

    <PrivateRoute path="/order/:id">
      <EditOrder />
    </PrivateRoute>

    <PrivateRoute exact path="/category/new">
      <NewCategory />
    </PrivateRoute>

    <PrivateRoute path="/category/:id">
      <EditCategory />
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