import React, { useContext } from "react";
import { Field, Form, Formik } from "formik";
import { setCredentials } from "../../api";
import { UserContext } from "../../App";
import userApi from "../../api/userApi";
import { useHistory, useLocation } from "react-router-dom"

// Material-ui
import { TextField } from 'formik-material-ui'
import { Button } from '@material-ui/core'
import Avatar from '@material-ui/core/Avatar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

const initialValues = {
  username: '',
  password: ''
}

const useStyles = makeStyles((theme) => ({
  paper: {
      marginTop: theme.spacing(8),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
  },
  avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main,
  },
  form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(1),
  },
  submit: {
      margin: theme.spacing(3, 0, 2),
  },
}));

export default () => {
  const classes = useStyles();
  const { login } = useContext(UserContext)
  const history = useHistory();
  const location = useLocation()

  const { from } = location.state || { from: { pathname: '/home' } }

  const onSubmit = values => {
    setCredentials(values)
    userApi.getUser()
      .then(({ data }) => {
        login(data)
        history.replace(from)
      })
  }

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}>
      {(props) => (
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign In
            </Typography>
            <Form className={classes.form}>
              <div>
                <Field
                  name="username"
                  type="text"
                  component={TextField}
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  label="username"
                  autoFocus
                />
              </div>
              <div>
                <Field
                  component={TextField}
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="password"
                  type="password"
                  autoComplete="current-password"
                />
              </div>
              <div>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                >
                  Login
                </Button>
              </div>
            </Form>
          </div>
        </Container>
      )}
    </Formik>
  )
}
