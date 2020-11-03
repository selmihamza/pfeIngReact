import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import KeyboardArrowRightIcon from "@material-ui/icons/KeyboardArrowRight";
import { Grid, Typography, Box, Button } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { FaIdCardAlt, FaSchool, FaCar } from "react-icons/fa";
import Header from "../../components/header/Header";

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
  paperFinished: { backgroundColor: "#36CAB2" },
  avatar: {
    border: "1px solid gray",
    borderRadius: "50%",
    width: "40px",
    height: "40px",
    textAlign: "center",
    lineHeight: "40px",
    color: "gray",
  },
  root: {
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "center",
    "& > *": {
      margin: theme.spacing(2),
      padding: theme.spacing(1),
      paddingLeft: theme.spacing(2),
      width: theme.spacing(35),
      height: theme.spacing(20),
    },
  },
  lastPaper: {
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "center",
    "& > *": {
      backgroundColor: "#e0e0e0",
      margin: theme.spacing(2),
      padding: theme.spacing(2),
      width: theme.spacing(34),
    },
  },
  body1: {
    paddingLeft: theme.spacing(1),
    fontSize: "16px",
  },
  body2: {
    paddingLeft: theme.spacing(1),
    fontSize: "12px",
  },
  rightIcon: { marginTop: "auto", marginBottom: "auto" },
  pos: {
    marginTop: theme.spacing(7),
  },
  rightBottom: { textAlign: "right" },
  linkDecoration: { textDecoration: "none" },
}));
function Home(props) {
  const [token, setToken] = useState("");

  useEffect(() => {
    setToken(localStorage.getItem("jwtToken"));
  }, []);
  const classes = useStyles();
  return (
    <div className="wrapper-left">
      <Header title={title} contentHeader={contentHeader} />
      <content>
        <div className="container">
          <Grid container className={classes.root}>
            <Paper
              elevation={3}
              className={props.companyID && classes.paperFinished}
            >
              <Link
                to={token ? "/addcompany" : "/signin"}
                className={classes.linkDecoration}
              >
                <Grid container>
                  <Grid item xs={10}>
                    <Typography variant="h5" color="textSecondary">
                      Company
                    </Typography>
                  </Grid>
                  <Grid item xs={2}>
                    <div className={classes.avatar}>
                      <FaSchool />
                    </div>
                  </Grid>
                </Grid>

                <Typography className={classes.pos} color="textSecondary">
                  Setup your company profil
                </Typography>

                <Typography
                  className={classes.rightBottom}
                  color="textSecondary"
                >
                  <KeyboardArrowRightIcon fontSize="large" />
                </Typography>
              </Link>
            </Paper>

            <Paper
              elevation={3}
              className={props.vehicleID && classes.paperFinished}
            >
              <Link
                to={
                  token
                    ? props.companyID
                      ? "/addvehicle"
                      : "/addcompany"
                    : "/signin"
                }
                className={classes.linkDecoration}
              >
                <Grid container>
                  <Grid item xs={10}>
                    <Typography variant="h5" color="textSecondary">
                      Vehicles
                    </Typography>
                  </Grid>
                  <Grid item xs={2}>
                    <div className={classes.avatar}>
                      <FaCar />
                    </div>
                  </Grid>
                </Grid>

                <Typography className={classes.pos} color="textSecondary">
                  Setup your vehicle(s)
                </Typography>

                <Typography
                  className={classes.rightBottom}
                  color="textSecondary"
                >
                  <KeyboardArrowRightIcon fontSize="large" />
                </Typography>
              </Link>
            </Paper>
            <Paper elevation={3}>
              {/* <Link to={"/admin/dashboard"} className={classes.linkDecoration}> */}
              <Link to={"/adddriver"} className={classes.linkDecoration}>
                <Grid container>
                  <Grid item xs={10}>
                    <Typography variant="h5" color="textSecondary">
                      Drivers
                    </Typography>
                  </Grid>
                  <Grid item xs={2}>
                    <div className={classes.avatar}>
                      <FaIdCardAlt />
                    </div>
                  </Grid>
                </Grid>

                <Typography className={classes.pos} color="textSecondary">
                  Setup your Driver(s)
                </Typography>

                <Typography
                  className={classes.rightBottom}
                  color="textSecondary"
                >
                  <KeyboardArrowRightIcon fontSize="large" />
                </Typography>
              </Link>
            </Paper>
          </Grid>
          <div className={classes.lastPaper}>
            <Paper elevation={3}>
              <Grid container>
                <Grid item xs={11}>
                  <Typography
                    variant="body1"
                    className={classes.body1}
                    color="textSecondary"
                  >
                    skip check out the dashboard
                  </Typography>

                  <Typography
                    variant="body2"
                    className={classes.body2}
                    color="textSecondary"
                  >
                    you can not be put into circulation, whenyour account will
                    not be complete
                  </Typography>
                </Grid>

                <Grid item xs={1} className={classes.rightIcon}>
                  <Typography color="textSecondary">
                    <KeyboardArrowRightIcon fontSize="large" />
                  </Typography>
                </Grid>
              </Grid>
            </Paper>
          </div>
          <Box mt={-2} ml={-3}>
            <div className="text-right">
              <Link className="tabs-nav-item active" to="/admin">
                <Button
                  type="submit"
                  variant="contained"
                  className="Button-signin"
                >
                  Next
                </Button>
              </Link>
            </div>
          </Box>
        </div>
      </content>
    </div>
  );
}
const mapStateToProps = (state) => ({
  companyID: state.company.companyID,
  vehicleID: state.vehicle.vehicleID,
});
export default connect(mapStateToProps)(Home);
