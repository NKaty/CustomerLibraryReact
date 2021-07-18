function handleResponse(url, requestOptions) {
  let error = false;
  return fetch(`${process.env.SERVER_URL}${url}`, requestOptions)
    .then(response => {
      error = !response.ok;
      return response.text();
    })
    .then(text => {
      let data = null;
      if (text) data = JSON.parse(text);

      if (error)
        return {
          error: true,
          errorTitle: data && data.title ? data.title : 'Something went wrong.',
          validationErrors: (data && data.errors) ?? null,
        };

      return data;
    })
    .catch(() => ({
      error: true,
      errorTitle: 'Something went wrong.',
    }));
}

export default handleResponse;
