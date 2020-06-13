// src/index.js

import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { Auth0Provider } from "./react-auth0-spa";
import config from "./config";
import history from "./utils/history";
import 'regenerator-runtime/runtime'

// A function that routes the user to the right place
// after login
const onRedirectCallback = (appState: { targetUrl: any; }) => {
  history.push(
      appState && appState.targetUrl
          ? appState.targetUrl
          : window.location.pathname
  );
};

const advancedOptions = {
  clearTransactionCookies: true
}

ReactDOM.render(
    /**
     * Wrap App in Auth0Provider component that is provided by the SDK wrapper to integrate with SDK.
     * Components inside this wrapper will be able to access the Auth0 SDK client.
     */
    <Auth0Provider
        domain={config.auth0Domain}
        client_id={config.auth0ClientId}
        redirect_uri={window.location.origin}
        onRedirectCallback={onRedirectCallback}
        advancedOptions={advancedOptions}
    >
      <App />
    </Auth0Provider>,
    document.getElementById("root")
);

serviceWorker.unregister();