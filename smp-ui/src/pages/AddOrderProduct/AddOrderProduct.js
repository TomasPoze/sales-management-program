import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';

import { Field, Formik, Form } from 'formik';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import orderApi from '../../api/orderApi';


export default function SimpleContainer() {

  const { id } = useParams({});

  const location = useLocation();
  const history = useHistory();
  const { from } = location.state || { from: { pathname: `/order/${id}` } }

  const initialValues = {
    productId: '',
    quantity: '',
  }

  const onSubmit = values => {
    orderApi.addOrderProuct(id,values,values)
      .then(() => {
        setTimeout(() => history.replace(from))
      }, 1000)
  }


  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="lg">
        <h4 className="mt-3">Kategorijos redagavimas</h4>
        <hr />
        <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
        >
          <Form>
            <div>
              <h5>Product ID:
                <Field
                  name="productId"
                  type="text"
                  variant="outlined"
                  label="productId"

                  required
                />
              </h5>
            </div>
            <div>
              <h5>Quantity:
                <Field
                  name="quantity"
                  type="number"
                  variant="outlined"
                  label="quantity"
                  required
                />
              </h5>
            </div>
            <Button type="submit" variant="contained" color="primary">
              Prideti
            </Button>
          </Form>
        </Formik>
      </Container>
    </React.Fragment>
  );
}