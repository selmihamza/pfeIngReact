import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { Grid, InputLabel, Box } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import { RadioGroup, FormControlLabel, Radio } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import IconButton from "@material-ui/core/IconButton";
import Collapse from "@material-ui/core/Collapse";
import CloseIcon from "@material-ui/icons/Close";
import PlayForWorkRoundedIcon from "@material-ui/icons/PlayForWorkRounded";
import AttachFileRoundedIcon from "@material-ui/icons/AttachFileRounded";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import { Formik } from "formik";
import * as Yup from "yup";

import "./company.css";
import Header from "../../components/header/Header";
import NavSide from "../../components/navSide/NavSide";
import { addCompany } from "../../../../store/actions/companyActions/companyActions";

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
    marginTop: theme.spacing(2),
    // },
  },
  inputfile: {
    display: "none",
  },
  alert: {
    marginBottom: theme.spacing(1),
  },
}));
function CreateCompany(props) {
  const [inseeFile, setInseeFile] = useState({ file: null, upload: false });
  const [ribFile, setRibFile] = useState({ file: null, upload: false });
  const [dreFile, setDreFile] = useState({ file: null, upload: false });
  const [vatRateValue, setvatRateValue] = useState(0);
  const [open, setOpen] = useState(true);
  const [openError, setOpenError] = useState(false);
  const classes = useStyles();
  const handleRadioChange = (event) => {
    setvatRateValue(event.target.value);
  };
  const handleInseeFile = (e) => {
    setInseeFile({ file: e.target.files[0], upload: true });
  };
  const handleRibFile = (e) => {
    setRibFile({ file: e.target.files[0], upload: true });
  };
  const handleDreFile = (e) => {
    setDreFile({ file: e.target.files[0], upload: true });
  };
  useEffect(() => {
    setOpenError(true);
    const timer = setTimeout(() => {
      setOpenError(false);
    }, 5000);
    return () => clearTimeout(timer);
  }, [props.erreur]);

  const { user } = props.auth;

  const handleSubmit = (values) => {
    let company = new FormData();

    company.append("test", "tesr");
    // company.append("DriverID", 11469);
    company.append("DriverID", user.id);
    company.append("CompanyName", values.CompanyName);
    company.append("Registration", values.Registration);
    company.append("PcoNumber", values.PcoNumber);
    company.append("VatRate", vatRateValue);
    company.append("VatNumber", values.VatNumber);
    company.append("INSEE", inseeFile.file);
    company.append("RIB", ribFile.file);
    company.append("DRE", dreFile.file);

    props.addCompany(company, props.history);
  };
  return (
    <div className="wrapper-left">
      <Header title={title} contentHeader={contentHeader} />
      <content>
        <div className="container">
          <div className={classes.root}>
            <Grid container spacing={5}>
              <Grid item xs={4} container direction="column">
                <NavSide active="company" />
              </Grid>
              <Grid item xs={8}>
                {props.erreur && (
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
                      {props.erreur}
                    </Alert>
                  </Collapse>
                )}
                <Collapse in={open}>
                  <Alert
                    severity="info"
                    action={
                      <IconButton
                        aria-label="close"
                        color="inherit"
                        size="small"
                        onClick={() => {
                          setOpen(false);
                        }}
                      >
                        <CloseIcon fontSize="inherit" />
                      </IconButton>
                    }
                  >
                    Lorem ipsum dolor sit amet, adipiscing elit, sed do eiusmod
                    tempor insididunt (<span className="red-star">*</span>) ut
                    labore
                  </Alert>
                </Collapse>

                <Formik
                  initialValues={{
                    CompanyName: "",
                    Registration: "",
                    PcoNumber: "",
                    VatRate: "",
                    VatNumber: "",
                  }}
                  onSubmit={handleSubmit}
                  validationSchema={Yup.object().shape({
                    CompanyName: Yup.string().required("required"),
                    Registration: Yup.string().required("required"),
                    PcoNumber: Yup.string().required("required"),
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
                      <form onSubmit={handleSubmit} noValidate>
                        <Grid container spacing={2}>
                          <Grid item xs={6}>
                            <Box mt={1}>
                              <InputLabel shrink>
                                Company name <span className="red-star">*</span>
                              </InputLabel>
                            </Box>
                            <Grid>
                              <TextField
                                autoComplete="CompanyName"
                                name="CompanyName"
                                variant="outlined"
                                required
                                size="small"
                                placeholder="Company name"
                                fullWidth
                                error={!!errors.CompanyName}
                                id="CompanyName"
                                value={values.CompanyName}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                helperText={
                                  errors.CompanyName &&
                                  touched.CompanyName &&
                                  errors.CompanyName
                                }
                              />
                            </Grid>
                          </Grid>
                          <Grid item xs={6}>
                            <Box mt={1}>
                              <InputLabel shrink>
                                Company ID <span className="red-star">*</span>
                              </InputLabel>
                            </Box>
                            <Grid>
                              <TextField
                                autoComplete="Registration"
                                name="Registration"
                                variant="outlined"
                                required
                                size="small"
                                placeholder="Registration"
                                fullWidth
                                error={!!errors.Registration}
                                id="Registration"
                                value={values.Registration}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                helperText={
                                  errors.Registration &&
                                  touched.Registration &&
                                  errors.Registration
                                }
                              />
                            </Grid>
                          </Grid>
                          <Grid item xs={12}>
                            <InputLabel shrink>
                              Licence number <span className="red-star">*</span>
                            </InputLabel>
                            <Grid>
                              <TextField
                                autoComplete="PcoNumber"
                                name="PcoNumber"
                                variant="outlined"
                                required
                                size="small"
                                placeholder="Licence Number"
                                fullWidth
                                error={!!errors.PcoNumber}
                                id="PcoNumber"
                                value={values.PcoNumber}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                helperText={
                                  errors.PcoNumber &&
                                  touched.PcoNumber &&
                                  errors.PcoNumber
                                }
                              />
                            </Grid>
                          </Grid>
                          <Grid item xs={12}>
                            <InputLabel shrink>TVA number (10,0%)</InputLabel>
                            <Grid>
                              <RadioGroup
                                row
                                aria-label="position"
                                name="VatRate"
                                value={vatRateValue}
                                onChange={handleRadioChange}
                              >
                                <FormControlLabel
                                  value="10"
                                  control={<Radio color="primary" />}
                                  label="Oui"
                                />
                                <FormControlLabel
                                  value="0"
                                  control={<Radio color="primary" />}
                                  label="Non"
                                />
                              </RadioGroup>
                              <TextField
                                autoComplete="VatNumber"
                                name="VatNumber"
                                variant="outlined"
                                required
                                size="small"
                                placeholder="TVA number"
                                fullWidth
                                error={!!errors.VatNumber}
                                id="VatNumber"
                                value={values.VatNumber}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                helperText={
                                  errors.VatNumber &&
                                  touched.VatNumber &&
                                  errors.VatNumber
                                }
                              />
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
                                company kbis / INSEE
                              </InputLabel>
                            </Grid>
                            <Grid item xs={12}>
                              <input
                                accept=".pdf,image/*"
                                className={classes.inputfile}
                                id="Company-kbis"
                                type="file"
                                onChange={(e) => handleInseeFile(e)}
                              />
                              <label htmlFor="Company-kbis">
                                <Button
                                  variant="contained"
                                  component="span"
                                  className={
                                    inseeFile.upload
                                      ? "file-uploaded"
                                      : "btn-file"
                                  }
                                >
                                  {inseeFile.upload ? (
                                    ""
                                  ) : (
                                    <PlayForWorkRoundedIcon fontSize="large" />
                                  )}
                                  {inseeFile.upload
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
                                Rib
                              </InputLabel>
                            </Grid>
                            <Grid item xs={12}>
                              <input
                                accept=".pdf,image/*"
                                className={classes.inputfile}
                                id="company-rib"
                                type="file"
                                onChange={(e) => handleRibFile(e)}
                              />
                              <label htmlFor="company-rib">
                                <Button
                                  variant="contained"
                                  component="span"
                                  className={
                                    ribFile.upload
                                      ? "file-uploaded"
                                      : "btn-file"
                                  }
                                >
                                  {ribFile.upload ? (
                                    ""
                                  ) : (
                                    <PlayForWorkRoundedIcon fontSize="large" />
                                  )}
                                  {ribFile.upload
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
                              <InputLabel className="label-dre">
                                License or Certificate of Registration of
                                Transport Cars with Driver
                              </InputLabel>
                            </Grid>
                            <Grid item xs={12}>
                              <input
                                accept=".pdf,image/*"
                                className={classes.inputfile}
                                id="company-dre"
                                type="file"
                                onChange={(e) => handleDreFile(e)}
                              />
                              <label htmlFor="company-dre">
                                <Button
                                  variant="contained"
                                  component="span"
                                  className={
                                    dreFile.upload
                                      ? "file-uploaded"
                                      : "btn-file"
                                  }
                                >
                                  {dreFile.upload ? (
                                    ""
                                  ) : (
                                    <PlayForWorkRoundedIcon fontSize="large" />
                                  )}
                                  {dreFile.upload
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
  companyID: state.company.companyID,
  erreur: state.company.errorAddCompany,
});
export default connect(mapStateToProps, { addCompany })(
  withRouter(CreateCompany)
);
