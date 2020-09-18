import React, { useEffect, useState } from 'react';
// import './styles.css'
import orderApi from '../../api/orderApi';
import Container from '@material-ui/core/Container';
import { NavLink } from 'react-router-dom';
import Button from '@material-ui/core/Button';

export default () => {

  const [orders, setOrders] = useState([]);
  const [search, setSearch] = useState("");
  const [filteredOrders, setFilteredOrders] = useState([]);


  useEffect(() => {
    orderApi.fetchOrders()
      .then(response => setOrders(response.data))
  }, [])

  useEffect(() => {
    setFilteredOrders(
      orders.filter((order) =>
        order.orderStatus.toLowerCase().includes(search.toLowerCase()))
    )
  }, [search, orders])

  return (
    <Container>
      <select
        name="orderStatus"
        as="select"
        variant="outlined"
        label="orderStatus"
        placeholder="orderStatus"
        onChange={(e) => setSearch(e.target.value)}
      >
        <option value="" disabled selected>Filtravimas pagal statusa</option>
        <option value="NAUJAS" >NAUJAS</option>
        <option value="LAUKIAMA_APMOKEJIMO">LAUKIAMA APMOKEJIMO</option>
        <option value="APMOKĖTAS">APMOKĖTAS</option>
        <option value="VYKDOMAS">VYKDOMAS</option>
        <option value="PARUOŠTAS">PARUOŠTAS</option>
        <option value="IVYKDYTAS">IVYKDYTAS</option>
      </select>
      <hr />
      <div>
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

            {filteredOrders.map(order => (
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
      </div>
      <NavLink className="noDec" to="/cart">
        <Button variant="contained" color="primary" className="center">
          Sukurti Uzsakyma
        </Button>
      </NavLink>
    </Container>
  )
}
