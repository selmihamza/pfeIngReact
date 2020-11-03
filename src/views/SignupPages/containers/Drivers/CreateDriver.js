import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { Grid, InputLabel, Box } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import {
  RadioGroup,
  FormControlLabel,
  Checkbox,
  Radio,
} from "@material-ui/core";
import PlayForWorkRoundedIcon from "@material-ui/icons/PlayForWorkRounded";
import AttachFileRoundedIcon from "@material-ui/icons/AttachFileRounded";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { Formik } from "formik";
import $ from "jquery";
import { countries, countryToFlag } from "../Signup/util";
import Header from "../../components/header/Header";
import NavSide from "../../components/navSide/NavSide";
import {
  getCompanyIDOfficeID,
  getOffices,
} from "../../../../store/actions/authActions/authActions";

let title = "Setup your account and files";
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
  root: {
    flexGrow: 1,
  },
  rootfile: {
    // "& > *": {
    // marginTop: theme.spacing(2),
    // },
  },
  inputfile: {
    display: "none",
  },
  alert: {
    marginBottom: theme.spacing(1),
  },
  formControl: {
    minWidth: "100%",
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

function CreateDriver(props) {
  const [address, setAddress] = useState({
    homeAddress: "",
    homeLatitude: "",
    homeLongitude: "",
  });
  let dataTemp = props.officesData;

  const [listOffices, setListOffices] = useState([]);

  const [assurFile, setAssurFile] = useState({ file: null, upload: false });
  const [cgvFile, setCgvFile] = useState({ file: null, upload: false });
  const [atrFile, setAtrFile] = useState({ file: null, upload: false });
  const [location, setLocation] = useState("");

  const classes = useStyles();

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

  const { user } = props.auth;
  useEffect(() => {
    // if (user.id != null) {
    props.getCompanyIDOfficeID(11469);
    // }
    // }, [user]);
  }, []);
  useEffect(() => {
    props.getOffices("Marcel");
  }, []);
  useEffect(() => {
    setListOffices(dataTemp);
  }, [dataTemp]);
  const { companyOffice } = props.auth;

  const handleSubmit = (values) => {
    console.log("submit");
  };

  return (
    <div className="wrapper-left">
      <Header title={title} contentHeader={contentHeader} />
      <content>
        <div className="container">
          <div className={classes.root}>
            <Grid container spacing={5}>
              <Grid item xs={4} container direction="column">
                <NavSide active="driver" />
              </Grid>
              <Grid item xs={8}>
                <Formik
                  initialValues={{
                    Mark: "",
                    Model: "",
                    Matricule: "",
                    Year: "",
                    VehicleCategory: "",
                  }}
                  onSubmit={handleSubmit}
                  // validationSchema={Yup.object().shape({})}
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
                      <form onSubmit={handleSubmit} noValidate>
                        <Grid item container spacing={2} xs={12}>
                          <Grid item xs={4}>
                            <RadioGroup
                              row
                              aria-label="location"
                              name="location"
                              value={location}
                              // onChange={handleRadioChange}
                            >
                              <FormControlLabel
                                value="Location"
                                control={<Radio color="primary" />}
                                label="Location"
                              />
                              <FormControlLabel
                                value="Purchase"
                                control={<Radio color="primary" />}
                                label="Purchase"
                              />
                            </RadioGroup>
                          </Grid>
                        </Grid>
                        <Grid item container spacing={2} xs={12}>
                          <Grid item xs={6}>
                            <InputLabel shrink>First name</InputLabel>
                            <Grid>
                              <TextField
                                autoComplete="firstName"
                                name="firstName"
                                variant="outlined"
                                required
                                size="small"
                                placeholder="first Name"
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
                          </Grid>
                          <Grid item xs={6}>
                            <InputLabel shrink>Last name</InputLabel>
                            <Grid>
                              <TextField
                                autoComplete="lastName"
                                name="lastName"
                                variant="outlined"
                                required
                                size="small"
                                placeholder="last Name"
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
                          </Grid>
                        </Grid>
                        <Grid item container spacing={2} xs={12}>
                          <Grid item xs={6}>
                            <InputLabel shrink>Number</InputLabel>
                            <Grid>
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
                                  errors.number &&
                                  touched.number &&
                                  errors.number
                                }
                              />
                            </Grid>
                          </Grid>
                          <Grid item xs={6}>
                            <InputLabel shrink>E-mail</InputLabel>
                            <Grid>
                              <TextField
                                autoComplete="email"
                                name="email"
                                variant="outlined"
                                required
                                size="small"
                                placeholder="email"
                                fullWidth
                                error={!!errors.email}
                                id="email"
                                value={values.email}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                helperText={
                                  errors.email && touched.email && errors.email
                                }
                              />
                            </Grid>
                          </Grid>
                        </Grid>
                        <Grid item container spacing={2} xs={12}>
                          <Grid item xs={6}>
                            <InputLabel shrink>Password</InputLabel>
                            <Grid>
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
                          </Grid>
                          <Grid item xs={6}>
                            <InputLabel shrink>Confirm password</InputLabel>
                            <Grid>
                              <TextField
                                autoComplete="confirmPassword"
                                name="confirmPassword"
                                variant="outlined"
                                required
                                size="small"
                                placeholder="confirmPassword"
                                fullWidth
                                error={!!errors.confirmPassword}
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
                          </Grid>
                        </Grid>
                        <Grid item container spacing={2} xs={12}>
                          <Grid item xs={6}>
                            <InputLabel shrink>Home address</InputLabel>
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
                          <Grid item xs={6}>
                            <InputLabel shrink>Country</InputLabel>
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
                        </Grid>
                        <Grid item container spacing={2} xs={12}>
                          <Grid item xs={6}>
                            <InputLabel shrink>licence Number</InputLabel>
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
                          <Grid item xs={6}>
                            <InputLabel shrink>Country</InputLabel>
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
                                    errors.office &&
                                    touched.office &&
                                    errors.office
                                  }
                                />
                              )}
                            />
                          </Grid>
                        </Grid>
                        <Grid item container spacing={2} xs={12}>
                          <Grid
                            item
                            xs={4}
                            container
                            className={classes.rootfile}
                          >
                            <Grid item xs={1}>
                              <InputLabel>
                                <AttachFileRoundedIcon fontSize="small" />
                              </InputLabel>
                            </Grid>
                            <Grid item xs={11}>
                              <InputLabel className="label-file">
                                ID card
                              </InputLabel>
                            </Grid>
                            <Grid item xs={12}>
                              <input
                                accept=".pdf,image/*"
                                className={classes.inputfile}
                                id="assur-vehicle"
                                type="file"
                                // onChange={(e) => handleAssurFile(e)}
                              />
                              <label htmlFor="assur-vehicle">
                                <Button
                                  variant="contained"
                                  component="span"
                                  className={
                                    assurFile.upload
                                      ? "file-uploaded"
                                      : "btn-file"
                                  }
                                >
                                  {assurFile.upload ? (
                                    ""
                                  ) : (
                                    <PlayForWorkRoundedIcon fontSize="large" />
                                  )}
                                  {assurFile.upload
                                    ? "File uploaded"
                                    : "Upload File"}
                                </Button>
                              </label>
                            </Grid>
                          </Grid>
                          <Grid
                            item
                            xs={4}
                            container
                            className={classes.rootfile}
                          >
                            <Grid item xs={1}>
                              <InputLabel>
                                <AttachFileRoundedIcon fontSize="small" />
                              </InputLabel>
                            </Grid>
                            <Grid item xs={11}>
                              <InputLabel className="label-file">
                                Driver card
                              </InputLabel>
                            </Grid>
                            <Grid item xs={12}>
                              <input
                                accept=".pdf,image/*"
                                className={classes.inputfile}
                                id="cgv-vehicle"
                                type="file"
                                // onChange={(e) => handleCgvFile(e)}
                              />
                              <label htmlFor="cgv-vehicle">
                                <Button
                                  variant="contained"
                                  component="span"
                                  className={
                                    cgvFile.upload
                                      ? "file-uploaded"
                                      : "btn-file"
                                  }
                                >
                                  {cgvFile.upload ? (
                                    ""
                                  ) : (
                                    <PlayForWorkRoundedIcon fontSize="large" />
                                  )}
                                  {cgvFile.upload
                                    ? "File uploaded"
                                    : "Upload File"}
                                </Button>
                              </label>
                            </Grid>
                          </Grid>
                          <Grid
                            item
                            xs={4}
                            container
                            className={classes.rootfile}
                          >
                            <Grid item xs={1}>
                              <InputLabel>
                                <AttachFileRoundedIcon fontSize="small" />
                              </InputLabel>
                            </Grid>
                            <Grid item xs={11}>
                              <InputLabel className="label-file">
                                Driver picture
                              </InputLabel>
                            </Grid>
                            <Grid item xs={12}>
                              <input
                                accept="image/*"
                                className={classes.inputfile}
                                id="atr-vehicle"
                                type="file"
                                // onChange={(e) => handleAtrFile(e)}
                              />
                              <label htmlFor="atr-vehicle">
                                <Button
                                  variant="contained"
                                  component="span"
                                  className={
                                    atrFile.upload
                                      ? "file-uploaded"
                                      : "btn-file"
                                  }
                                >
                                  {atrFile.upload ? (
                                    ""
                                  ) : (
                                    <PlayForWorkRoundedIcon fontSize="large" />
                                  )}
                                  {atrFile.upload
                                    ? "File uploaded"
                                    : "Upload File"}
                                </Button>
                              </label>
                            </Grid>
                          </Grid>
                          <Grid
                            item
                            xs={4}
                            container
                            className={classes.rootfile}
                          >
                            <Grid item xs={1}>
                              <InputLabel>
                                <AttachFileRoundedIcon fontSize="small" />
                              </InputLabel>
                            </Grid>
                            <Grid item xs={11}>
                              <InputLabel className="label-file">
                                Professional card driver VTC
                              </InputLabel>
                            </Grid>
                            <Grid item xs={12}>
                              <input
                                accept="image/*"
                                className={classes.inputfile}
                                id="atr-vehicle"
                                type="file"
                                // onChange={(e) => handleAtrFile(e)}
                              />
                              <label htmlFor="atr-vehicle">
                                <Button
                                  variant="contained"
                                  component="span"
                                  className={
                                    atrFile.upload
                                      ? "file-uploaded"
                                      : "btn-file"
                                  }
                                >
                                  {atrFile.upload ? (
                                    ""
                                  ) : (
                                    <PlayForWorkRoundedIcon fontSize="large" />
                                  )}
                                  {atrFile.upload
                                    ? "File uploaded"
                                    : "Upload File"}
                                </Button>
                              </label>
                            </Grid>
                          </Grid>
                        </Grid>

                        <Box mt={2}>
                          <div className="text-right">
                            <Button type="submit" variant="contained">
                              Continue
                            </Button>
                          </div>
                        </Box>
                      </form>
                    );
                  }}
                </Formik>
              </Grid>
            </Grid>
          </div>
        </div>
      </content>
    </div>
  );
}
const mapStateToProps = (state) => ({
  auth: state.auth,
  vehicle: state.vehicle,
  companyID: state.company.companyID,
  officesData: state.auth.listOffices,
});
export default connect(mapStateToProps, {
  getCompanyIDOfficeID,
  getOffices,
})(withRouter(CreateDriver));
