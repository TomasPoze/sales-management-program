import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';

import Button from '@material-ui/core/Button';
import { Field, Formik, Form } from 'formik';
import categoryApi from '../../api/categoryApi';
import { useHistory, useLocation } from 'react-router-dom';


export default function SimpleContainer() {

  const location = useLocation();
  const history = useHistory();
  const { from } = location.state || { from: { pathname: '/categories' } }

  const initialValues = {
    category: ''
  }


  const onSubmit = values => {
    categoryApi.createCategory(values)
      .then(() => {
        setTimeout(() => history.replace(from))
      }, 1000)
  }

  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="lg">
        <h4 className="mt-3">Kategorijos kurimas</h4>
        <hr />
        <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
        >
          <Form>
            <div>
              <h5>Category:
                <Field
                  name="category"
                  type="text"
                  variant="outlined"
                  label="category"
                  placeholder="category"
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