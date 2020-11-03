// import React from "react";
// import ReactDOM from "react-dom";
// import { createBrowserHistory } from "history";
// import { Router, Route, Switch, Redirect } from "react-router-dom";

// // core components
// import Admin from "layouts/Admin.js";
// import RTL from "layouts/RTL.js";

// import "assets/css/material-dashboard-react.css?v=1.9.0";

// const hist = createBrowserHistory();

// ReactDOM.render(
//   <Router history={hist}>

//   </Router>,
//   document.getElementById("root")
// );
// -----------------------------------------------------
// // import "bootstrap/dist/css/bootstrap.css";
// import { ConnectedRouter } from "connected-react-router";
// import { createBrowserHistory } from "history";
// import { SnackbarProvider } from "notistack";
// import React from "react";
// import ReactDOM from "react-dom";
// import { Provider } from "react-redux";
// import App from "./App";
// import "./index.css";
// import configureStore from "./store/configureStore";

// // Create browser history to use in the Redux store
// const baseUrl = document.getElementsByTagName("base")[0].getAttribute("href");
// const history = createBrowserHistory({ basename: baseUrl });

// // Get the application-wide store instance, prepopulating with state from the server where available.
// const initialState = window.initialReduxState;
// const store = configureStore(history, initialState);

// const rootElement = document.getElementById("root");

// ReactDOM.render(
//   <SnackbarProvider>
//     <Provider store={store}>
//       <ConnectedRouter history={history}>
//         <App />
//       </ConnectedRouter>
//     </Provider>
//   </SnackbarProvider>,
//   rootElement
// );
// ------------------------------------------
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";

import store from "./store";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
