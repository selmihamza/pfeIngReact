import React from "react";
import { withStyles } from "@material-ui/core/styles";
import TableCell from "@material-ui/core/TableCell";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import CheckIcon from "@material-ui/icons/Check";
import EditIcon from "@material-ui/icons/Edit";
import CloseIcon from "@material-ui/icons/Close";
import TableRow from "@material-ui/core/TableRow";
import { green } from "@material-ui/core/colors";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import ModalEdit from "./ModalEdit";
import {
  ConfirmPeriod,
  DeletePeriod,
} from "../../store/actions/agendaActions/agendaActions";
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
function Row(props) {
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  let beginDate = new Date(props.Agenda.EventBegin);
  let beginDateMonth = beginDate.getMonth() + 1;
  let beginDateYear = beginDate.getFullYear();
  let beginDateDay = beginDate.getDate();
  let beginDateHour =
    beginDate.getUTCHours() < 10
      ? "0" + beginDate.getUTCHours()
      : beginDate.getUTCHours();
  let beginDateMin =
    beginDate.getUTCMinutes() < 10
      ? "0" + beginDate.getUTCMinutes()
      : beginDate.getUTCMinutes();

  let endDate = new Date(props.Agenda.EventEnd);
  let endDateMonth = endDate.getMonth() + 1;
  let endDateYear = endDate.getFullYear();
  let endDateDay = endDate.getDate();
  let endDateHour =
    endDate.getUTCHours() < 10
      ? "0" + endDate.getUTCHours()
      : endDate.getUTCHours();
  let endDateMin =
    endDate.getUTCMinutes() < 10
      ? "0" + endDate.getUTCMinutes()
      : endDate.getUTCMinutes();
  return (
    <StyledTableRow key={props.Agenda.ID}>
      <StyledTableCell width="150px">
        {beginDateYear +
          "/" +
          beginDateMonth +
          "/" +
          beginDateDay +
          " " +
          beginDateHour +
          ":" +
          beginDateMin}
      </StyledTableCell>
      <StyledTableCell width="150px">
        {endDateYear +
          "/" +
          endDateMonth +
          "/" +
          endDateDay +
          " " +
          endDateHour +
          ":" +
          endDateMin}
      </StyledTableCell>
      <StyledTableCell>
        Primary: {props.PrimaryTypeName.map((el) => el + " ")}
        <br></br>
        Secondary:{" "}
        {props.SecondaryTypeName != null
          ? props.SecondaryTypeName.map((el) => el + " ")
          : "--"}
      </StyledTableCell>
      <StyledTableCell width="100px" align="left">
        {props.Agenda.Priority == "999"
          ? "Created"
          : props.Agenda.Priority == "1" && "Confirmed"}
      </StyledTableCell>
      <StyledTableCell width="70px" align="left">
        {props.Agenda.Priority}
      </StyledTableCell>
      <StyledTableCell width="20px">
        <Button
          color="primary"
          aria-label="add an alarm"
          onClick={() => props.ConfirmPeriod(props.Agenda.ID)}
        >
          <CheckIcon />
        </Button>
      </StyledTableCell>
      <StyledTableCell width="100px">
        <IconButton style={{ color: green[500] }} onClick={handleOpen}>
          <EditIcon />
        </IconButton>
        {open && (
          <ModalEdit
            open={open}
            onClose={handleClose}
            Agenda={props.Agenda}
            driverID={props.driverID}
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
          />
        )}
        <IconButton
          color="secondary"
          onClick={() => props.DeletePeriod(props.Agenda.ID)}
        >
          <CloseIcon />
        </IconButton>
      </StyledTableCell>
    </StyledTableRow>
  );
}
export default connect(null, {
  ConfirmPeriod,
  DeletePeriod,
})(withRouter(Row));
