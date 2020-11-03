import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import DateFnsUtils from "@date-io/date-fns";
import Grid from "@material-ui/core/Grid";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { updatePeriod } from "../../store/actions/agendaActions/agendaActions";
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import { Button, Box } from "@material-ui/core";
function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
    // border: "4px solid white",
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",

    backgroundColor: theme.palette.background.paper,
    width: "800px",
    borderRadius: "10px",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

function ModalEdit(props) {
  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render

  const [modalStyle] = React.useState(getModalStyle);
  const [selectedDateStart, setSelectedDateStart] = React.useState(
    new Date(props.Agenda.EventBegin)
  );
  const [selectedDateEnd, setSelectedDateEnd] = React.useState(
    new Date(props.Agenda.EventEnd)
  );
  const handleDateStartChange = (date) => {
    setSelectedDateStart(date);
    console.log("handleDateStartChange -> date", date);
    console.log(
      "handleDateStartChange -> selectedDateStart",
      selectedDateStart
    );
  };
  const handleDateEndChange = (date) => {
    setSelectedDateEnd(date);
  };
  const handleSubmit = (id, event) => {
    const period = {
      EventBegin: selectedDateStart,
      EventEnd: selectedDateEnd,
      DriverID: props.driverID,
    };
    props.updatePeriod(id, period);
    event.preventDefault();
  };
  const body = (
    <div style={modalStyle} className={classes.paper}>
      <h2 id="title">Text in a modal</h2>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <form onSubmit={(id) => handleSubmit(props.Agenda.ID)}>
          <Grid container>
            <Grid item xs={4}>
              <KeyboardDatePicker
                margin="normal"
                id="date-picker-dialog"
                label="Date start"
                format="MM/dd/yyyy"
                value={selectedDateStart}
                onChange={handleDateStartChange}
                KeyboardButtonProps={{
                  "aria-label": "change date",
                }}
              />
            </Grid>
            <Grid item xs={4}>
              <KeyboardTimePicker
                margin="normal"
                id="time-picker"
                label="Time start"
                value={selectedDateStart}
                onChange={handleDateStartChange}
                KeyboardButtonProps={{
                  "aria-label": "change time",
                }}
              />
            </Grid>
            <Grid item xs={4}></Grid>

            <Grid item xs={4}>
              <KeyboardDatePicker
                margin="normal"
                id="date-picker-dialog"
                label="Date end"
                format="MM/dd/yyyy"
                value={selectedDateEnd}
                onChange={handleDateEndChange}
                KeyboardButtonProps={{
                  "aria-label": "change date",
                }}
              />
            </Grid>
            <Grid item xs={4}>
              <KeyboardTimePicker
                margin="normal"
                id="time-picker"
                label="Time end"
                value={selectedDateEnd}
                onChange={handleDateEndChange}
                KeyboardButtonProps={{
                  "aria-label": "change time",
                }}
              />
            </Grid>
            <Grid item>
              <Box mt={3.7}>
                <Button variant="outlined" color="primary" type="submit">
                  Edit
                </Button>
              </Box>
            </Grid>
          </Grid>
        </form>
      </MuiPickersUtilsProvider>
    </div>
  );

  return (
    <Modal
      open={props.open}
      onClose={props.onClose}
      aria-labelledby="title"
      aria-describedby="simple-modal-description"
    >
      {body}
    </Modal>
  );
}
export default connect(null, {
  updatePeriod,
})(withRouter(ModalEdit));
