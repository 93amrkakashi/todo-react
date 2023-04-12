import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
// import * as serviceWorkerRegistration from "service"
import * as registerServiceWorker from "./serviceWorkerRegistration";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Ar from "./components/Ar";
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/ar" element={<Ar />} />
      </Routes>
    </Router>
  </React.StrictMode>
);

registerServiceWorker.register();
