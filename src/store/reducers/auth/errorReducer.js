import {
  GET_ERRORS_SIGNUP,
  GET_ERRORS_SIGNIN,
} from "../../actions/authActions/types";

const initialState = { errorSignin: "", errorSignup: "" };

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_ERRORS_SIGNIN:
      return { ...state, errorSignin: action.payload };
    case GET_ERRORS_SIGNUP:
      return { ...state, errorSignup: action.payload };
    default:
      return state;
  }
}
