import React, { useEffect, useState } from 'react';
// import './styles.css'
import orderApi from '../../api/orderApi';
import Container from '@material-ui/core/Container';
import { NavLink } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import userApi from '../../api/userApi';

export default () => {

  const [orders, setOrders] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("");
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [users, setUsers] = useState([]);


  useEffect(() => {
    userApi.getUser()
      .then(resp => setUsers(resp.data))
  }, [])

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

  useEffect(() => {
    setFilteredOrders(
      orders.filter((order) =>
        order.user.id.toString().includes(filter.toString()))
    )
  }, [filter, orders])



  return (
    <Container>
      <div>

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
        <span> | </span>
        <button onClick={(e) => setFilter(e.target.value)} value={users.id}>Mano priskirti užsakymai</button>
        <span> | </span>
        <button onClick={(e) => setFilter(e.target.value)} value="">Visi užsakymai</button>
      </div>
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
              <th>Employee Id</th>
              <th>Client Id</th>
              <th>Option</th>
              <th>Info</th>
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
                <td>{order.user.id}</td>
                <td>{order.client.id}</td>
                <td>
                  <NavLink to={`/order/${order.id}`}>
                    Redaguoti
                  </NavLink>
                </td>
                <td>
                  <NavLink to={`/client/order/${order.id}`}>
                    Užsakymo info
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
