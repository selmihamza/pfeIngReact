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
  FormControl,
  Select,
  MenuItem,
} from "@material-ui/core";
import PlayForWorkRoundedIcon from "@material-ui/icons/PlayForWorkRounded";
import AttachFileRoundedIcon from "@material-ui/icons/AttachFileRounded";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { Formik } from "formik";
import { TwitterPicker } from "react-color";
import reactCSS from "reactcss";
import { listYear } from "./util";
import Header from "../../components/header/Header";
import NavSide from "../../components/navSide/NavSide";
import { getCompanyIDOfficeID } from "../../../../store/actions/authActions/authActions";
import {
  getVehicleCategories,
  getVehicleTypes,
  getVehicleOptions,
  createVehicle,
} from "../../../../store/actions/vehicleActions/vehicleActions";

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
    marginTop: theme.spacing(2),
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

function CreateVehicle(props) {
  const [assurFile, setAssurFile] = useState({ file: null, upload: false });
  const [cgvFile, setCgvFile] = useState({ file: null, upload: false });
  const [atrFile, setAtrFile] = useState({ file: null, upload: false });
  const [location, setLocation] = useState("");
  const [color, setColor] = useState("#5899F1");
  const [displayColorPicker, setDisplayColorPicker] = useState(false);
  const [primaryVehicle, setPrimaryVehicle] = useState([]);
  const [secondaryVehicle, setSecondaryVehicle] = useState([]);
  const [optionsVehicle, setOptionsVehicle] = useState([]);
  const [listCategories, setListCategories] = useState([]);
  const [listPrimary, setListPrimary] = useState([]);
  const [listSecondary, setListSecondary] = useState([]);
  const [listTypesTemp, setListTypesTemp] = useState([]);
  const [listOptions, setListOptions] = useState([]);

  const [listTypesPrimary, setListTypesPrimary] = useState([]);
  const [listTypesSecondary, setListTypesSecondary] = useState([]);

  const classes = useStyles();

  const handleChangePrimaryVehicle = (event, values, reason) => {
    setPrimaryVehicle([values]);

    setListTypesPrimary(values);
    setListPrimary(
      listTypesTemp.filter((item, index) => {
        return (
          !values.find((e) => e.ID === item.ID) &&
          !listTypesSecondary.find((e) => e.ID === item.ID)
        );
      })
    );
    setListSecondary(
      listTypesTemp.filter((item, index) => {
        return (
          !values.find((e) => e.ID === item.ID) &&
          !listTypesSecondary.find((e) => e.ID === item.ID)
        );
      })
    );
  };

  const handleChangeSecondaryVehicle = (event, values, reason) => {
    setSecondaryVehicle([values]);
    setListTypesSecondary(values);

    setListPrimary(
      listTypesTemp.filter((item, index) => {
        return (
          !values.find((e) => e.ID === item.ID) &&
          !listTypesPrimary.find((e) => e.ID === item.ID)
        );
      })
    );
    setListSecondary(
      listTypesTemp.filter((item, index) => {
        return (
          !values.find((e) => e.ID === item.ID) &&
          !listTypesPrimary.find((e) => e.ID === item.ID)
        );
      })
    );
  };

  const handleChangeOptionsVehicle = (event, values) => {
    setOptionsVehicle([values]);
  };
  const handleRadioChange = (event) => {
    setLocation(event.target.value);
  };
  const handleAssurFile = (e) => {
    setAssurFile({ file: e.target.files[0], upload: true });
  };
  const handleCgvFile = (e) => {
    setCgvFile({ file: e.target.files[0], upload: true });
  };
  const handleAtrFile = (e) => {
    setAtrFile({ file: e.target.files[0], upload: true });
  };
  const handleChangeComplete = (color) => {
    setColor(color.hex);
  };
  const handleClick = () => {
    setDisplayColorPicker(!displayColorPicker);
  };
  const handleClose = () => {
    setDisplayColorPicker(false);
  };
  const { user } = props.auth;
  useEffect(() => {
    if (user.id != null) {
      props.getCompanyIDOfficeID(user.id);
    }
  }, [user]);

  const { companyOffice } = props.auth;
  useEffect(() => {
    if (companyOffice.SaasOfficeID != null) {
      props.getVehicleCategories(companyOffice.SaasOfficeID);
      props.getVehicleTypes(companyOffice.SaasOfficeID);
      props.getVehicleOptions(companyOffice.SaasOfficeID);
    }
  }, [companyOffice]);
  const { vehicleCategories } = props.vehicle;
  useEffect(() => {
    if (vehicleCategories != null) {
      setListCategories(vehicleCategories);
    }
  }, [vehicleCategories]);
  const { vehicleTypes } = props.vehicle;
  useEffect(() => {
    if (vehicleTypes != null) {
      // setListTypes(vehicleTypes);
      setListTypesTemp(vehicleTypes.filter(() => true));
      setListPrimary(vehicleTypes);
      setListSecondary(vehicleTypes);
    }
  }, [vehicleTypes]);
  const { vehicleOptions } = props.vehicle;
  useEffect(() => {
    if (vehicleOptions != null) {
      setListOptions(vehicleOptions);
    }
  }, [vehicleOptions]);
  const handleSubmit = (values) => {
    let vehicle = new FormData();
    let categorySelected = listCategories.filter(
      (item) => item.Name === values.VehicleCategory
    );

    vehicle.append("assur", assurFile.file);
    vehicle.append("cgv", cgvFile.file);
    vehicle.append("atr", atrFile.file);
    vehicle.append("Color", color);
    vehicle.append("Matricule", values.Matricule);
    vehicle.append("Year", values.Year);
    vehicle.append("Model", values.Model);
    vehicle.append("Mark", values.Mark);
    vehicle.append("Location", location);
    vehicle.append("CarInUse", values.carInUse);
    vehicle.append("VehicleCategoryID", categorySelected[0].ID);
    vehicle.append("DriverID", user.id);
    vehicle.append("DriverCompanyID", props.companyID);
    vehicle.append("SaasOfficeID", companyOffice.SaasOfficeID);
    vehicle.append("VehicleTypesPrimary", JSON.stringify(primaryVehicle[0]));
    vehicle.append(
      "VehicleTypesSecondary",
      JSON.stringify(secondaryVehicle[0])
    );
    vehicle.append("VehicleOptions", JSON.stringify(optionsVehicle[0]));

    props.createVehicle(vehicle, props.history);
  };
  const styles = reactCSS({
    default: {
      color: {
        width: "160px",
        height: "30px",
        borderRadius: "2px",
        background: color,
      },
      swatch: {
        padding: "5px",
        background: "#fff",
        borderRadius: "1px",
        boxShadow: "0 0 0 1px rgba(0,0,0,.1)",
        display: "inline-block",
        cursor: "pointer",
      },
      popover: {
        position: "absolute",
        zIndex: "2",
      },
      cover: {
        position: "fixed",
        top: "0px",
        right: "0px",
        bottom: "0px",
        left: "0px",
      },
    },
  });
  return (
    <div className="wrapper-left">
      <Header title={title} contentHeader={contentHeader} />
      <content>
        <div className="container">
          <div className={classes.root}>
            <Grid container spacing={5}>
              <Grid item xs={4} container direction="column">
                <NavSide active="vehicule" />
              </Grid>
              <Grid item xs={8}>
                <Formik
                  initialValues={{
                    Mark: "",
                    Model: "",
                    Matricule: "",
                    Year: "",
                    // Color: "#fff",
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
                          <Grid item xs={5}>
                            <Box mt={1}>
                              <InputLabel shrink>Marque</InputLabel>
                            </Box>
                            <Grid>
                              <TextField
                                autoComplete="Mark"
                                name="Mark"
                                variant="outlined"
                                required
                                size="small"
                                placeholder="Marque"
                                fullWidth
                                error={!!errors.Mark}
                                id="Mark"
                                value={values.Mark}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                helperText={
                                  errors.Mark && touched.Mark && errors.Mark
                                }
                              />
                            </Grid>
                          </Grid>
                          <Grid item xs={5}>
                            <Box mt={1}>
                              <InputLabel shrink>Modèle</InputLabel>
                            </Box>
                            <Grid>
                              <TextField
                                autoComplete="Model"
                                name="Model"
                                variant="outlined"
                                required
                                size="small"
                                placeholder="Modèle"
                                fullWidth
                                error={!!errors.Model}
                                id="Model"
                                value={values.Model}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                helperText={
                                  errors.Model && touched.Model && errors.Model
                                }
                              />
                            </Grid>
                          </Grid>
                        </Grid>
                        <Grid item container spacing={2} xs={12}>
                          <Grid item xs={4}>
                            <InputLabel shrink>Matricule</InputLabel>
                            <Grid>
                              <TextField
                                autoComplete="Matricule"
                                name="Matricule"
                                variant="outlined"
                                required
                                size="small"
                                placeholder="Matricule"
                                fullWidth
                                error={!!errors.Matricule}
                                id="Matricule"
                                value={values.Matricule}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                helperText={
                                  errors.Matricule &&
                                  touched.Matricule &&
                                  errors.Matricule
                                }
                              />
                            </Grid>
                          </Grid>
                          <Grid item xs={3}>
                            <InputLabel shrink>Year</InputLabel>
                            <Grid>
                              <FormControl
                                variant="outlined"
                                className={classes.formControl}
                                size="small"
                              >
                                <Select
                                  labelId="year-label"
                                  id="year"
                                  name="Year"
                                  value={values.Year}
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                >
                                  <MenuItem value="">
                                    <em>None</em>
                                  </MenuItem>
                                  {listYear.map((item, index) => (
                                    <MenuItem key={index} value={item.label}>
                                      {item.label}
                                    </MenuItem>
                                  ))}
                                </Select>
                              </FormControl>
                            </Grid>
                          </Grid>
                          <Grid item xs={3}>
                            <InputLabel shrink>Color</InputLabel>
                            <Grid>
                              <div>
                                <div
                                  style={styles.swatch}
                                  onClick={handleClick}
                                >
                                  <div style={styles.color} />
                                </div>
                                {displayColorPicker ? (
                                  <div style={styles.popover}>
                                    <div
                                      style={styles.cover}
                                      onClick={handleClose}
                                    />
                                    <TwitterPicker
                                      triangle="hide"
                                      color={color}
                                      onChangeComplete={handleChangeComplete}
                                    />
                                  </div>
                                ) : null}
                              </div>
                            </Grid>
                          </Grid>
                        </Grid>
                        <Grid item container spacing={2} xs={12}>
                          <Grid item xs={4}>
                            <RadioGroup
                              row
                              aria-label="location"
                              name="location"
                              value={location}
                              onChange={handleRadioChange}
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
                            <InputLabel shrink>Vehicle category</InputLabel>
                            <Autocomplete
                              id="Vehicle-category"
                              options={listCategories}
                              size="small"
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
                                  name="VehicleCategory"
                                  size="small"
                                  variant="outlined"
                                  value={values.VehicleCategory}
                                  onSelect={handleChange}
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  helperText={
                                    errors.VehicleCategory &&
                                    touched.VehicleCategory &&
                                    errors.VehicleCategory
                                  }
                                />
                              )}
                            />
                          </Grid>
                        </Grid>
                        <Grid item container spacing={2} xs={12}>
                          <Grid item xs={6}>
                            <InputLabel shrink>Primary vehicle</InputLabel>
                            <Autocomplete
                              multiple
                              id="primary-vehicle"
                              size="small"
                              options={listPrimary}
                              classes={{
                                option: classes.option,
                              }}
                              autoHighlight
                              getOptionLabel={(option) => option.Designation}
                              renderOption={(option) => (
                                <React.Fragment>
                                  {option.Designation}
                                </React.Fragment>
                              )}
                              onChange={handleChangePrimaryVehicle}
                              // onSelect={handleChangePrimaryVehicle}

                              renderInput={(params) => (
                                <TextField
                                  {...params}
                                  name="PrimaryVehicle"
                                  size="small"
                                  variant="outlined"
                                  value={primaryVehicle}
                                  // onSelect={(e) =>
                                  //   handleChangePrimaryVehicle(e)
                                  // }
                                  onBlur={handleBlur}
                                  helperText={
                                    errors.PrimaryVehicle &&
                                    touched.PrimaryVehicle &&
                                    errors.PrimaryVehicle
                                  }
                                />
                              )}
                            />
                          </Grid>
                          <Grid item xs={6}>
                            <InputLabel shrink>Secondary vehicle</InputLabel>
                            <Autocomplete
                              multiple
                              id="secondary-vehicle"
                              size="small"
                              options={listSecondary}
                              classes={{
                                option: classes.option,
                              }}
                              autoHighlight
                              getOptionLabel={(option) => option.Designation}
                              renderOption={(option) => (
                                <React.Fragment>
                                  {option.Designation}
                                </React.Fragment>
                              )}
                              onChange={handleChangeSecondaryVehicle}
                              // onSelect={handleChangeSecondaryVehicle}
                              renderInput={(params) => (
                                <TextField
                                  {...params}
                                  name="SecondaryVehicle"
                                  size="small"
                                  variant="outlined"
                                  value={secondaryVehicle}
                                  // onSelect={handleChange}
                                  onBlur={handleBlur}
                                  helperText={
                                    errors.SecondaryVehicle &&
                                    touched.SecondaryVehicle &&
                                    errors.SecondaryVehicle
                                  }
                                />
                              )}
                            />
                          </Grid>
                        </Grid>
                        <Grid item container spacing={2} xs={12}>
                          <Grid item xs={6}>
                            <InputLabel shrink>Options</InputLabel>
                            <Autocomplete
                              multiple
                              id="options"
                              size="small"
                              options={listOptions}
                              classes={{
                                option: classes.option,
                              }}
                              autoHighlight
                              getOptionLabel={(option) => option.Name}
                              renderOption={(option) => (
                                <React.Fragment>{option.Name}</React.Fragment>
                              )}
                              onChange={handleChangeOptionsVehicle}
                              renderInput={(params) => (
                                <TextField
                                  {...params}
                                  name="Options"
                                  size="small"
                                  variant="outlined"
                                  value={optionsVehicle}
                                  // onSelect={handleChange}
                                  onBlur={handleBlur}
                                  helperText={
                                    errors.Options &&
                                    touched.Options &&
                                    errors.Options
                                  }
                                />
                              )}
                            />
                          </Grid>
                          <Grid item xs={6}>
                            <Box mt={2}>
                              <FormControlLabel
                                control={
                                  <Checkbox
                                    // checked={state.checkedB}
                                    onChange={handleChange}
                                    name="carInUse"
                                    color="primary"
                                  />
                                }
                                label="Car in use"
                              />
                            </Box>
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
                                ID card of the vehicle
                              </InputLabel>
                            </Grid>
                            <Grid item xs={12}>
                              <input
                                accept=".pdf,image/*"
                                className={classes.inputfile}
                                id="assur-vehicle"
                                type="file"
                                onChange={(e) => handleAssurFile(e)}
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
                                Green vehicle insurance card
                              </InputLabel>
                            </Grid>
                            <Grid item xs={12}>
                              <input
                                accept=".pdf,image/*"
                                className={classes.inputfile}
                                id="cgv-vehicle"
                                type="file"
                                onChange={(e) => handleCgvFile(e)}
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
                                Vehicle picture
                              </InputLabel>
                            </Grid>
                            <Grid item xs={12}>
                              <input
                                accept="image/*"
                                className={classes.inputfile}
                                id="atr-vehicle"
                                type="file"
                                onChange={(e) => handleAtrFile(e)}
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
});
export default connect(mapStateToProps, {
  getCompanyIDOfficeID,
  getVehicleCategories,
  getVehicleTypes,
  getVehicleOptions,
  createVehicle,
})(withRouter(CreateVehicle));
