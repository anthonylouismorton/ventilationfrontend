import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Auth0Provider } from "@auth0/auth0-react";
// import Auth0ProviderWithHistory from './context/auth0-provider-with-history';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Auth0Provider
      domain={`${process.env.REACT_APP_DOMAIN}`}
      clientId={`${process.env.REACT_APP_CLIENTID}`}
      redirectUri={window.location.origin}
    >
    {/* <Auth0ProviderWithHistory> */}
      <App />
    {/* </Auth0ProviderWithHistory> */}
    </Auth0Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
