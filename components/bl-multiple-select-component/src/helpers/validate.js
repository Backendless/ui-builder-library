export const validateOptions = options => {
  if (!Array.isArray(options)) {
    console.error('Options should be a list');

    return [];
  }

  return options;
};

export const validateValue = (value, options) => {
  if (!value) {
    return [];
  }

  return options.filter(item => value.toLowerCase().includes(item.value.toLowerCase()));
};
