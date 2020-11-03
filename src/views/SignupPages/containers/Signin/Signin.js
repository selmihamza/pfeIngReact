import React, { useEffect, useState } from "react";
import { Button, TextField, InputLabel, Box } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import { Alert } from "@material-ui/lab";
import IconButton from "@material-ui/core/IconButton";
import Collapse from "@material-ui/core/Collapse";
import CloseIcon from "@material-ui/icons/Close";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
// import { useHistory } from "react-router-dom";
import { Formik } from "formik";
import * as Yup from "yup";

import "./Signin.css";
import { loginUser } from "../../../../store/actions/authActions/authActions";
import Header from "../../components/header/Header";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
}));
let title = "Welcome in your driver space";
let contentHeader = (
  <p>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
    tempor
    <br /> incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
    quis nostrud
    <br /> exercitation ullamco labori nisi ut aliquip ex ea commodo consequat
  </p>
);

function Signin(props) {
  const classes = useStyles();
  const [openError, setOpenError] = useState(false);

  const handleSubmit = (values) => {
    props.loginUser(values, props.history);
  };

  const { errorSignin } = props.errors;
  useEffect(() => {
    setOpenError(true);
    const timer = setTimeout(() => {
      setOpenError(false);
    }, 5000);
    return () => clearTimeout(timer);
  }, [errorSignin]);
  return (
    <div className="wrapper">
      <Header title={title} contentHeader={contentHeader} />
      <content>
        <div className="container">
          <div className="tabs-nav">
            <Link className="tabs-nav-item active" to="/signin">
              <span className="tab-nav-description">Already a driver</span>
              <span className="tab-nav-title">SIGN IN</span>
            </Link>

            <Link className="tabs-nav-item" to="/Marcel/signup">
              <span className="tab-nav-description">Not Registred</span>
              <span className="tab-nav-title">SIGN UP</span>
            </Link>
          </div>

          <Formik
            initialValues={{ email: "", password: "" }}
            onSubmit={handleSubmit}
            validationSchema={Yup.object().shape({
              email: Yup.string()
                .email("Invalid email : must be exemple@exemple.xx")
                .required("required"),
              password: Yup.string().required("required"),
            })}
          >
            {(props) => {
              const {
                values,
                touched,
                errors,
                handleChange,
                handleBlur,
                handleSubmit,
              } = props;
              return (
                <Container component="main" maxWidth="xs">
                  <div className={classes.paper}>
                    <form
                      className={classes.form}
                      noValidate
                      onSubmit={handleSubmit}
                    >
                      {errorSignin && (
                        <Collapse in={openError} className={classes.alert}>
                          <Alert
                            severity="error"
                            action={
                              <IconButton
                                aria-label="close"
                                color="inherit"
                                size="small"
                                onClick={() => {
                                  setOpenError(false);
                                }}
                              >
                                <CloseIcon fontSize="inherit" />
                              </IconButton>
                            }
                          >
                            {errorSignin}
                          </Alert>
                        </Collapse>
                      )}

                      <Grid container spacing={1}>
                        <Box ml={1} mt={1}>
                          <InputLabel shrink>E-mail</InputLabel>
                        </Box>

                        <Grid item xs={12}>
                          <TextField
                            variant="outlined"
                            required
                            error={!!errors.email}
                            fullWidth
                            id="email"
                            placeholder="exemple@exemple.com"
                            name="email"
                            size="small"
                            type="email"
                            autoComplete="email"
                            value={values.email}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            helperText={
                              errors.email && touched.email && errors.email
                            }
                          />
                        </Grid>

                        <Box ml={1} mt={1}>
                          <InputLabel shrink>Password</InputLabel>
                        </Box>
                        <Grid item xs={12}>
                          <TextField
                            variant="outlined"
                            required
                            error={!!errors.password}
                            fullWidth
                            id="password"
                            placeholder="password"
                            name="password"
                            type="password"
                            autoComplete="current-password"
                            size="small"
                            value={values.password}
                            onChange={handleChange}
                            // onBlur={handleBlur}
                            helperText={
                              errors.password &&
                              touched.password &&
                              errors.password
                            }
                          />
                        </Grid>
                      </Grid>
                      <Box mt={2} mr={3}>
                        <div className="text-right">
                          <Button
                            type="submit"
                            variant="contained"
                            className="Button-signin"
                          >
                            Sign in
                          </Button>
                        </div>
                      </Box>
                    </form>
                  </div>
                </Container>
              );
            }}
          </Formik>
        </div>
      </content>
    </div>
  );
}
const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errorsConnection,
});
export default connect(mapStateToProps, { loginUser })(withRouter(Signin));
