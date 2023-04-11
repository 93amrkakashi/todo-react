import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
// import * as serviceWorkerRegistration from "service"
import * as registerServiceWorker from './serviceWorkerRegistration';
import 'bootstrap/dist/css/bootstrap.min.css';
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);


registerServiceWorker.register();
