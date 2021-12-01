import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";

import store from "./reducers";
import App from "./app";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>,
  document.getElementById("app")
);
