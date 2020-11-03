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
const StyledTableRow2 = withStyles((theme) => ({
  root: {
    "&:nth-of-type(even )": {
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
function InformationTable({ lastRide }) {
  const classes = useStyles();

  const [expandedInformation, setExpandedInformation] = useState(false);
  const handleExpandInformationClick = () => {
    setExpandedInformation(!expandedInformation);
  };

  // useEffect(() => {
  //   let h = new Date(lastRide.EstimatePickUpDate);
  //   console.log(h.toString());
  // }, [lastRide]);
  return (
    <Card>
      <CardActions disableSpacing>
        <Typography gutterBottom variant="h5" component="h2">
          Information
        </Typography>
        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expandedInformation,
          })}
          onClick={handleExpandInformationClick}
          aria-expanded={expandedInformation}
          aria-label="show more"
        >
          <AddCircleOutlineIcon />
        </IconButton>
      </CardActions>

      <Table aria-label="customized table">
        <TableBody>
          <StyledTableRow>
            <StyledTableCell width="200px">Status of the ride</StyledTableCell>
            <StyledTableCell align="left">{lastRide.State}</StyledTableCell>
          </StyledTableRow>
          <StyledTableRow>
            <StyledTableCell width="200px">Pick up</StyledTableCell>
            <StyledTableCell align="left">
              {lastRide.EstimatePickUpDate}
            </StyledTableCell>
          </StyledTableRow>
          <StyledTableRow>
            <StyledTableCell width="200px">Drop-off</StyledTableCell>
            <StyledTableCell align="left">
              {lastRide.EstimateDropOffDate}
            </StyledTableCell>
          </StyledTableRow>
        </TableBody>
      </Table>
      <Collapse in={expandedInformation} timeout="auto" unmountOnExit>
        <Table>
          <TableBody>
            <StyledTableRow2>
              <StyledTableCell width="200px">Requested on</StyledTableCell>
              <StyledTableCell align="left">
                {lastRide.CreatedAt}
              </StyledTableCell>
            </StyledTableRow2>
            <StyledTableRow2>
              <StyledTableCell width="200px">
                Initial departure on
              </StyledTableCell>
              <StyledTableCell align="left">
                {lastRide.RideDate}
              </StyledTableCell>
            </StyledTableRow2>
            <StyledTableRow2>
              <StyledTableCell width="200px">Type</StyledTableCell>
              <StyledTableCell align="left">
                {lastRide.PaymentType}
              </StyledTableCell>
            </StyledTableRow2>
            <StyledTableRow2>
              <StyledTableCell width="200px">Booking channel</StyledTableCell>
              <StyledTableCell align="left">Mobile</StyledTableCell>
            </StyledTableRow2>
          </TableBody>
        </Table>
      </Collapse>
    </Card>
  );
}
export default InformationTable;
