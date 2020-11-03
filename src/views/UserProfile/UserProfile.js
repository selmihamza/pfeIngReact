import React, { useEffect } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
// @material-ui/core components

import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import avatar from "../../assets/img/faces/avatar.jpg";
import Card from "../../components/Card/Card.js";
import CardAvatar from "../../components/Card/CardAvatar.js";
import CardBody from "../../components/Card/CardBody.js";
import Button from "../../components/CustomButtons/Button.js";
import ButtonMat from "@material-ui/core/Button";
import GridContainer from "../../components/Grid/GridContainer.js";
// core components
import GridItem from "../../components/Grid/GridItem.js";
import {
  getCompanyByID,
  getDriverByID,
} from "../../store/actions/authActions/authActions";
import UpdatePassword from "./UpdatePassword";

const styles = {
  cardCategory: {
    margin: "0",
    fontSize: "14px",
    marginTop: "0",
    marginBottom: "0",
  },
  cardTitle: {
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
  },
};

const useStyles = makeStyles(styles);

function ProfileDetails(props) {
  const classes = useStyles();
  const { user } = props.auth;
  const { driver } = props.auth;
  const { company } = props.auth;
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  useEffect(() => {
    // if (user.id != null) {
    props.getCompanyByID(5170);
    props.getDriverByID(11469);
    // }
  }, []);

  return (
    <div>
      <GridContainer>
        <GridItem md={1}></GridItem>
        <GridItem xs={12} sm={12} md={10}>
          {driver.User != null && (
            <Card profile>
              <CardAvatar profile>
                <a href="#avatar" onClick={(e) => e.preventDefault()}>
                  <img src={avatar} alt="..." />
                </a>
              </CardAvatar>
              <CardBody profile>
                <h6 className={classes.cardCategory}>Welcome</h6>
                <h2>
                  {driver.User.FirstName} {driver.User.LastName}
                </h2>
                <Button
                  color="info"
                  round
                  // onClick={() => {
                  //   history.push(match.url + "/editProfile/" + data.id);
                  // }}
                >
                  Edit your profile !
                </Button>
                <Table className={classes.table} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      <TableCell component="th" scope="row">
                        <b>Phone number</b>
                      </TableCell>
                      <TableCell align="right">
                        <b>{driver.User.PhoneNumber}</b>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell component="th" scope="row">
                        <b>Email</b>
                      </TableCell>
                      <TableCell align="right">
                        <b>{driver.User.Email}</b>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell component="th" scope="row">
                        <b>Password</b>
                      </TableCell>
                      <TableCell align="right">
                        <ButtonMat
                          color="primary"
                          variant="outlined"
                          onClick={handleOpen}
                        >
                          Change your password
                        </ButtonMat>
                        {open && (
                          <UpdatePassword
                            open={open}
                            onClose={handleClose}
                            driverID={11469}
                            aria-labelledby="simple-modal-title"
                            aria-describedby="simple-modal-description"
                          />
                        )}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell component="th" scope="row">
                        <b>Address</b>
                      </TableCell>
                      <TableCell align="right">
                        <b> {driver.Addresse.AddressDescription}</b>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell component="th" scope="row">
                        <b>Language</b>
                      </TableCell>
                      <TableCell align="right">
                        <b>
                          {driver.User.Locale === "en"
                            ? "English (us)"
                            : driver.User.Locale === "fr"
                            ? "Frensh"
                            : driver.User.Locale === "en-GB"
                            ? "English (gb)"
                            : driver.User.Locale === "pt"
                            ? "Portuguese"
                            : "Spanish"}
                        </b>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell component="th" scope="row">
                        <b>NI Number (optional)</b>
                      </TableCell>
                      <TableCell align="right">
                        <b> {driver.Driver.DriverInsuranceNumber}</b>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell component="th" scope="row">
                        <b> External ID</b>
                      </TableCell>
                      <TableCell align="right">
                        <b> {driver.Driver.ID}</b>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell component="th" scope="row">
                        <b> Sponsorship code</b>
                      </TableCell>
                      <TableCell align="right">
                        <b> {driver.Driver.ReferralCode}</b>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardBody>
            </Card>
          )}
        </GridItem>
      </GridContainer>
      <GridContainer>
        <GridItem md={1}></GridItem>
        <GridItem xs={12} sm={12} md={10}>
          {company.Company != null && (
            <Card profile>
              <CardBody profile>
                <h1>Company</h1>

                <Table className={classes.table} aria-label="simple table">
                  <TableBody>
                    <TableRow>
                      <TableCell component="th" scope="row">
                        <b>Name</b>
                      </TableCell>
                      <TableCell align="right">
                        <b>{company.Company.CompanyName}</b>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell component="th" scope="row">
                        <b>Company Registration, if applicable</b>
                      </TableCell>
                      <TableCell align="right">
                        <b>{company.Company.CompanySiren}</b>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell component="th" scope="row">
                        <b> VAT</b>
                      </TableCell>
                      <TableCell align="right">
                        <b>
                          {company.Company.CompanyTva != ""
                            ? company.Company.CompanyTva
                            : "empty"}
                        </b>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell component="th" scope="row">
                        <b> VAT Rate</b>
                      </TableCell>
                      <TableCell align="right">
                        <b> {company.Company.VatPercentage}%</b>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell component="th" scope="row">
                        <b>PCO number :</b>
                      </TableCell>
                      <TableCell align="right">
                        <b>{company.Company.CompanyDre}</b>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardBody>{" "}
              <CardBody>
                <Button
                  color="info"
                  round
                  // onClick={() => {
                  //   history.push(match.url + "/editProfile/" + data.id);
                  // }}
                >
                  Edit your company !
                </Button>
              </CardBody>
            </Card>
          )}
        </GridItem>
      </GridContainer>
    </div>
  );
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps, {
  getCompanyByID,
  getDriverByID,
})(withRouter(ProfileDetails));
