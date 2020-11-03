// import { connectRouter } from "connected-react-router";
// import { combineReducers } from "redux";
// import authReducer from "./auth/authReducer";
// import errorReducer from "./auth/errorReducer";
// import companyReducer from "./company/companyReducer";
// import vehicleReducer from "./vehicle/vehicleReducer";

// const reducers = {
//   auth: authReducer,
//   errorsConnection: errorReducer,
//   company: companyReducer,
//   vehicle: vehicleReducer,
// };
// const rootReducer = (history) =>
//   combineReducers({
//     ...reducers,
//     router: connectRouter(history),
//   });
// export default rootReducer;

import { combineReducers } from "redux";
import authReducer from "./auth/authReducer";
import errorReducer from "./auth/errorReducer";
import companyReducer from "./company/companyReducer";
import vehicleReducer from "./vehicle/vehicleReducer";
import bookingReducer from "./booking/bookingReducer";

export default combineReducers({
  auth: authReducer,
  errorsConnection: errorReducer,
  company: companyReducer,
  vehicle: vehicleReducer,
  booking: bookingReducer,
});
