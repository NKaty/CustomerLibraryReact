import service from '../note.service';
import fetchWrapper from '../fetchWrapper';

jest.mock('../fetchWrapper', () => ({
  get: jest.fn(() => new Promise.resolve()),
  post: jest.fn(() => new Promise.resolve()),
  put: jest.fn(() => new Promise.resolve()),
  delete: jest.fn(() => new Promise.resolve()),
}));

describe('note service', () => {
  afterEach(() => {
    jest.clearAllMocks();
    jest.restoreAllMocks();
  });

  it('should getByCustomerId call get with correct options', () => {
    service.getByCustomerId(10);
    expect(fetchWrapper.get).toHaveBeenCalledTimes(1);
    expect(fetchWrapper.get).toBeCalledWith('/api/notes?customerId=10');
  });

  it('should getById call get with correct options', () => {
    service.getById(10);
    expect(fetchWrapper.get).toHaveBeenCalledTimes(1);
    expect(fetchWrapper.get).toBeCalledWith('/api/notes/10');
  });

  it('should create call post with correct options', () => {
    service.create({ note: 1 });
    expect(fetchWrapper.post).toHaveBeenCalledTimes(1);
    expect(fetchWrapper.post).toBeCalledWith('/api/notes', { note: 1 });
  });

  it('should update call put with correct options', () => {
    service.update(10, { note: 1 });
    expect(fetchWrapper.put).toHaveBeenCalledTimes(1);
    expect(fetchWrapper.put).toBeCalledWith('/api/notes/10', { note: 1 });
  });

  it('should update call delete with correct options', () => {
    service.delete(10);
    expect(fetchWrapper.delete).toHaveBeenCalledTimes(1);
    expect(fetchWrapper.delete).toBeCalledWith('/api/notes/10');
  });
});
