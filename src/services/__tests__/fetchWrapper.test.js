import fetchWrapper from '../fetchWrapper';
import handleResponse from '../handleResponse';

jest.mock('../handleResponse', () => {
  return jest.fn(() => new Promise.resolve());
});

describe('fetchWrapper', () => {
  afterEach(() => {
    jest.clearAllMocks();
    jest.restoreAllMocks();
  });

  it('should get call handleResponse with correct options', () => {
    fetchWrapper.get('notes');
    expect(handleResponse).toHaveBeenCalledTimes(1);
    expect(handleResponse).toBeCalledWith('notes', {
      method: 'GET',
    });
  });

  it('should post call handleResponse with correct options', () => {
    fetchWrapper.post('notes', { test: 1 });
    expect(handleResponse).toHaveBeenCalledTimes(1);
    expect(handleResponse).toBeCalledWith('notes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ test: 1 }),
    });
  });

  it('should put call handleResponse with correct options', () => {
    fetchWrapper.put('notes', { test: 1 });
    expect(handleResponse).toHaveBeenCalledTimes(1);
    expect(handleResponse).toBeCalledWith('notes', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ test: 1 }),
    });
  });

  it('should delete call handleResponse with correct options', () => {
    fetchWrapper.delete('notes');
    expect(handleResponse).toHaveBeenCalledTimes(1);
    expect(handleResponse).toBeCalledWith('notes', {
      method: 'DELETE',
    });
  });
});
