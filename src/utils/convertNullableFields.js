export const convertNullToEmptyString = obj => {
  obj = JSON.parse(JSON.stringify(obj));

  const convert = obj => {
    Object.keys(obj).forEach(key => {
      if (obj[key] instanceof Array) obj[key].forEach(convert);
      else obj[key] = obj[key] === null ? '' : obj[key];
    });
  };

  convert(obj);
  return obj;
};

export const convertEmptyStringToNull = obj => {
  obj = JSON.parse(JSON.stringify(obj));

  const convert = obj => {
    Object.keys(obj).forEach(key => {
      if (obj[key] instanceof Array) obj[key].forEach(convert);
      else obj[key] = obj[key] === '' ? null : obj[key];
    });
  };

  convert(obj);
  return obj;
};
