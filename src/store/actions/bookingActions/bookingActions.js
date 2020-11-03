import axios from "axios";

import { GET_LAST_RIDE, GET_LAST_RIDE_ERROR } from "./types";

//------- get last ride -------
export const getLastRide = (id) => async (dispatch) => {
  try {
    const result = await axios.get(
      process.env.REACT_APP_WS_URI + "/request/" + id
    );
    dispatch({
      type: GET_LAST_RIDE,
      payload: result.data,
    });
  } catch (error) {
    console.log(error.message);
    dispatch({
      type: GET_LAST_RIDE_ERROR,
      payload: error.message,
    });
  }
};
