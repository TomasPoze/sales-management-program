import React, { useEffect, useState } from 'react';
// import './styles.css'
import invoiceApi from '../../api/invoiceApi';
import Container from '@material-ui/core/Container';
import { useHistory, useLocation,NavLink } from 'react-router-dom';
import Button from '@material-ui/core/Button';


export default () => {

  const [invoices, setInvoices] = useState([]);

  const location = useLocation();
  const history = useHistory();
  const { from } = location.state || { from: { pathname: `/orders` } }

  useEffect(() => {
    invoiceApi.fetchInvoices()
      .then(response => setInvoices(response.data))
  }, [])

  const setPaidTrue = (invoice) => {
    if(!invoice.paidAt){
      invoiceApi.invoiceIsPaid(invoice.id)
      .then(() => {
        setTimeout(() => history.replace(from))
      }, 1000)
    }

  }

  return (
    <Container>

      <table className="tableM">
        <thead>
          <tr>
            <th>Id</th>
            <th>Invoice Number</th>
            <th>Invoice Date</th>
            <th>Payment Period</th>
            <th>Total price</th>
            <th>Is Paid</th>
            <th>Client Id</th>
            <th>Order Id</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {invoices.map(invoice => (
            <tr key={invoice.id}>
              <td>{invoice.id}</td>
              <td>{invoice.invoiceNumber}</td>
              <td>{invoice.invoiceDate}</td>
              <td>{invoice.paymentPeriod}</td>
              <td>{invoice.totalPrice}</td>
              <td>{invoice.paidAt}</td>
              <td>{invoice.client.id}</td>
              <td>{invoice.order.id}</td>
              <td>
                <Button type="button" variant="contained" color={!invoice.paidAt ? "primary" : "secondary"} onClick={() => setPaidTrue(invoice)}>
                  Set to Paid
                </Button>

              </td>
            </tr>
          ))}

        </tbody>
      </table>
    </Container>
  )
}
