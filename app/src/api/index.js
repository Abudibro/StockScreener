
export async function get (url) {
    return fetch(url)
    .then(response => {
      return response.json();
    })
    .catch(error => {
      console.log(error)
      return "GET_ERROR"
    });
}