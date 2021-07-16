import service from '../customer.service';
import fetchWrapper from '../fetchWrapper';

jest.mock('../fetchWrapper', () => ({
  get: jest.fn(() => new Promise.resolve()),
  post: jest.fn(() => new Promise.resolve()),
  put: jest.fn(() => new Promise.resolve()),
  delete: jest.fn(() => new Promise.resolve()),
}));

describe('customer service', () => {
  afterEach(() => {
    jest.clearAllMocks();
    jest.restoreAllMocks();
  });

  it('should getPage call get with correct options', () => {
    service.getPage(10, 20);
    expect(fetchWrapper.get).toHaveBeenCalledTimes(1);
    expect(fetchWrapper.get).toBeCalledWith(
      '/api/customers?offset=10&limit=20'
    );
  });

  it('should getById call get with correct options', () => {
    service.getById(10);
    expect(fetchWrapper.get).toHaveBeenCalledTimes(1);
    expect(fetchWrapper.get).toBeCalledWith('/api/customers/10');
  });

  it('should create call post with correct options', () => {
    service.create({ customer: 1 });
    expect(fetchWrapper.post).toHaveBeenCalledTimes(1);
    expect(fetchWrapper.post).toBeCalledWith('/api/customers', { customer: 1 });
  });

  it('should update call put with correct options', () => {
    service.update(10, { customer: 1 });
    expect(fetchWrapper.put).toHaveBeenCalledTimes(1);
    expect(fetchWrapper.put).toBeCalledWith('/api/customers/10', {
      customer: 1,
    });
  });

  it('should update call delete with correct options', () => {
    service.delete(10);
    expect(fetchWrapper.delete).toHaveBeenCalledTimes(1);
    expect(fetchWrapper.delete).toBeCalledWith('/api/customers/10');
  });
});
