import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Auth0Provider } from "@auth0/auth0-react";
import { BrowserRouter as Router } from 'react-router-dom';
import ProgramProvider from './context/program';
// import Auth0ProviderWithHistory from './context/auth0-provider-with-history';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <Auth0Provider
        domain={`${process.env.REACT_APP_DOMAIN}`}
        clientId={`${process.env.REACT_APP_CLIENTID}`}
        redirectUri={window.location.origin}
        useRefreshTokens={true}
        cacheLocation="localstorage"
      >
      {/* <Auth0ProviderWithHistory> */}
      <ProgramProvider>
        <App />
      </ProgramProvider>
      {/* </Auth0ProviderWithHistory> */}
      </Auth0Provider>
    </Router>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
