import {
  minInputLength,
  minInputPasswordLength,
  maxInputLength,
} from '../utils/constants';

// собираем ошибки
export const validateField = (validator, fieldName) => {
  return Object.keys(validator)
    .map((errorKey) => {
      const errorResult = validator[errorKey](fieldName);
      return { [errorKey]: errorResult };
    })
    .reduce((acc, item) => ({ ...acc, ...item }), {});
};

// функции проверок инпутов
export const validators = {
  name: {
    required: (value) => value === '',
    minLength: (value) => value.length < minInputLength,
    maxLength: (value) => value.length > maxInputLength,
  },
  email: {
    required: (value) => value === '',
    email: (value) =>
      !/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        value
      ),
  },
  password: {
    required: (value) => value === '',
    minLength: (value) => value.length < minInputPasswordLength,
  },
  search: {
    required: (value) => value === '',
  }
};
