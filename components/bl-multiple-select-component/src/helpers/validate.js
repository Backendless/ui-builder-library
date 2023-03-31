export const validateOptions = options => {
  if (!Array.isArray(options)) {
    console.error('Invalid options or options are not provided! Please provide valid options.');

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
