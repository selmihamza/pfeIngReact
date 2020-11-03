import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { Grid, InputLabel, Box } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";

import { Alert } from "@material-ui/lab";
import IconButton from "@material-ui/core/IconButton";
import Collapse from "@material-ui/core/Collapse";
import CloseIcon from "@material-ui/icons/Close";
import $ from "jquery";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";

import { Formik } from "formik";
import * as Yup from "yup";

import { countries, countryToFlag } from "./util";
import {
  registerUser,
  getOffices,
} from "../../../../store/actions/authActions/authActions";
import Header from "../../components/header/Header";
import "./Signup.css";

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
const useStyles = makeStyles((theme) => ({
  margin: {
    textAlign: "left",
  },
  option: {
    fontSize: 15,
    "& > span": {
      marginRight: 10,
      fontSize: 18,
    },
  },
}));

function Signup(props) {
  const classes = useStyles();
  const [openError, setOpenError] = useState(false);
  const [address, setAddress] = useState({
    homeAddress: "",
    homeLatitude: "",
    homeLongitude: "",
  });
  let dataTemp = props.officesData;

  const [listOffices, setListOffices] = useState([]);
  //-----start---------------- jquery autocomplete address-------------
  var searchInput = "homeAddress";
  const google = window.google;
  $(document).ready(function () {
    var autocomplete;
    autocomplete = new google.maps.places.Autocomplete(
      document.getElementById(searchInput),
      {
        types: ["geocode"],
      }
    );
    google.maps.event.addListener(autocomplete, "place_changed", function () {
      var near_place = autocomplete.getPlace();
      setAddress({
        homeAddress: near_place.formatted_address,
        homeLatitude: near_place.geometry.location.lat(),
        homeLongitude: near_place.geometry.location.lng(),
      });
    });
  });
  //-----End---------------- jquery autocomplete address-------------

  const handleChangeAddress = (e) => {
    setAddress({ [e.target.name]: e.target.value });
  };
  let paramSaas = props.match.params.saas_company;

  const handleSubmit = async (values) => {
    let officeID = dataTemp.filter((item) => item.Name === values.office);

    const user = {
      firstName: values.firstName,
      lastName: values.lastName,
      email: values.email,
      number: values.number,
      password: values.password,
      confirmPassword: values.confirmPassword,
      homeAddress: address.homeAddress,
      homeLatitude: address.homeLatitude,
      homeLongitude: address.homeLongitude,
      licenceNumber: values.licenceNumber,
      country: values.country,
      office: officeID[0].ID,
      SaasCompanyID: officeID[0].SaasCompanyID,
    };

    props.registerUser(user, props.history);
  };
  useEffect(() => {
    props.getOffices(paramSaas);
  }, []);
  useEffect(() => {
    setListOffices(dataTemp);
  }, [dataTemp]);

  const error = props.errorsConnection;
  useEffect(() => {
    setOpenError(true);
    const timer = setTimeout(() => {
      setOpenError(false);
    }, 5000);
    return () => clearTimeout(timer);
  }, [error]);

  return (
    <div className="wrapper">
      <Header title={title} contentHeader={contentHeader} />
      <content>
        <div className="container">
          <div className="tabs-nav">
            <Link className="tabs-nav-item" to="/signin">
              <span className="tab-nav-description">Already a driver</span>
              <span className="tab-nav-title">SIGN IN</span>
            </Link>
            <Link className="tabs-nav-item active" to="/signup">
              <span className="tab-nav-description">Not Registred</span>
              <span className="tab-nav-title">SIGN UP</span>
            </Link>
          </div>
          <Formik
            initialValues={{
              firstName: "",
              lastName: "",
              email: "",
              number: "",
              password: "",
              confirmPassword: "",
              homeAddress: "",
              homeLatitude: "",
              homeLongitude: "",
              licenceNumber: "",
              country: "",
              office: "",
            }}
            onSubmit={handleSubmit}
            validationSchema={Yup.object().shape({
              firstName: Yup.string().required("required"),
              lastName: Yup.string().required("required"),
              email: Yup.string()
                .email("Invalid email : must be exemple@exemple.xx")
                .required("required"),
              number: Yup.number().required("required"),
              homeAddress: Yup.string().required("required"),
              licenceNumber: Yup.string().required("required"),
              country: Yup.string().required("required"),
              office: Yup.string().required("required"),
              password: Yup.string().required("required"),
              confirmPassword: Yup.string()
                .required("required")
                .oneOf(
                  [Yup.ref("password"), null],
                  "Password must be the same!"
                ),
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
                <form
                  className="form-signup"
                  onSubmit={handleSubmit}
                  noValidate
                >
                  {error.errorSignup && (
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
                        {error.errorSignup}
                      </Alert>
                    </Collapse>
                  )}
                  <div className="sign-up">
                    <Grid container spacing={2}>
                      <Box ml={1} mt={1} mb={-1}>
                        <InputLabel shrink>First name</InputLabel>
                      </Box>
                      <Grid item xs={12}>
                        <TextField
                          autoComplete="firstName"
                          name="firstName"
                          variant="outlined"
                          required
                          size="small"
                          placeholder="first name"
                          fullWidth
                          error={!!errors.firstName}
                          id="firstName"
                          value={values.firstName}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          helperText={
                            errors.firstName &&
                            touched.firstName &&
                            errors.firstName
                          }
                        />
                      </Grid>
                      <Box ml={1} mb={-1}>
                        <InputLabel shrink>Number</InputLabel>
                      </Box>
                      <Grid item xs={12}>
                        <TextField
                          autoComplete="number"
                          name="number"
                          variant="outlined"
                          required
                          size="small"
                          placeholder="number"
                          fullWidth
                          error={!!errors.number}
                          id="number"
                          value={values.number}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          helperText={
                            errors.number && touched.number && errors.number
                          }
                        />
                      </Grid>
                      <Box ml={1} mb={-1}>
                        <InputLabel shrink>Password</InputLabel>
                      </Box>
                      <Grid item xs={12}>
                        <TextField
                          autoComplete="password"
                          name="password"
                          variant="outlined"
                          required
                          size="small"
                          placeholder="password"
                          fullWidth
                          error={!!errors.password}
                          id="password"
                          type="password"
                          value={values.password}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          helperText={
                            errors.password &&
                            touched.password &&
                            errors.password
                          }
                        />
                      </Grid>
                      <Box ml={1} mb={-1}>
                        <InputLabel shrink>Home address</InputLabel>
                      </Box>
                      <Grid item xs={12}>
                        <TextField
                          name="homeAddress"
                          id="homeAddress"
                          variant="outlined"
                          required
                          size="small"
                          placeholder="home address"
                          fullWidth
                          error={!!errors.homeAddress}
                          value={address.homeAddress}
                          onChange={(e) => handleChangeAddress(e)}
                          onSelect={handleChange}
                          onBlur={handleBlur}
                          helperText={
                            errors.homeAddress &&
                            touched.homeAddress &&
                            errors.homeAddress
                          }
                        />
                      </Grid>
                      <Box ml={1} mb={-1}>
                        <InputLabel shrink>Licence driver number</InputLabel>
                      </Box>
                      <Grid item xs={12}>
                        <TextField
                          autoComplete="licenceNumber"
                          name="licenceNumber"
                          variant="outlined"
                          required
                          size="small"
                          placeholder="Licence driver number"
                          fullWidth
                          error={!!errors.licenceNumber}
                          id="licenceNumber"
                          value={values.licenceNumber}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          helperText={
                            errors.licenceNumber &&
                            touched.licenceNumber &&
                            errors.licenceNumber
                          }
                        />
                      </Grid>
                    </Grid>
                    <Grid container spacing={2}>
                      <Box ml={1} mt={1} mb={-1}>
                        <InputLabel shrink>Last name</InputLabel>
                      </Box>
                      <Grid item xs={12}>
                        <TextField
                          autoComplete="lastName"
                          name="lastName"
                          variant="outlined"
                          required
                          size="small"
                          placeholder="last name"
                          fullWidth
                          error={!!errors.lastName}
                          id="lastName"
                          value={values.lastName}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          helperText={
                            errors.lastName &&
                            touched.lastName &&
                            errors.lastName
                          }
                        />
                      </Grid>
                      <Box ml={1} mb={-1}>
                        <InputLabel shrink>E-mail</InputLabel>
                      </Box>
                      <Grid item xs={12}>
                        <TextField
                          autoComplete="email"
                          name="email"
                          variant="outlined"
                          required
                          size="small"
                          placeholder="example@example.com"
                          fullWidth
                          error={!!errors.email}
                          type="email"
                          id="email"
                          value={values.email}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          helperText={
                            errors.email && touched.email && errors.email
                          }
                        />
                      </Grid>
                      <Box ml={1} mb={-1}>
                        <InputLabel shrink>Confirm password</InputLabel>
                      </Box>
                      <Grid item xs={12}>
                        <TextField
                          autoComplete="confirmPassword"
                          name="confirmPassword"
                          variant="outlined"
                          required
                          size="small"
                          placeholder="confirm password"
                          fullWidth
                          error={!!errors.email}
                          type="password"
                          id="confirmPassword"
                          value={values.confirmPassword}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          helperText={
                            errors.confirmPassword &&
                            touched.confirmPassword &&
                            errors.confirmPassword
                          }
                        />
                      </Grid>
                      <Box ml={1} mb={-1}>
                        <InputLabel shrink>Country</InputLabel>
                      </Box>
                      <Grid item xs={12}>
                        <Autocomplete
                          id="country-select"
                          options={countries}
                          classes={{
                            option: classes.option,
                          }}
                          autoHighlight
                          getOptionLabel={(option) => option.label}
                          renderOption={(option) => (
                            <React.Fragment>
                              <span>{countryToFlag(option.code)}</span>
                              {option.label} ({option.code})
                            </React.Fragment>
                          )}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              name="country"
                              size="small"
                              variant="outlined"
                              value={values.country}
                              onSelect={handleChange}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              helperText={
                                errors.country &&
                                touched.country &&
                                errors.country
                              }
                            />
                          )}
                        />
                      </Grid>
                      <Box ml={1} mb={-1}>
                        <InputLabel shrink>Select your office</InputLabel>
                      </Box>
                      <Grid item xs={12} className={classes.margin}>
                        <Autocomplete
                          id="office-select"
                          options={listOffices}
                          classes={{
                            option: classes.option,
                          }}
                          autoHighlight
                          getOptionLabel={(option) => option.Name}
                          renderOption={(option) => (
                            <React.Fragment>{option.Name}</React.Fragment>
                          )}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              name="office"
                              size="small"
                              variant="outlined"
                              value={values.office}
                              onChange={handleChange}
                              onSelect={handleChange}
                              onBlur={handleBlur}
                              helperText={
                                errors.office && touched.office && errors.office
                              }
                            />
                          )}
                        />
                      </Grid>
                    </Grid>
                  </div>
                  <Box mt={2} mr={1}>
                    <div className="text-right">
                      <Button
                        type="submit"
                        variant="contained"
                        className="Button-signin"
                      >
                        Register
                      </Button>
                    </div>
                  </Box>
                </form>
              );
            }}
          </Formik>
        </div>
      </content>
    </div>
  );
}
const mapStateToProps = (state) => ({
  errorsConnection: state.errorsConnection,
  user: state.auth,
  officesData: state.auth.listOffices,
});
export default connect(mapStateToProps, { registerUser, getOffices })(
  withRouter(Signup)
);
