import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { Provider } from 'react-redux';
import { store } from './redux/store.jsx';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary.jsx';

import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <React.StrictMode>
      {/* <ErrorBoundary> */}
      <App />
      {/* </ErrorBoundary> */}
      <ToastContainer />
    </React.StrictMode>
  </Provider>
);
