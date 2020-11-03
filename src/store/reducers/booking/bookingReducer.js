import {
  GET_LAST_RIDE,
  GET_LAST_RIDE_ERROR,
} from "../../actions/bookingActions/types";

const initialState = {
  lastRide: {},
  lastRideError: "",
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_LAST_RIDE:
      return {
        ...state,
        lastRide: action.payload,
      };
    case GET_LAST_RIDE_ERROR:
      return {
        ...state,
        lastRideError: action.payload,
      };

    default:
      return state;
  }
}
