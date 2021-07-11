const fetchWrapper = {
  get,
  post,
  put,
  delete: _delete,
};

function get(url) {
  const requestOptions = {
    method: 'GET',
  };
  return handleResponse(url, requestOptions);
}

function post(url, body) {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  };
  return handleResponse(url, requestOptions);
}

function put(url, body) {
  const requestOptions = {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  };
  return handleResponse(url, requestOptions);
}

function _delete(url) {
  const requestOptions = {
    method: 'DELETE',
  };
  return handleResponse(url, requestOptions);
}

function handleResponse(url, requestOptions) {
  let error = false;
  return fetch(url, requestOptions)
    .then(response => {
      error = !response.ok;
      return response.text();
    })
    .then(text => {
      const data = text && JSON.parse(text);
      if (error) return { error: data ? data.title : 'Something went wrong.' };
      return data;
    })
    .catch(() => ({ error: 'Something went wrong.' }));
}

export default fetchWrapper;
