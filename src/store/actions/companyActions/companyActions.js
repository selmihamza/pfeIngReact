import axios from "axios";

import { ADD_COMPANY, GET_ERROR_ADD_COMPANY } from "./types";

//------------- ADD COMPANY ----------------
let erreur = "";
export const addCompany = (company, history) => (dispatch) => {
  axios
    .post(process.env.REACT_APP_WS_URI + "/company", company)
    .then(
      (res) => (
        dispatch({ type: ADD_COMPANY, payload: res.data }),
        history.push("/home")
      )
    )
    .catch((err) => {
      err.response
        ? (erreur = err.response.data)
        : (erreur = "Internal Server Error");
      dispatch({
        type: GET_ERROR_ADD_COMPANY,
        payload: erreur,
      });
    });
};
