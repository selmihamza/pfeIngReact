import React from "react";
import Modal from "@material-ui/core/Modal";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { Grid, InputLabel, Box } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import { Formik } from "formik";
import * as Yup from "yup";

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
    width: "600px",
    borderRadius: "10px",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  title: { textAlign: "center" },
}));

export default function UpdatePassword(props) {
  const classes = useStyles();
  const [modalStyle] = React.useState(getModalStyle);
  const handleSubmit = async (values) => {
    console.log(props.driverID);
    const data = {
      password: values.password,
      ConPassword: values.ConPassword,
      NewPassword: values.NewPassword,
    };
    console.log("handleSubmit -> data", data);
    //   props.registerUser(user, props.history);
  };
  const body = (
    <div style={modalStyle} className={classes.paper}>
      <h2 className={classes.title} id="title">
        Update your password
      </h2>
      <Formik
        initialValues={{
          password: "",
          NewPassword: "",
          confirmPassword: "",
        }}
        onSubmit={handleSubmit}
        validationSchema={Yup.object().shape({
          password: Yup.string().required("required"),
          NewPassword: Yup.string().required("required"),
          ConPassword: Yup.string()
            .required("required")
            .oneOf(
              [Yup.ref("NewPassword"), null],
              "Password must be the same!"
            ),
        })}
      >
        {(props) => {
          const {
            values,
            touched,
            errors,
            handleChange,
            handleBlur,
            handleSubmit,
          } = props;
          return (
            <form className="form-signup" onSubmit={handleSubmit} noValidate>
              <Grid container spacing={2}>
                <Box ml={1} mb={-1}>
                  <InputLabel shrink>Password</InputLabel>
                </Box>
                <Grid item xs={12}>
                  <TextField
                    autoComplete="password"
                    name="password"
                    variant="outlined"
                    required
                    size="small"
                    placeholder="password"
                    fullWidth
                    error={!!errors.password}
                    id="password"
                    type="password"
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    helperText={
                      errors.password && touched.password && errors.password
                    }
                  />
                </Grid>
                <Box ml={1} mb={-1}>
                  <InputLabel shrink>New password</InputLabel>
                </Box>
                <Grid item xs={12}>
                  <TextField
                    autoComplete="NewPassword"
                    name="NewPassword"
                    variant="outlined"
                    required
                    size="small"
                    placeholder="New Password"
                    fullWidth
                    error={!!errors.NewPassword}
                    id="NewPassword"
                    type="password"
                    value={values.NewPassword}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    helperText={
                      errors.NewPassword &&
                      touched.NewPassword &&
                      errors.NewPassword
                    }
                  />
                </Grid>
                <Box ml={1} mb={-1}>
                  <InputLabel shrink>Confirm password</InputLabel>
                </Box>
                <Grid item xs={12}>
                  <TextField
                    autoComplete="ConPassword"
                    name="ConPassword"
                    variant="outlined"
                    required
                    size="small"
                    placeholder="Confirm Password"
                    fullWidth
                    error={!!errors.ConPassword}
                    id="ConPassword"
                    type="password"
                    value={values.ConPassword}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    helperText={
                      errors.ConPassword &&
                      touched.ConPassword &&
                      errors.ConPassword
                    }
                  />
                </Grid>
              </Grid>

              <Box mt={2} mr={1}>
                <div className="text-right">
                  <Button
                    type="submit"
                    variant="contained"
                    className="Button-signin"
                  >
                    Update
                  </Button>
                </div>
              </Box>
            </form>
          );
        }}
      </Formik>
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
