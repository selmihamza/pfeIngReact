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
import { getListInvoice } from "../../store/actions/reportingActions/reportingActions";

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
  { id: "startDate", label: "Start Date" },
  { id: "endDate", label: "End date" },
  {
    id: "turnover",
    label: "Turnover",
  },
  {
    id: "amountPaid",
    label: "Amount paid",
  },
  {
    id: "commision",
    label: "Commision",
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

function Reporting(props) {
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
  const { listInvoice } = props.reporting;
  useEffect(() => {
    // if (user.id != null) {
    props.getListInvoice(11469);
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
            {listInvoice.length > 0 &&
              listInvoice
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  let beginDate = new Date(row.PaymentPeriod.BeginDate);
                  let beginDateMonth = beginDate.getMonth() + 1;
                  let beginDateYear = beginDate.getFullYear();
                  let beginDateDay = beginDate.getDate();

                  let endDate = new Date(row.PaymentPeriod.EndDate);
                  let endDateMonth = endDate.getMonth() + 1;
                  let endDateYear = endDate.getFullYear();
                  let endDateDay = endDate.getDate();
                  // let driverPrice = (row.Request.DriverPrice / 100).toFixed(2);
                  // let optionPrice = (
                  //   (row.Request.DriverPrice + row.Request.OptionsPrice) /
                  //   100
                  // ).toFixed(2);
                  // console.log("Reporting -> optionPrice", optionPrice);

                  return (
                    <StyledTableRow key={index}>
                      <StyledTableCell width="200px">
                        {beginDateYear +
                          "-" +
                          beginDateMonth +
                          "-" +
                          beginDateDay}
                      </StyledTableCell>
                      <StyledTableCell width="200px">
                        {endDateYear + "-" + endDateMonth + "-" + endDateDay}
                      </StyledTableCell>
                      <StyledTableCell>
                        {(row.Invoice.InitialInvoiceTotal / 100).toFixed(2)} €
                      </StyledTableCell>
                      <StyledTableCell>
                        {(row.Invoice.InitialDriverTotal / 100).toFixed(2)} €
                      </StyledTableCell>
                      <StyledTableCell>
                        {row.Invoice.CompanyFeesPercentage.toFixed(1)} %
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
        count={listInvoice.length}
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
  reporting: state.reporting,
});
export default connect(mapStateToProps, {
  getListInvoice,
})(withRouter(Reporting));
