import React, { useEffect, useState } from 'react';
// import './styles.css'
import orderApi from '../../api/orderApi';
import Container from '@material-ui/core/Container';
import { NavLink } from 'react-router-dom';
import Button from '@material-ui/core/Button';


export default () => {

  const [orders, setOrders] = useState([]);


  useEffect(() => {
    orderApi.fetchOrders()
      .then(response => setOrders(response.data))
  }, [])

  return (
    <Container>

      <table className="tableM">
        <thead>
          <tr>
            <th>Id</th>
            <th>Order Date</th>
            <th>Order Number</th>
            <th>Order Status</th>
            <th>Total price</th>
            <th>Client Id</th>
            <th>Option</th>
          </tr>
        </thead>
        <tbody>
          {orders.map(order => (
            <tr key={order.id}>
              <td>{order.id}</td>
              <td>{order.localDateTime}</td>
              <td>{order.orderNumber}</td>
              <td>{order.orderStatus}</td>
              <td>{order.totalSum}</td>
              <td>{order.client.id}</td>
              <td>
                <NavLink to={`/order/${order.id}`}>
                  Redaguoti
                </NavLink>
              </td>
            </tr>
          ))}

        </tbody>
      </table>
      <NavLink className="noDec" to="/cart">
        <Button variant="contained" color="primary" className="center">
          Sukurti Uzsakyma
        </Button>
      </NavLink>
    </Container>
  )
}
