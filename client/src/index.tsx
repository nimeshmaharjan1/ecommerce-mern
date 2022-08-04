import React from "react";
import ReactDOM from "react-dom/client";
import "./index.scss";
import App from "./App";
import "./styles/Container.scss";
import { store } from "./store/store";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <Provider store={store}>
    <Router>
      <Routes>
        <Route path="/*" element={<App />}></Route>
      </Routes>
    </Router>
  </Provider>
);
