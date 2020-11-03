import axios from "axios";

import {
  GET_VEHICLE_TYPES,
  GET_VEHICLE_TYPES_ERRORS,
  GET_VEHICLE_CATEGORIES,
  GET_VEHICLE_CATEGORIES_ERRORS,
  GET_VEHICLE_OPTIONS,
  GET_VEHICLE_OPTIONS_ERRORS,
  ADD_VEHICLE,
  GET_ERROR_ADD_VEHICLE,
} from "./types";

//------------- GET VEHICLE CATEGORIES ----------------
export const getVehicleCategories = (id) => async (dispatch) => {
  try {
    const result = await axios.get(
      process.env.REACT_APP_WS_URI + "/vehicle_categories/" + id
    );
    dispatch({
      type: GET_VEHICLE_CATEGORIES,
      payload: result.data,
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: GET_VEHICLE_CATEGORIES_ERRORS,
      payload: error,
    });
  }
};
//------------- GET VEHICLE TYPES ----------------
export const getVehicleTypes = (id) => async (dispatch) => {
  try {
    const result = await axios.get(
      process.env.REACT_APP_WS_URI + "/vehicle_types/" + id
    );
    dispatch({
      type: GET_VEHICLE_TYPES,
      payload: result.data,
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: GET_VEHICLE_TYPES_ERRORS,
      payload: error,
    });
  }
};
//------------- GET VEHICLE OPTIONS ----------------
export const getVehicleOptions = (id) => async (dispatch) => {
  try {
    const result = await axios.get(
      process.env.REACT_APP_WS_URI + "/vehicle_options/" + id
    );
    dispatch({
      type: GET_VEHICLE_OPTIONS,
      payload: result.data,
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: GET_VEHICLE_OPTIONS_ERRORS,
      payload: error,
    });
  }
};

//-------Post Vehicle--------
let erreur = "";
export const createVehicle = (vehicle, history) => (dispatch) => {
  axios
    .post(process.env.REACT_APP_WS_URI + "/vehicle", vehicle)
    .then(
      (res) => (
        dispatch({ type: ADD_VEHICLE, payload: res.data }),
        history.push("/home")
      )
    )
    .catch((err) => {
      err.response
        ? (erreur = err.response.data)
        : (erreur = "Internal Server Error");
      dispatch({
        type: GET_ERROR_ADD_VEHICLE,
        payload: erreur,
      });
    });
};
