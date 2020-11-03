import React, { useState, useEffect } from "react";

// core components
import GridItem from "../../components/Grid/GridItem.js";
import GridContainer from "../../components/Grid/GridContainer.js";
import PhoneIcon from "@material-ui/icons/Phone";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import {
  getLastRide,
  getDriverInformations,
  updateDriverStatus,
} from "../../store/actions/bookingActions/bookingActions";
import DisplayMap from "./DisplayMap";
import BookingTable from "./BookingTable";
import InformationTable from "./InformationTable";
import PriceTable from "./PriceTable";
import { makeStyles } from "@material-ui/core/styles";
import {
  Card,
  Box,
  Grid,
  Typography,
  CardContent,
  Avatar,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@material-ui/core";
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  small: {
    width: theme.spacing(3),
    height: theme.spacing(3),
  },
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
    backgroundColor: "#00ACC1",
  },
  formControl: {
    marginTop: theme.spacing(1),
    minWidth: 220,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));
function Dashboard(props) {
  const classes = useStyles();
  const [diffHrs, setDiffHrs] = useState(0);
  const [diffMins, setDiffMins] = useState(0);
  const [percentage, setPercentage] = useState(0);
  const [status, setStatus] = React.useState("");

  const handleChange = (event) => {
    const status = event.target.value;
    setStatus(status);
    props.updateDriverStatus(11469, status, props.history);
  };
  const { user } = props.auth;
  const { lastRide } = props.booking;
  const { requestStaticInformation } = props.booking;
  const { driverInformations } = props.booking;

  useEffect(() => {
    // if (user.id != null) {
    props.getLastRide(11469);
    // }
  }, []);
  useEffect(() => {
    props.getDriverInformations(11469);
  }, []);

  useEffect(() => {
    if (driverInformations.NumberOfRideFinished != null) {
      setPercentage(
        (driverInformations.NumberOfRideFinished /
          driverInformations.NumberOfRideTotal) *
          100
      );
    }
  }, [driverInformations, percentage]);
  useEffect(() => {
    if (lastRide.ID != null) {
      let dropOff = new Date(lastRide.EstimateDropOffDate);
      let pickUp = new Date(lastRide.EstimatePickUpDate);

      var diffMs = dropOff - pickUp;
      setDiffHrs(Math.floor((diffMs % 86400000) / 3600000)); // hours
      setDiffMins(Math.round(((diffMs % 86400000) % 3600000) / 60000)); // minutes
    }
  }, [lastRide]);
  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={6}>
        <Box mt={4}>
          <Card>
            <DisplayMap lastRide={lastRide} />

            {driverInformations.User != null && (
              <CardContent>
                <Grid container>
                  {/* <Grid item xs={1}>
                    <Avatar className={classes.large}>
                      {driverInformations.User.FirstName[0]}
                    </Avatar>
                  </Grid> */}
                  <Grid item container xs={7}>
                    <Grid item xs={8}>
                      <Typography variant="subtitle1" gutterBottom>
                        {driverInformations.User.FirstName}{" "}
                        {driverInformations.User.LastName}
                      </Typography>
                      <Typography variant="body1">
                        Status :
                        {driverInformations.SaasOfficeToDriverRelation
                          .DriverStatus === 0
                          ? "NOT AVAILABLE"
                          : driverInformations.SaasOfficeToDriverRelation
                              .DriverStatus === 1
                          ? " AVAILABLE"
                          : driverInformations.SaasOfficeToDriverRelation
                              .DriverStatus === 2
                          ? "PAUSE"
                          : driverInformations.SaasOfficeToDriverRelation
                              .DriverStatus === 3
                          ? "UNKNOWN "
                          : driverInformations.SaasOfficeToDriverRelation
                              .DriverStatus === 4
                          ? "DRIVING "
                          : "DISPATCHING"}
                      </Typography>
                      <Typography variant="body1">
                        Number of rides finished :{" "}
                        {driverInformations.NumberOfRideFinished}
                      </Typography>
                      <Typography variant="body1">
                        Percentage of acceptance : {percentage.toFixed(2)}%
                      </Typography>
                    </Grid>
                    {/* <Grid item xs={4}>
                      <Box mt={4}>
                        <Typography variant="body1">
                          Priority:{" "}
                          {
                            driverInformations.SaasOfficeToDriverRelation
                              .Priority
                          }
                        </Typography>
                        <Typography variant="body1">
                          Note: {driverInformations.Note.Note}
                        </Typography>
                      </Box>
                    </Grid> */}
                  </Grid>
                  <Grid item xs={4}>
                    <Typography variant="subtitle1" gutterBottom>
                      <PhoneIcon />
                      {driverInformations.User.PhoneNumber}
                    </Typography>

                    <Typography variant="body1">
                      Primary:{" "}
                      {driverInformations.VehicleTypesPrimary.map(
                        (item, index) => (
                          <span key={index}>{item.Designation} </span>
                        )
                      )}
                    </Typography>
                    <Typography variant="body1">
                      Secondary:{" "}
                      {driverInformations.VehicleTypesSecondary.map(
                        (item, index) => (
                          <span key={index}>{item.Designation} </span>
                        )
                      )}
                    </Typography>
                    <FormControl
                      variant="outlined"
                      className={classes.formControl}
                    >
                      <InputLabel id="demo-simple-select-outlined-label">
                        Available
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-outlined-label"
                        id="demo-simple-select-outlined"
                        value={status}
                        onChange={handleChange}
                        label="Available"
                        small
                      >
                        <MenuItem value={0}>NOT AVAILABLE</MenuItem>
                        <MenuItem value={1}>AVAILABLE</MenuItem>
                        <MenuItem value={2}>PAUSE</MenuItem>
                        <MenuItem value={4}>DRIVING</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                </Grid>
              </CardContent>
            )}
          </Card>
        </Box>
      </GridItem>
      <GridItem xs={12} sm={12} md={6}>
        <BookingTable
          lastRide={lastRide}
          diffHrs={diffHrs}
          diffMins={diffMins}
        />
        <InformationTable lastRide={lastRide} />
        <PriceTable
          lastRide={lastRide}
          requestStaticInformation={requestStaticInformation}
        />
      </GridItem>
    </GridContainer>
  );
}
const mapStateToProps = (state) => ({
  auth: state.auth,
  booking: state.booking,
});
export default connect(mapStateToProps, {
  getLastRide,
  getDriverInformations,
  updateDriverStatus,
})(withRouter(Dashboard));
