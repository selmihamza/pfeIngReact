import "date-fns";
import React from "react";
import Grid from "@material-ui/core/Grid";
import DateFnsUtils from "@date-io/date-fns";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import { Button, Box } from "@material-ui/core";
import { createPeriod } from "../../store/actions/agendaActions/agendaActions";

function MaterialUIPickers(props) {
  const [selectedDateStart, setSelectedDateStart] = React.useState(new Date());
  const [selectedDateEnd, setSelectedDateEnd] = React.useState(new Date());

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
  const handleSubmit = (event) => {
    const period = {
      EventBegin: selectedDateStart,
      EventEnd: selectedDateEnd,
      DriverID: 11469,
    };
    props.createPeriod(period);
    event.preventDefault();
  };

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <form onSubmit={handleSubmit}>
        <Grid container>
          <Grid item xs={2}>
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
          <Grid item xs={2}>
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
          <Grid item xs={2}>
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
          <Grid item xs={2}>
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
          <Grid item xs={2}>
            <Box mt={4}>
              <Button variant="outlined" color="primary" type="submit">
                Add
              </Button>
            </Box>
          </Grid>
        </Grid>
      </form>
    </MuiPickersUtilsProvider>
  );
}

const mapStateToProps = (state) => ({
  user: state.auth,
});
export default connect(mapStateToProps, { createPeriod })(
  withRouter(MaterialUIPickers)
);
