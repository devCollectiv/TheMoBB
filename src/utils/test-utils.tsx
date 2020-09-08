// //https://testing-library.com/docs/react-testing-library/setup
// import {Auth0Provider} from "@auth0/auth0-react";
// import React, {Component, ReactElement} from "react";
// import {render} from "@testing-library/react";
//
// const auth0TestSetup = {
//     domain: 'auth0Domain',
//     client_id: 'auth0ClientId',
//     redirect_uri: 'origin',
//     onRedirectCallback: () => {
//     },
//     audience: 'audience'
// }
//
// const AllTheProviders = ({children}:any) =>
//     (
//         <Auth0Provider
//             onRedirectCallback={jest.fn()}
//             domain="domain"
//             clientId="client_id"
//             redirectUri="https://redirect_uri"
//             audience="audience">{children}</Auth0Provider>
//     )
//
// const mobbTestRender = (ui:any, options:mobbAuth0.Auth0Provider = auth0TestSetup) =>
//     render(ui, {wrapper: AllTheProviders, ...options})
//
// //re-export everything
// export * from '@testing-library/react'
//
// //override the render method
// export {mobbTestRender as render}
//
