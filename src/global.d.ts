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