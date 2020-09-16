import React, { useEffect, useState } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import './style.css'
import Button from '@material-ui/core/Button';
import { Field, Formik, Form } from 'formik';
import orderApi from '../../api/orderApi';
import clientApi from '../../api/clientApi';
import invoiceApi from '../../api/invoiceApi'

import { useHistory, useLocation, useParams, NavLink } from 'react-router-dom';
import OrderProduct from '../OrderProduct/OrderProduct';


export default function SimpleContainer() {

  const { id } = useParams({});
  const [orders, setOrders] = useState([]);
  const [orderProducts, setOrderProducts] = useState([]);
  const [invoices, setInvoices] = useState([]);
  const [clients, setClients] = useState([]);

  const location = useLocation();
  const history = useHistory();
  const { from } = location.state || { from: { pathname: '/orders' } }

  const initialValues = {
    orderStatus: '',
    clientId: ''
  }

  useEffect(() => {
    orderApi.fetchOrderById(id)
      .then(response => setOrders(response.data))
  }, [id])

  useEffect(() => {
    clientApi.getClients()
      .then(response => setClients(response.data))
  }, [])

  useEffect(() => {
    orderApi.fetchOrderProductsById(id)
      .then(resp => setOrderProducts(resp.data))
  }, [id])

  const onSubmit = values => {
    orderApi.updateOrder(id, values)
      .then(() => {
        setTimeout(() => history.replace(from))
      }, 1000)
  }

  const createInvoice = () => {
    invoiceApi.createInvoice(id)
      .then(() => {
        setTimeout(() => history.replace(from))
      }, 1000)
  }

  const deleteProduct = () => {
    orderApi.deleteOrderById(id)
      .then(() => {
        setTimeout(() => history.replace(from))
      }, 1000)
  }


  const getClientId = orders.client === undefined ? "" : orders.client.id;

  const statusIsNew = orders.orderStatus === "NAUJAS";

  const orderIsNew = statusIsNew ? <>
    <Field
      name="clientId"
      as="select"
      variant="outlined"
      label="clientId"
      placeholder={getClientId}
      required
    >
      <option value="" selected disabled>Pasirinkite klienta</option>
      {clients.map(client => (
        <option key={client.id} value={client.id}>{client.id} {client.title}</option>
      ))}
    </Field>
  </> : ""

  const disableUpdate = statusIsNew ? "" : "disabled"

  const invoiceExist = orders.invoice === null ?
    <>
      <Button type="button" variant="contained" color="primary" onClick={createInvoice}>
        Sukurti saskaita
        </Button>
    </> :
    <>
      <div>
        <table className="tableM">
          <thead>
            <tr>
              <th>Id</th>
              <th>Invoice Number</th>
              <th>Invoice Date</th>
              <th>Payment Period</th>
              <th>Total Price</th>
              <th>Client Id</th>
              <th>Order Id</th>
              <th>Paid At</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{orders.invoice === undefined ? "" : orders.invoice.id}</td>
              <td>{orders.invoice === undefined ? "" : orders.invoice.invoiceNumber}</td>
              <td>{orders.invoice === undefined ? "" : orders.invoice.invoiceDate}</td>
              <td>{orders.invoice === undefined ? "" : orders.invoice.paymentPeriod}</td>
              <td>{orders.invoice === undefined ? "" : orders.invoice.totalPrice}</td>
              <td>{orders.invoice === undefined ? "" : orders.client.id}</td>
              <td>{orders.invoice === undefined ? "" : orders.id}</td>
              <td className={orders.invoice && orders.invoice.paidAt ? "" : "isPaid"}>{orders.invoice === undefined ? "" : orders.invoice.paidAt}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </>

  const orderProductIsNew = statusIsNew ? <>
    <NavLink to={`/add/order/product/${id}`}>
      <Button type="button" variant="contained" color="primary" >
        Prideti Produkta
          </Button>
    </NavLink>
  </> : ""


  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="lg">
        <h4 className="mt-3">Uzsakymo atnaujinimas</h4>
        <hr />
        <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
        >
          <Form>
            <div>
              <h5>OrderStatus: {orders.orderStatus}
                <Field
                  name="orderStatus"
                  as="select"
                  variant="outlined"
                  label="orderStatus"
                  placeholder={orders.orderStatus}
                  required
                >
                  <option value="" selected disabled>Pasirinkite uzsakymo statusa</option>
                  <option value="NAUJAS">NAUJAS</option>
                  <option value="LAUKIAMA_APMOKEJIMO">LAUKIAMA APMOKEJIMO</option>
                  <option value="APMOKĖTAS">APMOKĖTAS</option>
                  <option value="VYKDOMAS">VYKDOMAS</option>
                  <option value="PARUOŠTAS">PARUOŠTAS</option>
                  <option value="IVYKDYTAS">IVYKDYTAS</option>
                </Field>
              </h5>
            </div>
            <div>
              <h5>Client Id: {getClientId}
                {orderIsNew}
              </h5>
            </div>
            <Button type="submit" variant="contained" color="primary">
              Atnaujinti
            </Button>
            &nbsp;
            {orders.orderStatus !== "NAUJAS" ? "" : <Button variant="contained" color="secondary" onClick={deleteProduct}>
              Istrinti uzsakyma
            </Button>}

            <hr />
          </Form>
        </Formik>
        <h4 className="mt-3">Uzsakytu prekiu sarasas</h4>
        <hr />
        <table className="tableM">
          <thead>
            <tr>
              <th>Id</th>
              <th>Price Per Unit</th>
              <th>Quantity</th>
              <th>Total</th>
              <th>Order Id</th>
              <th>Product id</th>
              <th>Option</th>
            </tr>
          </thead>
          <tbody>
            {orderProducts.map(orderProduct => (
              <tr key={orderProduct.id}>
                <td>{orderProduct.id}</td>
                <td>{orderProduct.pricePerUnit}</td>
                <td>{orderProduct.quantity}</td>
                <td>{orderProduct.total}</td>
                <td>{orderProduct.order.id}</td>
                <td>{orderProduct.product.id}</td>
                <td>
                  <NavLink className={disableUpdate} to={`/order/product/${orderProduct.id}`}>
                    Redaguoti
                  </NavLink>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {orderProductIsNew}
        <hr />
        <h4 className="mt-3">Saskaitos faktura</h4>
        {invoiceExist}


      </Container>
    </React.Fragment>
  );
}