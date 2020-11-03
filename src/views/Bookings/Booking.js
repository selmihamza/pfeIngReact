import React, { useEffect } from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { getListRide } from "../../store/actions/bookingActions/bookingActions";

const StyledTableCell = withStyles((theme) => ({
  body: {
    fontSize: 14,
    height: 10,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(even)": {
      backgroundColor: "#e1f5fe",
    },
  },
}))(TableRow);

const columns = [
  { id: "booking", label: "Booking" },
  { id: "pickUpDate", label: "Pick up date" },
  {
    id: "pickUpHour",
    label: "Pick up hour",
  },
  {
    id: "PickUpAddress",
    label: "Pick up address",
  },
  {
    id: "dropOffDate",
    label: "Drop off date",
  },
  {
    id: "requestedDropOffZipcode",
    align: "center",
    label: "Requested zipcode",
  },
  {
    id: "status",
    align: "center",
    label: "Status",
  },
  {
    id: "paymentStatus",
    label: "Payment status",
  },
  {
    id: "customer",
    label: "Customer",
  },
  {
    id: "standardPrice",
    label: "Standard price",
    format: (value) => value.toFixed(2),
  },
  {
    id: "price",
    label: "Price",
    format: (value) => value.toFixed(2),
  },
];

const useStyles = makeStyles({
  root: {
    width: "100%",
    height: "100%",
  },

  head: {
    backgroundColor: "#00ACC1",
  },
  stateCancelled: { backgroundColor: "red", padding: "5px", color: "white" }, //red
  stateAccepted: { backgroundColor: "#4caf50", padding: "5px", color: "white" }, //green
  stateStarted: { backgroundColor: "#03a9f4", padding: "5px", color: "white" }, //blue
  stateFinished: { backgroundColor: "#e0e0e0", padding: "5px", color: "black" }, //gray
  stateOperationalCancelled: {
    backgroundColor: "#ff8a65",
    padding: "5px",
    color: "white",
  }, //orange
  state: { backgroundColor: "#fff9c4", padding: "5px", color: "black" }, //yellow
});

function Booking(props) {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const { listRide } = props.booking;
  useEffect(() => {
    // if (user.id != null) {
    props.getListRide(11469);
    // }
  }, []);

  return (
    <Paper className={classes.root}>
      <TableContainer>
        <Table aria-label="sticky table">
          <TableHead className={classes.head}>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {listRide.length > 0 &&
              listRide
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => {
                  let pickUp = new Date(row.Request.EstimatePickUpDate);
                  let pickUpMonth = pickUp.getMonth() + 1;
                  let pickUpYear = pickUp.getFullYear();
                  let pickUpDay = pickUp.getDate();
                  let pickUpHour = pickUp.getHours() + 1;
                  let pickUpMin = pickUp.getMinutes();
                  let dropOff = new Date(row.Request.EstimateDropOffDate);
                  let dropOffMonth = dropOff.getMonth() + 1;
                  let dropOffYear = dropOff.getFullYear();
                  let dropOffDay = dropOff.getDate();
                  let driverPrice = (row.Request.DriverPrice / 100).toFixed(2);
                  let optionPrice = (
                    (row.Request.DriverPrice + row.Request.OptionsPrice) /
                    100
                  ).toFixed(2);
                  console.log("Reporting -> optionPrice", optionPrice);

                  return (
                    <StyledTableRow>
                      <StyledTableCell>
                        {row.Request.ReservationCode}
                      </StyledTableCell>
                      <StyledTableCell align="left">
                        {pickUpMonth + "/" + pickUpDay + "/" + pickUpYear}
                      </StyledTableCell>
                      <StyledTableCell>
                        {pickUpHour + ":" + pickUpMin}
                      </StyledTableCell>
                      <StyledTableCell align="left">
                        {row.Request.AddressPickUp}
                      </StyledTableCell>
                      <StyledTableCell>
                        {dropOffMonth + "/" + dropOffDay + "/" + dropOffYear}
                      </StyledTableCell>
                      <StyledTableCell width="20px" align="center">
                        {row.Request.AddressDropOffPostalCode || "--"}
                      </StyledTableCell>

                      <StyledTableCell width="30px" align="center">
                        <span
                          className={
                            row.Request.State === "started"
                              ? classes.stateStarted
                              : row.Request.State === "cancelled"
                              ? classes.stateCancelled
                              : row.Request.State === "finished"
                              ? classes.stateFinished
                              : row.Request.State === "operational_cancelled"
                              ? classes.stateOperationalCancelled
                              : row.Request.State === "accepted"
                              ? classes.stateAccepted
                              : classes.state
                          }
                        >
                          {row.Request.State}
                        </span>
                      </StyledTableCell>
                      <StyledTableCell>
                        {row.Request.PaymentType}
                      </StyledTableCell>
                      <StyledTableCell align="left">
                        {row.FrontEndUser.FirstName} {row.FrontEndUser.LastName}
                      </StyledTableCell>
                      <StyledTableCell>{driverPrice || "--"} €</StyledTableCell>
                      <StyledTableCell align="left">
                        {optionPrice} €
                      </StyledTableCell>
                    </StyledTableRow>
                  );
                })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={listRide.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Paper>
  );
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  booking: state.booking,
});
export default connect(mapStateToProps, {
  getListRide,
})(withRouter(Booking));
