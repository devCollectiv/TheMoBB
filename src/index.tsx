// src/index.js

import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { Auth0Provider } from "@auth0/auth0-react";
import config from "./config";
import history from "./utils/history";
import 'regenerator-runtime/runtime'

// A function that routes the user to the right place
// after login
const onRedirectCallback = (appState: any) => {
  history.push(
      appState && appState.targetUrl
          ? appState.targetUrl
          : window.location.pathname
  );
};

ReactDOM.render(
    /**
     * Wrap App in Auth0Provider component that is provided by the SDK wrapper to integrate with SDK.
     * Components inside this wrapper will be able to access the Auth0 SDK client.
     */
    <Auth0Provider
        domain={config.auth0Domain}
        clientId={config.auth0ClientId}
        redirect_uri={window.location.origin}
        // audience={config.audience}
        cacheLocation="localstorage"
        // If this is here users will be able to maintain session thru a refresh...otherwise session dies you have to login again
    >
      <App />
    </Auth0Provider>,
    document.getElementById("root")
);

serviceWorker.unregister();