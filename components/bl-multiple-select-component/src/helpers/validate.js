export const validateOptions = options => {
  if (!Array.isArray(options)) {
    console.error('Options should be a list OR you have an empty “Options Logic” handler in Logic, delete or fill it.');

    return [];
  }

  return options;
};

export const validateValue = (value, options) => {
  if (!value) {
    return [];
  }

  return options.filter(item => value.includes(item.value));
};
