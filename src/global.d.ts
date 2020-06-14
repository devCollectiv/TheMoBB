declare module '*.module.css' {
    const classes: { [key: string]: string };
    export default classes;
}

declare module '*.png' {
    const value: string;
    export default value;
}

declare module '*.txt'
declare module '*.csv'
declare module '*.json'

declare namespace mobbAuth0 {
    type Auth0Provider = {
        children: any,
        onRedirectCallback: any,
        domain: string,
        client_id: string,
        redirect_uri: string,
        advancedOptions?: any,
        audience: string,
        cacheLocation?: any
    };
}