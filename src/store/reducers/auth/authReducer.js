import {
  SET_CURRENT_USER,
  GET_OFFICES,
  GET_COMPANYID_OFFICEID,
} from "../../actions/authActions/types";

const initialState = {
  isAuthenticated: false,
  user: {},
  listOffices: [],
  companyOffice: {},
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: !state.isAuthenticated,
        user: action.payload,
      };
    case GET_OFFICES:
      return {
        ...state,
        listOffices: action.payload,
      };
    case GET_COMPANYID_OFFICEID:
      return {
        ...state,
        companyOffice: action.payload,
      };

    default:
      return state;
  }
}
