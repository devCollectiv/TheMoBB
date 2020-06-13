import React, {FunctionComponent, Component, useEffect} from 'react'
import {Route, RouteProps} from 'react-router-dom'
import {useAuth0} from '../../react-auth0-spa'

const PrivateRoute: FunctionComponent<RouteProps> = ({ component: Component, path, ...rest }) => {
  const { loading, isAuthenticated, loginWithRedirect } = useAuth0();

  useEffect(() => {
    if (loading || isAuthenticated) {
      return;
    }
    const fn = async () => {
      await loginWithRedirect({
        appState: {targetUrl: window.location.pathname}
      });
    };
    fn();
    console.log("Private route ", window.location.pathname);
  }, [loading, isAuthenticated, loginWithRedirect, path]);

  const render = (props:RouteProps) =>
      // @ts-ignore
      isAuthenticated === true ? <Component {...props} /> : null;

  return <Route path={path} render={render} {...rest} />;
};

export default PrivateRoute;