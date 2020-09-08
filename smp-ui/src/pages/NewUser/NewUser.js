import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';

import Button from '@material-ui/core/Button';
import { Field, Formik, Form } from 'formik';
import userApi from '../../api/userApi';
import { useHistory, useLocation } from 'react-router-dom';
import Secured from '../../components/Secured/Secured'


export default function SimpleContainer() {


  const location = useLocation();
  const history = useHistory();
  const { from } = location.state || { from: { pathname: '/users' } }

  const initialValues = {
    username: '',
    password: '',
    name: '',
    lastName: '',
    email: '',
    role: '',
  }

  const onSubmit = values => {
    userApi.createUser(values)
      .then(() => {
        setTimeout(() => history.replace(from))
      }, 1000)
  }

  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="lg">
        <h4 className="mt-3">Detales</h4>
        <hr />
        <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
        >
          <Form>
            <div>
              <h5>Username:
                <Field
                  name="username"
                  type="text"
                  variant="outlined"
                  label="username"
                  placeholder="username"
                  required
                />
              </h5>
            </div>
            <div>
              <h5>Password:
                <Field
                  name="password"
                  type="password"
                  variant="outlined"
                  label=""
                  placeholder="password"
                  required
                />
              </h5>
            </div>
            <div>
              <h5>Email:
                <Field
                  name="email"
                  type="text"
                  variant="outlined"
                  label="email"
                  placeholder="email"
                  required
                />
              </h5>
            </div>
            <div>
              <h5>Name:
                <Field
                  name="name"
                  type="text"
                  variant="outlined"
                  label="name"
                  placeholder="name"
                  required
                />
              </h5>
            </div>
            <div>
              <h5>Last Name:
                <Field
                  name="lastName"
                  type="text"
                  variant="outlined"
                  label="lastName"
                  placeholder="Last Name"
                  required
                />
              </h5>
            </div>
            <div>
              <h5>Role:
                <Field
                  name="role"
                  as="select"
                  variant="outlined"
                  label="role"
                  placeholder="role"
                  required
                >
                  <option value="" disabled selected>Pasirinkite role</option>
                  <Secured role="ADMIN">
                    <option value="ADMIN" >ADMIN</option>
                    <option value="EMPLOYEE">EMPLOYEE</option>
                  </Secured>
                  <option value="CLIENT">CLIENT</option>
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