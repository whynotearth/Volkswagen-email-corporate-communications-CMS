// custom validations

export const mustBeDate = value => {
  const date = new Date(value);
  if (isNaN(date.getTime())) {
    return false;
  }
  return true;
};
