import React, { useState } from "react";
// @material-ui/core/styles
import { withStyles, makeStyles } from "@material-ui/core/styles";
// @material-ui/icons

import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
// core components

import Card from "../../components/Card/Card.js";
import clsx from "clsx";
import {
  CardActions,
  Collapse,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Typography,
} from "@material-ui/core";

const StyledTableCell = withStyles((theme) => ({
  body: {
    fontSize: 14,
    height: 10,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const useStyles = makeStyles((theme) => ({
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
}));
function BookingTable({ lastRide, diffMins, diffHrs }) {
  const classes = useStyles();

  const [expandedBooking, setExpandedBooking] = useState(false);
  const handleExpandBookingClick = () => {
    setExpandedBooking(!expandedBooking);
  };

  return (
    <Card>
      <CardActions disableSpacing>
        <Typography gutterBottom variant="h5" component="h2">
          Booking n° {lastRide.ID} ({lastRide.ReservationCode})
        </Typography>
        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expandedBooking,
          })}
          onClick={handleExpandBookingClick}
          aria-expanded={expandedBooking}
          aria-label="show more"
        >
          <AddCircleOutlineIcon />
        </IconButton>
      </CardActions>

      <Table aria-label="customized table">
        <TableBody>
          <StyledTableRow>
            <StyledTableCell width="200px">Pick-up</StyledTableCell>
            <StyledTableCell align="left">
              {lastRide.AddressPickUp}
            </StyledTableCell>
            <StyledTableCell align="right">
              {lastRide.AddressPickUpPostalCode}
            </StyledTableCell>
          </StyledTableRow>
          <StyledTableRow>
            <StyledTableCell width="200px">Drop-off</StyledTableCell>
            <StyledTableCell align="left">
              {lastRide.AddressDropOff}
            </StyledTableCell>
            <StyledTableCell align="right">
              {lastRide.AddressDropOffPostalCode}
            </StyledTableCell>
          </StyledTableRow>
        </TableBody>
      </Table>
      <Collapse in={expandedBooking} timeout="auto" unmountOnExit>
        <Table>
          <TableBody>
            <StyledTableRow>
              <StyledTableCell width="200px">Estimated time</StyledTableCell>
              <StyledTableCell align="left">
                {diffHrs ? diffHrs + "h" : null}
                {diffMins}min
              </StyledTableCell>
            </StyledTableRow>
            <StyledTableRow>
              <StyledTableCell width="200px">Distance</StyledTableCell>
              <StyledTableCell align="left">
                {lastRide.EstimateDistanceM}
              </StyledTableCell>
            </StyledTableRow>
          </TableBody>
        </Table>
      </Collapse>
    </Card>
  );
}
export default BookingTable;
