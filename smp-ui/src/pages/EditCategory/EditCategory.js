import React, { useEffect, useState } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';

import { Field, Formik, Form } from 'formik';
import categoryApi from '../../api/categoryApi';
import { useHistory, useLocation, useParams } from 'react-router-dom';


export default function SimpleContainer() {

  const { id } = useParams({});
  const [categories, setCategories] = useState([]);


  const location = useLocation();
  const history = useHistory();
  const { from } = location.state || { from: { pathname: '/categories' } }

  const initialValues = {
    category: '',
  }

  useEffect(() => {
    categoryApi.getCategoryById(id)
      .then(response => setCategories(response.data));
  }, [id])

  const onSubmit = values => {
    categoryApi.updateCategory(id, values)
      .then(() => {
        setTimeout(() => history.replace(from))
      }, 1000)
  }

  const deleteCategory = () => {
    categoryApi.deleteProductById(id)
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
              <h5>Title: {categories.category}
                <Field
                  name="category"
                  type="text"
                  variant="outlined"
                  label="category"
                  placeholder={categories.category}
                  required
                />
              </h5>
            </div>
            <Button type="submit" variant="contained" color="primary">
              Atnaujinti
            </Button>
            <hr />
            <Button variant="contained" color="secondary" onClick={deleteCategory}>
              Istrinti kategorija
            </Button>
          </Form>
        </Formik>
      </Container>
    </React.Fragment>
  );
}