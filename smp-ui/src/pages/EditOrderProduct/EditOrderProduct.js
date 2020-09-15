import React, { useEffect, useState } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';

import { Field, Formik, Form } from 'formik';
import orderApi from '../../api/orderApi';
import { useHistory, useLocation, useParams } from 'react-router-dom';


export default function SimpleContainer() {

  const { id } = useParams({});
  const [orderProducts, setOrderProducts] = useState([]);


  const location = useLocation();
  const history = useHistory();
  const { from } = location.state || { from: { pathname: '/orders' } }

  const initialValues = {
    quantity:'',
    productId:''
  }

  useEffect(() => {
    orderApi.fetchOrderProduct(id)
      .then(response => setOrderProducts(response.data));
  }, [id])

  const onSubmit = values => {
    orderApi.updateOrderProduct(id, values)
      .then(() => {
        setTimeout(() => history.replace(from))
      }, 1000)
  }

  const deleteCategory = () => {
    orderApi.deleteOrderProductById(id)
      .then(() => {
        setTimeout(() => history.replace(from))
      }, 1000)
  }

  const getProductId = orderProducts.product === undefined ? "" : orderProducts.product.id;

  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="lg">
        <h4 className="mt-3">Produktu uzsakymo redagavimas</h4>
        <hr />
        <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
        >
          <Form>
            <div>
              <h5>Quantity: {orderProducts.quantity}
                <Field
                  name="quantity"
                  type="text"
                  variant="outlined"
                  label="quantity"
                  placeholder={orderProducts.quantity}
                  required
                />
              </h5>
            </div>
            <div>
              <h5>Product Id: {getProductId}
                <Field
                  name="productId"
                  type="text"
                  variant="outlined"
                  label="productId"
                  placeholder={getProductId}
                  required
                />
              </h5>
            </div>
            <Button type="submit" variant="contained" color="primary">
              Atnaujinti
            </Button>
            <hr />
            <Button variant="contained" color="secondary" onClick={deleteCategory}>
              Istrinti produkta is saraso
            </Button>
          </Form>
        </Formik>
      </Container>
    </React.Fragment>
  );
}