export const convertLetterToLowCase = (str, idx) =>
  `${str.slice(0, idx)}${str[idx].toLowerCase()}${str.slice(idx + 1)}`;

export const convertLettersToLowCase = str => {
  let convertedStr = convertLetterToLowCase(str, 0);
  const dotIdx = str.indexOf('.');
  if (dotIdx !== -1) {
    convertedStr = convertLetterToLowCase(convertedStr, dotIdx + 1);
  }

  return convertedStr;
};
