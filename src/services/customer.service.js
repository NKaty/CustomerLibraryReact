import fetchWrapper from './fetchWrapper';

const baseUrl = '/api/customers';

const customerService = {
  getPage,
  getById,
  create,
  update,
  delete: _delete,
};

function getPage(offset, limit) {
  return fetchWrapper.get(
    `${baseUrl}?offset=${encodeURIComponent(offset)}&limit=${encodeURIComponent(
      limit
    )}`
  );
}

function getById(customerId) {
  return fetchWrapper.get(`${baseUrl}/${customerId}`);
}

function create(params) {
  return fetchWrapper.post(baseUrl, params);
}

function update(customerId, params) {
  return fetchWrapper.put(`${baseUrl}/${customerId}`, params);
}

function _delete(customerId) {
  return fetchWrapper.delete(`${baseUrl}/${customerId}`);
}

export default customerService;
