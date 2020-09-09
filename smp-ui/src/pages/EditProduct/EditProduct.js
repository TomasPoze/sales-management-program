import React, { useEffect, useState } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';

import Button from '@material-ui/core/Button';
import { Field, Formik, Form } from 'formik';
import productApi from '../../api/productApi'
import categoryApi from '../../api/categoryApi';
import { useHistory, useLocation, useParams } from 'react-router-dom';


export default function SimpleContainer() {

  const { id } = useParams({});
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);

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
    productApi.getProduct(id)
      .then(response => setProducts(response.data));
  }, [id])

  useEffect(() => {
    categoryApi.fetchCategories()
      .then(response => setCategories(response.data));
  }, [])

  const onSubmit = values => {
    productApi.updateProduct(id, values)
      .then(() => {
        setTimeout(() => history.replace(from))
      }, 1000)
  }

  const deleteProduct = () => {
    productApi.deleteProductById(id)
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
              <h5>Title: {products.title}
                <Field
                  name="title"
                  type="text"
                  variant="outlined"
                  label="title"
                  placeholder={products.title}
                  required
                />
              </h5>
            </div>
            <div>
              <h5>Sku: {products.sku}
                <Field
                  name="sku"
                  type="text"
                  variant="outlined"
                  label="sku"
                  placeholder={products.sku}
                  required
                />
              </h5>
            </div>
            <div>
              <h5>Price: {products.price}
                <Field
                  name="price"
                  type="number"
                  variant="outlined"
                  label="price"
                  placeholder={products.price}
                  step="0.01"
                  min="0"
                  required
                />
              </h5>
            </div>
            <div>
              <h5>Purchase Cost: {products.purchaseCost}
                <Field
                  name="purchaseCost"
                  type="number"
                  variant="outlined"
                  label="purchaseCost"
                  placeholder={products.purchaseCost}
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
              Atnaujinti
            </Button>
            <hr />
            <Button variant="contained" color="secondary" onClick={deleteProduct}>
              Istrinti produkta
            </Button>
          </Form>
        </Formik>
      </Container>
    </React.Fragment>
  );
}