
export async function get (url) {
    return fetch(url)
    .then(response => {
      if (!response.ok) return "GET_ERROR";
      return response.json();
    })
    .catch(error => "GET_ERROR");
}