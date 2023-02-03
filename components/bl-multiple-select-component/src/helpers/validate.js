export const validateOptions = options => {
  if (!Array.isArray(options)) {
    console.error('Options should be a list');

    return [];
  }

  return options;
};

export const validateValue = (value, options) => {
  return options.filter(item => value.includes(item.value));
};
