// custom validations
// --------------------------------------------------

import { helpers } from 'vuelidate/lib/validators';

export const mustBeDate = ({ value, isOptional = true }) => {
  const fn = value => {
    const date = new Date(value);

    if (isNaN(date.getTime())) {
      return false;
    }
    return true;
  };

  if (isOptional) {
    return !helpers.req(value) || fn(value);
  }
  return fn(value);
};
