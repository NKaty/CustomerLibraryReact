import {
  convertNullToEmptyString,
  convertEmptyStringToNull,
} from '../convertNullableFields';

describe('convertNullToEmptyString', () => {
  it('should convert null fields of object to an empty string', () => {
    const obj = { test1: null, test2: 'not null' };
    const newObj = convertNullToEmptyString(obj);

    expect(newObj.test1).toBe('');
    expect(newObj.test2).toBe('not null');
  });

  it('should convert null fields of all the objects in the array to an empty string', () => {
    const obj = {
      notes: [
        { test1: null, test2: 'not null' },
        { test3: null, test4: 0 },
      ],
    };
    const newObj = convertNullToEmptyString(obj);

    expect(newObj.notes[0].test1).toBe('');
    expect(newObj.notes[0].test2).toBe('not null');
    expect(newObj.notes[1].test3).toBe('');
    expect(newObj.notes[1].test4).toBe(0);
  });
});

describe('convertEmptyStringToNull', () => {
  it('should convert empty fields of object to null', () => {
    const obj = { test1: '', test2: 'not empty string' };
    const newObj = convertEmptyStringToNull(obj);

    expect(newObj.test1).toBe(null);
    expect(newObj.test2).toBe('not empty string');
  });

  it('should convert empty fields of all the objects in the array to null', () => {
    const obj = {
      notes: [
        { test1: '', test2: 'not null' },
        { test3: '', test4: 0 },
      ],
    };
    const newObj = convertEmptyStringToNull(obj);

    expect(newObj.notes[0].test1).toBe(null);
    expect(newObj.notes[0].test2).toBe('not null');
    expect(newObj.notes[1].test3).toBe(null);
    expect(newObj.notes[1].test4).toBe(0);
  });
});
