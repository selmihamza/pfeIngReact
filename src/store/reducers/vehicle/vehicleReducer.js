import {
  GET_VEHICLE_TYPES,
  GET_VEHICLE_CATEGORIES,
  GET_VEHICLE_OPTIONS,
  ADD_VEHICLE,
} from "../../actions/vehicleActions/types";

const initialState = {
  vehicleCategories: [],
  vehicleTypes: [],
  vehicleOptions: [],
  vehicleID: 0,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_VEHICLE_CATEGORIES:
      return {
        ...state,
        vehicleCategories: action.payload,
      };
    case GET_VEHICLE_TYPES:
      return {
        ...state,
        vehicleTypes: action.payload,
      };
    case GET_VEHICLE_OPTIONS:
      return {
        ...state,
        vehicleOptions: action.payload,
      };
    case ADD_VEHICLE:
      return {
        ...state,
        vehicleID: action.payload,
      };

    default:
      return state;
  }
}
