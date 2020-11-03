import axios from "axios";
import jwt_decode from "jwt-decode";

import {
  GET_ERRORS_SIGNUP,
  GET_ERRORS_SIGNIN,
  SET_CURRENT_USER,
  GET_OFFICES,
  GET_OFFICES_ERROR,
  GET_COMPANYID_OFFICEID,
} from "./types";

//------- get list offices-------
export const getOffices = (paramSaas) => async (dispatch) => {
  try {
    const result = await axios.get(
      process.env.REACT_APP_WS_URI + "/" + paramSaas + "/offices"
    );
    dispatch({
      type: GET_OFFICES,
      payload: result.data,
    });
  } catch (error) {
    console.log(error);
    // dispatch({
    //   type: GET_OFFICES_ERROR,
    //   payload: err.response.data,
    // });
  }
};

//------- Register User-------
export const registerUser = (userData, history) => (dispatch) => {
  axios
    .post(process.env.REACT_APP_WS_URI + "/register", userData)
    .then((res) => history.push("/signin"))
    .catch((err) => {
      dispatch({
        type: GET_ERRORS_SIGNUP,
        payload: err.response.data,
      });
    });
};

//-------Login User--------
export const loginUser = (userData, history) => (dispatch) => {
  console.log(process.env.REACT_APP_WS_URI);
  axios
    .post(process.env.REACT_APP_WS_URI + "/login", userData)
    .then(
      (res) =>
        res.data.jwt &&
        (localStorage.setItem("jwtToken", res.data.jwt),
        //---decode token to get user data----
        history.push("/home"),
        //---set current user----
        dispatch(setCurrentUser(jwt_decode(res.data.jwt))))
    )
    .catch((err) => {
      console.log("loginUser -> err", err.response);
      dispatch({
        type: GET_ERRORS_SIGNIN,
        // payload: err.response.data.error.message,
        payload: "unauthorized",
      });
    });
};

//---set logged in user---
export const setCurrentUser = (decoded) => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded,
  };
};

//------- get companyid and office id-------
export const getCompanyIDOfficeID = (id) => async (dispatch) => {
  try {
    const result = await axios.get(
      process.env.REACT_APP_WS_URI + "/saascompanyAndoffice/" + id
    );
    dispatch({
      type: GET_COMPANYID_OFFICEID,
      payload: result.data,
    });
  } catch (error) {
    console.log(error);
    // dispatch({
    //   type: GET_OFFICES_ERROR,
    //   payload: err.response.data,
    // });
  }
};
