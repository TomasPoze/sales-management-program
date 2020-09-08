import React, { useContext, useState, useEffect } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import { UserContext } from '../../App';
import Button from '@material-ui/core/Button';
import { Field, Formik, Form } from 'formik';
import userApi from '../../api/userApi';
import Secured from '../../components/Secured/Secured';
import clientApi from '../../api/clientApi';


export default function SimpleContainer() {

  const { user } = useContext(UserContext)

  const [client, setClient] = useState([])


  useEffect(() => {
    clientApi.getClient()
      .then(resp => setClient(resp.data))
  },[])

  const initialValues = {
    name: '',
    lastName: '',
    email: '',
    password: ''
  }
  const clientValues = {
    address: '',
    bankAccountNumber: '',
    code: '',
    email: '',
    title: ''
  }

  const onSubmit = values => {
    userApi.updateUser(values);

  }
  const onClientSubmit = values => {
    clientApi.updateClient(values);

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
        <Secured role="CLIENT">
          <Formik
            initialValues={clientValues}
            onSubmit={onClientSubmit}
          >
            <Form>
              <div>
                <h5>Pavadinimas: {client.title}
                  <Field
                    name="title"
                    type="text"
                    variant="outlined"
                    label={client.title}
                    placeholder={client.title}
                  />
                </h5>
              </div>
              <div>
                <h5>Kodas: {client.code}
                  <Field
                    name="code"
                    type="text"
                    variant="outlined"
                    label={client.code}
                    placeholder={client.code}
                  />
                </h5>
              </div>
              <div>
                <h5>Adresas: {client.address}
                  <Field
                    name="address"
                    type="text"
                    variant="outlined"
                    label={client.address}
                    placeholder={client.address}
                  />
                </h5>
              </div>
              <div>
                <h5>Banko saskaitos nr:{client.bankAccountNumber}
                <Field
                    name="bankAccountNumber"
                    type="text"
                    variant="outlined"
                    label={client.bankAccountNumber}
                    placeholder={client.bankAccountNumber}
                  />
                </h5>
              </div>
              <div>
                <h5>Email:{client.email}
                <Field
                    name="email"
                    type="text"
                    variant="outlined"
                    label={client.email}
                    placeholder={client.email}
                  />
                </h5>
              </div>
              <Button type="submit" variant="contained" color="primary">
                Atnaujinti
            </Button>
              <hr />
            </Form>
          </Formik>
        </Secured>
      </Container>
    </React.Fragment>
  );
}