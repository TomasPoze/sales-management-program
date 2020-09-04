import React, { useContext } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import { UserContext } from '../../App';
import Button from '@material-ui/core/Button';
import { Field, Formik, Form } from 'formik';
import userApi from '../../api/userApi';


export default function SimpleContainer() {

  const { user } = useContext(UserContext)

  const initialValues = {
    name: '',
    lastName: '',
    email: '',
    password: ''
  }

  const onSubmit = values => {
    userApi.updateUser(values);
    
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
              <h5>Email: {user.email}
                <Field
                  name="email"
                  type="text"
                  variant="outlined"
                  label={user.email}
                  placeholder={user.email}
                />
              </h5>
            </div>
            <div>
              <h5>Name: {user.name}
                <Field
                  name="name"
                  type="text"
                  variant="outlined"
                  label={user.name}
                  placeholder={user.name}
                />
              </h5>
            </div>
            <div>
              <h5>Last Name: {user.lastName}
                <Field
                  name="lastName"
                  type="text"
                  variant="outlined"
                  label={user.lastName}
                  placeholder={user.lastName}
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
                  placeholder=""
                />
              </h5>
            </div>
            <Button type="submit" variant="contained" color="primary">
              Atnaujinti
            </Button>
            <hr />
          </Form>
        </Formik>
      </Container>
    </React.Fragment>
  );
}