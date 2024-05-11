const BASE_URL = '/.netlify/functions';

export async function get (url) {
    return fetch(BASE_URL + url)
    .then(response => response.json())
    .catch(error => "GET_ERROR");
}