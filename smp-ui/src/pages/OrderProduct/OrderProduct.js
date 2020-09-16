import React, { useEffect, useState } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';

import Button from '@material-ui/core/Button';
import { Field, Formik, Form } from 'formik';
import orderApi from '../../api/orderApi';
import { useHistory, useLocation } from 'react-router-dom';
import clientApi from '../../api/clientApi';

export default () => {
  const [clients, setClients] = useState([]);

  const location = useLocation();
  const history = useHistory();
  const { from } = location.state || { from: { pathname: '/orders' } }

  const initialValues = {
    clientId: '',
    items:[
      {
        productId:'',
        quantity:''
      }
    ]
  }

  useEffect(() => {
    clientApi.getClients()
      .then(resp => setClients(resp.data))
  }, [])

  const onSubmit = values => {
    orderApi.createOrder(values)
      .then(() => {
        setTimeout(() => history.replace(from))
      }, 1000)
  }

  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="lg">
        <h4 className="mt-3">Uzsakymo kurimas</h4>
        <hr />
        <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
        >
          <Form>
            <div>
              <h5>Kliento Id:
                <Field
                  name="clientId"
                  as="select"
                  variant="outlined"
                  label="clientId"
                  placeholder="clientId"
                  required
                >
                  <option value="" selected disabled>Pasirinkite Klienta</option>
                  {clients.map(client => (
                    <option key={client.id} value={client.id}>{client.id} {client.title}</option>
                  ))}
                </Field>
              </h5>
            </div>
            <div>
              <h5>Produkto Id:
                <Field
                  name="items[0].productId"
                  type="text"
                  variant="outlined"
                  label="productId"
                  placeholder="productId"
                  required
                />
              </h5>
            </div>
            <div>
              <h5>Kiekis:
                <Field
                  name="items[0].quantity"
                  type="text"
                  variant="outlined"
                  label="quantity"
                  placeholder="quantity"
                  required
                />
              </h5>
            </div>
            <Button type="submit" variant="contained" color="primary">
              Sukurti
            </Button>
            <hr />
          </Form>
        </Formik>
      </Container>
    </React.Fragment>
  );
}