import React, { useEffect, useState,useContext } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import { UserContext } from '../../App';
import orderApi from '../../api/orderApi';
import clientApi from '../../api/clientApi';

import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import Secured from '../../components/Secured/Secured';


export default () => {

  const { id } = useParams({});

  const [orders, setOrders] = useState([]);
  const [clients,setClients] = useState([])

  useEffect(()=>{
    clientApi.getClient()
      .then(resp => setClients(resp.data))
  },[])

  useEffect(() => {
    orderApi.fetchClientOrders(clients.id)
      .then(response => setOrders(response.data))
  }, [])

  return (
    <Container>

      <table className="tableM">
        <thead>
          <tr>
            <th>Order Number</th>
            <th>Order Date</th>
            <th>Total price</th>
            <th>Order Status</th>
          </tr>
        </thead>
        <tbody>
          {orders.map(order => (
            <tr key={order.id}>
              <td>{order.orderNumber}</td>
              <td>{order.localDateTime}</td>
              <td>{order.totalSum}</td>
              <td>{order.orderStatus}</td>
            </tr>
          ))}

        </tbody>
      </table>
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
