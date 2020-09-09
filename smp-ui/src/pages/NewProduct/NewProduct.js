import React, { useEffect, useState } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';

import Button from '@material-ui/core/Button';
import { Field, Formik, Form } from 'formik';
import productApi from '../../api/productApi'
import categoryApi from '../../api/categoryApi';
import { useHistory, useLocation } from 'react-router-dom';


export default function SimpleContainer() {

  const [categories, setCategories] = useState([]);

  const location = useLocation();
  const history = useHistory();
  const { from } = location.state || { from: { pathname: '/products' } }

  const initialValues = {
    title: '',
    sku: '',
    price: 0,
    purchaseCost: 0,
    categoryId: ''
  }


  useEffect(() => {
    categoryApi.fetchCategories()
      .then(response => setCategories(response.data))
  }, [])

  const onSubmit = values => {
    productApi.createProduct(values)
      .then(() => {
        setTimeout(() => history.replace(from))
      }, 1000)
  }

  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="lg">
        <h4 className="mt-3">Produkto kurimas</h4>
        <hr />
        <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
        >
          <Form>
            <div>
              <h5>Title:
                <Field
                  name="title"
                  type="text"
                  variant="outlined"
                  label="title"
                  placeholder="title"
                  required
                />
              </h5>
            </div>
            <div>
              <h5>Sku:
                <Field
                  name="sku"
                  type="text"
                  variant="outlined"
                  label="sku"
                  placeholder="Sku"
                  required
                />
              </h5>
            </div>
            <div>
              <h5>Price:
                <Field
                  name="price"
                  type="number"
                  variant="outlined"
                  label="price"
                  placeholder="Price"
                  step="0.01"
                  min="0"
                  required
                />
              </h5>
            </div>
            <div>
              <h5>Purchase Cost:
                <Field
                  name="purchaseCost"
                  type="number"
                  variant="outlined"
                  label="purchaseCost"
                  placeholder="Purchase Cost"
                  step="0.01"
                  min="0"
                  required
                />
              </h5>
            </div>
            <div>
              <h5>Category:
                <Field
                  name="categoryId"
                  as="select"
                  variant="outlined"
                  label="categoryId"
                  placeholder="Category Id"
                  required
                >
                  <option value="" disabled selected>Pasirinkite kategorija</option>
                  {categories.map(category => (
                    <option key={category.id} value={category.id}>{category.category}</option>
                  ))}
                </Field>
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