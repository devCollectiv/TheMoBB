export type EnvConfig = {
  apiUrl: string,
  auth0Domain: string,
  auth0ClientId: string,
  audience: string
}

const local: EnvConfig = {
  apiUrl: 'https://mobb.us.auth0.com/api/v2huh/',
  auth0Domain: "mobb.us.auth0.com",
  auth0ClientId: "FqBnoP4aQpkXJHIN12kI3BYuFuRoLFea",
  audience: "https://mobb.dev.com"
}

// const dev: EnvConfig = {
//   apiUrl: 'https://apiUrl.com',
//   auth0Domain: "xxxx.auth0.com",
//   auth0ClientId: "ClientId"
// }
//
// const staging: EnvConfig = {
//   apiUrl: 'https://apiUrl.com',
//   auth0Domain: "xxxx.auth0.com",
//   auth0ClientId: "ClientId"
// }
//
// const prod: EnvConfig = {
//   apiUrl: 'https://apiUrl.com',
//   auth0Domain: "xxxx.auth0.com",
//   auth0ClientId: "ClientId"
// }

const config = local;
// const config = process.env.REACT_APP_STAGE == 'dev' ? dev
//   : process.env.REACT_APP_STAGE == 'staging' ? staging
//     : process.env.REACT_APP_STAGE == 'prod' ? prod
//       : local

export default config