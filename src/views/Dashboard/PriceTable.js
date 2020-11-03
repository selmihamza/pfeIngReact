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
function PriceTable({ lastRide, requestStaticInformation }) {
  const classes = useStyles();
  const [expandedPrice, setExpandedPrice] = useState(false);

  const handleExpandPriceClick = () => {
    setExpandedPrice(!expandedPrice);
  };
  return (
    <Card>
      <CardActions disableSpacing>
        <Typography gutterBottom variant="h5" component="h2">
          Price
        </Typography>
        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expandedPrice,
          })}
          onClick={handleExpandPriceClick}
          aria-expanded={expandedPrice}
          aria-label="show more"
        >
          <AddCircleOutlineIcon />
        </IconButton>
      </CardActions>

      <Table aria-label="customized table">
        <TableBody>
          <StyledTableRow>
            <StyledTableCell width="200px">Quotation price</StyledTableCell>
            <StyledTableCell align="left">
              {requestStaticInformation.Amounts?.InvoiceTotalPrice} €
            </StyledTableCell>
          </StyledTableRow>
          <StyledTableRow>
            <StyledTableCell width="200px">
              Customer price before credit
            </StyledTableCell>
            <StyledTableCell align="left">
              {requestStaticInformation.Amounts?.CustomerPrice} €
            </StyledTableCell>
          </StyledTableRow>
          <StyledTableRow>
            <StyledTableCell width="200px">
              Amount to be paid (Cancelled ride)
            </StyledTableCell>
            <StyledTableCell align="left">
              {requestStaticInformation.Amounts?.PaidAmount} €
            </StyledTableCell>
          </StyledTableRow>
        </TableBody>
      </Table>
      <Collapse in={expandedPrice} timeout="auto" unmountOnExit>
        <Table>
          <TableBody>
            <StyledTableRow2>
              <StyledTableCell width="200px">Base price</StyledTableCell>
              <StyledTableCell align="left">
                {requestStaticInformation.Amounts?.BasePrice} €
              </StyledTableCell>
            </StyledTableRow2>
            <StyledTableRow2>
              <StyledTableCell width="200px">Marcel markup</StyledTableCell>
              <StyledTableCell align="left">
                {requestStaticInformation.Amounts?.CommercialFees} €
              </StyledTableCell>
            </StyledTableRow2>
            <StyledTableRow2>
              <StyledTableCell width="200px">Driver markup</StyledTableCell>
              <StyledTableCell align="left">
                {requestStaticInformation.Amounts?.DricerPrice || 0} €
              </StyledTableCell>
            </StyledTableRow2>
            <StyledTableRow2>
              <StyledTableCell width="200px">Company markup</StyledTableCell>
              <StyledTableCell align="left">
                {requestStaticInformation.Amounts?.InvoiceTotalPrice} €
              </StyledTableCell>
            </StyledTableRow2>
            <StyledTableRow2>
              <StyledTableCell width="200px">Marcel discount</StyledTableCell>
              <StyledTableCell align="left">
                {requestStaticInformation.Amounts?.CommercialFees} €
              </StyledTableCell>
            </StyledTableRow2>
            <StyledTableRow2>
              <StyledTableCell width="200px">Driver discount</StyledTableCell>
              <StyledTableCell align="left">
                {requestStaticInformation.Amounts?.DelayFees} €
              </StyledTableCell>
            </StyledTableRow2>
          </TableBody>
        </Table>
      </Collapse>
    </Card>
  );
}
export default PriceTable;
