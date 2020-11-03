import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import { Grid, Typography } from "@material-ui/core";
import KeyboardArrowLeftIcon from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@material-ui/icons/KeyboardArrowRight";
import { FaIdCardAlt, FaSchool, FaCar } from "react-icons/fa";

import "../../containers/Company/company.css";
const useStyles = makeStyles((theme) => ({
  avatar: {
    border: "1px solid gray",
    borderRadius: "50%",
    width: "35px",
    height: "35px",
    textAlign: "center",
    lineHeight: "35px",
    color: "gray",
  },
}));
export default function NavSide({ active }) {
  const classes = useStyles();
  return (
    <>
      <Grid item>
        <Paper className={active === "company" ? "paperActive" : "paper"}>
          <Grid container>
            <Grid item xs={9}>
              <Typography variant="subtitle1">Company</Typography>
              <Typography variant="body2">Setup your company profil</Typography>
            </Grid>
            <Grid item xs={3} className="step-avatar">
              <div className={classes.avatar}>
                <FaSchool />
              </div>

              {active === "company" ? (
                <KeyboardArrowLeftIcon fontSize="large" />
              ) : (
                <KeyboardArrowRightIcon fontSize="large" />
              )}
            </Grid>
          </Grid>
        </Paper>
      </Grid>
      <Grid item>
        <Paper className={active === "vehicule" ? "paperActive" : "paper"}>
          <Grid container>
            <Grid item xs={9}>
              <Typography variant="subtitle1">Vehicles</Typography>
              <Typography variant="body2">Setup your vehicle(s)</Typography>
            </Grid>
            <Grid item xs={3} className="step-avatar">
              <div className={classes.avatar}>
                <FaCar />
              </div>
              {active === "vehicule" ? (
                <KeyboardArrowLeftIcon fontSize="large" />
              ) : (
                <KeyboardArrowRightIcon fontSize="large" />
              )}
            </Grid>
          </Grid>
        </Paper>
      </Grid>
      <Grid item>
        <Paper className={active === "driver" ? "paperActive" : "paper"}>
          <Grid container>
            <Grid item xs={9}>
              <Typography variant="subtitle1">Drivers</Typography>
              <Typography variant="body2">Setup your driver(s)</Typography>
            </Grid>
            <Grid item xs={3} className="step-avatar">
              <div className={classes.avatar}>
                <FaIdCardAlt />
              </div>
              {active === "driver" ? (
                <KeyboardArrowLeftIcon fontSize="large" />
              ) : (
                <KeyboardArrowRightIcon fontSize="large" />
              )}
            </Grid>
          </Grid>
        </Paper>
      </Grid>
      <Grid item>
        <Paper className="paperlast">
          <Grid container>
            <Grid item xs={10}>
              <Typography variant="body1">
                skip check out the dashboard
              </Typography>
              <Typography variant="body2">
                you can not be put into circulation, whenyour account will not
                be complete
              </Typography>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </>
  );
}
