export const ErrorMessage = (msg) => {
    return ({
      error: {
        message: msg
      }
    })
}

export const sendResponse = (res, status, response) => {
    res.status(status);
    res.end(response);
}