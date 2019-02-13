import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { createStore, combineReducers } from "redux";
import { Provider } from "react-redux";

import userReducer from "./store/reducers/user";
import "./index.css";
import App from "./App";

const rootReducer = combineReducers({
  user: userReducer
});

const store = createStore(rootReducer);

const app = (
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);

ReactDOM.render(app, document.getElementById("root"));
