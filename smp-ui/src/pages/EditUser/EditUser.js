import React, { useContext, useState, useEffect } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import { UserContext } from '../../App';
import Button from '@material-ui/core/Button';
import { Field, Formik, Form } from 'formik';
import userApi from '../../api/userApi';
import { useParams, useLocation, useHistory } from 'react-router-dom';
import Secured from '../../components/Secured/Secured';

export default () => {


  const [otherUser, setOtherUser] = useState([]);
  const { loggedIn } = useContext(UserContext)
  const { id } = useParams({});

  useEffect(() => {
    userApi.getUserById(id)
      .then(resp => setOtherUser(resp.data))
  }, [id])

  const location = useLocation();
  const history = useHistory();
  const { from } = location.state || { from: { pathname: '/users' } }

  const initialValues = {
    username: '',
    name: '',
    lastName: '',
    email: '',
    password: '',
    role: ''
  }

  const onSubmit = values => {
    userApi.updateOtherUser(id, values)
      .then(() => {
        setTimeout(() => history.replace(from))
      }, 1000)
  }

  const deleteUser = () => {
    userApi.deleteUserById(id)
      .then(() => {
        setTimeout(() => history.replace(from))
      }, 1000)
  }

  const deleteButton = loggedIn() ? (
    <>
      <Secured role="ADMIN">
        <Button variant="contained" color="secondary" onClick={deleteUser}>
          Istrinti naudotoja
        </Button>
      </Secured>
    </>
  ) : <></>

  const mainRole = otherUser.roles === undefined ? "" : otherUser.roles[0].role
  const notAC = mainRole === "ADMIN" || mainRole === "CLIENT" ? "EMPLOYEE" : "ADMIN";
  const notAE = mainRole === "ADMIN" || mainRole === "EMPLOYEE" ? "CLIENT" : "ADMIN"

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
              <h5>Username: {otherUser.username}
                <Field
                  name="username"
                  type="text"
                  variant="outlined"
                  label={otherUser.username}
                  placeholder={otherUser.username}
                />
              </h5>
            </div>
            <div>
              <h5>Email: {otherUser.email}
                <Field
                  name="email"
                  type="email"
                  variant="outlined"
                  label={otherUser.email}
                  placeholder={otherUser.email}
                />
              </h5>
            </div>
            <div>
              <h5>Name: {otherUser.name}
                <Field
                  name="name"
                  type="text"
                  variant="outlined"
                  label={otherUser.name}
                  placeholder={otherUser.name}
                />
              </h5>
            </div>
            <div>
              <h5>Last Name: {otherUser.lastName}
                <Field
                  name="lastName"
                  type="text"
                  variant="outlined"
                  label={otherUser.lastName}
                  placeholder={otherUser.lastName}
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
            <div>
              <h5>Role: {mainRole}
                <Field
                  name="role"
                  as="select"
                  variant="outlined"
                >
                  <option value={mainRole}>{mainRole}</option>
                  <option value={notAC}>{notAC}</option>
                  <option value={notAE}>{notAE}</option>
                </Field>
              </h5>
            </div>
            <Button type="submit" variant="contained" color="primary">
              Atnaujinti
            </Button>
            <hr />
            {deleteButton}
          </Form>
        </Formik>
      </Container>
    </React.Fragment>
  );
}