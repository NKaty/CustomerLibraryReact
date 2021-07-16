import handleResponse from './handleResponse';

const fetchWrapper = {
  get,
  post,
  put,
  delete: _delete,
};

export default fetchWrapper;

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
