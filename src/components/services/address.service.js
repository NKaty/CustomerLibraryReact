import fetchWrapper from './fetchWrapper';

const baseUrl = '/api/addresses';

const addressService = {
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

function getById(addressId) {
  return fetchWrapper.get(`${baseUrl}/${addressId}`);
}

function create(params) {
  return fetchWrapper.post(baseUrl, params);
}

function update(addressId, params) {
  return fetchWrapper.put(`${baseUrl}/${addressId}`, params);
}

function _delete(addressId) {
  return fetchWrapper.delete(`${baseUrl}/${addressId}`);
}

export default addressService;
