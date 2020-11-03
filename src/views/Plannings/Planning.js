import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
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
import { Typography } from "@material-ui/core";
import GridContainer from "../../components/Grid/GridContainer";
import GridItem from "../../components/Grid/GridItem";
import MaterialUIPickers from "./MaterialUIPickers";

import { getListAgenda } from "../../store/actions/agendaActions/agendaActions";
import Row from "./Row";

const columns = [
  { id: "start", label: "Start" },
  { id: "end", label: "End" },
  {
    id: "sevice",
    label: "Service",
  },
  {
    id: "confirmation",
    label: "Confirmation",
  },
  {
    id: "priority",
    label: "Priority",
  },
  {
    id: "confirm",
    align: "center",
    label: "Confirm",
  },
  {
    id: "actions",
    align: "center",
    label: "Actions",
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
  title: { margin: "20px 0px 20px 0px", fontSize: "24px", color: "#616161" },
});

function Planning(props) {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(7);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const { listAgenda } = props.agenda;
  useEffect(() => {
    // if (user.id != null) {
    props.getListAgenda(11469);
    // }
  }, []);

  return (
    <>
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
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
                  {listAgenda.length > 0 &&
                    listAgenda
                      .slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                      .map((row) => {
                        return (
                          <Row
                            PrimaryTypeName={row.PrimaryTypeName}
                            SecondaryTypeName={row.SecondaryTypeName}
                            Agenda={row.Agenda}
                            key={row.Agenda.ID}
                            driverID={11469}
                          />
                        );
                      })}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[7, 14, 21]}
              component="div"
              count={listAgenda.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onChangePage={handleChangePage}
              onChangeRowsPerPage={handleChangeRowsPerPage}
            />
          </Paper>
        </GridItem>
      </GridContainer>
      <Typography variant="subtitle1" className={classes.title}>
        {" "}
        Add an entry point in the agenda of the driver
      </Typography>
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <MaterialUIPickers />
        </GridItem>
      </GridContainer>
    </>
  );
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  agenda: state.agenda,
});
export default connect(mapStateToProps, {
  getListAgenda,
})(withRouter(Planning));
