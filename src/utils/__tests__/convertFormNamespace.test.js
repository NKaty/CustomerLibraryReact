import {
  getNameWithNamespace,
  getPropertyWithNamespace,
} from '../convertFormNamespace';

describe('getNameWithNamespace', () => {
  it('should return function', () => {
    expect(typeof getNameWithNamespace()).toBe('function');
  });

  it('should returned function return field name with namespace', () => {
    const namespace = { property: 'notes', index: 0 };
    const getName = getNameWithNamespace(namespace);
    expect(getName('text')).toBe('notes.0.text');
  });

  it('should returned function return field name if there is no namespace', () => {
    const getName = getNameWithNamespace();
    expect(getName('text')).toBe('text');
  });
});

describe('getPropertyWithNamespace', () => {
  it('should return function', () => {
    expect(typeof getPropertyWithNamespace()).toBe('function');
  });

  it('should returned function return property of object by field name with namespace', () => {
    const namespace = { property: 'notes', index: 0 };
    const obj = { notes: [{ text: 'test' }] };
    const getProperty = getPropertyWithNamespace(namespace);
    expect(getProperty(obj, 'text')).toBe('test');
  });

  it('should returned function return property of object by field name if there is no namespace', () => {
    const obj = { text: 'test' };
    const getProperty = getPropertyWithNamespace();
    expect(getProperty(obj, 'text')).toBe('test');
  });
});
