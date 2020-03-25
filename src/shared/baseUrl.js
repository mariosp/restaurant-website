// export const baseUrl = 'http://localhost:3001/';

const url = (process.env.NODE_ENV === "production") ?
    `${window.location.origin}/`
    :
    'http://localhost:3001/' ;

console.log(url);
export const baseUrl = url;
