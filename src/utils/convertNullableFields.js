export const convertNullToEmptyString = obj => {
  Object.keys(obj).forEach(key => {
    if (obj[key] instanceof Array) obj[key].forEach(convertNullToEmptyString);
    else obj[key] = obj[key] === null ? '' : obj[key];
  });
  return obj;
};

export const convertEmptyStringToNull = obj => {
  Object.keys(obj).forEach(key => {
    if (obj[key] instanceof Array) obj[key].forEach(convertEmptyStringToNull);
    else obj[key] = obj[key] === '' ? null : obj[key];
  });
  return obj;
};
