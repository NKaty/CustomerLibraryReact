import fetchWrapper from './fetchWrapper';

const baseUrl = '/api/notes';

const noteService = {
  getByCustomerId,
  getById,
  create,
  update,
  delete: _delete,
};

function getByCustomerId(customerId) {
  return fetchWrapper.get(
    `${baseUrl}?customerId=${encodeURIComponent(customerId)}`
  );
}

function getById(noteId) {
  return fetchWrapper.get(`${baseUrl}/${noteId}`);
}

function create(params) {
  return fetchWrapper.post(baseUrl, params);
}

function update(noteId, params) {
  return fetchWrapper.put(`${baseUrl}/${noteId}`, params);
}

function _delete(noteId) {
  return fetchWrapper.delete(`${baseUrl}/${noteId}`);
}

export default noteService;
