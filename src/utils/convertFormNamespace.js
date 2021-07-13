export const getNameWithNamespace = namespace => fieldName =>
  namespace
    ? `${namespace.property}.${namespace.index}.${fieldName}`
    : fieldName;

export const getPropertyWithNamespace = namespace => (obj, fieldName) => {
  if (namespace) {
    const { property, index } = namespace;
    return (
      obj[property] && obj[property][index] && obj[property][index][fieldName]
    );
  }
  return obj[fieldName];
};
