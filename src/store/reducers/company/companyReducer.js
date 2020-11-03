import {
  ADD_COMPANY,
  GET_ERROR_ADD_COMPANY,
} from "../../actions/companyActions/types";

const initialState = {
  companyID: 10725,
  errorAddCompany: "",
};

export default function (state = initialState, action) {
  switch (action.type) {
    case ADD_COMPANY:
      return {
        ...state,
        companyID: action.payload,
      };
    case GET_ERROR_ADD_COMPANY:
      return {
        ...state,
        errorAddCompany: action.payload,
      };
    default:
      return state;
  }
}
