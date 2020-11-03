import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./reducers";

const reduxdevTools =
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();

const store = createStore(
  rootReducer,
  compose(applyMiddleware(thunk), reduxdevTools)
);
export default store;

// const middleware = [thunk];

// const store = createStore(
//   rootReducer,
//   initailState,
//   compose(applyMiddleware(...middleware), reduxdevTools)
// );
