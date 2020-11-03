import { push } from "connected-react-router";
// import { PrivateRoute } from "helpers/PrivateRoute";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Route,
  Switch,
  Redirect,
  BrowserRouter as Router,
} from "react-router-dom";
import Signin from "views/SignupPages/containers/Signin/Signin";
import Signup from "views/SignupPages/containers/Signup/Signup";
import CreateCompany from "views/SignupPages/containers/Company/CreateCompany";
import CreateVehicle from "views/SignupPages/containers/Vehicle/CreateVehicle";
import Home from "views/SignupPages/containers/HomeInterface/Home";
import Admin from "./layouts/Admin";
import SignupLayout from "./layouts/SignupLayout";
import RTL from "layouts/RTL.js";
import "./App.css";
import CreateDriver from "views/SignupPages/containers/Drivers/CreateDriver";

//peut prendre "student" , "club" ,"sponsor" ..
// export default () => {
// const dispatch = useDispatch();
//   let loggedIn = useSelector((state) => state.authentication.loggedIn);
//   React.useEffect(() => {
//     loggedIn ? dispatch(push("/dashboard")) : dispatch(push("/"));
//   }, [loggedIn]);

function App() {
  return (
    <Router>
      {/* <Switch>
        <PrivateRoute path="/dashboard" component={Admin} />
        <Guest>
            <Route exact path="/" component={FrontOfficeHome}></Route>
            <Route exact path="/eventList" component={EventList}></Route>
            <Route exact path="/eventList/:id" component={EventDetails}></Route>
        </Guest>
        </Switch> */}
      <Switch>
        <Route path="/admin" component={Admin} />
        <Route path="/rtl" component={RTL} />
        {/* <Redirect from="/" to="/signin" /> */}

        <Route exact path="/adddriver" component={CreateDriver}></Route>

        <SignupLayout>
          <Redirect from="/" to="/signin" />
          <Route exact path="/" component={Signin}></Route>
          <Route exact path="/signin" component={Signin}></Route>
          <Route exact path="/:saas_company/signup" component={Signup}></Route>

          <Route exact path="/addcompany" component={CreateCompany}></Route>
          <Route exact path="/addvehicle" component={CreateVehicle}></Route>
          <Route exact path="/home" component={Home}></Route>
        </SignupLayout>
      </Switch>
    </Router>
  );
}
export default App;
