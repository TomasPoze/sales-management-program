import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import orderApi from '../../api/orderApi';
import clientApi from '../../api/clientApi';
import pdfApi from '../../api/pdfApi';

import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import Secured from '../../components/Secured/Secured';



export default () => {

  const [orders, setOrders] = useState([]);
  const [clients, setClients] = useState([])

  useEffect(() => {
    clientApi.getClient()
      .then(resp => setClients(resp.data))
  }, [])

  useEffect(() => {
    orderApi.fetchClientOrders(clients.id)
      .then(response => setOrders(response.data))
  }, [clients.id])


  function createPdf(order) {
    pdfApi.createPdf(order.id)
      .then((resp) => {
        const url = window.URL.createObjectURL(new Blob([resp.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download',`${order.invoice === undefined ? "" : order.invoice.invoiceNumber}.pdf`)
        document.body.appendChild(link);
        link.click();
      })
  }

  return (
    <Container>
      <div>
        <h4>Uzsakymai</h4>
        <hr/>
        <table className="tableM">
          <thead>
            <tr>
              <th>Order Number</th>
              <th>Order Date</th>
              <th>Total price</th>
              <th>Order Status</th>
              <th>Info</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(order => (
              <tr key={order.id}>
                <td>{order.orderNumber}</td>
                <td>{order.localDateTime}</td>
                <td>{order.totalSum}</td>
                <td>{order.orderStatus}</td>
                <td><NavLink to={`/client/order/${order.id}`}>More</NavLink></td>
              </tr>
            ))}

          </tbody>
        </table>
      </div>
      <hr/>
      <div id="divToPrint">
        <h4>Saskaitos fakturos</h4>
        <hr/>
        <table className="tableM">
          <thead>
            <tr>
              <th>Invoice Number</th>
              <th>Invoice Date</th>
              <th>Payment Period</th>
              <th>Total price</th>
              <th>Paid At</th>
              <th>PDF</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(order => (
              <tr key={order.id}>
                <td>{order.invoice ? order.invoice.invoiceNumber :""}</td>
                <td>{order.invoice ? order.invoice.invoiceDate : ""}</td>
                <td>{order.invoice ? order.invoice.paymentPeriod : ""}</td>
                <td>{order.invoice ? order.invoice.totalPrice : ""}</td>
                <td>{order.invoice ? order.invoice.paidAt : ""}</td>
                <td><button onClick={() => createPdf(order)}>Download</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <Secured role="EMPLOYEE">
        <NavLink className="noDec" to="/cart">
          <Button variant="contained" color="primary" className="center">
            Sukurti Uzsakyma
        </Button>
        </NavLink>
      </Secured>
    </Container>
  )
}
