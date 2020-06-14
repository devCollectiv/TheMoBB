/**
 * Set of custom React hooks that work with the Auth0 SDK.
 * Provides functions that allow the user to log in, log out, and information such as whether the user is
 * logged in.
 */

import React, {FunctionComponent, useContext, useEffect, useState} from 'react'
import createAuth0Client, {Auth0Client} from '@auth0/auth0-spa-js'

const DEFAULT_REDIRECT_CALLBACK = () =>
    window.history.replaceState({}, document.title, window.location.pathname);

type Auth0Provider = {
    children: any,
    onRedirectCallback: any,
    domain: string,
    client_id: string,
    redirect_uri: string,
    advancedOptions: any,
    audience: string,
    cacheLocation?: any
};

const initialContextState: any = {loading: false};
export const Auth0Context = React.createContext(initialContextState);
export const useAuth0 = () => useContext(Auth0Context);
export const Auth0Provider: FunctionComponent<Auth0Provider> = ({
                                  children,
                                  onRedirectCallback = DEFAULT_REDIRECT_CALLBACK,
                                  ...initOptions
                              }: Auth0Provider) => {
    const [isAuthenticated, setIsAuthenticated] = useState({} as boolean);
    const [user, setUser] = useState();
    const [auth0Client, setAuth0Client] = useState({} as Auth0Client);
    const [loading, setLoading] = useState(false);
    const [popupOpen, setPopupOpen] = useState(false);

    useEffect(() => {
      let auth0FromHook:any ={};

        const initAuth0 = async () => {
            setLoading(true);
            auth0FromHook = await createAuth0Client(initOptions);
            setAuth0Client(auth0FromHook);

            /** when the redirect comes back to our application it will contain the code and state parameters **/
            if (window.location.search.includes("code=") &&
                window.location.search.includes("state=")) {
                const { appState } = await auth0FromHook.handleRedirectCallback();

                /** updates the route to not contain code or state **/
                onRedirectCallback(appState);
            }

            const isAuthenticated = await auth0FromHook.isAuthenticated();

            setIsAuthenticated(isAuthenticated);

            if (isAuthenticated) {
                const user = await auth0FromHook.getUser();
                setUser(user);
            }

            setLoading(false);
        };
        initAuth0();
        // eslint-disable-next-line
    }, []);

    const loginWithPopup = async (params = {}) => {
        setPopupOpen(true);
        try {
          await auth0Client.loginWithPopup(params);
        } catch (error) {
            console.error(error);
        } finally {
            setPopupOpen(false);
        }
      const user = await auth0Client.getUser();
        setUser(user);
        setIsAuthenticated(true);
    };

    const handleRedirectCallback = async () => {
      console.log("redirectCallback", isAuthenticated);
        setLoading(true);
      await auth0Client.handleRedirectCallback();
      const user = await auth0Client.getUser();
        setLoading(false);
        setIsAuthenticated(true);
        setUser(user);
    };

  return (
        <Auth0Context.Provider
            value={{
              isAuthenticated,
              user,
              loading,
              popupOpen,
              loginWithPopup,
              handleRedirectCallback,
              getIdTokenClaims: (...p: any) => auth0Client.getIdTokenClaims(...p),
              loginWithRedirect: (...p: any) => auth0Client.loginWithRedirect(...p),
              getTokenSilently: (...p: any) => auth0Client.getTokenSilently(...p),
              getTokenWithPopup: (...p: any) => auth0Client.getTokenWithPopup(...p),
              logout: (...p: any) => auth0Client.logout(...p)
            }}
        >
            {children}
        </Auth0Context.Provider>
    );
};